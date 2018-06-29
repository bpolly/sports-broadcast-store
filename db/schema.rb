# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180629163817) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "games", force: :cascade do |t|
    t.integer  "home_team_id"
    t.integer  "away_team_id"
    t.datetime "date"
    t.string   "tv_networks"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.string   "league"
    t.index ["away_team_id"], name: "index_games_on_away_team_id", using: :btree
    t.index ["date"], name: "index_games_on_date", using: :btree
    t.index ["home_team_id"], name: "index_games_on_home_team_id", using: :btree
  end

  create_table "nicknames", force: :cascade do |t|
    t.string   "name"
    t.integer  "team_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_nicknames_on_name", using: :btree
    t.index ["team_id"], name: "index_nicknames_on_team_id", using: :btree
  end

  create_table "teams", force: :cascade do |t|
    t.string   "name"
    t.string   "league"
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.string   "slug",        default: ""
    t.string   "timezone"
    t.integer  "nbc_team_id"
  end

  create_table "user_notification_preferences", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "team_id"
    t.string   "phone"
    t.string   "callback_url"
    t.string   "email"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.index ["team_id"], name: "index_user_notification_preferences_on_team_id", using: :btree
    t.index ["user_id"], name: "index_user_notification_preferences_on_user_id", using: :btree
  end

  create_table "user_zip_codes", force: :cascade do |t|
    t.string   "amz_id"
    t.string   "zip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["amz_id"], name: "index_user_zip_codes_on_amz_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "email"
    t.string   "password_digest"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_foreign_key "user_notification_preferences", "teams"
  add_foreign_key "user_notification_preferences", "users"
end
