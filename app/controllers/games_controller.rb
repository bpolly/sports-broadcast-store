class GamesController < ApplicationController
  include ActiveModel::Serializers::JSON
  protect_from_forgery with: :null_session
  skip_before_action :verify_authenticity_token
  DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]

  def index
    end_date = params[:end_date] ? Time.zone.parse(params[:end_date]) : 3.days.from_now
    @games = Game
              .includes(home_team: :nicknames, away_team: :nicknames)
              .where("date > ? AND date < ?", 4.hours.ago, end_date.end_of_day)
              .order(date: :asc, id: :asc)
    render json: @games, humanized_networks: @human_tv_network_list, each_serializer: WebGameSerializer
  end

  def scrape
    league = params[:league]
    scraper = Scraper.new(league)
    scraper.scrape
    render :nothing => true, :status => 200, :content_type => 'text/html'
  end # do_scraping

  def retrieve_given_params
    team1_string = params[:team1] # || params[:game][:team1]
    team2_string = params[:team2] # || params[:game][:team2]
    network = params[:network] # || params[:game][:network]
    league = params[:league] # || params[:game][:league]
    date_string = params[:date] # || params[:game][:date]
    time_string = params[:time] # || params[:game][:time]
    time_zone = params[:time_zone] # || params[:game][:time_zone]
    amz_id = params[:amz_id]

    user_gmt_offset = UserZipCode.get_offset_by_amz_id(amz_id)

    team1 = ( team1_string ? Team.find_given_nickname(team1_string.downcase) : nil )
    team2 = ( team2_string ? Team.find_given_nickname(team2_string.downcase) : nil )
    today = false

    if(date_string && date_string.length > 0)
      date = case date_string&.strip&.downcase
      when "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"
        #byebug
        Date.today + get_day_difference(date_string&.strip&.downcase)&.days
      when "today", "tonight"
        today = true
        nil
      when "tomorrow"
        Date.parse(Time.now.utc.to_s) + 1
      when nil, ""
        Date.today # default to today
      else
        puts date_string
        Date.parse(date_string) if date_string
      end
    end
    #date  = ( date_string ? Date.parse(date_string) : nil )
    time = ( time_string ? Time.parse(time_string) : nil )
    date_time = DateTime.new(date.year, date.month, date.day, time.hour, time.min, time.sec) if(date && time)
    #byebug
    if(today)
      games = Game.includes(:home_team, :away_team).with_teams(team1).with_teams(team2).with_network(network).with_league(league).today.sort_by(&:date)[0...1]
    elsif(!date && !time)
      games = Game.includes(:home_team, :away_team).with_teams(team1).with_teams(team2).with_network(network).with_league(league).where("date > ?", Time.now.utc - 4.hours).sort_by(&:date)[0...1]
    elsif(date && !time)
      games = Game.includes(:home_team, :away_team).with_teams(team1).with_teams(team2).with_network(network).with_date_no_time(date).with_league(league).where("date > ?", Time.now.utc - 4.hours).sort_by(&:date)[0...5]
    else
      games = Game.includes(:home_team, :away_team).with_teams(team1).with_teams(team2).with_network(network).with_date(date).with_league(league).where("date > ?", Time.now.utc - 4.hours).sort_by(&:date)[0...5]
    end
    #render :json => games
    #byebug

    render :json => games, humanized_networks: @human_tv_network_list, user_gmt_offset: user_gmt_offset
  end

  def get_day_difference(day)
    #byebug
    today = Date.today.cwday

    day_num = case day.downcase
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

    day_num >= today ? (day_num - today) : ((7+day_num) - today)
  end


end
