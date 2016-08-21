class AddScheduleUrlToTeam < ActiveRecord::Migration
  def change
    add_column :teams, :schedule_url, :string
  end
end
