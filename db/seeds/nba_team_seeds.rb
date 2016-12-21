league = "nba"

atl = Team.find_or_create_by(name: "atlanta hawks", slug: "nba-atl", league: league, yahoo_team_id: 1)
["atlanta hawks", "atlanta", "hawks"].each do |nick|
  atl.nicknames.find_or_create_by(name: nick)
end

bos = Team.find_or_create_by(name: "boston celtics", slug: "nba-bos", league: league, yahoo_team_id: 2)
["boston celtics", "boston", "celtics"].each do |nick|
  bos.nicknames.find_or_create_by(name: nick)
end


bk = Team.find_or_create_by(name: "brooklyn nets", slug: "nba-bk", league: league, yahoo_team_id: 17)
["brooklyn nets", "brooklyn", "nets", "new jersey"].each do |nick|
  bk.nicknames.find_or_create_by(name: nick)
end


cha = Team.find_or_create_by(name: "charlotte hornets", slug: "nba-cha", league: league, yahoo_team_id: 30)
["charlotte hornets", "charlotte", "hornets"].each do |nick|
  cha.nicknames.find_or_create_by(name: nick)
end


chi = Team.find_or_create_by(name: "chicago bulls", slug: "nba-chi", league: league, yahoo_team_id: 4)
["chicago bulls", "chicago", "bulls"].each do |nick|
  chi.nicknames.find_or_create_by(name: nick)
end


cle = Team.find_or_create_by(name: "cleveland cavaliers", slug: "nba-cle", league: league, yahoo_team_id: 5)
["cleveland cavaliers", "cleveland", "cavaliers", "cavs"].each do |nick|
  cle.nicknames.find_or_create_by(name: nick)
end


dal = Team.find_or_create_by(name: "dallas mavericks", slug: "nba-dal", league: league, yahoo_team_id: 6)
["dallas mavericks", "dallas", "mavericks", "mavs"].each do |nick|
  dal.nicknames.find_or_create_by(name: nick)
end


den = Team.find_or_create_by(name: "denver nuggets", slug: "nba-den", league: league, yahoo_team_id: 7)
["denver nuggets", "denver", "nuggets", "nugs"].each do |nick|
  den.nicknames.find_or_create_by(name: nick)
end


det = Team.find_or_create_by(name: "detroit pistons", slug: "nba-det", league: league, yahoo_team_id: 8)
["detroit pistons", "detroit", "pistons"].each do |nick|
  det.nicknames.find_or_create_by(name: nick)
end


gs = Team.find_or_create_by(name: "golden state warriors", slug: "nba-gs", league: league, yahoo_team_id: 9)
["golden state warriors", "golden state", "warriors", "dubs"].each do |nick|
  gs.nicknames.find_or_create_by(name: nick)
end


hou = Team.find_or_create_by(name: "houston rockets", slug: "nba-hou", league: league, yahoo_team_id: 10)
["houston rockets", "houston", "rockets"].each do |nick|
  hou.nicknames.find_or_create_by(name: nick)
end


ind = Team.find_or_create_by(name: "indiana pacers", slug: "nba-ind", league: league, yahoo_team_id: 11)
["indiana pacers", "indiana", "pacers"].each do |nick|
  ind.nicknames.find_or_create_by(name: nick)
end


lac = Team.find_or_create_by(name: "los angeles clippers", slug: "nba-lac", league: league, yahoo_team_id: 12)
["los angeles clippers","los angeles clippers", "clippers", "clips", "la", "la clippers"].each do |nick|
  lac.nicknames.find_or_create_by(name: nick)
end


lal = Team.find_or_create_by(name: "los angeles lakers", slug: "nba-lal", league: league, yahoo_team_id: 13)
["los angeles lakers", "lakers", "los angeles lakers", "la", "la clippers"].each do |nick|
  lal.nicknames.find_or_create_by(name: nick)
end


mem = Team.find_or_create_by(name: "memphis grizzlies", slug: "nba-mem", league: league, yahoo_team_id: 29)
["memphis grizzlies", "memphis", "grizzlies", "grizz"].each do |nick|
  mem.nicknames.find_or_create_by(name: nick)
end


mia = Team.find_or_create_by(name: "miami heat", slug: "nba-mia", league: league, yahoo_team_id: 14)
["miami heat", "miami", "heat"].each do |nick|
  mia.nicknames.find_or_create_by(name: nick)
end


mil = Team.find_or_create_by(name: "milwaukee bucks", slug: "nba-mil", league: league, yahoo_team_id: 15)
["milwaukee bucks", "milwaukee", "bucks"].each do |nick|
  mil.nicknames.find_or_create_by(name: nick)
end


min = Team.find_or_create_by(name: "minnesota timberwolves", slug: "nba-min", league: league, yahoo_team_id: 16)
["minnesota timberwolves", "minnesota", "wolves", "timberwolves"].each do |nick|
  min.nicknames.find_or_create_by(name: nick)
end


no = Team.find_or_create_by(name: "new orleans pelicans", slug: "nba-no", league: league, yahoo_team_id: 3)
["new orleans pelicans", "new orleans", "pelicans"].each do |nick|
  no.nicknames.find_or_create_by(name: nick)
end


ny = Team.find_or_create_by(name: "new york knicks", slug: "nba-ny", league: league, yahoo_team_id: 18)
["new york knicks", "knicks", "new york", "knickerbockers"].each do |nick|
  ny.nicknames.find_or_create_by(name: nick)
end


okc = Team.find_or_create_by(name: "oklahoma city thunder", slug: "nba-okc", league: league, yahoo_team_id: 25)
["oklahoma city thunder", "oklahoma", "okc", "thunder", "sonics", "oklahoma city"].each do |nick|
  okc.nicknames.find_or_create_by(name: nick)
end


orl = Team.find_or_create_by(name: "orlando magic", slug: "nba-orl", league: league, yahoo_team_id: 19)
["orlando magic", "orlando", "magic"].each do |nick|
  orl.nicknames.find_or_create_by(name: nick)
end


phi = Team.find_or_create_by(name: "philadelphia sixers", slug: "nba-phi", league: league, yahoo_team_id: 20)
["philadelphia sixers","philadelphia", "seventy sixers", "sixers", "76ers"].each do |nick|
  phi.nicknames.find_or_create_by(name: nick)
end


pho = Team.find_or_create_by(name: "phoenix suns", slug: "nba-pho", league: league, yahoo_team_id: 21)
["phoenix suns", "phoenix", "suns"].each do |nick|
  pho.nicknames.find_or_create_by(name: nick)
end


por = Team.find_or_create_by(name: "portland trail blazers", slug: "nba-por", league: league, yahoo_team_id: 22)
["portland trail blazers", "portland", "trail blazers", "blazers", "fourth seed"].each do |nick|
  por.nicknames.find_or_create_by(name: nick)
end


sac = Team.find_or_create_by(name: "sacramento kings", slug: "nba-sac", league: league, yahoo_team_id: 23)
["sacramento kings", "sacramento", "kings"].each do |nick|
  sac.nicknames.find_or_create_by(name: nick)
end


sa = Team.find_or_create_by(name: "san antonio spurs", slug: "nba-sa", league: league, yahoo_team_id: 24)
["san antonio spurs", "san antonio", "spurs"].each do |nick|
  sa.nicknames.find_or_create_by(name: nick)
end


tor = Team.find_or_create_by(name: "toronto raptors", slug: "nba-tor", league: league, yahoo_team_id: 28)
["toronto raptors", "toronto", "raptors", "raps"].each do |nick|
  tor.nicknames.find_or_create_by(name: nick)
end


uta = Team.find_or_create_by(name: "utah jazz", slug: "nba-uta", league: league, yahoo_team_id: 26)
["utah jazz", "utah", "jazz"].each do |nick|
  uta.nicknames.find_or_create_by(name: nick)
end


was = Team.find_or_create_by(name: "washington wizards", slug: "nba-was", league: league, yahoo_team_id: 27)
["washington wizards", "washington", "wizards"].each do |nick|
  was.nicknames.find_or_create_by(name: nick)
end
