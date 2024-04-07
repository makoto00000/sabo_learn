class Music < ApplicationRecord
  has_many :users, through: :music_parchaces
  has_many :music_parchaces, dependent: :destroy
  has_many :playlists, through: :playlist_musics
  has_many :playlist_musics, dependent: :destroy
end
