class UserPhonesController < ApplicationController
  protect_from_forgery with: :null_session
  skip_before_action :verify_authenticity_token
  before_action :logged_in, except: [:resend_verification_code]

  def show
    return unless current_user && current_user.id == params[:user_id].to_i
    if current_user.phone
      render json: current_user.phone, status: :ok
    else
      render json: {}, status: :ok
    end
  end

  def create
    return unless current_user && current_user.id == params[:user_id].to_i
    user_phone = UserPhone.new(user_phone_params)
    current_user.phone = user_phone
    if user_phone.save
      render json: user_phone, status: :created
    else
      render json: user_phone.errors, status: :bad_request
    end
  end

  def verify
    return unless current_user && current_user.id == params[:user_id].to_i
    user_phone = current_user.phone
    if user_phone.verify(params[:verification_code])
      render json: user_phone, status: :created
    else
      render json: user_phone.errors.full_messages, status: :bad_request
    end
  end

  def destroy
    return unless current_user && current_user.id == params[:user_id].to_i
    user_phone = current_user.phone
    if user_phone.destroy
      head :ok
    else
      render json: user_phone.errors, status: :bad_request
    end
  end

  def resend_verification_code
    return unless current_user && current_user.id == params[:user_id].to_i
    user_phone = current_user.phone
    if user_phone.generate_new_verification_code
      head :ok
    else
      render json: user_phone.errors, status: :bad_request
    end
  end

  private

  def user_phone_params
    params.require(:user_phone).permit(:number)
  end

  def logged_in
    return if current_user.present?

    render json: {}, status: 401
  end
end
