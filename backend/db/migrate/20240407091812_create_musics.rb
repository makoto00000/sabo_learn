class CreateMusics < ActiveRecord::Migration[7.1]
  def change
    create_table :musics do |t|
      t.string :title
      t.string :artist
      t.string :src
      t.integer :price

      t.timestamps
    end
  end
end
