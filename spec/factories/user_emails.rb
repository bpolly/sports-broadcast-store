FactoryBot.define do
  factory :user_email do
    email_address "MyString"
    verification_code "MyString"
    user nil
    last_code_generated_at "2018-08-13 08:24:22"
    verified_at "2018-08-13 08:24:22"
  end
end
