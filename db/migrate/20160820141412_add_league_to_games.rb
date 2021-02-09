class AddLeagueToGames < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :league, :string
  end
end
