class AddUserPhoneNumberUniquenessConstraint < ActiveRecord::Migration[5.0]
  def change
    add_index :user_phones, :number, unique: true
  end
end
