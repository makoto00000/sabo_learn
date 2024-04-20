class AddColumnToWallpapers < ActiveRecord::Migration[7.1]
  def change
    add_column :wallpapers, :is_default_solo, :boolean, default: false
    add_column :wallpapers, :is_default_multi, :boolean, default: false
  end
end
