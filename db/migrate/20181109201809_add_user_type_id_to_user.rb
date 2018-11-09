class AddUserTypeIdToUser < ActiveRecord::Migration[5.0]
  def change
    add_reference :users, :user_type, index: true
  end
end
