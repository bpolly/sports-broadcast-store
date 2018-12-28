 class Game < ApplicationRecord
  belongs_to :away_team, class_name: 'Team', foreign_key: 'away_team_id'
  belongs_to :home_team, class_name: 'Team', foreign_key: 'home_team_id'
  validates :home_team, presence: true
  validates :away_team, presence: true

  # Team.mlb, Team.nfl,...
  [:mlb, :nfl, :nhl, :nba].each do |league|
    scope league, -> { where(league: league) }
  end

  # scope :today, -> { where(date: Date.today..Date.today+1)}
  scope :with_teams, ->(teams) { where("home_team_id IN (?) OR away_team_id IN (?)", teams.map(&:id), teams.map(&:id)) if teams.present?}
  scope :with_team, ->(team) { where("home_team_id = ? OR away_team_id = ?", team.id, team.id) if team.present?}
  scope :with_date, ->(date) { where("date >= ? AND date <= ? OR date = ?", date - 1.hour, date + 1.hour, date) if date.present?}
  scope :today, -> { where("date >= ? AND date <= ?", Time.parse('12:00am ET'), Time.parse('11:59pm ET'))}
  scope :today_and_tomorrow, -> { where("date >= ? AND date <= ?", Time.parse('12:00am ET'), Time.parse('11:59pm ET') + 1.day)}
  scope :tomorrow, -> { where("date >= ? AND date <= ?", Time.parse('12:00am ET') + 1.day, Time.parse('11:59pm ET') + 1.day)}
  #scope :with_date, ->(date) { where("date.in_time_zone('Eastern Time (US & Canada)') = ? OR date.in_time_zone('Eastern Time (US & Canada)') = ? OR date.in_time_zone('Eastern Time (US & Canada)') = ?", date - 1.hour, date, date + 1.hour) if date.present?}

  scope :with_date_no_time, ->(date) { where(date: date.beginning_of_day+5.hours...date.beginning_of_day+1.day+5.hours) if date.present?}
  scope :with_league, ->(league) { where(league: league.downcase) if league.present?}
  scope :with_network, ->(network) { where(tv_networks: network.downcase) if network.present?}

  def teams
    [home_team, away_team]
  end

  def user_notifications(limit: 10)
    UserNotificationPreference.where("team_id in (?)", teams).first(limit)
  end
end
