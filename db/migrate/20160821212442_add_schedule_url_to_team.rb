class AddScheduleUrlToTeam < ActiveRecord::Migration[5.2]
  def change
    add_column :teams, :schedule_url, :string
  end
end
