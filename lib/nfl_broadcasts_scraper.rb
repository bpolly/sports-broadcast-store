class NflBroadcastsScraper
  require 'open-uri'
  require 'watir'

  def do_teams
    Team.nfl.each do |team|
      #file = File.open("public/indians_sched.htm")
      schedule_url = team.schedule_url
      schedule_url = schedule_url.gsub(/yy/, Date.today.year.to_s[-2..-1])
      schedule_url = schedule_url.gsub(/YYYY/, Date.today.year.to_s)
      puts schedule_url
      doc = Nokogiri::HTML(open(schedule_url))
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


      #broadcast_table = doc.css("#broadcast_schedule")
      #byebug
      dates = doc.css(".cfb-sch tr")[2..-1].each do |row|
        # col 1 - Friday, September 30
        # col 2 - @Kansas City
        # col 3 - 8:15 PM
        # col 4 - SportsTime Ohio
        # col 5 - WTAM 1100, WMMS 100.7, Indians Radio Network
        cols = row.css("td")
        #byebug
        if((cols.count > 2) && (row.css(".cfb2 strong").text != "BYE"))
          #byebug
          date_string = row.css(".cfb1").text
          opposing_team = row.css(".cfb2 strong").text
          time_string = row.css(".cfb3 strong").text
          tv_networks = row.css(".cfb3").children.last&.text&.strip&.split("/")&.join(", ")
          timezone = time_string.match(/\s\S+$/)[0].strip

          time_parser = case (timezone.downcase)
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

          #byebug
          date  = ( date_string ? Date.parse(date_string) : nil )
          if date.month < 8
            date = date + 1.year
          end
          time = ( (time_string) ? time_parser.parse(time_string) : nil )
          time = time ? time.utc : nil
          #time = time - timezone_offset.hours if time
          #byebug if(date >= Date.today)
          if(time == nil || time == "TBD")
            #date_time = DateTime.new(date.year, date.month, date.day).utc.beginning_of_day
            date_time = DateTime.new(date.year, date.month, date.day)
            target_game = Game.with_date_no_time(date_time).with_team(team).first
          else
            day_difference = time_parser.parse(time_string).utc.day - time_parser.parse(time_string).day
            date = date + day_difference.days
            date_time = DateTime.new(date.year, date.month, date.day, time.try(:hour), time.try(:min), time.try(:sec))
            target_game = Game.with_date(date_time).with_team(team).first
          end
          if(target_game)
            #updated_tv_networks = target_game.tv_networks ? (target_game.tv_networks.to_s + ", " + tv_networks) : tv_networks
            #updated_tv_networks = construct_tv_networks(target_game, tv_networks)
            #byebug
            target_game.update_attributes(tv_networks: tv_networks)
          else
            #byebug if(date_time >= Date.today)
          end # if target_game
        end # if cols
      end # dates.each
    end # Teams.each
  end # def scrape NFL team schedules

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
