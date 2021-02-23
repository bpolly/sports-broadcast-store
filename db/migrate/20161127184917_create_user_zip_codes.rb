class CreateUserZipCodes < ActiveRecord::Migration[5.2]
  def change
    create_table :user_zip_codes do |t|
      t.string :amz_id
      t.string :zip

      t.timestamps null: false
    end

    add_index :user_zip_codes, :amz_id
  end
end
