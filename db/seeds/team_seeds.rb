def update_nicknames(team, nickname_list)
  existing_nicknames = team.nicknames.pluck(:name)

  # if we have nicknames in the yml but not in the DB, add them
  nicknames_to_add = nickname_list - existing_nicknames
  if(nicknames_to_add.length > 0)
    puts "== Adding Nicknames for #{team.name} =="
    puts nicknames_to_add
    puts "===="
  end

  # if we have nicknames in the DB but not in the yml, delete them
  nicknames_to_remove = existing_nicknames - nickname_list
  if(nicknames_to_add.length > 0)
    puts "== Removing Nicknames for #{team.name} =="
    puts nicknames_to_remove
    puts "===="
  end

  # nicknames_to_add.each { |nick| team.nicknames.create(name: nick) }
  # team.nicknames.where(name: nicknames_to_remove).destroy
end

nfl_data = YAML.load_file('db/seeds/nfl_team_data.yml')
mlb_data = YAML.load_file('db/seeds/mlb_team_data.yml')
nba_data = YAML.load_file('db/seeds/nba_team_data.yml')
all_team_data = nfl_data.merge(mlb_data, nba_data)

['mlb', 'nba', 'nfl'].each do |league|
  all_team_data[league].each do |team_data|
    # consider team name primary attribute
    # team = Team.find_or_create_by(name: team_data['name'])
    team = Team.find_by!(name: team_data['name'])

    # only update record if league, slug or nbc_team_id don't match existing record
    team.assign_attributes(
      league: league,
      slug: team_data['slug'],
      nbc_team_id: team_data['nbc_team_id']
    )
    # team.save! if team.changed?
    puts "Team #{team.name} changed" if team.changed?

    # update nicknames
    update_nicknames(team, team_data['nicknames'])
  end
end
