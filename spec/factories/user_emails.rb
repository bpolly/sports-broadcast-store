FactoryBot.define do
  factory :user_email do
    address { "MyString" }
    verified_at { "2018-08-17 14:11:28" }
    verification_code { "MyString" }
    user { nil }
    last_code_generated_at { "2018-08-17 14:11:28" }
  end
end
