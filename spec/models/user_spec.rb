require 'rails_helper'

RSpec.describe User, type: :model do
  describe '.verified?' do
    context 'when the user is verified' do
      subject { create(:user, :with_verified_email) }

      it { is_expected.to be_truthy }
    end

    context 'when the user is not verified' do
      subject { create(:user) }

      it { is_expected.to be_falsey }
    end

  end
end
