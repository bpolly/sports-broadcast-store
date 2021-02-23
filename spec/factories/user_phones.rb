FactoryBot.define do
  factory :user_phone do
    number { "1234567890" }
    verified_at { nil }
    verification_code { "MyString" }
  end
end
