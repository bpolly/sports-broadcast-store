class Game < ActiveRecord::Base
  def home_team
    Team.find(read_attribute(:home_team))
  end

  def away_team
    Team.find(read_attribute(:away_team))
  end
end
