league = "mlb"

ari = Team.create(name: "arizona diamondbacks", slug: "mlb-ari", league: league)
["arizona diamondbacks", "arizona", "diamondbacks"].each do |nick|
  ari.nicknames.create(name: nick)
end

atl = Team.create(name: "atlanta braves", slug: "mlb-atl", league: league)
["atlanta braves", "atlanta", "braves"].each do |nick|
  atl.nicknames.create(name: nick)
end

bal = Team.create(name: "baltimore orioles", slug: "mlb-bal", league: league)
["baltimore orioles", "baltimore", "orioles"].each do |nick|
  bal.nicknames.create(name: nick)
end

bos = Team.create(name: "boston red sox", slug: "mlb-bos", league: league)
["boston red sox", "boston", "red sox"].each do |nick|
  bos.nicknames.create(name: nick)
end

chc = Team.create(name: "chicago cubs", slug: "mlb-chc", league: league)
["chicago cubs", "cubs"].each do |nick|
  chc.nicknames.create(name: nick)
end

chw = Team.create(name: "chicago white sox", slug: "mlb-chw", league: league)
["chicago white sox", "white sox"].each do |nick|
  chw.nicknames.create(name: nick)
end

cin = Team.create(name: "cincinnati reds", slug: "mlb-cin", league: league)
["cincinnati reds", "cincinnati", "reds"].each do |nick|
  cin.nicknames.create(name: nick)
end

cle = Team.create(name: "cleveland indians", slug: "mlb-cle", league: league)
["cleveland indians", "cleveland", "indians", "tribe"].each do |nick|
  cle.nicknames.create(name: nick)
end

col = Team.create(name: "colorado rockies", slug: "mlb-col", league: league)
["colorado rockies", "colorado", "rockies"].each do |nick|
  col.nicknames.create(name: nick)
end

det = Team.create(name: "detroit tigers", slug: "mlb-det", league: league)
["detroit tigers", "detroit ", "tigers"].each do |nick|
  det.nicknames.create(name: nick)
end

hou = Team.create(name: "houston astros", slug: "mlb-hou", league: league)
["houston astros", "houston ", "astros"].each do |nick|
  hou.nicknames.create(name: nick)
end

kc = Team.create(name: "kansas city royals", slug: "mlb-kc", league: league)
["kansas city royals", "kansas city", "royals"].each do |nick|
  kc.nicknames.create(name: nick)
end

laa = Team.create(name: "los angeles angels", slug: "mlb-laa", league: league)
["los angeles angels", "anaheim angels", "angels"].each do |nick|
  laa.nicknames.create(name: nick)
end

la = Team.create(name: "los angeles dodgers", slug: "mlb-la", league: league)
["los angeles dodgers", "dodgers", "los angeles", "la", "la dodgers"].each do |nick|
  la.nicknames.create(name: nick)
end

mia = Team.create(name: "miami marlins", slug: "mlb-mia", league: league)
["miami marlins", "miami", "marlins"].each do |nick|
  mia.nicknames.create(name: nick)
end

mil = Team.create(name: "milwaukee brewers", slug: "mlb-mil", league: league)
["milwaukee brewers", "milwaukee", "brewers"].each do |nick|
  mil.nicknames.create(name: nick)
end

min = Team.create(name: "minnesota twins", slug: "mlb-min", league: league)
["minnesota twins", "minnesota", "twins"].each do |nick|
  min.nicknames.create(name: nick)
end

nym = Team.create(name: "new york mets", slug: "mlb-nym", league: league)
["new york mets", "mets"].each do |nick|
  nym.nicknames.create(name: nick)
end

nyy = Team.create(name: "new york yankees", slug: "mlb-nyy", league: league)
["new york yankees", "yankees"].each do |nick|
  nyy.nicknames.create(name: nick)
end

oak = Team.create(name: "oakland athletics", slug: "mlb-oak", league: league)
["oakland athletics", "oakland", "athletics"].each do |nick|
  oak.nicknames.create(name: nick)
end

phi = Team.create(name: "philadelphia phillies", slug: "mlb-phi", league: league)
["philadelphia phillies", "philadelphia", "phillies"].each do |nick|
  phi.nicknames.create(name: nick)
end

pit = Team.create(name: "pittsburgh pirates", slug: "mlb-pit", league: league)
["pittsburgh pirates", "pittsburgh", "pirates"].each do |nick|
  pit.nicknames.create(name: nick)
end

sd = Team.create(name: "san diego padres", slug: "mlb-sd", league: league)
["san diego padres", "san diego", "padres"].each do |nick|
  sd.nicknames.create(name: nick)
end

sf = Team.create(name: "san francisco giants", slug: "mlb-sf", league: league)
["san francisco giants", "san francisco", "giants"].each do |nick|
  sf.nicknames.create(name: nick)
end

sea = Team.create(name: "seattle mariners", slug: "mlb-sea", league: league)
["seattle mariners", "seattle", "mariners"].each do |nick|
  sea.nicknames.create(name: nick)
end

stl = Team.create(name: "st. louis cardinals", slug: "mlb-stl", league: league)
["st. louis cardinals", "st. louis", "cardinals"].each do |nick|
  stl.nicknames.create(name: nick)
end

tb = Team.create(name: "tampa bay rays", slug: "mlb-tb", league: league)
["tampa bay rays", "tampa bay", "rays"].each do |nick|
  tb.nicknames.create(name: nick)
end

tex = Team.create(name: "texas rangers", slug: "mlb-tex", league: league)
["texas rangers", "texas", "rangers"].each do |nick|
  tex.nicknames.create(name: nick)
end

tor = Team.create(name: "toronto blue jays", slug: "mlb-tor", league: league)
["toronto blue jays", "toronto", "blue jays"].each do |nick|
  tor.nicknames.create(name: nick)
end

was = Team.create(name: "washington nationals", slug: "mlb-was", league: league)
["washington nationals", "washington", "nationals"].each do |nick|
  was.nicknames.create(name: nick)
end
