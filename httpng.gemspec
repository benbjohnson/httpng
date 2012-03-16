$:.unshift(File.dirname(__FILE__) + '/lib')

require 'httpng/version'

Gem::Specification.new do |s|
  s.name        = 'httpng'
  s.version     = Httpng::VERSION
  s.platform    = Gem::Platform::RUBY
  s.authors     = ['Ben Johnson']
  s.email       = ['benbjohnson@yahoo.com']
  s.homepage    = 'http://github.com/benbjohnson/httpng'
  s.summary     = 'A local server for saving HTML elements as PNG files.'
  s.executables = ['httpng']
  s.default_executable = 'httpng'

  s.add_dependency('OptionParser', '~> 0.5.1')
  s.add_dependency('sinatra', '~> 1.3.2')

  s.test_files   = Dir.glob('test/**/*')
  s.files        = Dir.glob('lib/**/*') + %w(README.md)
  s.require_path = 'lib'
end