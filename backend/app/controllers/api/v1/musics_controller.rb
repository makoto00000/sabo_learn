class Api::V1::MusicsController < ApplicationController
  def all_musics
    @musics = Music.where(is_default: false)
    render json: {musics: @musics}
  end
end
