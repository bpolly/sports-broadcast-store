class User < ApplicationRecord
  validates_presence_of :email, :password_digest
  validates :email, uniqueness: true
  has_many :user_notification_preferences
  has_many :user_favorite_teams
  has_many :teams, through: :user_favorite_teams
  has_secure_password
end
