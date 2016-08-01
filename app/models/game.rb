class Game < ActiveRecord::Base
  def home_team
    Team.find(read_attribute(:home_team_id))
  end

  def away_team
    Team.find(read_attribute(:away_team_id))
  end
end
