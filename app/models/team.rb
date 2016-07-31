class Team < ActiveRecord::Base
  has_many :nicknames
  LEAGUES = ["nba","nfl", "mlb", "nhl"]

  [:mlb, :nfl, :nhl, :nba].each do |league|
    scope league, -> { where(league: league) }
  end

  def self.find_teams_given_nickname(nickname)
    Nickname.includes(:team).where(name: nickname).map {|n| n.team}
  end

  def self.find_teams_given_nickname(nickname, league)
    Nickname.joins(:team).where(name: nickname).where(:teams => { :league => league }).map {|n| n.team}
    #Nickname.includes(:team).where(name: nickname).map {|n| n.team}
  end
end
