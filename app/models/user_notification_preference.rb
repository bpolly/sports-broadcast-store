class UserNotificationPreference < ApplicationRecord
  belongs_to :user
  belongs_to :team
  validates :team_id, presence: true
  validates :callback_url, url: { allow_nil: true, no_local: true  }
  validate :all_are_not_blank

  private

  def all_are_not_blank
    errors.add(:all_fields, 'must not be blank') unless phone || email || callback_url
  end
end
