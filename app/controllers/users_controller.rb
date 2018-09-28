class UsersController < ApplicationController
  protect_from_forgery with: :null_session

  def create
    user = User.new(user_params)
    if email_not_unique? # TODO: there's probably a much better place for this check ¯\_(ツ)_/¯ 
      render json: ["Email is already taken"], status: :bad
    elsif user.save
      response = { message: 'User created successfully'}
      render json: response, status: :created
    else
      render json: user.errors.full_messages, status: :bad
    end
  end

  private

  def user_params
    params.require(:user).permit(
        :password,
        :password_confirmation,
        user_email_attributes: [:address]
      )
  end

  def email_not_unique?
    UserEmail.where(address: user_params.dig(:user_email_attributes, :address)).exists?
  end
end
