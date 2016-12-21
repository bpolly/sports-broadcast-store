class RenameYahooIdColumn < ActiveRecord::Migration
  def change
    rename_column :teams, :yahoo_team_id, :nbc_team_id
  end
end
