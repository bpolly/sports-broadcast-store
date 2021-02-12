Team.nba.limit(5).each do |team|
  other_teams = Team.nba.where.not(id: team.id)
  Game.create(
    home_team: team,
    away_team: other_teams.sample,
    date: Time.current + rand(0..4).hours,
    tv_networks: 'ESPN',
    league: 'nba'
  ) 
end
