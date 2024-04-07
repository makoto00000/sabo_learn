class CreateWallpaperParchaces < ActiveRecord::Migration[7.1]
  def change
    create_table :wallpaper_parchaces do |t|
      t.references :user, null: false, foreign_key: true
      t.references :wallpaper, null: false, foreign_key: true

      t.timestamps
    end
  end
end
