league = "nfl"

ari = Team.find_or_create_by(name: "arizona cardinals", slug: "nfl-ari", league: league, nbc_team_id: 22)
["arizona cardinals", "arizona", "cardinals"].each do |nick|
  ari.nicknames.find_or_create_by(name: nick)
end

atl = Team.find_or_create_by(name: "atlanta falcons", slug: "nfl-atl", league: league, nbc_team_id: 1)
["atlanta falcons", "atlanta", "falcons"].each do |nick|
  atl.nicknames.find_or_create_by(name: nick)
end

bal = Team.find_or_create_by(name: "baltimore ravens", slug: "nfl-bal", league: league, nbc_team_id: 33)
["baltimore ravens", "baltimore", "ravens"].each do |nick|
  bal.nicknames.find_or_create_by(name: nick)
end

buf = Team.find_or_create_by(name: "buffalo bills", slug: "nfl-buf", league: league, nbc_team_id: 2)
["buffalo bills", "buffalo", "bills"].each do |nick|
  buf.nicknames.find_or_create_by(name: nick)
end

car = Team.find_or_create_by(name: "carolina panthers", slug: "nfl-car", league: league, nbc_team_id: 29)
["carolina panthers", "carolina", "panthers"].each do |nick|
  car.nicknames.find_or_create_by(name: nick)
end

chi = Team.find_or_create_by(name: "chicago bears", slug: "nfl-chi", league: league, nbc_team_id: 3)
["chicago bears", "chicago", "bears"].each do |nick|
  chi.nicknames.find_or_create_by(name: nick)
end

cin = Team.find_or_create_by(name: "cincinnati bengals", slug: "nfl-cin", league: league, nbc_team_id: 4)
["cincinnati bengals", "cincinnati", "bengals"].each do |nick|
  cin.nicknames.find_or_create_by(name: nick)
end

cle = Team.find_or_create_by(name: "cleveland browns", slug: "nfl-cle", league: league, nbc_team_id: 5)
["cleveland browns", "cleveland", "browns"].each do |nick|
  cle.nicknames.find_or_create_by(name: nick)
end

dal = Team.find_or_create_by(name: "dallas cowboys", slug: "nfl-dal", league: league, nbc_team_id: 6)
["dallas cowboys", "dallas", "cowboys"].each do |nick|
  dal.nicknames.find_or_create_by(name: nick)
end

den = Team.find_or_create_by(name: "denver broncos", slug: "nfl-den", league: league, nbc_team_id: 7)
["denver broncos", "denver", "broncos"].each do |nick|
  den.nicknames.find_or_create_by(name: nick)
end

det = Team.find_or_create_by(name: "detroit lions", slug: "nfl-det", league: league, nbc_team_id: 8)
["detroit lions", "detroit", "lions"].each do |nick|
  det.nicknames.find_or_create_by(name: nick)
end

gb = Team.find_or_create_by(name: "green bay packers", slug: "nfl-gb", league: league, nbc_team_id: 9)
["green bay packers", "green bay", "packers"].each do |nick|
  gb.nicknames.find_or_create_by(name: nick)
end

hou = Team.find_or_create_by(name: "houston texans", slug: "nfl-hou", league: league, nbc_team_id: 34)
["houston texans", "houston", "texans"].each do |nick|
  hou.nicknames.find_or_create_by(name: nick)
end

ind = Team.find_or_create_by(name: "indianapolis colts", slug: "nfl-ind", league: league, nbc_team_id: 11)
["indianapolis colts", "indianapolis", "colts"].each do |nick|
  ind.nicknames.find_or_create_by(name: nick)
end

jac = Team.find_or_create_by(name: "jacksonville jaguars", slug: "nfl-jac", league: league, nbc_team_id: 30)
["jacksonville jaguars", "jacksonville", "jaguars"].each do |nick|
  jac.nicknames.find_or_create_by(name: nick)
end

kc = Team.find_or_create_by(name: "kansas city chiefs", slug: "nfl-kc", league: league, nbc_team_id: 12)
["kansas city chiefs", "kansas city", "chiefs"].each do |nick|
  kc.nicknames.find_or_create_by(name: nick)
end

mia = Team.find_or_create_by(name: "miami dolphins", slug: "nfl-mia", league: league, nbc_team_id: 15)
["miami dolphins", "miami", "dolphins"].each do |nick|
  mia.nicknames.find_or_create_by(name: nick)
end

min = Team.find_or_create_by(name: "minnesota vikings", slug: "nfl-min", league: league, nbc_team_id: 16)
["minnesota vikings", "minnesota", "vikings"].each do |nick|
  min.nicknames.find_or_create_by(name: nick)
end

ne = Team.find_or_create_by(name: "new england patriots", slug: "nfl-ne", league: league, nbc_team_id: 17)
["new england patriots", "new england", "patriots"].each do |nick|
  ne.nicknames.find_or_create_by(name: nick)
end

no = Team.find_or_create_by(name: "new orleans saints", slug: "nfl-no", league: league, nbc_team_id: 18)
["new orleans saints", "new orleans", "saints"].each do |nick|
  no.nicknames.find_or_create_by(name: nick)
end

nyg = Team.find_or_create_by(name: "new york giants", slug: "nfl-nyg", league: league, nbc_team_id: 19)
["new york giants", "giants"].each do |nick|
  nyg.nicknames.find_or_create_by(name: nick)
end

nyj = Team.find_or_create_by(name: "new york jets", slug: "nfl-nyj", league: league, nbc_team_id: 20)
["new york jets", "jets"].each do |nick|
  nyj.nicknames.find_or_create_by(name: nick)
end

oak = Team.find_or_create_by(name: "oakland raiders", slug: "nfl-oak", league: league, nbc_team_id: 13)
["oakland raiders", "oakland", "raiders"].each do |nick|
  oak.nicknames.find_or_create_by(name: nick)
end

phi = Team.find_or_create_by(name: "philadelphia eagles", slug: "nfl-phi", league: league, nbc_team_id: 21)
["philadelphia eagles", "philadelphia", "eagles"].each do |nick|
  phi.nicknames.find_or_create_by(name: nick)
end

pit = Team.find_or_create_by(name: "pittsburgh steelers", slug: "nfl-pit", league: league, nbc_team_id: 23)
["pittsburgh steelers", "pittsburgh", "steelers"].each do |nick|
  pit.nicknames.find_or_create_by(name: nick)
end

sd = Team.find_or_create_by(name: "san diego chargers", slug: "nfl-sd", league: league, nbc_team_id: 24)
["san diego chargers", "san diego", "chargers"].each do |nick|
  sd.nicknames.find_or_create_by(name: nick)
end

sf = Team.find_or_create_by(name: "san francisco 49ers", slug: "nfl-sf", league: league, nbc_team_id: 25)
["san francisco 49ers", "san francisco", "49ers"].each do |nick|
  sf.nicknames.find_or_create_by(name: nick)
end

sea = Team.find_or_create_by(name: "seattle seahawks", slug: "nfl-sea", league: league, nbc_team_id: 26)
["seattle seahawks", "seattle", "seahawks"].each do |nick|
  sea.nicknames.find_or_create_by(name: nick)
end

la = Team.find_or_create_by(name: "los angeles rams", slug: "nfl-la", league: league, nbc_team_id: 14)
["los angeles rams", "los angeles", "rams", "la"].each do |nick|
  la.nicknames.find_or_create_by(name: nick)
end

tb = Team.find_or_create_by(name: "tampa bay buccaneers", slug: "nfl-tb", league: league, nbc_team_id: 27)
["tampa bay buccaneers", "tampa bay", "buccaneers"].each do |nick|
  tb.nicknames.find_or_create_by(name: nick)
end

ten = Team.find_or_create_by(name: "tennessee titans", slug: "nfl-ten", league: league, nbc_team_id: 10)
["tennessee titans", "tennessee", "titans"].each do |nick|
  ten.nicknames.find_or_create_by(name: nick)
end

was = Team.find_or_create_by(name: "washington redskins", slug: "nfl-was", league: league, nbc_team_id: 28)
["washington redskins", "washington", "redskins"].each do |nick|
  was.nicknames.find_or_create_by(name: nick)
end
