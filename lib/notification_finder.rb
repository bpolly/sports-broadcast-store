module NotificationFinder
  def self.games_in(minutes:)
    Game.where(date: Time.zone.now ... Time.zone.now + minutes.minutes)
  end

  def self.teams_playing_in(minutes: 10)
    Team.where(id: games_in(minutes: (minutes || 10)).map(&:teams).flatten).distinct
  end
end
