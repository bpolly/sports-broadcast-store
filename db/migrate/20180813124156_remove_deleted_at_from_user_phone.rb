class RemoveDeletedAtFromUserPhone < ActiveRecord::Migration[5.0]
  def change
    remove_column :user_phones, :deleted_at, :datetime
  end
end
