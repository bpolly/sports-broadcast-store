class Admin::UsersController < AdminController
  protect_from_forgery with: :null_session

  def index
    render json: User.includes(:user_email, :user_type, :user_email, :user_phone).all
  end
end
