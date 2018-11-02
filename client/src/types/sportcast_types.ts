export interface Game {
  home_team: Team;
  away_team: Team;
  tv_networks: string;
  date: string;
  league: string;
  id: number;
}

export interface Team {
  name: string;
  slug: string;
}

export interface PhoneNumber {
  created_at: string;
  id: number;
  last_code_generated_at: string;
  number: any;
  updated_at: string;
  user_id: number;
  verified: boolean;
  verified_at: string;
}
