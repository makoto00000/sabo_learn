class AddColumnToMusics < ActiveRecord::Migration[7.1]
  def change
    add_column :musics, :image, :string
    add_column :musics, :is_default, :boolean, default: false
  end
end
