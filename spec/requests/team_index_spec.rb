require 'rails_helper'

RSpec.describe 'teams index', type: :request do
  describe 'GET /teams' do
    before { get '/teams', xhr: true }

    it 'returns a list of all teams' do
      expect(JSON.parse(response.body).length).to equal(Team.count)
    end

    it 'has the correct format' do
      az_team = JSON.parse(response.body).find { |b| b['name'] == "arizona diamondbacks" }
      expect(az_team).to include(
        'name' => 'arizona diamondbacks',
        'league' => 'mlb',
        'created_at' => anything,
        'updated_at' => anything,
        'slug' => 'mlb-ari',
        'timezone' => 'mst',
        'nbc_team_id' => anything,
        'id' => anything
      )
    end
  end
end
