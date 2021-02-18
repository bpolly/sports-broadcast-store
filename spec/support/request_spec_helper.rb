module RequestSpecHelper
  def auth_header(user:)
    { 'Authorization' => "Bearer #{JsonWebToken.encode(login_jwt_payload(user: user))}" }
  end

  def login_jwt_payload(user:)
    {
      user_id:        user.id,
      user_email:     user.email.address,
      admin:          user.admin?,
      email_verified: user.email.verified?
    }
  end

end
