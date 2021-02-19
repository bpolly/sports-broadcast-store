require 'rails_helper'

RSpec.describe 'user notification preferences', type: :request do
  describe 'GET /user_notification_preferences' do
    let(:user) { create(:user) }

    context 'when there there is no current user' do
      it 'returns a 401' do
        get '/user_notification_preferences', xhr: true
        expect(response).to have_http_status(401)
      end
    end

    context 'when there is a current user' do
      let!(:existing_pref) { create(:user_notification_preference, user: user) }

      it 'returns their associated notification_preferences' do
        get '/user_notification_preferences', headers: auth_header(user: user), xhr: true
        expect(JSON.parse(response.body).length).to eq(1)
        expect(JSON.parse(response.body).first).to include(
          'phone'      => existing_pref.phone,
          'email'      => existing_pref.email,
          'team'       => anything,
          'created_at' => anything,
          'updated_at' => anything
        )
      end
    end
  end
end
