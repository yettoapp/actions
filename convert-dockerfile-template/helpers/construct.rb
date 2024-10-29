require "bundler/inline"

gemfile do
  source "https://rubygems.org"

  gem "psych", "~> 5.1"
  gem "json", "~> 2.7"
end

require 'psych'
require 'json'

if File.exist?("docker-values.yaml")
  values = Psych.load_file("docker-values.yaml")

  dockerfile_template = File.read("Dockerfile.template")

  values.each_pair do |key, value|
    dockerfile_template.gsub!(/\# {{ #{key} }}/, value)
  end

  puts <<~STR
    Writing Dockerfile:

    #{dockerfile_template}
  STR

  File.write("Dockerfile", dockerfile_template)
else
  puts "docker-values.yaml not found"
end
