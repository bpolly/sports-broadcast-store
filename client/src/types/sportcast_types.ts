export interface Game {
  home_team: Team;
  away_team: Team;
  tv_networks: string;
  date: string;
  league: string;
}

export interface Team {
  name: string;
  slug: string;
}
