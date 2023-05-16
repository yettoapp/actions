require "simplecov"
require "simplecov-console"

SimpleCov.collate(Dir["coverage/.resultset.json"], "rails") do
  formatter SimpleCov::Formatter::Console

  minimum_coverage 100
  maximum_coverage_drop 2

  add_group "Ignored Code" do |src_file|
    File.readlines(src_file.filename).grep(/:nocov:/).any?
  end
end

