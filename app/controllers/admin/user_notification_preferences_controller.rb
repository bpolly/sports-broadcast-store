class Admin::UserNotificationPreferencesController < AdminController
  protect_from_forgery with: :null_session
  skip_before_action :verify_authenticity_token

  def index
    render json: UserNotificationPreference.all, status: :ok
  end

  def upcoming_notifications
    render json: upcoming_games_with_notifications, status: :ok
  end

  private

  def minute_threshold
    params[:minute_threshold].try(:to_i)
  end

  def upcoming_games_with_notifications
    NotificationFinder
      .games_in(minutes: minute_threshold)
      .includes(:home_team, :away_team).order(:date)
      .map do |game|
        GameSerializer.new(game).serializable_hash.merge(
          'notifications' => game
                              .user_notifications(limit: user_notification_limit)
                              .map do |notification|
                                UserNotificationPreferenceSerializer.new(notification).serializable_hash
                              end
        )
    end.group_by{ |g| g[:date].to_date.to_s(:db)}
  end

  def user_notification_limit
    10
  end
end
