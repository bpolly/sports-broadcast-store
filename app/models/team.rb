class Team < ActiveRecord::Base
  has_many :nicknames
  has_many :games
  LEAGUES = ["nba","nfl", "mlb", "nhl"]
  validates :name, presence: true, uniqueness: true
  validates :league, presence: true

  # Team.mlb, Team.nfl,...
  [:mlb, :nfl, :nhl, :nba].each do |league|
    scope league, -> { where(league: league) }
  end

  def games
    Game.where("home_team_id = ? OR away_team_id = ?", self.id, self.id)
  end

  def self.find_given_nickname(nickname)
    Nickname.includes(:team).where(name: nickname).map {|n| n.team}.compact
  end

  def self.find_given_nickname_and_league(nickname, league)
    Nickname.joins(:team).where(name: nickname).where(:teams => { :league => league }).map {|n| n.team}.compact
    #Nickname.includes(:team).where(name: nickname).map {|n| n.team}
  end

  def sport
    case(self.slug[0..2])
    when "mlb"
      "baseball"
    when "nhl"
      "hockey"
    when "nba"
      "basketball"
    when "nfl"
      "football"
    else
      "unknown"
    end
  end

  def self.excluded_teams_from_scraper
    teams = []
    teams << Team.find_by(name: "dallas mavericks")
    teams << Team.find_by(name: "detroit pistons")
    teams << Team.find_by(name: "los angeles clippers")
    teams << Team.find_by(name: "golden state warriors")
    teams << Team.find_by(name: "memphis grizzlies")
    teams << Team.find_by(name: "new orleans pelicans")
    teams
  end

  def schedule
    games.where('date > ?', '2016-10-24 00:00:00').sort_by(&:date)
  end
end
