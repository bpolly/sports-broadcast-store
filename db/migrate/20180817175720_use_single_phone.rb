class UseSinglePhone < ActiveRecord::Migration[5.0]
  def change
    remove_column :user_notification_preferences, :user_phone_id, :integer
    add_column :user_notification_preferences, :phone, :boolean, null: false, default: false
    remove_index :user_phones, :user_id
    add_index :user_phones, :user_id, unique: true
  end
end
