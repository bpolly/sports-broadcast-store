FactoryBot.define do
  factory :user_notification_preference do
    user
    team { Team.all.sample }
    callback_url { nil }
    email { true }
    phone { false }
  end
end
