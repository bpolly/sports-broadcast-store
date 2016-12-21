class AddIndexToNicknameName < ActiveRecord::Migration
  def change
    add_index :nicknames, :name
  end
end
