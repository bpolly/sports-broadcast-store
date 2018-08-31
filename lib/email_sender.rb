module EmailSender
  class << self
    def send_activation(user_email:)
      response = client.mail._("send").post(request_body: whole_email(to: user_email.address))
      puts response.status_code
      puts response.body
      puts response.parsed_body
      puts response.headers
    end

    def client
      @client ||= SendGrid::API.new(api_key: ENV['SENDGRID_API_KEY']).client
    end

    private

    def whole_email(user_email:)
      {
        personalizations: [
          {
            to: [
              { email: "#{user_email.address}" }
            ],
            subject: "Sportcasts - Verify your account"
          }
        ],
        from: {
          email: "support@sportcasts.io"
        },
        content: [
          {
            type: "text/plain",
            value: body_text(user_email: user_email)
          }
        ]
      }
    end

    def verification_url(user_email:)
      host = Rails.env == 'development?' ? 'localhost:3005' : 'sportcasts.com'
      "#{host}/verify?email_address=#{user_email.address}&code=#{user_email.verification_code}"
    end

    def body_text(user_email:)
      <<~EOF
      Welcome to Sportcasts! Please verify your email by clicking the following link:\n
      #{verification_url(user_email: user_email)}
      EOF
    end
  end
end
