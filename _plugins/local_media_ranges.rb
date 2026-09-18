# frozen_string_literal: true

# WEBrick 1.9.1 treats a matching If-Range as a cache hit (304), which stops
# Chrome when it resumes an MP4 download. If-Range must instead select a
# partial response (206) or, for a changed resource, a full response (200).
# https://www.rfc-editor.org/rfc/rfc9110.html#section-13.1.5
module Jekyll
  module LocalMediaRanges
    def not_modified?(request, response, mtime, etag)
      if_range = request.header.delete('if-range')

      if if_range && request['range']
        validator = if_range.join(', ')
        # Leave Range absent on a mismatch so WEBrick's do_GET serves the
        # entire file. Other cache validators still use the normal handler.
        request.header.delete('range') unless if_range_matches?(validator, mtime, etag)
      end

      super
    ensure
      request.header['if-range'] = if_range if if_range
    end

    private

    def if_range_matches?(validator, mtime, etag)
      return true if validator == etag && !validator.start_with?('W/')

      Time.httpdate(validator).to_i == mtime.to_i
    rescue ArgumentError
      false
    end
  end
end

# Install only for `jekyll serve`; static builds and GitHub Pages are untouched.
Jekyll::Hooks.register :site, :after_init do |site|
  next unless site.config['serving']

  require 'webrick'
  handler = WEBrick::HTTPServlet::DefaultFileHandler
  handler.prepend(Jekyll::LocalMediaRanges) unless handler.ancestors.include?(Jekyll::LocalMediaRanges)
end
