# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_04_07_095546) do
  create_table "music_parchaces", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "music_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["music_id"], name: "index_music_parchaces_on_music_id"
    t.index ["user_id"], name: "index_music_parchaces_on_user_id"
  end

  create_table "musics", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "title"
    t.string "artist"
    t.string "src"
    t.integer "price"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "playlist_musics", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "playlist_id", null: false
    t.bigint "music_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["music_id"], name: "index_playlist_musics_on_music_id"
    t.index ["playlist_id"], name: "index_playlist_musics_on_playlist_id"
  end

  create_table "playlists", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_playlists_on_user_id"
  end

  create_table "users", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "password_digest"
    t.integer "coin", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.date "birthday"
    t.string "provider"
    t.string "uid"
    t.bigint "solo_wallpaper_id"
    t.bigint "multi_wallpaper_id"
    t.index ["multi_wallpaper_id"], name: "index_users_on_multi_wallpaper_id"
    t.index ["name", "email"], name: "index_users_on_name_and_email", unique: true
    t.index ["solo_wallpaper_id"], name: "index_users_on_solo_wallpaper_id"
  end

  create_table "wallpaper_parchaces", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "wallpaper_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_wallpaper_parchaces_on_user_id"
    t.index ["wallpaper_id"], name: "index_wallpaper_parchaces_on_wallpaper_id"
  end

  create_table "wallpapers", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "title"
    t.string "src"
    t.integer "price"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "music_parchaces", "musics"
  add_foreign_key "music_parchaces", "users"
  add_foreign_key "playlist_musics", "musics"
  add_foreign_key "playlist_musics", "playlists"
  add_foreign_key "playlists", "users"
  add_foreign_key "users", "wallpapers", column: "multi_wallpaper_id"
  add_foreign_key "users", "wallpapers", column: "solo_wallpaper_id"
  add_foreign_key "wallpaper_parchaces", "users"
  add_foreign_key "wallpaper_parchaces", "wallpapers"
end
