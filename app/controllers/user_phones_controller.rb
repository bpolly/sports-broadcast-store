class UserPhonesController < ApplicationController
  protect_from_forgery with: :null_session

  def create
    user = User.find(params[:user_id])
    user_phone = user.phones.new(user_phone_params)
    if user_phone.save
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
