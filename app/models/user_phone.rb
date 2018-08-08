class UserPhone < ApplicationRecord
  belongs_to :user
  validates :number, presence: true,
                    numericality: true,
                    length: { minimum: 10, maximum: 15 }
  before_create :generate_verification_code
  before_save :strip_non_numbers
  after_create :send_verification_code

  CODE_EXPIRATION_LIMIT = 1.hour

  scope :active, -> { where(deleted_at: nil) }
  scope :unverified, -> { where(verified_at: nil) }

  def verify_phone(user_supplied_code)
    return false if (
                      user_supplied_code.blank? ||
                      last_code_generated_at < CODE_EXPIRATION_LIMIT.ago ||
                      user_supplied_code.upcase != verification_code.upcase
                    )
    update(verified_at: DateTime.now)
  end

  def soft_destroy
    update(deleted_at: DateTime.now)
  end

  def verified?
    verified_at.present?
  end

  def deleted?
    verified_at.present?
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
end
