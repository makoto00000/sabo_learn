class Playlist < ApplicationRecord
  belongs_to :user
  has_many :musics, through: :playlist_musics
end
