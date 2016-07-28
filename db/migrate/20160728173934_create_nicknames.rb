class CreateNicknames < ActiveRecord::Migration
  def change
    create_table :nicknames do |t|
      t.string :name
      t.integer :team_id

      t.timestamps null: false
    end
    add_index :nicknames, :team_id
  end
end
