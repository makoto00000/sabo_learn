class WallpaperPurchase < ApplicationRecord
  belongs_to :user
  belongs_to :wallpaper
end
