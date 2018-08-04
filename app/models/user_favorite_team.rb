class UserFavoriteTeam < ApplicationRecord
  belongs_to :user
  belongs_to :team

  delegate :slug, to: :team, prefix: true
end
