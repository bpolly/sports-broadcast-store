class AddUniquenessConstraints < ActiveRecord::Migration[5.2]
  def change
    change_column :teams, :name, :string, unique: true
  end
end
