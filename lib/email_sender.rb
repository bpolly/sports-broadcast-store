module EmailSender
  class << self
    def send_activation(to: 'bpolly6@gmail.com')
      response = client.mail._("send").post(request_body: body(to: to))
      puts response.status_code
      puts response.body
      puts response.parsed_body
      puts response.headers
    end

    def client
      @client ||= SendGrid::API.new(api_key: ENV['SENDGRID_API_KEY']).client
    end

    def body(to:)
      {
        personalizations: [
          {
            to: [
              { email: "#{to}" }
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
            value: "Welcome to Sportcasts! Please verify your email by clicking the following link"
          }
        ]
      }
    end
  end
end
