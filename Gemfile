source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end



# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 5.1.4'
# db
gem 'mysql2', '~> 0.4.10'
# Use Puma as the app server
gem 'puma', '~> 3.7'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby

# Use CoffeeScript for .coffee assets and views
gem 'coffee-rails', '~> 4.2'
# Turbolinks makes navigating your web application faster. Read more: https://github.com/turbolinks/turbolinks
gem 'turbolinks', '~> 5'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.5'
# Use Redis adapter to run Action Cable in production
gem 'redis', '~> 4.0', '>= 4.0.1'
gem 'redis-namespace', '~> 1.6'
gem 'redis-rails', '~> 5.0', '>= 5.0.2'
gem 'redis-rack-cache', '~> 2.0', '>= 2.0.2'

# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

# constant
gem 'dotenv-rails', '~> 2.2', '>= 2.2.1'
gem 'easy_settings', '~> 0.1.2'

# user authentication
gem 'devise', '~> 4.4', '>= 4.4.1'
# user login with facebook
gem 'omniauth-facebook'

# show nofitications
gem 'toastr-rails', '1.0.3'

# jquery
gem 'jquery-rails', '4.3.1'
gem 'slim', '~> 3.0', '>= 3.0.9'

gem 'simple_form', '~> 3.5', '>= 3.5.1'
gem 'breadcrumbs_on_rails', '~> 3.0', '>= 3.0.1'

gem 'react-rails', '~> 2.4', '>= 2.4.4'
gem "slim-rails"
# pagination
gem 'kaminari'


group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  # Adds support for Capybara system testing and selenium driver
  gem 'capybara', '~> 2.13'
  gem 'selenium-webdriver'
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '>= 3.0.5', '< 3.2'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]