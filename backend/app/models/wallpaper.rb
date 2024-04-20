class Wallpaper < ApplicationRecord
  has_many :wallpaper_parchaces, dependent: :destroy
  has_many :users, through: :wallpaper_parchaces
end
