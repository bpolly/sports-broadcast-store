class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :set_human_tv_network_list

  def set_human_tv_network_list
    @human_tv_network_list ||= JSON.parse(File.read('lib/networkList.json'))
  end
end
