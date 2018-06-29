class CreateUserNotificationPreferences < ActiveRecord::Migration[5.0]
  def change
    create_table :user_notification_preferences do |t|
      t.references :user, foreign_key: true
      t.references :team, foreign_key: true
      t.string :phone
      t.string :callback_url
      t.string :email

      t.timestamps
    end
  end
end
