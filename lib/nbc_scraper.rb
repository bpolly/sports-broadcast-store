class NbcScraper
  require 'open-uri'
  require 'watir'

  def scrape_nfl
    season_months = ['08', '11', '12', '01', '02', '03', '04', '05']

    Team.nfl.each do |team|
      team_schedule = "http://scores.nbcsports.com/fb/teamstats.asp?tm=#{team.nbc_team_id}&type=schedules"
      doc = Nokogiri::HTML(open(team_schedule))

      # season = doc.css('.shsYearNav strong').text
      # year_one = season.split('-')[0]
      # year_two = (year_one[0..1] + season.split('-')[1])
      # current_year = (month > 6 && month <= 12) ? year_one.to_i : year_two.to_i

      dates = doc.css(".shsTable tr").each do |row|
        cols = row.css("td")
        if(cols.count > 3 && (row.attributes['class'].value != 'shsTableTtlRow') && (row.attributes['class'].value != 'shsColTtlRow'))
          date_extractor = /[\w]+. ([\d]+)/
          opponent_extractor = /(vs.|@) (.+)/
          time_extractor = /MST([\d]+:[\d]+ (?:AM|PM) EST)/
          date = cols[3].children.first.text
          #byebug
          match_sign = opponent_extractor.match(cols[4].children.first.text)[1]
          time = time_extractor.match(cols[5].text) ? time_extractor.match(cols[5].text)[1] : byebug
          tv_networks = cols[6].text ? cols[6].text.gsub(/[[:space:]]/, '').split('/').join(',') : ''

          home_game = match_sign == 'vs.'

          team_no_extractor = /team=(\d+)/
          team_no = team_no_extractor.match(cols[4].css('a').first.attributes['href'].value)[1]

          opposing_team = Team.where(league: 'nfl').find_by(nbc_team_id: team_no)

          #opposing_team = Team.find_given_nickname_and_league((extra_nickname != '' ? extra_nickname : opposing_team_text.downcase), "nba").first
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

          date = Time.parse(date)
          date_time = Time.parse(time).to_datetime.utc
          day = date.day
          month = date.month
          date_time = date_time.change(day: day, month: month, year: calculate_year(month, 'nfl'))

          if(date_time > (Time.now - 1.day))
            Game.find_or_create_by(home_team_id: home_team_id, away_team_id: away_team_id, date: date_time, tv_networks: tv_networks, league: 'nfl')
          end
          #game.save
        end # if cols.count
      end # dates = doc.css(".shsTable tr").each do |row|

    end
  end

  def scrape_nba
    schedule_released_month = 8
    season_end_month = 6
    season_months = ['10', '11', '12', '01', '02', '03', '04', '05']

    Team.nba.each do |team|
      starting_month = season_months.index(sprintf '%02i', Date.today.month)

      # if current month is not in season,
      if starting_month == nil
        starting_month = 0
      end

      season_months[starting_month..-1].each do |month|
        team_schedule = "http://scores.nbcsports.msnbc.com/nba/teamstats.asp?teamno=#{team.nbc_team_id}&type=schedule&year=#{Time.now.year}&month=#{month}"
        month = month.to_i
        doc = Nokogiri::HTML(open(team_schedule))

        season = doc.css('.shsYearNav strong').text
        year_one = season.split('-')[0]
        year_two = (year_one[0..1] + season.split('-')[1])
        current_year = (month > 6 && month <= 12) ? year_one.to_i : year_two.to_i

        # Double check to make sure the calendar is on the right month
        selected_tab_month_num = Date::ABBR_MONTHNAMES.index(doc.css(".shsTeamSchedTab strong").inner_text.gsub(/[^0-9A-Za-z]/, ''))
        next if(selected_tab_month_num != month)


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

            team_no_extractor = /teamno=(\d+)/
            team_no = team_no_extractor.match(cols[1].css('a').first.attributes['href'].value)[1]

            opposing_team = Team.where(league: 'nba').find_by(nbc_team_id: team_no)

            #opposing_team = Team.find_given_nickname_and_league((extra_nickname != '' ? extra_nickname : opposing_team_text.downcase), "nba").first
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
            if (home_team_id == 42 && month == 5)
              byebug
            end

            date_time = Time.parse(time).to_datetime.utc
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


  def scrape_mlb
    schedule_released_month = 8
    season_end_month = 6
    season_months = ['04', '05', '06', '07', '08', '09', '10']

    Team.mlb.each do |team|
      starting_month = season_months.index(sprintf '%02i', Date.today.month)

      # if current month is not in season,
      if starting_month == nil
        starting_month = 0
      end

      season_months[starting_month..-1].each do |month|
        team_schedule = "http://scores.nbcsports.msnbc.com/mlb/teamstats.asp?teamno=#{team.nbc_team_id}&type=schedule&year=#{Time.now.year}&month=#{month}"
        month = month.to_i
        doc = Nokogiri::HTML(open(team_schedule))

        current_year = Date.today.year

        # Double check to make sure the calendar is on the right month
        selected_tab_month_num = Date::ABBR_MONTHNAMES.index(doc.css(".shsTeamSchedTab strong").inner_text.gsub(/[^0-9A-Za-z]/, ''))
        next if(selected_tab_month_num != month)


        dates = doc.css('div#shsMLBTeamSched>table>tr.shsRow1Row, div#shsMLBTeamSched>table>tr.shsRow0Row').each do |row|
          cols = row.css("td")
          byebug if row.attributes['class'] == nil
          if(cols.count > 2 && (row.attributes['class'].value != 'shsTableTtlRow') && (row.attributes['class'].value != 'shsColTtlRow'))
            date_extractor = /[\w]+. ([\d]+)/
            opponent_extractor = /(vs.|@|at) (.+)/
            time_extractor = /([\d]+:[\d]+ (?:AM|PM) ET)/
            day = date_extractor.match(cols[0].text)[1].to_i
            match_sign = opponent_extractor.match(cols[1].text)? opponent_extractor.match(cols[1].text)[1] : byebug
            opposing_team_text = opponent_extractor.match(cols[1].text)[2]
            time = time_extractor.match(cols[2].text) ? time_extractor.match(cols[2].text)[1] : nil
            next unless time
            tv_networks = cols[3].text ? cols[3].text.gsub(/[[:space:]]/, '').split('/').join(',') : ''

            home_game = match_sign == 'vs.'


            extra_nickname = ''
            if(opposing_team_text.downcase == 'los angeles')
              team_no_extractor = /teamno=(\d+)/
              team_no = team_no_extractor.match(cols[1].css('a').first.attributes['href'].value)[1]
              extra_nickname = team_no == '12' ? 'clippers' : 'lakers'
            end

            team_no_extractor = /team=(\d+)/
            team_no = team_no_extractor.match(cols[1].css('a').first.attributes['href'].value)[1]

            opposing_team = Team.where(league: 'mlb').find_by(nbc_team_id: team_no)

            #opposing_team = Team.find_given_nickname_and_league((extra_nickname != '' ? extra_nickname : opposing_team_text.downcase), "nba").first
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
            if (home_team_id == 42 && month == 5)
              byebug
            end

            date_time = Time.parse(time).to_datetime.utc
            date_time = date_time.change(day: day, month: month, year: current_year)

            if(date_time > (Time.now - 1.day))
              Game.find_or_create_by(home_team_id: home_team_id, away_team_id: away_team_id, date: date_time, tv_networks: tv_networks, league: 'mlb')
            end
            #game.save
          end # if cols.count
        end # dates = doc.css(".shsTable tr").each do |row|
      end # SEASON_MONTHS.each do |month|
    end # Team.nba.each do |team|
  end # def scrape_nba


  def calculate_year(game_month, league)
    current_year = Time.now.year
    current_month = Time.now.month
    case league
    when 'nba', 'nfl'
      if(game_month >= 8 && game_month <= 12)
        if(current_month >= 7 && current_month <= 12)
          return current_year
        else # current_month 1-7
          return current_year - 1
        end
      else # game_month: 1-8
        if(current_month >= 7 && current_month <= 12)
          return current_year + 1
        else # current_month 1-7
          return current_year
        end
      end
    when 'mlb'
      # something
    end


  end # case league
end # class NbcScraper
