$:.unshift(File.dirname(__FILE__) + '/lib')

require 'rubygems'
require 'rake'
require 'rake/rdoctask'
require 'httpng'

#############################################################################
#
# Standard tasks
#
#############################################################################

Rake::RDocTask.new do |rdoc|
  rdoc.rdoc_dir = 'rdoc'
  rdoc.title = "Grapevine #{Grapevine::VERSION}"
  rdoc.rdoc_files.include('README*')
  rdoc.rdoc_files.include('lib/**/*.rb')
end

task :console do
  sh "irb -rubygems -r ./lib/httpng.rb"
end


#############################################################################
#
# Packaging tasks
#
#############################################################################

task :release do
  puts ""
  print "Are you sure you want to relase httpng #{Httpng::VERSION}? [y/N] "
  exit unless STDIN.gets.index(/y/i) == 0
  
  unless `git branch` =~ /^\* master$/
    puts "You must be on the master branch to release!"
    exit!
  end
  
  # Build gem and upload
  sh "gem build httpng.gemspec"
  sh "gem push httpng-#{Httpng::VERSION}.gem"
  sh "rm httpng-#{Httpng::VERSION}.gem"
  
  # Commit
  sh "git commit --allow-empty -a -m 'v#{Httpng::VERSION}'"
  sh "git tag v#{Httpng::VERSION}"
  sh "git push origin master"
  sh "git push origin v#{Httpng::VERSION}"
end