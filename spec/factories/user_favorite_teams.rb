FactoryBot.define do
  factory :user_favorite_team do
    user { nil }
    team { Team.all.sample }
    deleted { false }
  end
end
