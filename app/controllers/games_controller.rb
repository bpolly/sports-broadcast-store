class GamesController < ApplicationController
  include ActiveModel::Serializers::JSON
  protect_from_forgery with: :null_session
  DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]

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
    #byebug
    team1_string = params[:team1] # || params[:game][:team1]
    team2_string = params[:team2] # || params[:game][:team2]
    network = params[:network] # || params[:game][:network]
    league = params[:league] # || params[:game][:league]
    date_string = params[:date] # || params[:game][:date]
    time_string = params[:time] # || params[:game][:time]
    time_zone = params[:time_zone] # || params[:game][:time_zone]

    #byebug

    #byebug

    team1 = ( team1_string ? Team.find_given_nickname(team1_string.downcase) : nil )
    team2 = ( team2_string ? Team.find_given_nickname(team2_string.downcase) : nil )

    #byebug
    if(date_string && date_string.length > 0)
      date = case date_string
      when DAYS.include?(date_string&.strip&.downcase)
        Date.today + get_day_difference(day)&.days
      when "today", "tonight"
        Date.parse(Time.now.utc.to_s)
      when "tomorrow"
        Date.parse(Time.now.utc.to_s) + 1
      when nil, ""
        Date.today # default to today
      else
        puts date_string
        Date.parse(date_string) if date_string
      end
    end
    #byebug
    #date  = ( date_string ? Date.parse(date_string) : nil )
    time = ( time_string ? Time.parse(time_string) : nil )
    date_time = DateTime.new(date.year, date.month, date.day, time.hour, time.min, time.sec) if(date && time)
    #byebug
    if(!date && !time)
      games = Game.with_teams(team1).with_teams(team2).with_network(network).with_league(league).where("date > ?", Date.today - 5.hours).sort_by(&:date)[0...1]
    elsif(date && !time)
      games = Game.with_teams(team1).with_teams(team2).with_network(network).with_date_no_time(date).with_league(league).where("date > ?", Date.today - 5.hours).sort_by(&:date)[0...5]
    else
      games = Game.with_teams(team1).with_teams(team2).with_network(network).with_date(date).with_league(league).where("date > ?", Date.today - 5.hours).sort_by(&:date)[0...5]
    end
    #render :json => games
    #byebug
    render :json => games
  end

  def get_day_difference(day)
    #byebug
    today = Date.today.cwday

    day_num = case day
    when "monday"
      1
    when "tuesday"
      2
    when "wednesday"
      3
    when "thursday"
      4
    when "friday"
      5
    when "saturday"
      6
    when "sunday"
      7
    else
      0
    end

    day_difference = 7 - (today - day_num)
  end


end
