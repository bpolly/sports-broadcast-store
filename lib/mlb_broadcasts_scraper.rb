class MlbBroadcastsScraper
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
        0
      when "ct"
        1
      when "mst"
        2
      when "pt"
        3
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
          time = ( (time) ? Time.parse(time_string) : nil )
          time = time - timezone_offset if time

          if(time == nil || time == "TBD")
            date_time = DateTime.new(date.year, date.month, date.day).utc.beginning_of_day
            target_game = Game.with_date_no_time(date_time).with_team(team).first
          else
            date_time = DateTime.new(date.year, date.month, date.day, time.try(:hour), time.try(:min), time.try(:sec)).utc + 4.hours
            target_game = Game.with_date(date_time).with_team(team).first
          end
          if(target_game)
            updated_tv_networks = target_game.tv_networks ? (target_game.tv_networks.to_s + ", " + tv_networks) : tv_networks
            target_game.update_attributes(tv_networks: updated_tv_networks)
          end # if target_game
        end # if cols
      end # dates.each
    end # Teams.each
  end # def scrape MLB team schedules
end # class
