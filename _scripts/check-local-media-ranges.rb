# frozen_string_literal: true

# Run without starting a server:
# docker compose exec -T jekyll bundle exec ruby _scripts/check-local-media-ranges.rb
require 'jekyll'
require 'webrick'
require 'stringio'
require 'tempfile'
require_relative '../_plugins/local_media_ranges'

def check(condition, message)
  raise message unless condition
end

handler_class = WEBrick::HTTPServlet::DefaultFileHandler
patch = Jekyll::LocalMediaRanges
site_stub = Struct.new(:config)

check(!handler_class.ancestors.include?(patch), 'Loading the plugin must not patch static builds')
Jekyll::Hooks.trigger(:site, :after_init, site_stub.new({ 'serving' => false }))
check(!handler_class.ancestors.include?(patch), 'Static-build hooks must leave WEBrick unchanged')
2.times { Jekyll::Hooks.trigger(:site, :after_init, site_stub.new({ 'serving' => true })) }
check(handler_class.ancestors.count(patch) == 1, 'Serve hooks must prepend the fix exactly once')

config = WEBrick::Config::HTTP.merge(Logger: WEBrick::Log.new(StringIO.new, WEBrick::Log::FATAL))
payload = (0..255).to_a.pack('C*')
cases_checked = 0

Tempfile.create(['local-media-ranges-', '.mp4']) do |file|
  file.binmode
  file.write(payload)
  file.flush
  # Whole-second mtime makes ordinary If-Modified-Since behavior deterministic.
  modified = Time.at(1_700_000_000)
  File.utime(modified, modified, file.path)
  stat = File.stat(file.path)
  etag = format('%x-%x-%x', stat.ino, stat.size, stat.mtime.to_i)
  handler = handler_class.new(config, file.path)
  bounded_range = { 'Range' => 'bytes=16-31' }

  cases = [
    ['full response', {}, 200, payload, nil],
    ['bounded range', bounded_range, 206, payload.byteslice(16, 16), 'bytes 16-31/256'],
    ['open-ended range', { 'Range' => 'bytes=240-' }, 206, payload.byteslice(240, 16), 'bytes 240-255/256'],
    ['suffix range', { 'Range' => 'bytes=-16' }, 206, payload.byteslice(240, 16), 'bytes 240-255/256'],
    ['range clamped to EOF', { 'Range' => 'bytes=240-999' }, 206, payload.byteslice(240, 16), 'bytes 240-255/256'],
    ['matching If-Range ETag', bounded_range.merge('If-Range' => etag), 206, payload.byteslice(16, 16), 'bytes 16-31/256'],
    ['matching If-Range date', bounded_range.merge('If-Range' => modified.httpdate), 206, payload.byteslice(16, 16), 'bytes 16-31/256'],
    ['stale If-Range ETag', bounded_range.merge('If-Range' => '"stale"'), 200, payload, nil],
    ['older If-Range date', bounded_range.merge('If-Range' => (modified - 60).httpdate), 200, payload, nil],
    ['newer If-Range date', bounded_range.merge('If-Range' => (modified + 60).httpdate), 200, payload, nil],
    ['invalid If-Range', bounded_range.merge('If-Range' => 'not-a-validator'), 200, payload, nil],
    ['weak If-Range', bounded_range.merge('If-Range' => "W/\"#{etag}\""), 200, payload, nil],
    ['If-Range without Range', { 'If-Range' => etag }, 200, payload, nil],
    ['ordinary If-None-Match', { 'If-None-Match' => etag }, 304, ''.b, nil],
    ['ordinary If-Modified-Since', { 'If-Modified-Since' => modified.httpdate }, 304, ''.b, nil],
    ['If-None-Match takes precedence', bounded_range.merge('If-Range' => etag, 'If-None-Match' => etag), 304, ''.b, nil],
    ['If-Modified-Since takes precedence', bounded_range.merge('If-Range' => etag, 'If-Modified-Since' => modified.httpdate), 304, ''.b, nil],
    ['unsatisfiable range', { 'Range' => 'bytes=256-' }, 416, ''.b, nil],
    ['matching If-Range with unsatisfiable range', { 'Range' => 'bytes=256-', 'If-Range' => etag }, 416, ''.b, nil],
    ['stale If-Range ignores unsatisfiable range', { 'Range' => 'bytes=256-', 'If-Range' => '"stale"' }, 200, payload, nil],
  ]

  cases.each do |name, headers, expected_status, expected_body, expected_range|
    request = WEBrick::HTTPRequest.new(config)
    header_lines = headers.map { |key, value| "#{key}: #{value}\r\n" }.join
    request.parse(StringIO.new("GET /fixture.mp4 HTTP/1.1\r\nHost: localhost\r\n#{header_lines}\r\n"))
    original_if_range = request.header['if-range']
    response = WEBrick::HTTPResponse.new(config)
    response.request_method = 'GET'

    begin
      handler.do_GET(request, response)
    rescue WEBrick::HTTPStatus::Status => status
      response.status = status.code
    end

    begin
      check(response.status == expected_status, "#{name}: expected #{expected_status}, got #{response.status}")
      check(response['content-range'] == expected_range, "#{name}: incorrect Content-Range")
      check(request.header['if-range'].equal?(original_if_range), "#{name}: If-Range was not restored")

      # Exercise WEBrick's actual body sender: file-backed ranges need seeking,
      # so inspecting response.body alone would not prove the bytes are right.
      output = StringIO.new(''.b)
      response.send_body(output)
      check(output.string == expected_body, "#{name}: incorrect response bytes")
      if [200, 206].include?(expected_status)
        check(response['content-length'] == expected_body.bytesize.to_s, "#{name}: incorrect Content-Length")
      end
      cases_checked += 1
    ensure
      body = response.body
      body.close if body.respond_to?(:close) && !body.closed?
    end
  end
end

puts "Local media ranges: #{cases_checked} response cases and build/serve hook checks passed."
