class SessionsController < ApplicationController
  protect_from_forgery with: :null_session

  def create
    # binding.pry
    user = User.find_by(email: params[:user][:email].downcase)
    if user && user.authenticate(params[:user][:password])
      token = JsonWebToken.encode({ user_id: user.id })
      render json: {
        access_token: token,
        message: 'Login Successful'
      }

    else
      render json: @user.errors, status: :bad
    end
  end

end
