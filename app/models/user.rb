class User < ApplicationRecord
  validates_presence_of :password_digest
  has_many :user_notification_preferences, dependent: :destroy
  has_many :user_favorite_teams, dependent: :destroy
  has_many :teams, through: :user_favorite_teams
  has_one :user_phone, dependent: :destroy
  alias_attribute :phone, :user_phone
  has_one :user_email, dependent: :destroy
  alias_attribute :email, :user_email
  alias_attribute :notification_preferences, :user_notification_preferences
  has_secure_password

  accepts_nested_attributes_for :user_email
end
