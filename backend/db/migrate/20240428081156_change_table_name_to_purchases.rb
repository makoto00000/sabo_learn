class ChangeTableNameToPurchases < ActiveRecord::Migration[7.1]
  def change
    rename_table :music_purchases, :music_purchases
    rename_table :wallpaper_purchases, :wallpaper_purchases
  end
end
