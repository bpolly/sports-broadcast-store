class GamesController < ApplicationController
  def index
    @games = Game.all
  end

  def do_scraping
    Team.all.map(&:slug).each do |team_slug|

      response = HTTParty.get("https://www.stattleship.com/baseball/mlb/games?team_id=#{team_slug}&per_page=40&page=2",
        headers: {
          "Content-Type" => 'application/json',
          "Authorization" => "Token token=#{ENV["STATTLESHIP_ACCESS_TOKEN"]}",
          "Accept" => "application/vnd.stattleship.com; version=1"})
      #puts response

      games = response["games"]
      games.each do |game|
        new_game = Game.new

        away_team_label = /([a-zA-Z ]*)vs([a-zA-Z ]*)/.match(game["label"])[1].strip.downcase
        home_team_label = /([a-zA-Z ]*)vs([a-zA-Z ]*)/.match(game["label"])[2].strip.downcase
        away_team = Nickname.includes(:team).where(name: away_team_label).map(&:team).first
        home_team = Nickname.includes(:team).where(name: home_team_label).map(&:team).first

        new_game.home_team = home_team.id
        new_game.away_team = away_team.id

        new_game.date = DateTime.parse(game["started_at"])
        new_game.save
      end
    end
    render :nothing => true, :status => 200, :content_type => 'text/html'
  end
end
