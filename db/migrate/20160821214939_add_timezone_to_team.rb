class AddTimezoneToTeam < ActiveRecord::Migration
  def change
    add_column :teams, :timezone, :string
  end
end
