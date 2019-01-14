class UserNotifierMailer < ActionMailer::Base
  default :from => 'support@sportcasts.io'

  def send_signup_email(user:)
    @user = user
    @verification_url = verification_url(user_email: user.user_email)
    mail( :to => @user.email.address,
    :subject => 'Sportcasts - Verify your account' )
  end

  def send_game_notification(preference:, minutes:)
    @game = NotificationFinder.games_in(minutes: minutes).with_team(preference.team).first
    @home_team = @game.home_team
    @away_team = @game.away_team
    @unsubscribe_url = unsubscribe_url(preference: preference)
    mail( :to => preference.user.email.address,
    :subject => 'Sportcasts - Game Notification' )
  end

  private

  def verification_url(user_email:)
    "#{host_url}/verify?email_address=#{user_email.address}&code=#{user_email.verification_code}"
  end

  def unsubscribe_url(preference:)
    email_address = preference.user.email.address
    "#{host_url}/unsubscribe?email_address=#{email_address}&preference=#{preference.id}"
  end

  def host_url
    Rails.env.development? ? 'http://localhost:3005' : 'http://sportcasts.io'
  end
end
