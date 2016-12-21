league = "nba"

atl = Team.create(name: "atlanta hawks", slug: "nba-atl", league: league, schedule_url: "http://sports.yahoo.com/nba/teams/atl/schedule/")
["atlanta hawks", "atlanta", "hawks"].each do |nick|
  atl.nicknames.create(name: nick)
end

bos = Team.create(name: "boston celtics", slug: "nba-bos", league: league, schedule_url: "http://sports.yahoo.com/nba/teams/bos/schedule/")
["boston celtics", "boston", "celtics"].each do |nick|
  bos.nicknames.create(name: nick)
end


bk = Team.create(name: "brooklyn nets", slug: "nba-bk", league: league, schedule_url: "http://sports.yahoo.com/nba/teams/bro/schedule/")
["brooklyn nets", "brooklyn", "nets", "new jersey"].each do |nick|
  bk.nicknames.create(name: nick)
end


cha = Team.create(name: "charlotte hornets", slug: "nba-cha", league: league, schedule_url: "http://sports.yahoo.com/nba/teams/cha/schedule/")
["charlotte hornets", "charlotte", "hornets"].each do |nick|
  cha.nicknames.create(name: nick)
end


chi = Team.create(name: "chicago bulls", slug: "nba-chi", league: league, schedule_url: "http://sports.yahoo.com/nba/teams/chi/schedule/")
["chicago bulls", "chicago", "bulls"].each do |nick|
  chi.nicknames.create(name: nick)
end


cle = Team.create(name: "cleveland cavaliers", slug: "nba-cle", league: league, schedule_url: "http://sports.yahoo.com/nba/teams/cle/schedule/")
["cleveland cavaliers", "cleveland", "cavaliers", "cavs"].each do |nick|
  cle.nicknames.create(name: nick)
end


dal = Team.create(name: "dallas mavericks", slug: "nba-dal", league: league, schedule_url: "http://sports.yahoo.com/nba/teams/dal/schedule/")
["dallas mavericks", "dallas", "mavericks", "mavs"].each do |nick|
  dal.nicknames.create(name: nick)
end


den = Team.create(name: "denver nuggets", slug: "nba-den", league: league, schedule_url: "http://sports.yahoo.com/nba/teams/den/schedule/")
["denver nuggets", "denver", "nuggets", "nugs"].each do |nick|
  den.nicknames.create(name: nick)
end


det = Team.create(name: "detroit pistons", slug: "nba-det", league: league, schedule_url: "http://sports.yahoo.com/nba/teams/det/schedule/")
["detroit pistons", "detroit", "pistons"].each do |nick|
  det.nicknames.create(name: nick)
end


gs = Team.create(name: "golden state warriors", slug: "nba-gs", league: league, schedule_url: "http://sports.yahoo.com/nba/teams/gsw/schedule/")
["golden state warriors", "golden state", "warriors", "dubs"].each do |nick|
  gs.nicknames.create(name: nick)
end


hou = Team.create(name: "houston rockets", slug: "nba-hou", league: league, schedule_url: "http://sports.yahoo.com/nba/teams/hou/schedule/")
["houston rockets", "houston", "rockets"].each do |nick|
  hou.nicknames.create(name: nick)
end


ind = Team.create(name: "indiana pacers", slug: "nba-ind", league: league, schedule_url: "http://sports.yahoo.com/nba/teams/ind/schedule/")
["indiana pacers", "indiana", "pacers"].each do |nick|
  ind.nicknames.create(name: nick)
end


lac = Team.create(name: "los angeles clippers", slug: "nba-lac", league: league, schedule_url: "http://sports.yahoo.com/nba/teams/lac/schedule/")
["los angeles clippers","los angeles clippers", "clippers", "clips", "la", "la clippers"].each do |nick|
  lac.nicknames.create(name: nick)
end


lal = Team.create(name: "los angeles lakers", slug: "nba-lal", league: league, schedule_url: "http://sports.yahoo.com/nba/teams/lal/schedule/")
["los angeles lakers", "lakers", "los angeles lakers", "la", "la clippers"].each do |nick|
  lal.nicknames.create(name: nick)
end


mem = Team.create(name: "memphis grizzlies", slug: "nba-mem", league: league, schedule_url: "http://sports.yahoo.com/nba/teams/mem/schedule/")
["memphis grizzlies", "memphis", "grizzlies", "grizz"].each do |nick|
  mem.nicknames.create(name: nick)
end


mia = Team.create(name: "miami heat", slug: "nba-mia", league: league, schedule_url: "http://sports.yahoo.com/nba/teams/mia/schedule/")
["miami heat", "miami", "heat"].each do |nick|
  mia.nicknames.create(name: nick)
end


mil = Team.create(name: "milwaukee bucks", slug: "nba-mil", league: league, schedule_url: "http://sports.yahoo.com/nba/teams/mil/schedule/")
["milwaukee bucks", "milwaukee", "bucks"].each do |nick|
  mil.nicknames.create(name: nick)
end


min = Team.create(name: "minnesota timberwolves", slug: "nba-min", league: league, schedule_url: "http://sports.yahoo.com/nba/teams/min/schedule/")
["minnesota timberwolves", "minnesota", "wolves", "timberwolves"].each do |nick|
  min.nicknames.create(name: nick)
end


no = Team.create(name: "new orleans pelicans", slug: "nba-no", league: league, schedule_url: "http://sports.yahoo.com/nba/teams/nor/schedule/")
["new orleans pelicans", "new orleans", "pelicans"].each do |nick|
  no.nicknames.create(name: nick)
end


ny = Team.create(name: "new york knicks", slug: "nba-ny", league: league, schedule_url: "http://sports.yahoo.com/nba/teams/nyk/schedule/")
["new york knicks", "knicks", "new york", "knickerbockers"].each do |nick|
  ny.nicknames.create(name: nick)
end


okc = Team.create(name: "oklahoma city thunder", slug: "nba-okc", league: league, schedule_url: "http://sports.yahoo.com/nba/teams/okc/schedule/")
["oklahoma city thunder", "oklahoma", "okc", "thunder", "sonics", "oklahoma city"].each do |nick|
  okc.nicknames.create(name: nick)
end


orl = Team.create(name: "orlando magic", slug: "nba-orl", league: league, schedule_url: "http://sports.yahoo.com/nba/teams/orl/schedule/")
["orlando magic", "orlando", "magic"].each do |nick|
  orl.nicknames.create(name: nick)
end


phi = Team.create(name: "philadelphia sixers", slug: "nba-phi", league: league, schedule_url: "http://sports.yahoo.com/nba/teams/phi/schedule/")
["philadelphia sixers","philadelphia", "seventy sixers", "sixers", "76ers"].each do |nick|
  phi.nicknames.create(name: nick)
end


pho = Team.create(name: "phoenix suns", slug: "nba-pho", league: league, schedule_url: "http://sports.yahoo.com/nba/teams/pho/schedule/")
["phoenix suns", "phoenix", "suns"].each do |nick|
  pho.nicknames.create(name: nick)
end


por = Team.create(name: "portland trail blazers", slug: "nba-por", league: league, schedule_url: "http://sports.yahoo.com/nba/teams/por/schedule/")
["portland trail blazers", "portland", "trail blazers", "blazers", "fourth seed"].each do |nick|
  por.nicknames.create(name: nick)
end


sac = Team.create(name: "sacramento kings", slug: "nba-sac", league: league, schedule_url: "http://sports.yahoo.com/nba/teams/sac/schedule/")
["sacramento kings", "sacramento", "kings"].each do |nick|
  sac.nicknames.create(name: nick)
end


sa = Team.create(name: "san antonio spurs", slug: "nba-sa", league: league, schedule_url: "http://sports.yahoo.com/nba/teams/sas/schedule/")
["san antonio spurs", "san antonio", "spurs"].each do |nick|
  sa.nicknames.create(name: nick)
end


tor = Team.create(name: "toronto raptors", slug: "nba-tor", league: league, schedule_url: "http://sports.yahoo.com/nba/teams/tor/schedule/")
["toronto raptors", "toronto", "raptors", "raps"].each do |nick|
  tor.nicknames.create(name: nick)
end


uta = Team.create(name: "utah jazz", slug: "nba-uta", league: league, schedule_url: "http://sports.yahoo.com/nba/teams/uth/schedule/")
["utah jazz", "utah", "jazz"].each do |nick|
  uta.nicknames.create(name: nick)
end


was = Team.create(name: "washington wizards", slug: "nba-was", league: league, schedule_url: "http://sports.yahoo.com/nba/teams/was/schedule/")
["washington wizards", "washington", "wizards"].each do |nick|
  was.nicknames.create(name: nick)
end
