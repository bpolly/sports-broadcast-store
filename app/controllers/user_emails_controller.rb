class UserEmailsController < ApplicationController
  protect_from_forgery with: :null_session
  skip_before_action :verify_authenticity_token

  def show
    return unless current_user && current_user.id == params[:user_id].to_i
    if current_user.email
      render json: current_user.email, status: :ok
    else
      render json: {}, status: :ok
    end
  end

  def verify
    user_email = UserEmail.find_by!(address: params[:email_address])
    if user_email.verify(params[:verification_code])
      render json: user_email, status: :created
    else
      render json: user_email.errors.full_messages, status: :bad
    end
  end

  def resend_verification_code
    user_email = UserEmail.find_by!(address: params[:email_address])
    if user_email.generate_new_verification_code
      head :ok
    else
      render json: user_email.errors.full_messages, status: :bad
    end
  end

  private

  def user_email_params
    params.require(:user_email).permit(:address)
  end
end
