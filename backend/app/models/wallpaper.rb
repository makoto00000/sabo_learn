class Wallpaper < ApplicationRecord
  has_many :users, through: :wallpaper_parchaces
  has_many :wallpaper_parchaces, dependent: :destroy
end
