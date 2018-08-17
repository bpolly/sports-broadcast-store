class SessionsController < ApplicationController
  protect_from_forgery with: :null_session

  def create
    user = User.find_by(email: params[:user][:email].downcase)
    if user && user.authenticate(params[:user][:password])
      token = JsonWebToken.encode(login_jwt_payload(user))
      render json: {
        access_token: token,
        message: 'Login Successful'
      }

    else
      message = 'Please enter a valid email and password'
      render json: { message: message }, status: :unauthorized
    end
  end

  private

  def login_jwt_payload(user)
    {
      user_id: user.id,
      user_email: user.email
    }
  end

end
