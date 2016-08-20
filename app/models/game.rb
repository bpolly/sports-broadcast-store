class Game < ActiveRecord::Base
  belongs_to :away_team, class_name: 'Team', foreign_key: 'away_team_id'
  belongs_to :home_team, class_name: 'Team', foreign_key: 'home_team_id'

  # Team.mlb, Team.nfl,...
  [:mlb, :nfl, :nhl, :nba].each do |league|
    scope league, -> { where(league: league) }
  end

  scope :today, -> { where(date: Date.today..Date.today+1)}
  scope :with_team, ->(team) { where("home_team_id = ? OR away_team_id = ?", team.id, team.id) if team.present?}
  scope :with_date, ->(date) { where(date: date..date+1) if date.present?}


  def teams
    [home_team, away_team]
  end
end
