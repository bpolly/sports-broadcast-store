class AddTimezoneToTeam < ActiveRecord::Migration[5.2]
  def change
    add_column :teams, :timezone, :string
  end
end
