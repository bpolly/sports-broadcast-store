league = "mlb"

ari = Team.create(name: "arizona diamondbacks", slug: "mlb-ari", league: league, schedule_url: "http://arizona.diamondbacks.mlb.com/schedule/broadcast/index.jsp?c_id=ari", timezone: "mst")
["arizona diamondbacks", "arizona", "diamondbacks"].each do |nick|
  ari.nicknames.create(name: nick)
end

atl = Team.create(name: "atlanta braves", slug: "mlb-atl", league: league, schedule_url: "http://atlanta.braves.mlb.com/schedule/broadcast/index.jsp?c_id=atl", timezone: "et")
["atlanta braves", "atlanta", "braves"].each do |nick|
  atl.nicknames.create(name: nick)
end

bal = Team.create(name: "baltimore orioles", slug: "mlb-bal", league: league, schedule_url: "http://baltimore.orioles.mlb.com/schedule/broadcast/index.jsp?c_id=bal", timezone: "et")
["baltimore orioles", "baltimore", "orioles"].each do |nick|
  bal.nicknames.create(name: nick)
end

bos = Team.create(name: "boston red sox", slug: "mlb-bos", league: league, schedule_url: "http://boston.redsox.mlb.com/schedule/broadcast/index.jsp?c_id=bos", timezone: "et")
["boston red sox", "boston", "red sox"].each do |nick|
  bos.nicknames.create(name: nick)
end

chc = Team.create(name: "chicago cubs", slug: "mlb-chc", league: league, schedule_url: "http://chicago.cubs.mlb.com/schedule/broadcast/index.jsp?c_id=chc", timezone: "ct")
["chicago cubs", "cubs", "chicago"].each do |nick|
  chc.nicknames.create(name: nick)
end

chw = Team.create(name: "chicago white sox", slug: "mlb-chw", league: league, schedule_url: "http://chicago.whitesox.mlb.com/schedule/broadcast/index.jsp?c_id=chw", timezone: "ct")
["chicago white sox", "white sox", "chicago"].each do |nick|
  chw.nicknames.create(name: nick)
end

cin = Team.create(name: "cincinnati reds", slug: "mlb-cin", league: league, schedule_url: "http://cincinnati.reds.mlb.com/schedule/broadcast/index.jsp?c_id=cin", timezone: "et")
["cincinnati reds", "cincinnati", "reds"].each do |nick|
  cin.nicknames.create(name: nick)
end

cle = Team.create(name: "cleveland indians", slug: "mlb-cle", league: league, schedule_url: "http://cleveland.indians.mlb.com/schedule/broadcast/index.jsp?c_id=cle", timezone: "et")
["cleveland indians", "cleveland", "indians", "tribe"].each do |nick|
  cle.nicknames.create(name: nick)
end

col = Team.create(name: "colorado rockies", slug: "mlb-col", league: league, schedule_url: "http://colorado.rockies.mlb.com/schedule/broadcast/index.jsp?c_id=col", timezone: "mst")
["colorado rockies", "colorado", "rockies"].each do |nick|
  col.nicknames.create(name: nick)
end

det = Team.create(name: "detroit tigers", slug: "mlb-det", league: league, schedule_url: "http://detroit.tigers.mlb.com/schedule/broadcast/index.jsp?c_id=det", timezone: "et")
["detroit tigers", "detroit ", "tigers"].each do |nick|
  det.nicknames.create(name: nick)
end

hou = Team.create(name: "houston astros", slug: "mlb-hou", league: league, schedule_url: "http://houston.astros.mlb.com/schedule/broadcast/index.jsp?c_id=hou", timezone: "ct")
["houston astros", "houston ", "astros"].each do |nick|
  hou.nicknames.create(name: nick)
end

kc = Team.create(name: "kansas city royals", slug: "mlb-kc", league: league, schedule_url: "http://kansascity.royals.mlb.com/schedule/broadcast/index.jsp?c_id=kc", timezone: "ct")
["kansas city royals", "kansas city", "royals"].each do |nick|
  kc.nicknames.create(name: nick)
end

laa = Team.create(name: "los angeles angels", slug: "mlb-laa", league: league, schedule_url: "http://losangeles.angels.mlb.com/schedule/broadcast/index.jsp?c_id=laa", timezone: "pt")
["los angeles angels", "anaheim angels", "angels"].each do |nick|
  laa.nicknames.create(name: nick)
end

la = Team.create(name: "los angeles dodgers", slug: "mlb-la", league: league, schedule_url: "http://losangeles.dodgers.mlb.com/schedule/broadcast/index.jsp?c_id=la", timezone: "pt")
["los angeles dodgers", "dodgers", "los angeles", "la", "la dodgers"].each do |nick|
  la.nicknames.create(name: nick)
end

mia = Team.create(name: "miami marlins", slug: "mlb-mia", league: league, schedule_url: "http://miami.marlins.mlb.com/schedule/broadcast/index.jsp?c_id=mia", timezone: "et")
["miami marlins", "miami", "marlins"].each do |nick|
  mia.nicknames.create(name: nick)
end

mil = Team.create(name: "milwaukee brewers", slug: "mlb-mil", league: league, schedule_url: "http://milwaukee.brewers.mlb.com/schedule/broadcast/index.jsp?c_id=mil", timezone: "ct")
["milwaukee brewers", "milwaukee", "brewers"].each do |nick|
  mil.nicknames.create(name: nick)
end

min = Team.create(name: "minnesota twins", slug: "mlb-min", league: league, schedule_url: "http://minnesota.twins.mlb.com/schedule/broadcast/index.jsp?c_id=min", timezone: "ct")
["minnesota twins", "minnesota", "twins"].each do |nick|
  min.nicknames.create(name: nick)
end

nym = Team.create(name: "new york mets", slug: "mlb-nym", league: league, schedule_url: "http://newyork.mets.mlb.com/schedule/broadcast/index.jsp?c_id=nym", timezone: "et")
["new york mets", "mets"].each do |nick|
  nym.nicknames.create(name: nick)
end

nyy = Team.create(name: "new york yankees", slug: "mlb-nyy", league: league, schedule_url: "http://newyork.yankees.mlb.com/schedule/broadcast/index.jsp?c_id=nyy", timezone: "et")
["new york yankees", "yankees"].each do |nick|
  nyy.nicknames.create(name: nick)
end

oak = Team.create(name: "oakland athletics", slug: "mlb-oak", league: league, schedule_url: "http://oakland.athletics.mlb.com/schedule/broadcast/index.jsp?c_id=oak", timezone: "pt")
["oakland athletics", "oakland", "athletics"].each do |nick|
  oak.nicknames.create(name: nick)
end

phi = Team.create(name: "philadelphia phillies", slug: "mlb-phi", league: league, schedule_url: "http://philadelphia.phillies.mlb.com/schedule/broadcast/index.jsp?c_id=phi", timezone: "et")
["philadelphia phillies", "philadelphia", "phillies"].each do |nick|
  phi.nicknames.create(name: nick)
end

pit = Team.create(name: "pittsburgh pirates", slug: "mlb-pit", league: league, schedule_url: "http://pittsburgh.pirates.mlb.com/schedule/broadcast/index.jsp?c_id=pit", timezone: "et")
["pittsburgh pirates", "pittsburgh", "pirates"].each do |nick|
  pit.nicknames.create(name: nick)
end

sd = Team.create(name: "san diego padres", slug: "mlb-sd", league: league, schedule_url: "http://sandiego.padres.mlb.com/schedule/broadcast/index.jsp?c_id=sd", timezone: "pt")
["san diego padres", "san diego", "padres"].each do |nick|
  sd.nicknames.create(name: nick)
end

sf = Team.create(name: "san francisco giants", slug: "mlb-sf", league: league, schedule_url: "http://sanfrancisco.giants.mlb.com/schedule/broadcast/index.jsp?c_id=sf", timezone: "pt")
["san francisco giants", "san francisco", "giants"].each do |nick|
  sf.nicknames.create(name: nick)
end

sea = Team.create(name: "seattle mariners", slug: "mlb-sea", league: league, schedule_url: "http://seattle.mariners.mlb.com/schedule/broadcast/index.jsp?c_id=sea", timezone: "pt")
["seattle mariners", "seattle", "mariners"].each do |nick|
  sea.nicknames.create(name: nick)
end

stl = Team.create(name: "st. louis cardinals", slug: "mlb-stl", league: league, schedule_url: "http://stlouis.cardinals.mlb.com/schedule/broadcast/index.jsp?c_id=stl", timezone: "ct")
["st. louis cardinals", "st. louis", "cardinals"].each do |nick|
  stl.nicknames.create(name: nick)
end

tb = Team.create(name: "tampa bay rays", slug: "mlb-tb", league: league, schedule_url: "http://tampabay.rays.mlb.com/schedule/broadcast/index.jsp?c_id=tb", timezone: "et")
["tampa bay rays", "tampa bay", "rays"].each do |nick|
  tb.nicknames.create(name: nick)
end

tex = Team.create(name: "texas rangers", slug: "mlb-tex", league: league, schedule_url: "http://texas.rangers.mlb.com/schedule/broadcast/index.jsp?c_id=tex", timezone: "ct")
["texas rangers", "texas", "rangers"].each do |nick|
  tex.nicknames.create(name: nick)
end

tor = Team.create(name: "toronto blue jays", slug: "mlb-tor", league: league, schedule_url: "http://toronto.bluejays.mlb.com/schedule/broadcast/index.jsp?c_id=tor", timezone: "et")
["toronto blue jays", "toronto", "blue jays"].each do |nick|
  tor.nicknames.create(name: nick)
end

was = Team.create(name: "washington nationals", slug: "mlb-was", league: league, schedule_url: "http://washington.nationals.mlb.com/schedule/broadcast/index.jsp?c_id=was", timezone: "et")
["washington nationals", "washington", "nationals"].each do |nick|
  was.nicknames.create(name: nick)
end
