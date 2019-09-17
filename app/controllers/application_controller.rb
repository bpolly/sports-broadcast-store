class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  rescue_from ActiveRecord::RecordNotFound, :with => :not_found
  before_action :require_verified_email

  def current_user
    ApiRequestAuthorizer.new(request.headers).get_user
  end

  def require_authorization

  end

  def not_found(_e)
    render json: _e.to_s, status: :not_found
  end

  def fallback_index_html
    render :file => 'public/index.html'
  end

  private

  def require_verified_email
    head :forbidden unless current_user.try(:verified?)
  end
end
