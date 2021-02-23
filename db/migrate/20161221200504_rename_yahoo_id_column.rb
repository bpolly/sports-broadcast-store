class RenameYahooIdColumn < ActiveRecord::Migration[5.2]
  def change
    rename_column :teams, :yahoo_team_id, :nbc_team_id
  end
end
