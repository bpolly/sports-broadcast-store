class Team < ActiveRecord::Base
  def self.mlb_slug_options
    [
      "mlb-ari", "mlb-atl", "mlb-bal", "mlb-bos", "mlb-chc", "mlb-chw", "mlb-cin",
      "mlb-cle", "mlb-col", "mlb-det", "mlb-hou", "mlb-kc", "mlb-laa", "mlb-la",
      "mlb-mia", "mlb-mil", "mlb-min", "mlb-nym", "mlb-nyy", "mlb-oak", "mlb-phi",
      "mlb-pit", "mlb-sd", "mlb-sf", "mlb-sea", "mlb-stl", "mlb-tb", "mlb-tex",
      "mlb-tor", "mlb-was"
    ]
  end

  def self.nfl_team_slugs
    [
      "nfl-ari", "nfl-atl", "nfl-bal", "nfl-buf", "nfl-car", "nfl-chi", "nfl-cin",
      "nfl-cle", "nfl-dal", "nfl-den", "nfl-det", "nfl-gb", "nfl-hou", "nfl-ind",
      "nfl-jac", "nfl-kc", "nfl-mia", "nfl-min", "nfl-ne", "nfl-no", "nfl-nyg",
      "nfl-nyj", "nfl-oak", "nfl-phi", "nfl-pit", "nfl-sd", "nfl-sf", "nfl-sea",
      "nfl-stl", "nfl-tb", "nfl-ten", "nfl-was"
    ]
  end

  def self.nba_team_slugs
    [
      "nba-atl", "nba-bos", "nba-bk", "nba-cha", "nba-chi", "nba-cle", "nba-dal",
      "nba-den", "nba-det", "nba-gs", "nba-hou", "nba-ind", "nba-lac", "nba-lal",
      "nba-mem", "nba-mia", "nba-mil", "nba-min", "nba-no", "nba-ny", "nba-okc",
      "nba-orl", "nba-phi", "nba-pho", "nba-por", "nba-sac", "nba-sa", "nba-tor",
      "nba-uta", "nba-was"
    ]
  end

  def self.nhl_team_slugs
    [
      "nhl-ana", "nhl-ari", "nhl-bos", "nhl-buf", "nhl-cal", "nhl-car", "nhl-chi",
      "nhl-col", "nhl-clb", "nhl-dal", "nhl-det", "nhl-edm", "nhl-fla", "nhl-la",
      "nhl-min", "nhl-mon", "nhl-nas", "nhl-nj", "nhl-nyi", "nhl-nyr", "nhl-ott",
      "nhl-phi", "nhl-pit", "nhl-sj", "nhl-stl", "nhl-tb", "nhl-tor", "nhl-van",
      "nhl-was", "nhl-win"
    ]
  end
end
