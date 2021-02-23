require 'rails_helper'

RSpec.describe 'user favorite teams', type: :request do
  describe 'GET /user_favorite_teams' do

    context 'when there there is no current user' do
      it 'returns an empty array' do
        get '/user_favorite_teams', xhr: true
        expect(JSON.parse(response.body)).to eq([])
      end
    end

    context 'when there is a current user' do
      let(:user) { create(:user) }
      let(:team) { Team.all.sample }

      before do
        user.user_favorite_teams.create(team: team)
      end

      it 'returns a JSON list of their favorite teams' do
        get '/user_favorite_teams', headers: auth_header(user: user), xhr: true
        expect(JSON.parse(response.body).length).to eq(1)
        expect(JSON.parse(response.body).first['slug']).to eq(team.slug)
      end
    end
  end
end
