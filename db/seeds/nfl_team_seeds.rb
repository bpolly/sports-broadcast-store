league = "nfl"

ari = Team.create(name: "arizona cardinals", slug: "nfl-ari", league: league)
["arizona cardinals", "arizona", "cardinals"].each do |nick|
  ari.nicknames.create(name: nick)
end

atl = Team.create(name: "atlanta falcons", slug: "nfl-atl", league: league)
["atlanta falcons", "atlanta", "falcons"].each do |nick|
  atl.nicknames.create(name: nick)
end

bal = Team.create(name: "baltimore ravens", slug: "nfl-bal", league: league)
["baltimore ravens", "baltimore", "ravens"].each do |nick|
  bal.nicknames.create(name: nick)
end

buf = Team.create(name: "buffalo bills", slug: "nfl-buf", league: league)
["buffalo bills", "buffalo", "bills"].each do |nick|
  buf.nicknames.create(name: nick)
end

car = Team.create(name: "carolina panthers", slug: "nfl-car", league: league)
["carolina panthers", "carolina", "panthers"].each do |nick|
  car.nicknames.create(name: nick)
end

chi = Team.create(name: "chicago bears", slug: "nfl-chi", league: league)
["chicago bears", "chicago", "bears"].each do |nick|
  chi.nicknames.create(name: nick)
end

cin = Team.create(name: "cincinnati bengals", slug: "nfl-cin", league: league)
["cincinnati bengals", "cincinnati", "bengals"].each do |nick|
  cin.nicknames.create(name: nick)
end

cle = Team.create(name: "cleveland browns", slug: "nfl-cle", league: league)
["cleveland browns", "cleveland", "browns"].each do |nick|
  cle.nicknames.create(name: nick)
end

dal = Team.create(name: "dallas cowboys", slug: "nfl-dal", league: league)
["dallas cowboys", "dallas", "cowboys"].each do |nick|
  dal.nicknames.create(name: nick)
end

den = Team.create(name: "denver broncos", slug: "nfl-den", league: league)
["denver broncos", "denver", "broncos"].each do |nick|
  den.nicknames.create(name: nick)
end

det = Team.create(name: "detroit lions", slug: "nfl-det", league: league)
["detroit lions", "detroit", "lions"].each do |nick|
  det.nicknames.create(name: nick)
end

gb = Team.create(name: "green bay packers", slug: "nfl-gb", league: league)
["green bay packers", "green bay", "packers"].each do |nick|
  gb.nicknames.create(name: nick)
end

hou = Team.create(name: "houston texans", slug: "nfl-hou", league: league)
["houston texans", "houston", "texans"].each do |nick|
  hou.nicknames.create(name: nick)
end

ind = Team.create(name: "indianapolis colts", slug: "nfl-ind", league: league)
["indianapolis colts", "indianapolis", "colts"].each do |nick|
  ind.nicknames.create(name: nick)
end

jac = Team.create(name: "jacksonville jaguars", slug: "nfl-jac", league: league)
["jacksonville jaguars", "jacksonville", "jaguars"].each do |nick|
  jac.nicknames.create(name: nick)
end

kc = Team.create(name: "kansas city chiefs", slug: "nfl-kc", league: league)
["kansas city chiefs", "kansas city", "chiefs"].each do |nick|
  kc.nicknames.create(name: nick)
end

mia = Team.create(name: "miami dolphins", slug: "nfl-mia", league: league)
["miami dolphins", "miami", "dolphins"].each do |nick|
  mia.nicknames.create(name: nick)
end

min = Team.create(name: "minnesota vikings", slug: "nfl-min", league: league)
["minnesota vikings", "minnesota", "vikings"].each do |nick|
  min.nicknames.create(name: nick)
end

ne = Team.create(name: "new england patriots", slug: "nfl-ne", league: league)
["new england patriots", "new england", "patriots"].each do |nick|
  ne.nicknames.create(name: nick)
end

no = Team.create(name: "new orleans saints", slug: "nfl-no", league: league)
["new orleans saints", "new orleans", "saints"].each do |nick|
  no.nicknames.create(name: nick)
end

nyg = Team.create(name: "new york giants", slug: "nfl-nyg", league: league)
["new york giants", "giants"].each do |nick|
  nyg.nicknames.create(name: nick)
end

nyj = Team.create(name: "new york jets", slug: "nfl-nyj", league: league)
["new york jets", "jets"].each do |nick|
  nyj.nicknames.create(name: nick)
end

oak = Team.create(name: "oakland raiders", slug: "nfl-oak", league: league)
["oakland raiders", "oakland", "raiders"].each do |nick|
  oak.nicknames.create(name: nick)
end

phi = Team.create(name: "philadelphia eagles", slug: "nfl-phi", league: league)
["philadelphia eagles", "philadelphia", "eagles"].each do |nick|
  phi.nicknames.create(name: nick)
end

pit = Team.create(name: "pittsburgh steelers", slug: "nfl-pit", league: league)
["pittsburgh steelers", "pittsburgh", "steelers"].each do |nick|
  pit.nicknames.create(name: nick)
end

sd = Team.create(name: "san diego chargers", slug: "nfl-sd", league: league)
["san diego chargers", "san diego", "chargers"].each do |nick|
  sd.nicknames.create(name: nick)
end

sf = Team.create(name: "san francisco 49ers", slug: "nfl-sf", league: league)
["san francisco 49ers", "san francisco", "49ers"].each do |nick|
  sf.nicknames.create(name: nick)
end

sea = Team.create(name: "seattle seahawks", slug: "nfl-sea", league: league)
["seattle seahawks", "seattle", "seahawks"].each do |nick|
  sea.nicknames.create(name: nick)
end

stl = Team.create(name: "st. louis rams", slug: "nfl-stl", league: league)
["st. louis rams", "st. louis", "rams"].each do |nick|
  stl.nicknames.create(name: nick)
end

tb = Team.create(name: "tampa bay buccaneers", slug: "nfl-tb", league: league)
["tampa bay buccaneers", "tampa bay", "buccaneers"].each do |nick|
  tb.nicknames.create(name: nick)
end

ten = Team.create(name: "tennessee titans", slug: "nfl-ten", league: league)
["tennessee titans", "tennessee", "titans"].each do |nick|
  ten.nicknames.create(name: nick)
end

was = Team.create(name: "washington redskins", slug: "nfl-was", league: league)
["washington redskins", "washington", "redskins"].each do |nick|
  was.nicknames.create(name: nick)
end
