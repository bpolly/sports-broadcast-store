class Game < ActiveRecord::Base
  belongs_to :away_team, class_name: 'Team', foreign_key: 'away_team_id'
  belongs_to :home_team, class_name: 'Team', foreign_key: 'home_team_id'

  # Team.mlb, Team.nfl,...
  [:mlb, :nfl, :nhl, :nba].each do |league|
    scope league, -> { where(league: league) }
  end

  scope :today, -> { where(date: Date.today..Date.today+1)}
  scope :with_teams, ->(teams) { where("home_team_id IN (?) OR away_team_id IN (?)", teams.map(&:id), teams.map(&:id)) if teams.present?}
  scope :with_team, ->(team) { where("home_team_id = ? OR away_team_id = ?", team.id, team.id) if team.present?}
  scope :with_date, ->(date) { where("date = ? OR date = ? OR date = ?", date - 1.hour, date, date + 1.hour) if date.present?}
  scope :with_date_no_time, ->(date) { where(date: date.beginning_of_day...date.beginning_of_day+1) if date.present?}
  scope :with_league, ->(league) { where(league: league.downcase) if league.present?}
  scope :with_network, ->(network) { where(network: network.downcase) if network.present?}

  def teams
    [home_team, away_team]
  end
end
