class AddForeignKeysToUsers < ActiveRecord::Migration[7.1]
  def change
    add_reference :users, :solo_wallpaper, foreign_key: { to_table: :wallpapers }
    add_reference :users, :multi_wallpaper, foreign_key: { to_table: :wallpapers }
  end
end
