class GameSerializer < ActiveModel::Serializer
  attributes :id, :date, :tv_networks, :league, :home_team, :away_team

  def home_team
    object.home_team.name
  end

  def away_team
    object.away_team.name
  end
end
