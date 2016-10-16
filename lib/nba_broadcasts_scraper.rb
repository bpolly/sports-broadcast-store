class NbaBroadcastsScraper
  require 'open-uri'
  require 'watir'

  def do_teams
    Team.nba[0..1].each do |team|
      #file = File.open("public/indians_sched.htm")
      doc = Nokogiri::HTML(open(team.schedule_url))
      #byebug
      #time_header = doc.css("#bcast_timecol").text
      #timezone = /\(([^)]+)\)/.match(time_header)[1]
      season_text = doc.css(".season_title").text[0..-8]
      year1 = (season_text[0..3])&.to_i
      year2 = ((year1.to_s[0..1])+(season_text[-2..-1])).to_i



      #broadcast_table = doc.css("#broadcast_schedule")
      #byebug
      dates = doc.css(".schedule__events--2 li").each do |row|
        # col 1 - Friday, September 30
        # col 2 - @Kansas City
        # col 3 - 8:15 PM
        # col 4 - SportsTime Ohio
        # col 5 - WTAM 1100, WMMS 100.7, Indians Radio Network
        opposing_team = row.css("img").first.attr("alt")
        time_string = row.css(".event_time").children.first.text
        timezone = row.css(".event_time").css("small").text.downcase
        date_string = row.css(".date").children.last.text.strip
        tv_networks = []
        row.css(".schedule__tv").children.each do |ch|
          tv_networks << ch.text.strip
        end

        timezone_offset = case (timezone)
        when "et", "edt"
          4
        when "ct", "cdt"
          5
        when "mst", "mdt"
          6
        when "pt", "pdt"
          7
        else
          0
        end

        time_parser = case (timezone)
        when "et", "edt"
          ActiveSupport::TimeZone["America/New_York"]
        when "ct", "cdt"
          ActiveSupport::TimeZone["America/Chicago"]
        when "mst", "mdt"
          ActiveSupport::TimeZone["America/Denver"]
        when "pt", "pdt"
          ActiveSupport::TimeZone["America/Los_Angeles"]
        else
          0
        end

        date  = ( date_string ? Date.parse(date_string) : nil )
        calculated_year = date.month >= 10 ? year1 : year2
        date.change(year: calculated_year)
        time = ( (time_string) ? time_parser.parse(time_string) : nil )
        time = time ? time.utc + 1.hour : nil
        #time = time - timezone_offset.hours if time

        byebug
        if(time == nil || time == "TBD")
          #date_time = DateTime.new(date.year, date.month, date.day).utc.beginning_of_day
          date_time = DateTime.new(date.year, date.month, date.day)
          target_game = Game.with_date_no_time(date_time).with_team(team).first
        else
          day_difference = time.day - (time - timezone_offset.hours).day
          date = date + day_difference.days
          date_time = DateTime.new(date.year, date.month, date.day, time.try(:hour), time.try(:min), time.try(:sec))
          target_game = Game.with_date(date_time).with_team(team).first
        end
        if(target_game)
          #updated_tv_networks = target_game.tv_networks ? (target_game.tv_networks.to_s + ", " + tv_networks) : tv_networks
          updated_tv_networks = construct_tv_networks(target_game, tv_networks)
          target_game.update_attributes(tv_networks: updated_tv_networks)
        else
          #byebug
        end # if target_game
      end # dates.each
    end # Teams.each
  end # def scrape MLB team schedules

  def construct_tv_networks(target_game, new_networks)
    existing_networks = target_game.tv_networks ? target_game.tv_networks.split(",") : []
    new_tv_networks = new_networks.split(",").compact
    new_tv_networks.each do |network|
      if(network && network.length > 1)
        network = network.strip
        existing_networks.include?(network) ? nil : existing_networks.push(network)
      end
    end # new_networks.each
    existing_networks.join(",")
  end # def construct_tv_networks
end # class
