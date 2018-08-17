module NotificationSender
  class << self
    def send_sms_notifications
      UserNotificationPreference.where(team: teams_playing_in_next_ten_minutes).sms.each do |preference|
        TwilioClient.send_sms(to: preference.phone, body: sms_body(preference))
      end
    end

    def games_in_next_ten_minutes
      Game.where(date: Time.zone.now ... Time.zone.now + 10.minutes)
    end

    def teams_playing_in_next_ten_minutes
      Team.where(id: games_in_next_ten_minutes.map(&:teams).flatten).distinct
    end

    def sms_body(preference)
      game = games_in_next_ten_minutes.with_team(preference.team).first
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
