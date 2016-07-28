class GamesController < ApplicationController
  def index
    @games = Game.all
  end

  def do_scraping
    response = HTTParty.get('https://www.stattleship.com/baseball/mlb/games?team_id=mlb-cle&status=upcoming',
      headers: {
        "Content-Type" => 'application/json',
        "Authorization" => "Token token=#{ENV["STATTLESHIP_ACCESS_TOKEN"]}",
        "Accept" => "application/vnd.stattleship.com; version=1"})
    puts response
    render json: response["games"].reverse, status: :ok
  end
end
