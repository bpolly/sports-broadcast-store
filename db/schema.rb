# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_09_29_022757) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "games", id: :serial, force: :cascade do |t|
    t.integer "home_team_id"
    t.integer "away_team_id"
    t.datetime "date"
    t.string "tv_networks"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "league"
    t.index ["away_team_id"], name: "index_games_on_away_team_id"
    t.index ["date"], name: "index_games_on_date"
    t.index ["home_team_id"], name: "index_games_on_home_team_id"
  end

  create_table "nicknames", id: :serial, force: :cascade do |t|
    t.string "name"
    t.integer "team_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_nicknames_on_name"
    t.index ["team_id"], name: "index_nicknames_on_team_id"
  end

  create_table "teams", id: :serial, force: :cascade do |t|
    t.string "name"
    t.string "league"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "slug", default: ""
    t.string "timezone"
    t.integer "nbc_team_id"
  end

  create_table "user_emails", id: :serial, force: :cascade do |t|
    t.string "address", null: false
    t.datetime "verified_at"
    t.string "verification_code", null: false
    t.integer "user_id", null: false
    t.datetime "last_code_generated_at", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["address"], name: "index_user_emails_on_address", unique: true
    t.index ["user_id"], name: "index_user_emails_on_user_id", unique: true
  end

  create_table "user_favorite_teams", id: :serial, force: :cascade do |t|
    t.integer "user_id"
    t.integer "team_id"
    t.boolean "deleted", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["team_id"], name: "index_user_favorite_teams_on_team_id"
    t.index ["user_id"], name: "index_user_favorite_teams_on_user_id"
  end

  create_table "user_notification_preferences", id: :serial, force: :cascade do |t|
    t.integer "user_id"
    t.integer "team_id"
    t.string "callback_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "phone", default: false, null: false
    t.boolean "email", default: false, null: false
    t.index ["team_id"], name: "index_user_notification_preferences_on_team_id"
    t.index ["user_id"], name: "index_user_notification_preferences_on_user_id"
  end

  create_table "user_phones", id: :serial, force: :cascade do |t|
    t.string "number", null: false
    t.string "verification_code", null: false
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "last_code_generated_at", null: false
    t.datetime "verified_at"
    t.index ["number"], name: "index_user_phones_on_number", unique: true
    t.index ["user_id"], name: "index_user_phones_on_user_id", unique: true
  end

  create_table "user_types", id: :serial, force: :cascade do |t|
    t.string "name", null: false
    t.text "description", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_user_types_on_name", unique: true
  end

  create_table "user_zip_codes", id: :serial, force: :cascade do |t|
    t.string "amz_id"
    t.string "zip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["amz_id"], name: "index_user_zip_codes_on_amz_id"
  end

  create_table "users", id: :serial, force: :cascade do |t|
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "user_type_id"
    t.index ["user_type_id"], name: "index_users_on_user_type_id"
  end

  add_foreign_key "user_emails", "users"
  add_foreign_key "user_favorite_teams", "teams"
  add_foreign_key "user_favorite_teams", "users"
  add_foreign_key "user_notification_preferences", "teams"
  add_foreign_key "user_notification_preferences", "users"
  add_foreign_key "user_phones", "users"
end
