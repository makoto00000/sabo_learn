class CreateMusicParchaces < ActiveRecord::Migration[7.1]
  def change
    create_table :music_parchaces do |t|
      t.references :user, null: false, foreign_key: true
      t.references :music, null: false, foreign_key: true

      t.timestamps
    end
  end
end
