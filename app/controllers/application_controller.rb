class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :set_human_tv_network_list
  rescue_from ActiveRecord::RecordNotFound, :with => :not_found

  def set_human_tv_network_list
    @human_tv_network_list ||= JSON.parse(File.read('lib/networkList.json'))
  end

  def current_user
    ApiRequestAuthorizer.new(request.headers).get_user
  end

  def not_found(_e)
    render json: _e.to_s, status: :not_found
  end
end
