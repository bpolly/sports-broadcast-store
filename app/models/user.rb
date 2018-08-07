class User < ApplicationRecord
  validates_presence_of :email, :password_digest
  validates :email, uniqueness: true
  has_many :user_notification_preferences, dependent: :destroy
  has_many :user_favorite_teams, dependent: :destroy
  has_many :teams, through: :user_favorite_teams
  has_many :user_phones
  alias_attribute :notification_preferences, :user_notification_preferences
  alias_attribute :phones, :user_phones
  has_secure_password
end
