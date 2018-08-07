FactoryBot.define do
  factory :user_phone do
    number "MyString"
    verified false
    verification_code "MyString"
    user nil
  end
end
