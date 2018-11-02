class AdminController < ApplicationController
  protect_from_forgery with: :null_session
  before_action :require_admin_privileges

  private

  def require_admin_privileges
    head :forbidden unless current_user.try(:admin?)
  end
end
