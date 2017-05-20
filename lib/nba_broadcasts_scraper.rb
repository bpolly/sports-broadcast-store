class NbaBroadcastsScraper
  require 'open-uri'
  require 'watir'

  def do_teams
    rejected_teams = Team.excluded_teams_from_scraper
    Team.nba.each do |team|
      #file = File.open("public/indians_sched.htm")
      doc = Nokogiri::HTML(open(team.schedule_url))
      #byebug
      #time_header = doc.css("#bcast_timecol").text
      #timezone = /\(([^)]+)\)/.match(time_header)[1]
      # season_text = doc.css(".season_title").text[0..-8]
      # year1 = (season_text[0..3])&.to_i
      # year2 = ((year1.to_s[0..1])+(season_text[-2..-1])).to_i
      i = 0


  #    byebug
      #broadcast_table = doc.css("#broadcast_schedule")
      #byebug
      dates = doc.css(".latest-results-table tr").each do |row|
        # col 1 - Friday, September 30
        # col 2 - @Kansas City
        # col 3 - 8:15 PM
        # col 4 - SportsTime Ohio
        # col 5 - WTAM 1100, WMMS 100.7, Indians Radio Network
        # byebug
        cols = row.css("td")
        if(cols.count > 2 && cols[0].text.strip != "(Preseason)")
          date = cols[0]
          match_sign = cols[1].text
          opposing_team_text = cols[2].text
          tv_networks = cols[3].text
          byebug

          home_game = match_sign == 'vs'
          opposing_team = Team.find_given_nickname_and_league(opposing_team_text.downcase, "nba").first

          home_team_id = 0
          away_team_id = 0
          if(home_game)
            home_team_id = team.id
            away_team_id = opposing_team.id
          else
            home_team_id = opposing_team.id
            away_team_id = team.id
          end

          Game.new(home_team_id: home_team_id, away_team_id: away_team_id, )
          if(team.schedule[i].teams.include?(opposing_team))
            team.schedule[i].update_attributes(tv_networks: tv_networks) if (tv_networks && !team.schedule[i].tv_networks)
          end
        i = i + 1
        end
      end # dates.each
    end # Teams.each
  end # def scrape MLB team schedules

  def construct_tv_networks(target_game, new_networks)
    existing_networks = target_game.tv_networks ? target_game.tv_networks.split(",") : []
    new_networks.each do |network|
      if(network && network.length > 1)
        network = network.strip
        existing_networks.include?(network) ? nil : existing_networks.push(network)
      end
    end # new_networks.each
    existing_networks.join(",")
  end # def construct_tv_networks
end # class
