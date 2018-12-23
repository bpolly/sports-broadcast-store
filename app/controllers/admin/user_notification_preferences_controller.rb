class Admin::UserNotificationPreferencesController < ApplicationController
  protect_from_forgery with: :null_session
  skip_before_action :verify_authenticity_token

  def index
    render json: UserNotificationPreference.all, status: :ok
  end

  def upcoming_notifications
    render json: UserNotificationPreference.joins(:team).where(
      team: NotificationFinder.teams_playing_in(minutes: minute_threshold)).limit(1000), status: :ok
  end

  private

  def minute_threshold
    params[:minute_threshold].try(:to_i)
  end
end
