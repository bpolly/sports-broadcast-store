class AddUniquenessConstraints < ActiveRecord::Migration
  def change
    change_column :teams, :name, :string, unique: true
  end
end
