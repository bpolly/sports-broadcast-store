class UsePhoneIdOnNotificationPreferenceTable < ActiveRecord::Migration[5.0]
  def change
    remove_column :user_notification_preferences, :phone
    add_reference :user_notification_preferences, :user_phone, foreign_key: true
  end
end
