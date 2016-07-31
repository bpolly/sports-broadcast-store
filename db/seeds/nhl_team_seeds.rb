league = "nhl"

ana = Team.create(name: "anaheim ducks", slug: "nhl-ana", league: league)
["anaheim ducks", "anaheim", "ducks"].each do |nick|
  ana.nicknames.create(name: nick)
end

ari = Team.create(name: "arizona coyotes", slug: "nhl-ari", league: league)
["arizona coyotes", "arizona", "coyotes"].each do |nick|
  ari.nicknames.create(name: nick)
end

bos = Team.create(name: "boston bruins", slug: "nhl-bos", league: league)
["boston bruins", "boston", "bruins"].each do |nick|
  bos.nicknames.create(name: nick)
end

buf = Team.create(name: "buffalo sabres", slug: "nhl-buf", league: league)
["buffalo sabres", "buffalo", "sabres"].each do |nick|
  buf.nicknames.create(name: nick)
end

cal = Team.create(name: "calgary flames", slug: "nhl-cal", league: league)
["calgary flames", "calgary", "flames"].each do |nick|
  cal.nicknames.create(name: nick)
end

car = Team.create(name: "carolina hurricanes", slug: "nhl-car", league: league)
["carolina hurricanes", "carolina", "hurricanes"].each do |nick|
  car.nicknames.create(name: nick)
end

chi = Team.create(name: "chicago blackhawks", slug: "nhl-chi", league: league)
["chicago blackhawks", "chicago", "blackhawks"].each do |nick|
  chi.nicknames.create(name: nick)
end

col = Team.create(name: "colorado avalanche", slug: "nhl-col", league: league)
["colorado avalanche", "colorado", "avalanche"].each do |nick|
  col.nicknames.create(name: nick)
end

clb = Team.create(name: "columbus blue jackets", slug: "nhl-clb", league: league)
["columbus blue jackets", "columbus", "blue jackets"].each do |nick|
  clb.nicknames.create(name: nick)
end

dal = Team.create(name: "dallas stars", slug: "nhl-dal", league: league)
["dallas stars", "dallas", "stars"].each do |nick|
  dal.nicknames.create(name: nick)
end

det = Team.create(name: "detroit red wings", slug: "nhl-det", league: league)
["detroit red wings", "detroit", "red wings"].each do |nick|
  det.nicknames.create(name: nick)
end

edm = Team.create(name: "edmonton oilers", slug: "nhl-edm", league: league)
["edmonton oilers", "edmonton", "oilers"].each do |nick|
  edm.nicknames.create(name: nick)
end

fla = Team.create(name: "florida panthers", slug: "nhl-fla", league: league)
["florida panthers", "florida", "panthers"].each do |nick|
  fla.nicknames.create(name: nick)
end

la = Team.create(name: "los angeles kings", slug: "nhl-la", league: league)
["los angeles kings", "los angeles", "kings"].each do |nick|
  la.nicknames.create(name: nick)
end

min = Team.create(name: "minnesota wild", slug: "nhl-min", league: league)
["minnesota wild", "minnesota", "wild"].each do |nick|
  min.nicknames.create(name: nick)
end

mon = Team.create(name: "montreal canadiens", slug: "nhl-mon", league: league)
["montreal canadiens", "montreal", "canadiens"].each do |nick|
  mon.nicknames.create(name: nick)
end

nas = Team.create(name: "nashville predators", slug: "nhl-nas", league: league)
["nashville predators", "nashville", "predators"].each do |nick|
  nas.nicknames.create(name: nick)
end

nj = Team.create(name: "new jersey devils", slug: "nhl-nj", league: league)
["new jersey devils", "new jersey", "devils"].each do |nick|
  nj.nicknames.create(name: nick)
end

nyi = Team.create(name: "new york islanders", slug: "nhl-nyi", league: league)
["new york islanders", "new york", "islanders"].each do |nick|
  nyi.nicknames.create(name: nick)
end

nyr = Team.create(name: "new york rangers", slug: "nhl-nyr", league: league)
["new york rangers", "new york", "rangers"].each do |nick|
  nyr.nicknames.create(name: nick)
end

ott = Team.create(name: "ottawa senators", slug: "nhl-ott", league: league)
["ottawa senators", "ottawa", "senators"].each do |nick|
  ott.nicknames.create(name: nick)
end

phi = Team.create(name: "philadelphia flyers", slug: "nhl-phi", league: league)
["philadelphia flyers", "philadelphia", "flyers"].each do |nick|
  phi.nicknames.create(name: nick)
end

pit = Team.create(name: "pittsburgh penguins", slug: "nhl-pit", league: league)
["pittsburgh penguins", "pittsburgh", "penguins"].each do |nick|
  pit.nicknames.create(name: nick)
end

sj = Team.create(name: "san jose sharks", slug: "nhl-sj", league: league)
["san jose sharks", "san jose", "sharks"].each do |nick|
  sj.nicknames.create(name: nick)
end

stl = Team.create(name: "st. louis blues", slug: "nhl-stl", league: league)
["st. louis blues", "st. louis", "blues"].each do |nick|
  stl.nicknames.create(name: nick)
end

tb = Team.create(name: "tampa bay lightning", slug: "nhl-tb", league: league)
["tampa bay lightning", "tampa bay", "lightning"].each do |nick|
  tb.nicknames.create(name: nick)
end

tor = Team.create(name: "toronto maple leafs", slug: "nhl-tor", league: league)
["toronto maple leafs", "toronto", "maple leafs"].each do |nick|
  tor.nicknames.create(name: nick)
end

van = Team.create(name: "vancouver canucks", slug: "nhl-van", league: league)
["vancouver canucks", "vancouver", "canucks"].each do |nick|
  van.nicknames.create(name: nick)
end

was = Team.create(name: "washington capitals", slug: "nhl-was", league: league)
["washington capitals", "washington", "capitals"].each do |nick|
  was.nicknames.create(name: nick)
end

win = Team.create(name: "winnipeg jets", slug: "nhl-win", league: league)
["winnipeg jets", "winnipeg", "jets"].each do |nick|
  win.nicknames.create(name: nick)
end
