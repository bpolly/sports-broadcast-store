class YahooScraper
  require 'open-uri'
  require 'watir'
  SEASON_MONTHS = ['10', '11', '12', '01', '02', '03', '04', '05']

  def scrape_nba
    Team.nba.each do |team|

      SEASON_MONTHS.each do |month|
        team_schedule = "http://scores.nbcsports.msnbc.com/nba/teamstats.asp?teamno=#{team.yahoo_team_id}&type=schedule&year=#{Time.now.year}&month=#{month}"
        month = month.to_i
        doc = Nokogiri::HTML(open(team_schedule))

        season = doc.css('.shsYearNav strong').text
        year_one = season.split('-')[0]
        year_two = (year_one[0..1] + season.split('-')[1])
        current_year = (month > 6 && month <= 12) ? year_one.to_i : year_two.to_i

        clippers = 12
        lakers = 13

        dates = doc.css(".shsTable tr").each do |row|
          cols = row.css("td")
          if(cols.count > 2 && (row.attributes['class'].value != 'shsTableTtlRow') && (row.attributes['class'].value != 'shsColTtlRow'))
            date_extractor = /[\w]+. ([\d]+)/
            opponent_extractor = /(vs.|at) (.+)/
            time_extractor = /MST([\d]+:[\d]+ (?:AM|PM) EST)/
            day = date_extractor.match(cols[0].text)[1].to_i
            match_sign = opponent_extractor.match(cols[1].text)[1]
            opposing_team_text = opponent_extractor.match(cols[1].text)[2]
            time = time_extractor.match(cols[2].text) ? time_extractor.match(cols[2].text)[1] : byebug
            tv_networks = cols[3].text ? cols[3].text.gsub(/[[:space:]]/, '').split('/').join(',') : ''

            home_game = match_sign == 'vs.'


            extra_nickname = ''
            if(opposing_team_text.downcase == 'los angeles')
              team_no_extractor = /teamno=(\d+)/
              team_no = team_no_extractor.match(cols[1].css('a').first.attributes['href'].value)[1]
              extra_nickname = team_no == '12' ? 'clippers' : 'lakers'
            end

            #byebug
            opposing_team = Team.find_given_nickname_and_league((extra_nickname != '' ? extra_nickname : opposing_team_text.downcase), "nba").first
            byebug unless opposing_team

            home_team_id = 0
            away_team_id = 0
            if(home_game)
              home_team_id = team.id
              away_team_id = opposing_team.id
            else
              home_team_id = opposing_team.id
              away_team_id = team.id
            end

            date_time = Time.parse(time).to_datetime
            date_time = date_time.change(day: day, month: month, year: current_year)

            if(date_time > (Time.now - 1.day))
              Game.find_or_create_by(home_team_id: home_team_id, away_team_id: away_team_id, date: date_time, tv_networks: tv_networks, league: 'nba')
            end
            #game.save
          end # if cols.count
        end # dates = doc.css(".shsTable tr").each do |row|
      end # SEASON_MONTHS.each do |month|
    end # Team.nba.each do |team|
  end # def scrape_nba
end # class YahooScraper
