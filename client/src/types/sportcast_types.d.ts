interface Email {
  address: any // eslint-disable-line
  created_at: string
  id: number
  last_code_generated_at: string
  updated_at: string
  user_id: number
  verified_at: string
  verified: boolean
}

interface Game {
  away_team: Team
  date: string
  home_team: Team
  id: number
  league: string
  tv_networks: string
}

interface GameWithNotifications {
  away_team: Team
  date: string
  home_team: Team
  id: number
  league: string
  tv_networks: string
  notifications: Preference[]
}

interface PhoneNumber {
  created_at: string
  id: number
  last_code_generated_at: string
  number: any // eslint-disable-line
  updated_at: string
  user_id: number
  verified_at: string
  verified: boolean
}

interface Preference {
  email: boolean
  id: number
  phone: boolean
  team: Team
  user: User
}

interface Team {
  name: string
  slug: string
}

interface TeamSelectOption {
  label: string
  value: string
  className: string
}

interface User {
  created_at: string
  email: Email
  id: number
  phone: PhoneNumber
  user_type: string
}
