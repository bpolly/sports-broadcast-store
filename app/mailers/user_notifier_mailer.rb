class UserNotifierMailer < ActionMailer::Base
  default :from => 'support@sportcasts.io'

  def send_signup_email(user:)
    @user = user
    @verification_url = verification_url(user_email: user.user_email)
    mail( :to => @user.email.address,
    :subject => 'Sportcasts - Verify your account' )
  end

  private

  def verification_url(user_email:)
    host = Rails.env.development? ? 'http://localhost:3005' : 'http://sportcasts.com'
    "#{host}/verify?email_address=#{user_email.address}&code=#{user_email.verification_code}"
  end
end
