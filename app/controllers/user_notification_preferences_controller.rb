class UserNotificationPreferencesController < ApplicationController
  protect_from_forgery with: :null_session
  skip_before_action :verify_authenticity_token

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
      render json: preference, status: :ok
    else
      render json: { message: preference.errors.full_messages }, status: :unauthorized
    end
  end

  def update
    return unless current_user
    preference = current_user.user_notification_preferences.find(params[:id])
    if preference.update(notification_params)
      render json: preference.reload, status: :ok
    else
      render json: { message: 'Error updating preference' }, status: :internal_server_error
    end
  end

  def destroy
    return unless current_user
    preference = current_user.user_notification_preferences.find(params[:id])
    if preference.destroy
      head :ok
    else
      render json: { message: 'Error deleting preference'}, status: :internal_server_error
    end
  end

  private

  def notification_params
    given_params = params[:user_notification_preference].reject {|_, v| v.blank? }
    {
      team_id: Team.find_by(slug: params[:team_slug]).try(&:id),
      callback_url: given_params[:callback_url],
      user_phone_id: given_params[:user_phone_id],
      email: given_params[:email],
    }
  end
end
