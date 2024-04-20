class Api::V1::WallpapersController < ApplicationController
  def all_wallpapers
    @wallpapers = Wallpaper.where(is_default_solo: false, is_default_multi: false)
    render json: {wallpapers: @wallpapers}
  end
end
