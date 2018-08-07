class CreateUserPhones < ActiveRecord::Migration[5.0]
  def change
    create_table :user_phones do |t|
      t.string :number, null: false
      t.boolean :verified, null: false, default: false
      t.string :verification_code
      t.references :user, foreign_key: true, null: false

      t.timestamps
    end
  end
end
