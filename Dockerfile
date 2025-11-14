FROM ruby:3.3

# Install required packages
RUN apt-get update -qq && apt-get install -y build-essential nodejs npm

# Install bundler 2.5.x (compatible with al-folio v0.14+)
RUN gem install bundler -v "~>2.5"

# Set up application directory
WORKDIR /srv/jekyll

# Copy dependency files
COPY Gemfile Gemfile.lock ./

# Install gems
RUN bundle install

# Copy the rest of the project
COPY . .

# Expose ports for Jekyll + LiveReload
EXPOSE 8080 35729

# Run jekyll
CMD ["bundle", "exec", "jekyll", "serve", "--livereload", "--host", "0.0.0.0", "--port", "8080"]