interface Game {
  home_team: Team;
  away_team: Team;
  tv_networks: string;
  date: string;
  league: string;
  id: number;
}

interface PhoneNumber {
  created_at: string;
  id: number;
  last_code_generated_at: string;
  number: any;
  updated_at: string;
  user_id: number;
  verified: boolean;
  verified_at: string;
}

interface Preference {
  callback_url: string;
  email: boolean;
  id: number;
  phone: boolean;
  team: Team;
}

interface Team {
  name: string;
  slug: string;
}

interface TeamSelectOption {
  label: string;
  value: string;
}
