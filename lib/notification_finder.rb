module NotificationFinder
  def self.games_in(minutes: 10)
    Game.where(date: Time.zone.now ... Time.zone.now + minutes.minutes)
  end

  def self.teams_playing_in(minutes: 10)
    Team.where(id: games_in(minutes: minutes).map(&:teams).flatten).distinct
  end
end


# Game.each do
#   preferences_for_those_teams.each do
#
#   end
# end
#
# # find games in next 10 minutes
# # for each game
# #   find the notification preferences that will need to go out for each game
#
# games_in(minutes: 350).count
#
# NotificationFinder.games_in(minutes: 350).map do |game|
#   game.serializable_hash.merge('notifications' => game.user_notifications.map(&:serializable_hash))
# end
