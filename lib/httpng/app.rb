# encoding: binary

require 'base64'
require 'sinatra'

module Httpng
  class App < Sinatra::Base
    ##############################################################################
    #
    # Routes
    #
    ##############################################################################

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
        return "No file found at: #{settings.public_folder}#{request.path_info}"
      end
    end
  end
end
