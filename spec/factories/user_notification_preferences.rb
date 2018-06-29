FactoryBot.define do
  factory :user_notification_preference do
    user nil
    team nil
    phone 1
    callback_url "MyString"
    email "MyString"
  end
end
