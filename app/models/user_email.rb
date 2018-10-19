class UserEmail < ApplicationRecord
  belongs_to :user
  has_many :user_notification_preferences
  validates :address, presence: true, uniqueness: true
  before_create :generate_verification_code
  after_create :send_verification_code

  CODE_EXPIRATION_LIMIT = 1.hour

  scope :unverified, -> { where(verified_at: nil) }

  def verify(user_supplied_code)
    if(verified_at.present?)
      errors.add(:email, 'already verified.')
    elsif(user_supplied_code.blank? || user_supplied_code.upcase != verification_code.upcase)
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
    generate_verification_code
    save
    send_verification_code
  end

  private

  def generate_verification_code
    assign_attributes(verification_code: SecureRandom.hex[0..3].upcase, last_code_generated_at: DateTime.now)
  end

  def send_verification_code
    ::UserNotifierMailer.send_signup_email(user: user).deliver_now
  end
end
