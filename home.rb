require 'sinatra'
require "execjs"
require 'v8'

get '/' do
  haml :index
end