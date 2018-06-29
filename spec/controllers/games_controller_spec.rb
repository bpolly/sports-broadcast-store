require 'spec_helper'

RSpec.describe GamesController do
  describe 'retrieve_given_params' do
    let(:amz_id) { 'es30resf' } # junk
    let(:team_one) { FactoryBot.create(:team, :nba)}
    let(:team_two) { FactoryBot.create(:team, :nba)}
    let(:game) { FactoryBot.create(:game, home_team_id: team_one.id, away_team_id: team_two.id)}
    context 'given just a team name' do
      it 'finds that teams next game' do
        # do something
      end
    end
  end

  describe 'get_day_difference' do
    let(:target_day) { 'Wednesday' }

    context 'the day is behind the target_day in the week' do
      it 'returns the number of days the given day is from today' do
        allow(Date).to receive_message_chain("today.cwday") { 1 } # Monday
        expect(GamesController.new.get_day_difference(target_day)).to eq(2)
      end
    end

    context 'the day is the same as the target_day' do
      it 'returns the number of days the given day is from today' do
        allow(Date).to receive_message_chain("today.cwday") { 3 } # Wednesday
        expect(GamesController.new.get_day_difference(target_day)).to eq(0)
      end
    end

    context 'the day is ahead of the target_day in the week' do
      it 'returns the number of days the given day is from today' do
        allow(Date).to receive_message_chain("today.cwday") { 5 } # Friday
        expect(GamesController.new.get_day_difference(target_day)).to eq(5)
      end
    end

  end
end
