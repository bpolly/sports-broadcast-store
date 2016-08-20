class AddLeagueToGames < ActiveRecord::Migration
  def change
    add_column :games, :league, :string
  end
end
