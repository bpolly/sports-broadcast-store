class CreateUserEmails < ActiveRecord::Migration[5.0]
  def change
    create_table :user_emails do |t|
      t.string :email_address, null: false
      t.string :verification_code, null: false
      t.references :user, foreign_key: true, null: false
      t.datetime :last_code_generated_at, null: false
      t.datetime :verified_at

      t.timestamps
    end
  end
end
