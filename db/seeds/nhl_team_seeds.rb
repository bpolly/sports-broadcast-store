league = "nhl"

ana = Team.find_or_create_by(name: "anaheim ducks", slug: "nhl-ana", league: league)
["anaheim ducks", "anaheim", "ducks"].each do |nick|
  ana.nicknames.find_or_create_by(name: nick)
end

ari = Team.find_or_create_by(name: "arizona coyotes", slug: "nhl-ari", league: league)
["arizona coyotes", "arizona", "coyotes"].each do |nick|
  ari.nicknames.find_or_create_by(name: nick)
end

bos = Team.find_or_create_by(name: "boston bruins", slug: "nhl-bos", league: league)
["boston bruins", "boston", "bruins"].each do |nick|
  bos.nicknames.find_or_create_by(name: nick)
end

buf = Team.find_or_create_by(name: "buffalo sabres", slug: "nhl-buf", league: league)
["buffalo sabres", "buffalo", "sabres"].each do |nick|
  buf.nicknames.find_or_create_by(name: nick)
end

cal = Team.find_or_create_by(name: "calgary flames", slug: "nhl-cal", league: league)
["calgary flames", "calgary", "flames"].each do |nick|
  cal.nicknames.find_or_create_by(name: nick)
end

car = Team.find_or_create_by(name: "carolina hurricanes", slug: "nhl-car", league: league)
["carolina hurricanes", "carolina", "hurricanes"].each do |nick|
  car.nicknames.find_or_create_by(name: nick)
end

chi = Team.find_or_create_by(name: "chicago blackhawks", slug: "nhl-chi", league: league)
["chicago blackhawks", "chicago", "blackhawks"].each do |nick|
  chi.nicknames.find_or_create_by(name: nick)
end

col = Team.find_or_create_by(name: "colorado avalanche", slug: "nhl-col", league: league)
["colorado avalanche", "colorado", "avalanche"].each do |nick|
  col.nicknames.find_or_create_by(name: nick)
end

clb = Team.find_or_create_by(name: "columbus blue jackets", slug: "nhl-clb", league: league)
["columbus blue jackets", "columbus", "blue jackets"].each do |nick|
  clb.nicknames.find_or_create_by(name: nick)
end

dal = Team.find_or_create_by(name: "dallas stars", slug: "nhl-dal", league: league)
["dallas stars", "dallas", "stars"].each do |nick|
  dal.nicknames.find_or_create_by(name: nick)
end

det = Team.find_or_create_by(name: "detroit red wings", slug: "nhl-det", league: league)
["detroit red wings", "detroit", "red wings"].each do |nick|
  det.nicknames.find_or_create_by(name: nick)
end

edm = Team.find_or_create_by(name: "edmonton oilers", slug: "nhl-edm", league: league)
["edmonton oilers", "edmonton", "oilers"].each do |nick|
  edm.nicknames.find_or_create_by(name: nick)
end

fla = Team.find_or_create_by(name: "florida panthers", slug: "nhl-fla", league: league)
["florida panthers", "florida", "panthers"].each do |nick|
  fla.nicknames.find_or_create_by(name: nick)
end

la = Team.find_or_create_by(name: "los angeles kings", slug: "nhl-la", league: league)
["los angeles kings", "los angeles", "kings"].each do |nick|
  la.nicknames.find_or_create_by(name: nick)
end

min = Team.find_or_create_by(name: "minnesota wild", slug: "nhl-min", league: league)
["minnesota wild", "minnesota", "wild"].each do |nick|
  min.nicknames.find_or_create_by(name: nick)
end

mon = Team.find_or_create_by(name: "montreal canadiens", slug: "nhl-mon", league: league)
["montreal canadiens", "montreal", "canadiens"].each do |nick|
  mon.nicknames.find_or_create_by(name: nick)
end

nas = Team.find_or_create_by(name: "nashville predators", slug: "nhl-nas", league: league)
["nashville predators", "nashville", "predators"].each do |nick|
  nas.nicknames.find_or_create_by(name: nick)
end

nj = Team.find_or_create_by(name: "new jersey devils", slug: "nhl-nj", league: league)
["new jersey devils", "new jersey", "devils"].each do |nick|
  nj.nicknames.find_or_create_by(name: nick)
end

nyi = Team.find_or_create_by(name: "new york islanders", slug: "nhl-nyi", league: league)
["new york islanders", "new york", "islanders"].each do |nick|
  nyi.nicknames.find_or_create_by(name: nick)
end

nyr = Team.find_or_create_by(name: "new york rangers", slug: "nhl-nyr", league: league)
["new york rangers", "new york", "rangers"].each do |nick|
  nyr.nicknames.find_or_create_by(name: nick)
end

ott = Team.find_or_create_by(name: "ottawa senators", slug: "nhl-ott", league: league)
["ottawa senators", "ottawa", "senators"].each do |nick|
  ott.nicknames.find_or_create_by(name: nick)
end

phi = Team.find_or_create_by(name: "philadelphia flyers", slug: "nhl-phi", league: league)
["philadelphia flyers", "philadelphia", "flyers"].each do |nick|
  phi.nicknames.find_or_create_by(name: nick)
end

pit = Team.find_or_create_by(name: "pittsburgh penguins", slug: "nhl-pit", league: league)
["pittsburgh penguins", "pittsburgh", "penguins"].each do |nick|
  pit.nicknames.find_or_create_by(name: nick)
end

sj = Team.find_or_create_by(name: "san jose sharks", slug: "nhl-sj", league: league)
["san jose sharks", "san jose", "sharks"].each do |nick|
  sj.nicknames.find_or_create_by(name: nick)
end

stl = Team.find_or_create_by(name: "st. louis blues", slug: "nhl-stl", league: league)
["st. louis blues", "st. louis", "blues"].each do |nick|
  stl.nicknames.find_or_create_by(name: nick)
end

tb = Team.find_or_create_by(name: "tampa bay lightning", slug: "nhl-tb", league: league)
["tampa bay lightning", "tampa bay", "lightning"].each do |nick|
  tb.nicknames.find_or_create_by(name: nick)
end

tor = Team.find_or_create_by(name: "toronto maple leafs", slug: "nhl-tor", league: league)
["toronto maple leafs", "toronto", "maple leafs"].each do |nick|
  tor.nicknames.find_or_create_by(name: nick)
end

van = Team.find_or_create_by(name: "vancouver canucks", slug: "nhl-van", league: league)
["vancouver canucks", "vancouver", "canucks"].each do |nick|
  van.nicknames.find_or_create_by(name: nick)
end

was = Team.find_or_create_by(name: "washington capitals", slug: "nhl-was", league: league)
["washington capitals", "washington", "capitals"].each do |nick|
  was.nicknames.find_or_create_by(name: nick)
end

win = Team.find_or_create_by(name: "winnipeg jets", slug: "nhl-win", league: league)
["winnipeg jets", "winnipeg", "jets"].each do |nick|
  win.nicknames.find_or_create_by(name: nick)
end
