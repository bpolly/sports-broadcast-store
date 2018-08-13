class UseEmailIdOnNotificationPreferenceTable < ActiveRecord::Migration[5.0]
  def change
    remove_column :user_notification_preferences, :email
    add_reference :user_notification_preferences, :user_email, foreign_key: true
  end
end
