class Wallpaper < ApplicationRecord
  has_many :wallpaper_purchases, dependent: :destroy
  has_many :users, through: :wallpaper_purchases
end
