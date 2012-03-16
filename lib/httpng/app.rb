# encoding: binary

require 'base64'
require 'sinatra'

module Httpng
  class App < Sinatra::Base
    ##############################################################################
    #
    # Settings
    #
    ##############################################################################

    enable :logging


    ##############################################################################
    #
    # Routes
    #
    ##############################################################################

    # HTML files.
    get '/*.html' do
      render_html(request.path_info)
    end

    # The JavaScript library.
    get %r{/(httpng|html2canvas|jquery.plugin.html2canvas).js} do
      file = File.join(File.dirname(__FILE__), "assets/#{request.path_info}")
      send_file(file, :disposition => 'inline', :filename => File.basename(file))
    end

    # Export Base64 encoded image data to a file.
    post '/export' do
      # Retrieve parameters.
      name = params[:name]
      data = Base64.decode64(params[:data])
      
      # Error if parameters not present.
      if name.nil? || data.nil?
        halt 422
      end
      
      # Write to file.
      path = "#{settings.output_path}/#{name}.png"
      IO.binwrite(path, data)

      halt 200
    end


    ##############################################################################
    #
    # Error Handling
    #
    ##############################################################################
    
    not_found do
      if request.path_info == '/'
        redirect '/index.html'
      else
        return "No file found at: #{settings.public_dir}#{request.path_info}"
      end
    end


    private

    # Renders an HTML page to the browser.
    def render_html(path)
      path = path.gsub('..', '')

      file = File.join(settings.public_dir, path)
      
      if File.exists?(file)
        content = IO.read(file)
        content = auto_insert_js(content)
      
        content_type :html
        return content
      else
        halt 404
      end
    end
    
    # Automatically inserts the required JavaScript into the HEAD or HTML tags.
    def auto_insert_js(html)
      # Construct script tags.
      js = []
      js << '<script src="http://code.jquery.com/jquery-1.7.1.min.js"></script>'
      js << '<script src="/httpng.js"></script>'
      js << ''
      js = js.join("\n")
      
      # Insert into <head> if possible.
      if html.sub!(/<head>/i) {|text| "#{text}\n#{js}"}.nil?
        html.sub!(/<html>/i) {|text| "#{text}\n<head>\n#{js}</head>\n"}.nil?
      end

      return html
    end
  end
end
