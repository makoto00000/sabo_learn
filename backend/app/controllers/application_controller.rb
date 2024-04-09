class ApplicationController < ActionController::API
  def create_token(user_id)
    payload = { user_id: }
    secret_key = Rails.application.credentials.secret_key_base
    JWT.encode(payload, secret_key)
  end

  def authenticate
    authorization_header = request.headers[:authorization]
    if authorization_header
      token = authorization_header.split[1]
      secret_key = Rails.application.credentials.secret_key_base

      begin
        decoded_token = JWT.decode(token, secret_key)
        @current_user = User.find(decoded_token[0]['user_id'])
      rescue ActiveRecord::RecordNotFound
        render_unauthorized
      rescue JWT::DecodeError # rubocop:disable Lint/DuplicateBranch
        render_unauthorized
      end

    else
      render_unauthorized
    end
  end

  def render_unauthorized
    render json: { error: 'Unauthorized' }, status: :unauthorized
  end

  def current_user

  end

  # ユーザー作成時にデフォルトの背景とプレイリストを作成する
  def default(user)
    # 購入済み壁紙にデフォルトのものをセット
    solo_wallpaper = Wallpaper.find_by(is_default_solo: true)
    multi_wallpaper = Wallpaper.find_by(is_default_multi: true)
    user.wallpapers = [solo_wallpaper, multi_wallpaper]

    # 初期壁紙をセット
    user.solo_wallpaper = solo_wallpaper
    user.multi_wallpaper = multi_wallpaper

    # 購入済み音楽にデフォルトのものをセット
    default_musics = Music.where(is_default: true).to_a
    user.musics = default_musics

    # プレイリストにデフォルトの音楽をセット
    user.playlist = Playlist.new(musics: default_musics)
    user.save!
  end
end
