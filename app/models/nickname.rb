class Nickname < ApplicationRecord
  belongs_to :team

  scope :with_league, ->(league) { where(league: league.downcase) if league.present?}
end
