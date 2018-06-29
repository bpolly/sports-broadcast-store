class UserNotificationPreferencesController < ApplicationController
  protect_from_forgery with: :null_session

  def index
    if current_user
      render json: current_user.user_notification_preferences, status: :ok
    else
      render json: { message: 'Cannot find user' }, status: :not_found
    end
  end

  def create
    return unless current_user
    preference = current_user.user_notification_preferences.new(notification_params)
    if preference.save
      head :created
    else
      render json: { message: preference.errors.full_messages }, status: :unauthorized
    end
  end

  private

  def notification_params
    given_params = params[:user_notification_preference].reject {|_, v| v.blank? }
    {
      team: Team.find_by(slug: given_params[:team_slug]),
      callback_url: given_params[:callback_url],
      phone: given_params[:phone],
      email: given_params[:email],
    }
  end
end
