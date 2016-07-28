class CreateTeams < ActiveRecord::Migration
  def change
    create_table :teams do |t|
      t.string :name
      t.string :league

      t.timestamps null: false
    end
  end
end
