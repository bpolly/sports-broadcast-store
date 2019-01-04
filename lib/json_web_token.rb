class JsonWebToken
  def self.encode(payload)
    # set token expiration time
    payload[:exp] = 1.day.from_now.to_i
    JWT.encode(payload, Rails.application.secret_key_base)
  end

  def self.decode(token)
    body = JWT.decode(token, Rails.application.secret_key_base)[0]
    HashWithIndifferentAccess.new body

  # raise custom error to be handled by custom handler
  rescue StandardError
    nil
  end
end
