league = "mlb"

ari = Team.find_or_create_by(name: "arizona diamondbacks", slug: "mlb-ari", league: league, timezone: "mst", nbc_team_id: 29)
["arizona diamondbacks", "arizona", "diamondbacks"].each do |nick|
  ari.nicknames.find_or_create_by(name: nick)
end

atl = Team.find_or_create_by(name: "atlanta braves", slug: "mlb-atl", league: league, timezone: "et", nbc_team_id: 15)
["atlanta braves", "atlanta", "braves"].each do |nick|
  atl.nicknames.find_or_create_by(name: nick)
end

bal = Team.find_or_create_by(name: "baltimore orioles", slug: "mlb-bal", league: league, timezone: "et", nbc_team_id: 1)
["baltimore orioles", "baltimore", "orioles"].each do |nick|
  bal.nicknames.find_or_create_by(name: nick)
end

bos = Team.find_or_create_by(name: "boston red sox", slug: "mlb-bos", league: league, timezone: "et", nbc_team_id: 2)
["boston red sox", "boston", "red sox"].each do |nick|
  bos.nicknames.find_or_create_by(name: nick)
end

chc = Team.find_or_create_by(name: "chicago cubs", slug: "mlb-chc", league: league, timezone: "ct", nbc_team_id: 16)
["chicago cubs", "cubs", "chicago"].each do |nick|
  chc.nicknames.find_or_create_by(name: nick)
end

chw = Team.find_or_create_by(name: "chicago white sox", slug: "mlb-chw", league: league, timezone: "ct", nbc_team_id: 4)
["chicago white sox", "white sox", "chicago"].each do |nick|
  chw.nicknames.find_or_create_by(name: nick)
end

cin = Team.find_or_create_by(name: "cincinnati reds", slug: "mlb-cin", league: league, timezone: "et", nbc_team_id: 17)
["cincinnati reds", "cincinnati", "reds"].each do |nick|
  cin.nicknames.find_or_create_by(name: nick)
end

cle = Team.find_or_create_by(name: "cleveland indians", slug: "mlb-cle", league: league, timezone: "et", nbc_team_id: 5)
["cleveland indians", "cleveland", "tribe", "indians"].each do |nick|
  cle.nicknames.find_or_create_by(name: nick)
end

col = Team.find_or_create_by(name: "colorado rockies", slug: "mlb-col", league: league, timezone: "mst", nbc_team_id: 27)
["colorado rockies", "colorado", "rockies"].each do |nick|
  col.nicknames.find_or_create_by(name: nick)
end

det = Team.find_or_create_by(name: "detroit tigers", slug: "mlb-det", league: league, timezone: "et", nbc_team_id: 6)
["detroit tigers", "detroit ", "tigers"].each do |nick|
  det.nicknames.find_or_create_by(name: nick)
end

hou = Team.find_or_create_by(name: "houston astros", slug: "mlb-hou", league: league, timezone: "ct", nbc_team_id: 18)
["houston astros", "houston ", "astros"].each do |nick|
  hou.nicknames.find_or_create_by(name: nick)
end

kc = Team.find_or_create_by(name: "kansas city royals", slug: "mlb-kc", league: league, timezone: "ct", nbc_team_id: 7)
["kansas city royals", "kansas city", "royals"].each do |nick|
  kc.nicknames.find_or_create_by(name: nick)
end

laa = Team.find_or_create_by(name: "los angeles angels", slug: "mlb-laa", league: league, timezone: "pt", nbc_team_id: 3)
["los angeles angels", "anaheim angels", "angels"].each do |nick|
  laa.nicknames.find_or_create_by(name: nick)
end

la = Team.find_or_create_by(name: "los angeles dodgers", slug: "mlb-la", league: league, timezone: "pt", nbc_team_id: 19)
["los angeles dodgers", "dodgers", "los angeles", "la", "l.a. dodgers"].each do |nick|
  la.nicknames.find_or_create_by(name: nick)
end

mia = Team.find_or_create_by(name: "miami marlins", slug: "mlb-mia", league: league, timezone: "et", nbc_team_id: 28)
["miami marlins", "miami", "marlins"].each do |nick|
  mia.nicknames.find_or_create_by(name: nick)
end

mil = Team.find_or_create_by(name: "milwaukee brewers", slug: "mlb-mil", league: league, timezone: "ct", nbc_team_id: 8)
["milwaukee brewers", "milwaukee", "brewers"].each do |nick|
  mil.nicknames.find_or_create_by(name: nick)
end

min = Team.find_or_create_by(name: "minnesota twins", slug: "mlb-min", league: league, timezone: "ct", nbc_team_id: 9)
["minnesota twins", "minnesota", "twins"].each do |nick|
  min.nicknames.find_or_create_by(name: nick)
end

nym = Team.find_or_create_by(name: "new york mets", slug: "mlb-nym", league: league, timezone: "et", nbc_team_id: 21)
["new york mets", "mets"].each do |nick|
  nym.nicknames.find_or_create_by(name: nick)
end

nyy = Team.find_or_create_by(name: "new york yankees", slug: "mlb-nyy", league: league, timezone: "et", nbc_team_id: 10)
["new york yankees", "yankees"].each do |nick|
  nyy.nicknames.find_or_create_by(name: nick)
end

oak = Team.find_or_create_by(name: "oakland athletics", slug: "mlb-oak", league: league, timezone: "pt", nbc_team_id: 11)
["oakland athletics", "oakland", "athletics"].each do |nick|
  oak.nicknames.find_or_create_by(name: nick)
end

phi = Team.find_or_create_by(name: "philadelphia phillies", slug: "mlb-phi", league: league, timezone: "et", nbc_team_id: 22)
["philadelphia phillies", "philadelphia", "phillies"].each do |nick|
  phi.nicknames.find_or_create_by(name: nick)
end

pit = Team.find_or_create_by(name: "pittsburgh pirates", slug: "mlb-pit", league: league, timezone: "et", nbc_team_id: 23)
["pittsburgh pirates", "pittsburgh", "pirates"].each do |nick|
  pit.nicknames.find_or_create_by(name: nick)
end

sd = Team.find_or_create_by(name: "san diego padres", slug: "mlb-sd", league: league, timezone: "pt", nbc_team_id: 25)
["san diego padres", "san diego", "padres"].each do |nick|
  sd.nicknames.find_or_create_by(name: nick)
end

sf = Team.find_or_create_by(name: "san francisco giants", slug: "mlb-sf", league: league, timezone: "pt", nbc_team_id: 26)
["san francisco giants", "san francisco", "giants"].each do |nick|
  sf.nicknames.find_or_create_by(name: nick)
end

sea = Team.find_or_create_by(name: "seattle mariners", slug: "mlb-sea", league: league, timezone: "pt", nbc_team_id: 12)
["seattle mariners", "seattle", "mariners"].each do |nick|
  sea.nicknames.find_or_create_by(name: nick)
end

stl = Team.find_or_create_by(name: "st. louis cardinals", slug: "mlb-stl", league: league, timezone: "ct", nbc_team_id: 24)
["st. louis cardinals", "st. louis", "cardinals"].each do |nick|
  stl.nicknames.find_or_create_by(name: nick)
end

tb = Team.find_or_create_by(name: "tampa bay rays", slug: "mlb-tb", league: league, timezone: "et", nbc_team_id: 30)
["tampa bay rays", "tampa bay", "rays"].each do |nick|
  tb.nicknames.find_or_create_by(name: nick)
end

tex = Team.find_or_create_by(name: "texas rangers", slug: "mlb-tex", league: league, timezone: "ct", nbc_team_id: 13)
["texas rangers", "texas", "rangers"].each do |nick|
  tex.nicknames.find_or_create_by(name: nick)
end

tor = Team.find_or_create_by(name: "toronto blue jays", slug: "mlb-tor", league: league, timezone: "et", nbc_team_id: 14)
["toronto blue jays", "toronto", "blue jays"].each do |nick|
  tor.nicknames.find_or_create_by(name: nick)
end

was = Team.find_or_create_by(name: "washington nationals", slug: "mlb-was", league: league, timezone: "et", nbc_team_id: 20)
["washington nationals", "washington", "nationals"].each do |nick|
  was.nicknames.find_or_create_by(name: nick)
end
