class AddIndexToNicknameName < ActiveRecord::Migration[5.2]
  def change
    add_index :nicknames, :name
  end
end
