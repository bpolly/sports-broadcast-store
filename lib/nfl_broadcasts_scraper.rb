class NflBroadcastsScraper
  require 'open-uri'
  require 'watir'

  def do_teams
    Team.mlb.all.each do |team|
      #file = File.open("public/indians_sched.htm")
      doc = Nokogiri::HTML(open(team.schedule_url))
      #byebug
      #time_header = doc.css("#bcast_timecol").text
      #timezone = /\(([^)]+)\)/.match(time_header)[1]
      timezone_offset = case (team.timezone)
      when "et"
        4
      when "ct"
        5
      when "mst"
        6
      when "pt"
        7
      else
        0
      end

      time_parser = case (team.timezone)
      when "et"
        ActiveSupport::TimeZone["America/New_York"]
      when "ct"
        ActiveSupport::TimeZone["America/Chicago"]
      when "mst"
        ActiveSupport::TimeZone["America/Denver"]
      when "pt"
        ActiveSupport::TimeZone["America/Los_Angeles"]
      else
        0
      end

      #broadcast_table = doc.css("#broadcast_schedule")
      #byebug
      dates = doc.css("#broadcast_schedule tr").each do |row|
        # col 1 - Friday, September 30
        # col 2 - @Kansas City
        # col 3 - 8:15 PM
        # col 4 - SportsTime Ohio
        # col 5 - WTAM 1100, WMMS 100.7, Indians Radio Network
        cols = row.css("td")
        if(cols.count > 2)
          date_string = cols[0].text
          opposing_team = cols[1].text
          time_string = cols[2].text
          tv_networks = cols[3].text

          date  = ( date_string ? Date.parse(date_string) : nil )
          time = ( (time_string) ? time_parser.parse(time_string) : nil )
          time = time ? time.utc + 1.hour : nil
          #time = time - timezone_offset.hours if time

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
        end # if cols
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
