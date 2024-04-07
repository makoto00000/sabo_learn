class CreateWallpapers < ActiveRecord::Migration[7.1]
  def change
    create_table :wallpapers do |t|
      t.string :title
      t.string :src
      t.integer :price

      t.timestamps
    end
  end
end
