class GamesController < ApplicationController
  def index
    @games = Game.all
  end

  def do_scraping
    Team.all[0..2].each do |team|
      page_index = 1
      while(true) do
        response = HTTParty.get("https://www.stattleship.com/#{team.sport}/#{team.league}/games?team_id=#{team.slug}&per_page=40&page=#{page_index}",
          headers: {
            "Content-Type" => 'application/json',
            "Authorization" => "Token token=#{ENV["STATTLESHIP_ACCESS_TOKEN"]}",
            "Accept" => "application/vnd.stattleship.com; version=1"})
        break unless response.success?

        games = response["games"]
        games.each do |game|
          new_game = Game.new

          away_team_label = /([a-zA-Z ]*)vs([a-zA-Z ]*)/.match(game["label"])[1].strip.downcase
          home_team_label = /([a-zA-Z ]*)vs([a-zA-Z ]*)/.match(game["label"])[2].strip.downcase
          away_team = Nickname.includes(:team).where(name: away_team_label).map(&:team).first
          home_team = Nickname.includes(:team).where(name: home_team_label).map(&:team).first

          new_game.home_team_id = home_team.id
          new_game.away_team_id = away_team.id

          new_game.date = DateTime.parse(game["started_at"])
          new_game.save
        end # games.each
        page_index = page_index + 1
      end # while
    end # team.all
    render :nothing => true, :status => 200, :content_type => 'text/html'
  end # do_scraping
end
