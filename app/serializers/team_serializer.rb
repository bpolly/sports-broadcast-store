class TeamSerializer < ActiveModel::Serializer
  attributes :name, :league, :created_at, :updated_at, :slug, :timezone, :nbc_team_id
end
