class UserNotificationPreference < ApplicationRecord
  belongs_to :user
  belongs_to :team
  belongs_to :user_phone
  belongs_to :user_email
  validates :team_id, presence: true
  validates :callback_url, url: { allow_nil: true, no_local: true  }
  validate :all_are_not_blank

  scope :sms, -> { where.not(user_phone: nil) }

  private

  def all_are_not_blank
    errors.add(:all_fields, 'must not be blank') unless user_phone || user_email || callback_url
  end
end
