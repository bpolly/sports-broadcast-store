class CreateUserFavoriteTeams < ActiveRecord::Migration[5.0]
  def change
    create_table :user_favorite_teams do |t|
      t.references :user, foreign_key: true
      t.references :team, foreign_key: true
      t.boolean :deleted, default: false

      t.timestamps
    end
  end
end
