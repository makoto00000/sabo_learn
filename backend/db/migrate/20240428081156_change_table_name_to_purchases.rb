class ChangeTableNameToPurchases < ActiveRecord::Migration[7.1]
  def change
    rename_table :music_parchaces, :music_purchases
    rename_table :wallpaper_parchaces, :wallpaper_purchases
  end
end
