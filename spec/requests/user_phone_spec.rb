require 'rails_helper'

RSpec.describe 'user phone number', type: :request do
  describe 'GET /users/:id/phone' do
    let(:user) { FactoryBot.create(:user) }

    context 'when there there is no current user' do
      it 'returns an empty array' do
        get "/users/#{user.id}/phone", xhr: true
        expect(JSON.parse(response.body)).to eq([])
      end
    end

    context 'when there is a current user' do
      let(:team) { Team.all.sample }

      context 'when the user has a phone number' do
        before do
          FactoryBot.create(:user_phone, user: user)
        end

        it 'returns their associated phone record' do
          get "/users/#{user.id}/phone", headers: auth_header(user: user), xhr: true
          expect(JSON.parse(response.body)).to include(
            'number' => user.phone.number,
            'user_id' => user.id,
            'last_code_generated_at' => anything,
            'verified_at' => anything,
            'verified' => anything
          )
        end
      end

      context 'when the user does not have a phone number' do
        it 'returns nil' do
          get "/users/#{user.id}/phone", headers: auth_header(user: user), xhr: true
          expect(JSON.parse(response.body)).to eq(nil)
        end
      end
    end
  end
end
