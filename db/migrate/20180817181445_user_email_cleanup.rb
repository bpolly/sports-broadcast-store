class UserEmailCleanup < ActiveRecord::Migration[5.0]
  def change
    remove_column :user_notification_preferences, :email, :string
    add_column :user_notification_preferences, :email, :boolean, null: false, default: false

    remove_index :user_emails, :user_id
    add_index :user_emails, :user_id, unique: true

    remove_column :users, :email
  end
end
