module NotificationSender
  class << self
    def send_sms_notifications
      UserNotificationPreference.where(team: NotificationFinder.teams_playing_in(minutes: 10)).sms.each do |preference|
        TwilioClient.send_sms(to: preference.phone, body: sms_body(preference))
      end
    end

    def sms_body(preference)
      game = NotificationFinder.games_in(minutes: 10).with_team(preference.team).first
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
end
