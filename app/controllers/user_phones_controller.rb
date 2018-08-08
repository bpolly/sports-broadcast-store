class UserPhonesController < ApplicationController
  protect_from_forgery with: :null_session

  def create
    return unless current_user && current_user.id != params[:user_id]
    user_phone = current_user.phones.new(user_phone_params)
    if user_phone.save
      render json: user_phone, status: :created
    else
      render json: user_phone.errors, status: :bad
    end
  end

  def verify
    # binding.pry
    return unless current_user && current_user.id == params[:user_id].to_i
    user_phone = current_user.phones.find(params[:id])
    if user_phone.verify_phone(params[:verification_code])
      render json: user_phone, status: :created
    else
      render json: user_phone.errors, status: :bad
    end
  end

  private

  def user_phone_params
    params.require(:user_phone).permit(:number)
  end
end
