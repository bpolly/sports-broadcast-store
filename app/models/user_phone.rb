class UserPhone < ApplicationRecord
  belongs_to :user
  validates :number, presence: true,
                    numericality: true,
                    length: { minimum: 10, maximum: 15 }
  before_create :generate_verification_code
  before_save :strip_non_numbers
  after_create :send_verification_code
  after_destroy :update_notification_preferences

  CODE_EXPIRATION_LIMIT = 1.hour

  scope :unverified, -> { where(verified_at: nil) }

  def verify(user_supplied_code)
    if (user_supplied_code.blank? || user_supplied_code.upcase != verification_code.upcase)
      errors.add(:verification_code, 'does not match.')
    elsif(last_code_generated_at < CODE_EXPIRATION_LIMIT.ago)
      errors.add(:verification_code, 'expired. Please request a new one.')
    end
    return false if errors.any?
    update(verified_at: DateTime.now)
  end

  def verified?
    verified_at.present?
  end

  def generate_new_verification_code
    if(last_code_generated_at > 5.minutes.ago)
      errors.add(:throttle_activated, 'You must wait at least 5 minutes in between resends')
      return false
    end
    generate_verification_code
    save
    send_verification_code
  end

  private

  def generate_verification_code
    assign_attributes(verification_code: SecureRandom.hex[0..3].upcase, last_code_generated_at: DateTime.now)
  end

  def strip_non_numbers
    assign_attributes(number: self.number.gsub(/\D/, ''))
  end

  def send_verification_code
    TwilioClient.send_sms(to: number, body: "Your Sportcasts verification code is #{verification_code}")
  end

  def update_notification_preferences
    user.notification_preferences.update(phone: false)
  end
end
