require 'mime/types'

@root = File.expand_path(File.dirname(__FILE__))

run Proc.new { |env|
  path = Rack::Utils.unescape(env['PATH_INFO'])
  full_path = "#{@root}#{path}"
  full_path = "#{full_path}/index.html" if File.directory?(full_path)
  if File.readable? full_path
    content_type = MIME::Types.type_for(full_path)[0].content_type
    [200, {'Content-Type' => content_type}, [File.read(full_path)]]
  else
    [404, {'Content-Type' => 'text/html'}, ['File not found']]
  end
}
