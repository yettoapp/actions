require "bundler/inline"

gemfile do
  source "https://rubygems.org"

  gem "simplecov", "~> 0.18"
  gem "simplecov-lcov", "~> 0.8"
end

SimpleCov.collate(Dir["coverage/.resultset.json"], "rails") do
  SimpleCov::Formatter::LcovFormatter.config do |c|
    c.output_directory = 'coverage'
    c.report_with_single_file = true
    c.lcov_file_name = 'lcov.info'
  end

  formatter SimpleCov::Formatter::LcovFormatter

  minimum_coverage 100
  maximum_coverage_drop 2

  add_group "Ignored Code" do |src_file|
    File.readlines(src_file.filename).grep(/:nocov:/).any?
  end
end

