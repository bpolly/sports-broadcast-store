league = "nfl"

ari = Team.create(name: "arizona cardinals", slug: "nfl-ari", league: league, schedule_url: "http://www.fbschedules.com/nfl-yy/YYYY-arizona-cardinals-football-schedule.php")
["arizona cardinals", "arizona", "cardinals"].each do |nick|
  ari.nicknames.create(name: nick)
end

atl = Team.create(name: "atlanta falcons", slug: "nfl-atl", league: league, schedule_url: "http://www.fbschedules.com/nfl-yy/YYYY-atlanta-hawks-football-schedule.php")
["atlanta falcons", "atlanta", "falcons"].each do |nick|
  atl.nicknames.create(name: nick)
end

bal = Team.create(name: "baltimore ravens", slug: "nfl-bal", league: league, schedule_url: "http://www.fbschedules.com/nfl-yy/YYYY-baltimore-ravens-football-schedule.php")
["baltimore ravens", "baltimore", "ravens"].each do |nick|
  bal.nicknames.create(name: nick)
end

buf = Team.create(name: "buffalo bills", slug: "nfl-buf", league: league, schedule_url: "http://www.fbschedules.com/nfl-yy/YYYY-buffalo-bills-football-schedule.php")
["buffalo bills", "buffalo", "bills"].each do |nick|
  buf.nicknames.create(name: nick)
end

car = Team.create(name: "carolina panthers", slug: "nfl-car", league: league, schedule_url: "http://www.fbschedules.com/nfl-yy/YYYY-carolina-panthers-football-schedule.php")
["carolina panthers", "carolina", "panthers"].each do |nick|
  car.nicknames.create(name: nick)
end

chi = Team.create(name: "chicago bears", slug: "nfl-chi", league: league, schedule_url: "http://www.fbschedules.com/nfl-yy/YYYY-chicago-bears-football-schedule.php")
["chicago bears", "chicago", "bears"].each do |nick|
  chi.nicknames.create(name: nick)
end

cin = Team.create(name: "cincinnati bengals", slug: "nfl-cin", league: league, schedule_url: "http://www.fbschedules.com/nfl-yy/YYYY-cincinnati-bengals-football-schedule.php")
["cincinnati bengals", "cincinnati", "bengals"].each do |nick|
  cin.nicknames.create(name: nick)
end

cle = Team.create(name: "cleveland browns", slug: "nfl-cle", league: league, schedule_url: "http://www.fbschedules.com/nfl-yy/YYYY-cleveland-browns-football-schedule.php")
["cleveland browns", "cleveland", "browns"].each do |nick|
  cle.nicknames.create(name: nick)
end

dal = Team.create(name: "dallas cowboys", slug: "nfl-dal", league: league, schedule_url: "http://www.fbschedules.com/nfl-yy/YYYY-dallas-cowboys-football-schedule.php")
["dallas cowboys", "dallas", "cowboys"].each do |nick|
  dal.nicknames.create(name: nick)
end

den = Team.create(name: "denver broncos", slug: "nfl-den", league: league, schedule_url: "http://www.fbschedules.com/nfl-yy/YYYY-denver-broncos-football-schedule.php")
["denver broncos", "denver", "broncos"].each do |nick|
  den.nicknames.create(name: nick)
end

det = Team.create(name: "detroit lions", slug: "nfl-det", league: league, schedule_url: "http://www.fbschedules.com/nfl-yy/YYYY-detroit-lions-football-schedule.php")
["detroit lions", "detroit", "lions"].each do |nick|
  det.nicknames.create(name: nick)
end

gb = Team.create(name: "green bay packers", slug: "nfl-gb", league: league, schedule_url: "http://www.fbschedules.com/nfl-yy/YYYY-green-bay-packers-football-schedule.php")
["green bay packers", "green bay", "packers"].each do |nick|
  gb.nicknames.create(name: nick)
end

hou = Team.create(name: "houston texans", slug: "nfl-hou", league: league, schedule_url: "http://www.fbschedules.com/nfl-yy/YYYY-houston-texans-football-schedule.php")
["houston texans", "houston", "texans"].each do |nick|
  hou.nicknames.create(name: nick)
end

ind = Team.create(name: "indianapolis colts", slug: "nfl-ind", league: league, schedule_url: "http://www.fbschedules.com/nfl-yy/YYYY-indianapolis-colts-football-schedule.php")
["indianapolis colts", "indianapolis", "colts"].each do |nick|
  ind.nicknames.create(name: nick)
end

jac = Team.create(name: "jacksonville jaguars", slug: "nfl-jac", league: league, schedule_url: "http://www.fbschedules.com/nfl-yy/YYYY-jacksonville-jaguars-football-schedule.php")
["jacksonville jaguars", "jacksonville", "jaguars"].each do |nick|
  jac.nicknames.create(name: nick)
end

kc = Team.create(name: "kansas city chiefs", slug: "nfl-kc", league: league, schedule_url: "http://www.fbschedules.com/nfl-yy/YYYY-kansas-city-chiefs-football-schedule.php")
["kansas city chiefs", "kansas city", "chiefs"].each do |nick|
  kc.nicknames.create(name: nick)
end

mia = Team.create(name: "miami dolphins", slug: "nfl-mia", league: league, schedule_url: "http://www.fbschedules.com/nfl-yy/YYYY-miami-dolphins-football-schedule.php")
["miami dolphins", "miami", "dolphins"].each do |nick|
  mia.nicknames.create(name: nick)
end

min = Team.create(name: "minnesota vikings", slug: "nfl-min", league: league, schedule_url: "http://www.fbschedules.com/nfl-yy/YYYY-minnesota-vikings-football-schedule.php")
["minnesota vikings", "minnesota", "vikings"].each do |nick|
  min.nicknames.create(name: nick)
end

ne = Team.create(name: "new england patriots", slug: "nfl-ne", league: league, schedule_url: "http://www.fbschedules.com/nfl-yy/YYYY-new-england-patriots-football-schedule.php")
["new england patriots", "new england", "patriots"].each do |nick|
  ne.nicknames.create(name: nick)
end

no = Team.create(name: "new orleans saints", slug: "nfl-no", league: league, schedule_url: "http://www.fbschedules.com/nfl-yy/YYYY-new-orleans-saints-football-schedule.php")
["new orleans saints", "new orleans", "saints"].each do |nick|
  no.nicknames.create(name: nick)
end

nyg = Team.create(name: "new york giants", slug: "nfl-nyg", league: league, schedule_url: "http://www.fbschedules.com/nfl-yy/YYYY-new-york-giants-football-schedule.php")
["new york giants", "giants"].each do |nick|
  nyg.nicknames.create(name: nick)
end

nyj = Team.create(name: "new york jets", slug: "nfl-nyj", league: league, schedule_url: "http://www.fbschedules.com/nfl-yy/YYYY-new-york-jets-football-schedule.php")
["new york jets", "jets"].each do |nick|
  nyj.nicknames.create(name: nick)
end

oak = Team.create(name: "oakland raiders", slug: "nfl-oak", league: league, schedule_url: "http://www.fbschedules.com/nfl-yy/YYYY-oakland-raiders-football-schedule.php")
["oakland raiders", "oakland", "raiders"].each do |nick|
  oak.nicknames.create(name: nick)
end

phi = Team.create(name: "philadelphia eagles", slug: "nfl-phi", league: league, schedule_url: "http://www.fbschedules.com/nfl-yy/YYYY-philadelphia-eagles-football-schedule.php")
["philadelphia eagles", "philadelphia", "eagles"].each do |nick|
  phi.nicknames.create(name: nick)
end

pit = Team.create(name: "pittsburgh steelers", slug: "nfl-pit", league: league, schedule_url: "http://www.fbschedules.com/nfl-yy/YYYY-pittsburgh-steelers-football-schedule.php")
["pittsburgh steelers", "pittsburgh", "steelers"].each do |nick|
  pit.nicknames.create(name: nick)
end

sd = Team.create(name: "san diego chargers", slug: "nfl-sd", league: league, schedule_url: "http://www.fbschedules.com/nfl-yy/YYYY-san-diego-chargers-football-schedule.php")
["san diego chargers", "san diego", "chargers"].each do |nick|
  sd.nicknames.create(name: nick)
end

sf = Team.create(name: "san francisco 49ers", slug: "nfl-sf", league: league, schedule_url: "http://www.fbschedules.com/nfl-yy/YYYY-san-fransisco-49ers-football-schedule.php")
["san francisco 49ers", "san francisco", "49ers"].each do |nick|
  sf.nicknames.create(name: nick)
end

sea = Team.create(name: "seattle seahawks", slug: "nfl-sea", league: league, schedule_url: "http://www.fbschedules.com/nfl-yy/YYYY-seattle-seahawks-football-schedule.php")
["seattle seahawks", "seattle", "seahawks"].each do |nick|
  sea.nicknames.create(name: nick)
end

la = Team.create(name: "los angeles rams", slug: "nfl-la", league: league, schedule_url: "http://www.fbschedules.com/nfl-yy/YYYY-los-angeles-rams-football-schedule.php")
["los angeles rams", "los angeles", "rams", "la"].each do |nick|
  la.nicknames.create(name: nick)
end

tb = Team.create(name: "tampa bay buccaneers", slug: "nfl-tb", league: league, schedule_url: "http://www.fbschedules.com/nfl-yy/YYYY-tampa-bay-buccaneers-football-schedule.php")
["tampa bay buccaneers", "tampa bay", "buccaneers"].each do |nick|
  tb.nicknames.create(name: nick)
end

ten = Team.create(name: "tennessee titans", slug: "nfl-ten", league: league, schedule_url: "http://www.fbschedules.com/nfl-yy/YYYY-tennessee-titans-football-schedule.php")
["tennessee titans", "tennessee", "titans"].each do |nick|
  ten.nicknames.create(name: nick)
end

was = Team.create(name: "washington redskins", slug: "nfl-was", league: league, schedule_url: "http://www.fbschedules.com/nfl-yy/YYYY-washington-redskins-football-schedule.php")
["washington redskins", "washington", "redskins"].each do |nick|
  was.nicknames.create(name: nick)
end
