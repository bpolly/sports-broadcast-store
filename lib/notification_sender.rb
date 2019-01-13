class NotificationSender
  attr_reader :minutes

  def initialize(minutes = 10)
    @minutes = minutes.to_i
  end

  def self.send_sms_notifications(minutes)
    new(minutes).send_sms_notifications
  end

  def send_sms_notifications
    sms_twilio_ids = []
    preferences_for_teams_playing.sms.each do |preference|
      sms_twilio_ids << TwilioClient.send_sms(to: preference.user_phone.number, body: sms_body(preference))
    end
    puts sms_twilio_ids.length
  end

  def send_email_notifications
    email_ids = []
    preferences_for_teams_playing.email.each do |preference|
      email_ids << UserNotifierMailer.send_signup_email(user: user).deliver_now
    end
    puts email_ids.length
  end

  def preferences_for_teams_playing
    UserNotificationPreference.where(team: NotificationFinder.teams_playing_in(minutes: minutes))
  end

  private

  def sms_body(preference)
    game = NotificationFinder.games_in(minutes: minutes).with_team(preference.team).first
    home_team = game.home_team
    away_team = game.away_team

    <<~HEREDOC
      #{emoji_by_league(game.league)}  #{away_team.name.titleize} @ #{home_team.name.titleize}
      🕔  #{game.date.in_time_zone("Eastern Time (US & Canada)").strftime("%-l:%M%P")} ET
      📺  #{game.tv_networks.split(",").map(&:strip).map(&:upcase).to_sentence}

      Visit sportcasts.io to configure your team notifications.
      Reply STOP to stop receiving these alerts.
    HEREDOC
  end

  def emoji_by_league(league)
    case(league)
    when 'nfl'
      '🏈'
    when 'nba'
      '🏀'
    when 'mlb'
      '⚾'
    end
  end
end
