class AddOrderToPlaylists < ActiveRecord::Migration[7.1]
  def change
    add_column :playlists, :music_order, :string, default: ""
  end
end
