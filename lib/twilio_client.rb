module TwilioClient
  ACCOUNT_SID = ENV['TWILIO_ACCOUNT_SID']
  AUTH_TOKEN = ENV['TWILIO_AUTH_TOKEN']
  FROM_PHONE_NUMBER = ENV['TWILIO_PHONE']

  class << self
    def send_sms(to:, body:)
      client = Twilio::REST::Client.new ACCOUNT_SID, AUTH_TOKEN
      # message = client.messages.create(
      #     body: body,
      #     to: to,
      #     from: FROM_PHONE_NUMBER)
      # puts message.sid
    end
  end
end
