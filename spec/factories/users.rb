FactoryBot.define do
  factory :user do
    user_type { UserType.regular }
    password_digest { 'myPass' }
    
    after(:create) do |user, _evaluator|
      FactoryBot.create(:user_email, user: user)
    end
  end
end
