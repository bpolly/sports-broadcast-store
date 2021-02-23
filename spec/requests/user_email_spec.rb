require 'rails_helper'

RSpec.describe 'user email address', type: :request do
  describe 'GET /users/:id/email' do
    let(:user) { create(:user) }

    context 'when there there is no current user' do
      it 'returns a 401' do
        get "/users/#{user.id}/email", xhr: true
        expect(response).to have_http_status(401)
      end
    end

    context 'when there is a current user' do
      it 'returns their associated email record' do
        get "/users/#{user.id}/email", headers: auth_header(user: user), xhr: true
        expect(JSON.parse(response.body)).to include(
          'address'                => user.email.address,
          'user_id'                => user.id,
          'verified_at'            => anything,
          'verified'               => user.email.verified?,
          'last_code_generated_at' => anything
        )
      end
    end
  end
end
