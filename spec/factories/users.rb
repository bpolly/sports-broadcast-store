FactoryBot.define do
  factory :user do
    user_email
    password_digest { "MyString" }

    trait :with_verified_email do
      after :create do |user, _e|
        create(:user_email, :verified, user: user)
      end
    end
  end
end
