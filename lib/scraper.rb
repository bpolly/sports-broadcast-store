class Scraper
  def initialize(league)
    @league = league
    @sport = get_sport(@league)
    @@api_url = api_url
  end

  def scrape
    page_index = 1
    while(true) do
      response = HTTParty.get(@@api_url + "&page=#{page_index}",
        headers: {
          "Content-Type" => 'application/json',
          "Authorization" => "Token token=#{ENV["STATTLESHIP_ACCESS_TOKEN"]}",
          "Accept" => "application/vnd.stattleship.com; version=1"})
      break unless (response.success? && response["games"] != [])

      games = response["games"]
      save_games(games)
      page_index = page_index + 1
    end # while
    return true
  end # do_scraping


  def save_games(games)
    games.each do |game|
      new_game = Game.new

      away_team_label = /([0-9a-zA-Z ]*)vs([0-9a-zA-Z ]*)/.match(game["label"])[1].strip.downcase
      home_team_label = /([0-9a-zA-Z ]*)vs([0-9a-zA-Z ]*)/.match(game["label"])[2].strip.downcase
      away_team = Nickname.includes(:team).where(teams: { league: @league }).where(name: away_team_label).map(&:team).first
      home_team = Nickname.includes(:team).where(teams: { league: @league }).where(name: home_team_label).map(&:team).first
      #byebug

      if(home_team && away_team)
        new_game.home_team_id = home_team.id
        new_game.away_team_id = away_team.id

        new_game.league = @league
        new_game.date = DateTime.parse(game["started_at"]).utc
        #byebug
        new_game.save if !game_exists?(new_game)
      else
          byebug
      end
    end # games.each
  end # save_games

  private

  def api_url
    "https://api.stattleship.com/#{@sport}/#{@league}/games?since=today&per_page=40"
  end # api_url

  def get_sport(league)
    case(league)
    when "mlb"
      "baseball"
    when "nfl"
      "football"
    when "nba"
      "basketball"
    when "nhl"
      "hockey"
    end
  end

  def game_exists?(game)
    Game
    .where(home_team_id: game.home_team_id)
    .where(date: game.date)
    .where(away_team_id: game.away_team_id)
    .count > 0
  end
end
