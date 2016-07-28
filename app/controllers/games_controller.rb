class GamesController < ApplicationController
  def index
    @games = Game.all
    response = HTTParty.get('https://www.stattleship.com/baseball/mlb/games',
      headers: {
        "Content-Type" => 'application/json',
        "Authorization" => "Token token=#{ENV["STATTLESHIP_ACCESS_TOKEN"]}",
        "Accept" => "application/vnd.stattleship.com; version=1",
        "team_id" => "mlb-kc"})
    puts response
  end
end
