class CreateUserTypes < ActiveRecord::Migration[5.0]
  def change
    create_table :user_types do |t|
      t.string :name, null: false
      t.text :description, null: false

      t.timestamps
      t.index :name, unique: true
    end
  end
end
