FactoryBot.define do
  factory :team do
    sequence(:name) { |n| "Team #{n}" }
    league { ['nba', 'nfl', 'mlb'].sample }

    after :create do |team|
      team.nicknames.find_or_create_by(name: ('a'..'z').to_a.shuffle[0,8].join)
    end

    trait :nba do
      league { 'nba' }
    end

    trait :nfl do
      league { 'nfl' }
    end
  end # factory :team
end # FactoryBot.define
