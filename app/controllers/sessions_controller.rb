class SessionsController < ApplicationController
  protect_from_forgery with: :null_session

  def create
    user = UserEmail.find_by(address: params[:user][:email].downcase).try(:user)
    if user && user.authenticate(params[:user][:password])
      if user.email.verified?
        token = JsonWebToken.encode(login_jwt_payload(user))
        render json: {
          access_token: token,
          message: 'Login Successful'
        }
      else
        render json: { message: email_not_verified_message }, status: :forbidden
      end
    else
      render json: { message: invalid_credentials_message }, status: :unauthorized
    end
  end

  private

  def login_jwt_payload(user)
    {
      user_id: user.id,
      user_email: user.email.address,
      admin: user.admin?,
      email_verified: user.email.verified?
    }
  end

  def invalid_credentials_message
    'Please enter a valid email and password'
  end

  def email_not_verified_message
    'Login successful - however this email has not been verified yet.'
  end
end
