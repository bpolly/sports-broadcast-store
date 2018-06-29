class User < ApplicationRecord
  validates_presence_of :email, :password_digest
  validates :email, uniqueness: true
  has_many :user_notification_preferences
  has_secure_password
end
