class Api::V1::UsersController < ApplicationController
  before_action :authenticate,
                only: %i[current_user add_coin purchase_musics purchase_wallpapers buy_music buy_wallpaper playlist register_playlist register_solo_wallpaper register_multi_wallpaper
                         change_false_is_new_user]

  def create
    @user = User.new(user_params)
    default(@user)
    if @user.save
      token = create_token(@user.id)
      render_user_include_token(@user, token, :created)
    else
      render json: { errors: { body: @user.errors } }, status: :unprocessable_entity
    end
  end

  def current_user
    if @current_user
      # render_user(@current_user, :ok)
      music_order = JSON.parse(@current_user.playlist.music_order)
      not_set_musics = @current_user.musics.where.not(id: @current_user.playlist.musics.pluck(:id))
      render json: { user: @current_user.attributes.transform_keys { |k| k.camelize(:lower) }
                                        .merge({
                                                 soloWallpaper: @current_user.solo_wallpaper,
                                                 multiWallpaper: @current_user.multi_wallpaper,
                                                 wallpapers: @current_user.wallpapers,
                                                 musics: @current_user.musics,
                                                 notSetMusics: not_set_musics,
                                                 playlist: @current_user.playlist.musics.sort_by { |music| music_order.index(music.id) }
                                               })}
    else
      render json: { errors: { body: @current_user.errors } }, status: :unprocessable_entity
    end
  end

  def add_coin
    if params[:coin]
      add_coin_count = params[:coin].to_i
      prev_coin_count = @current_user.coin
      new_coin_count = prev_coin_count + add_coin_count
      if @current_user.update!(coin: new_coin_count)
        render json: { coin: new_coin_count, prevCoin: prev_coin_count }, status: :ok
      else
        render json: { error: '更新に失敗しました', pending_coin: add_coin_count }, status: :unprocessable_entity
      end
    else
      render json: {error: '不正なリクエスト'}, status: :bad_request
    end
  end

  # ユーザーが購入済みの音楽一覧を返す
  def purchase_musics
    if @current_user
      render json: { musics: @current_user.musics }
    else
      render json: { error: 'ログインしてください' }, status: :unauthorized
    end
  end

  # ユーザーが購入済みの背景一覧を返す
  def purchase_wallpapers
    if @current_user
      render json: { wallpapers: @current_user.wallpapers }
    else
      render json: { error: 'ログインしてください'}, status: :unauthorized
    end
  end

  # ユーザーが音楽を購入
  def buy_music

    music_id = params[:id]

    if prepare_buy(Music, music_id, @current_user.musics)
      if @current_user.update!(musics: @current_user.musics, coin: @current_user.coin)
        render json: { coin: @current_user.coin, musics: @current_user.musics }, status: :ok
      else
        render json: { error: '購入に失敗しました' }, status: :unprocessable_entity
      end
    end
  rescue StandardError => e
    render json: { error: e.message }, status: :internal_server_error
  end

  # ユーザーが背景を購入
  def buy_wallpaper
    wallpaper_id = params[:id]

    if prepare_buy(Wallpaper, wallpaper_id, @current_user.wallpapers)
      if @current_user.update!(wallpapers: @current_user.wallpapers, coin: @current_user.coin)
        render json: { coin: @current_user.coin, wallpapers: @current_user.wallpapers }, status: :ok
      else
        render json: { error: '購入に失敗しました' }, status: :unprocessable_entity
      end
    end
  rescue StandardError => e
    render json: { error: e.message }, status: :internal_server_error

  end

  # プレイリストを取得
  # !削除予定
  def playlist
    render json: { playlist: @current_user.playlist.musics }
  end

  # プレイリストを設定
  def register_playlist
    music_ids = params.require(:musicIds).to_s
    @current_user.playlist.update(music_order: music_ids)
    musics = []
    music_order = JSON.parse(@current_user.playlist.music_order)
    @current_user.musics.each do |music|
      musics << music if music_order.include?(music.id)
    end
    @current_user.playlist.update(musics:)
    render json: { playlist: musics.sort_by { |music| music_order.index(music.id) } } if @current_user.save!
  end

  # solo roomの背景を設定する
  def register_solo_wallpaper
    register_wallpaper('solo')
  end

  # multi roomの背景を設定する
  def register_multi_wallpaper
    register_wallpaper('multi')
  end

  def change_false_is_new_user
    @current_user.update(is_new_user: false)
    render json: { user: @current_user }, status: :ok if @current_user.save!
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation, :birthday)
  end

  def render_user(user, status_code)
    render json: { user: { name: user.name, email: user.email, birthday: user.birthday, coin: user.coin } }, status: status_code
  end

  def render_user_include_token(user, jwt_token, status_code)
    render json: { user: { name: user.name, email: user.email, birthday: user.birthday, coin: user.coin, token: jwt_token } }, status: status_code
  end

  def prepare_buy(model, item_id, items)
    if model.exists?(id: item_id)
      item = model.find(item_id)
      price = item.price
      prev_coin_count = @current_user.coin
      new_coin_count = prev_coin_count - price
      if new_coin_count < 0
        render json: {error: "#{new_coin_count * -1}コイン不足しています"}, status: :bad_request
        return false
      elsif items.include?(item)
        render json: {error: '購入済みです'}, status: :bad_request
          return false
      else
        items << item
        @current_user.coin = new_coin_count
          return true
      end
    else
      render json: {error: '不正なリクエスト'}, status: :bad_request
      return false
    end
  end

  def register_wallpaper(room)
    wallpaper_id = params.require(:wallpaperId)

    if Wallpaper.exists?(id: wallpaper_id)
      wallpaper = Wallpaper.find(wallpaper_id)

      if room == 'solo'
        @current_user.solo_wallpaper = wallpaper
      elsif room == 'multi'
        @current_user.multi_wallpaper = wallpaper
      end

      render json: { wallpaper:}, status: :ok if @current_user.save
    else
      render json: {error: '不正なリクエスト'}, status: :bad_request
    end
  rescue StandardError => e
    render json: {error: e.message}, status: :bad_request
  end
end
