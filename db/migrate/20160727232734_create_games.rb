class CreateGames < ActiveRecord::Migration[5.2]
  def change
    create_table :games do |t|
      t.integer :home_team
      t.integer :away_team
      t.datetime :date
      t.string :tv_networks

      t.timestamps null: false
    end
    add_index :games, :home_team
    add_index :games, :away_team
    add_index :games, :date
  end
end
