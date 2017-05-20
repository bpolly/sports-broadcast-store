class ChangeScheduleUrlToYahooId < ActiveRecord::Migration
  def change
    remove_column :teams, :schedule_url
    add_column :teams, :yahoo_team_id, :integer
  end
end
