require 'rails_helper'

RSpec.describe 'user phone number', type: :request do
  describe 'GET /users/:id/phone' do
    let(:user) { create(:user) }

    context 'when there there is no current user' do
      it 'returns a 401' do
        get "/users/#{user.id}/phone", xhr: true
        expect(response).to have_http_status(401)
      end
    end

    context 'when there is a current user' do
      context 'when the user has a phone number' do
        before do
          create(:user_phone, user: user)
        end

        it 'returns their associated phone record' do
          get "/users/#{user.id}/phone", headers: auth_header(user: user), xhr: true
          expect(JSON.parse(response.body)).to include(
            'number'                 => user.phone.number,
            'user_id'                => user.id,
            'verified_at'            => anything,
            'verified'               => anything,
            'last_code_generated_at' => anything
          )
        end
      end

      context 'when the user does not have a phone number' do
        it 'returns an empty object' do
          get "/users/#{user.id}/phone", headers: auth_header(user: user), xhr: true
          expect(JSON.parse(response.body)).to eq({})
        end
      end
    end
  end
end
