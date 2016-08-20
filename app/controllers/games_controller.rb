class GamesController < ApplicationController
  def index
    @games = Game.all
  end

  def scrape
    league = params[:league]
    scraper = Scraper.new(league)
    scraper.scrape
    render :nothing => true, :status => 200, :content_type => 'text/html'
  end # do_scraping

  def retrieve_given_params
    team1_string = params[:team1]
    team2_string = params[:team2]
    network = params[:network]
    league = params[:league]
    date_string = params[:date]
    time_string = params[:time]

    team1 = ( team1_string ? Team.find_teams_given_nickname(team1_string) : nil )
    team2 = ( team2_string ? Team.find_teams_given_nickname(team2_string) : nil )
    date  = ( date_string ? Date.parse(date_string) : nil )
    time = ( time_string ? Time.parse(time_string) : nil )
    date_time = DateTime.new(date.year, date.month, date.day, time.hour, time.min, time.sec)

  end


end
