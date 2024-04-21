class Playlist < ApplicationRecord
  belongs_to :user
  has_many :playlist_musics, dependent: :destroy
  has_many :musics, through: :playlist_musics

end
