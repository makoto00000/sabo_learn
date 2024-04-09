require 'rails_helper'

RSpec.describe 'UsersController' do

  let(:login_user) { create(:user) }
  let(:token) { login_user_token login_user }
  let(:header) { { Authorization: "Bearer #{token}" } }

  let(:new_music) { create(:new_music) }
  let(:new_wallpaper) { create(:new_wallpaper) }

  let(:poor_user) { create(:poor_user) }
  let(:poor_token) { login_user_token poor_user }
  let(:poor_header) { { Authorization: "Bearer #{poor_token}" } }

  describe '#current_user' do
    context '認証成功' do
      it 'ログインユーザーの情報をJSON形式で取得する' do
        get(api_v1_user_path, headers: header)
        expect(response).to have_http_status(:ok)
        expect(response.body).to include('user')
      end
    end

    context '認証失敗' do
      it 'ログインユーザーの情報取得に失敗する' do
        get api_v1_user_path
        expect(response).to have_http_status(:unauthorized)
        expect(response.body).to include('error')
      end
    end
  end

  describe '#create' do
    context 'ユーザー作成成功' do
      it '作成したユーザー情報が返される' do
        post api_v1_user_path, params: { user: { name: 'testcreate', email: 'testcreate@mail.com', password: 'password1234!?#&', password_confirmation: 'password1234!?#&', birthday: '1992-01-01' } }
        expect(response).to have_http_status(:created)
        expect(response.body).to include('user')
      end
    end

    context 'ユーザー作成失敗' do
      it 'エラーが返される' do
        post api_v1_user_path, params: { user: { name: '', email: '', password: '', password_confirmation: '', birthday: '' } }
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.body).to include('error')
      end
    end
  end

  describe '#add_coin' do

    let!(:user_coin) { login_user.coin }
  let(:add_coin) { 100 }

    context 'コインの獲得に成功' do
      it 'コイン獲得後の現在のコインの枚数が返される' do
        put(api_v1_user_coin_path, params: { coin: add_coin }, headers: header)
        expect(response).to have_http_status(:ok)
        expect(response.body).to include('coin')
        login_user.reload
        expect(login_user.coin).to eq(user_coin + add_coin)
      end
    end

    context 'コインの獲得に失敗' do
      it 'ログインしていない場合エラーになる' do
        put(api_v1_user_coin_path, params: { coin: add_coin })
        expect(response).to have_http_status(:unauthorized)
        expect(response.body).to include('error')
      end

      it 'リクエストパラメータが不正' do
        put(api_v1_user_coin_path, params: { invalid_param: 'invalid' }, headers: header)
        expect(response).to have_http_status(:bad_request)
        expect(response.body).to include('error')
        expect(login_user.coin).to eq(user_coin)
      end
    end
  end

  describe '#parchace_musics' do
    context '認証成功' do
      it 'ユーザーが購入した音楽の一覧が返される' do
        get(api_v1_user_musics_path, headers: header)
        expect(response).to have_http_status(:ok)
        expect(response.body).to include('musics')
      end
    end

    context '認証失敗' do
      it '未ログイン状態では購入した音楽の一覧を返さない' do
        get(api_v1_user_musics_path)
        expect(response).to have_http_status(:unauthorized)
        expect(response.body).to include('error')
      end
    end
  end

  describe '#parchace_wallpapers' do
    context '認証成功' do
      it 'ユーザーが購入した壁紙の一覧が返される' do
        get(api_v1_user_wallpapers_path, headers: header)
        expect(response).to have_http_status(:ok)
        expect(response.body).to include('wallpaper')
      end
    end

    context '認証失敗' do
      it '未ログイン状態では購入した壁紙の一覧を返さない' do
        get(api_v1_user_wallpapers_path)
        expect(response).to have_http_status(:unauthorized)
        expect(response.body).to include('error')
      end
    end
  end

describe '#buy_music' do
  context '認証成功' do
    it '音楽の購入に成功' do
      expect { post("/api/v1/user/music/#{new_music.id}", headers: header) }.to change(login_user.musics, :count).by(1)
      expect(response).to have_http_status(:ok)
      expect(response.body).to include('musics')
    end

    it '不正なidでリクエスト' do
      expect { post('/api/v1/user/music/9999', headers: header) }.to change(login_user.musics, :count).by(0)
      expect(response).to have_http_status(:bad_request)
      expect(response.body).to include('error')
    end

    it 'coinが不足している' do
      expect { post("/api/v1/user/music/#{new_music.id}", headers: poor_header) }.to change(login_user.musics, :count).by(0)
      expect(response).to have_http_status(:bad_request)
      expect(response.body).to include('error')

    end

    it 'すでに購入済みの音楽' do
      login_user.musics = Music.all
      expect { post('/api/v1/user/music/1', headers: header) }.to change(login_user.musics, :count).by(0)
      expect(response).to have_http_status(:bad_request)
      expect(response.body).to include('error')
    end
  end

  context '認証失敗' do
    it '未ログイン状態では音楽を購入できない' do
      expect { post("/api/v1/user/music/#{new_music.id}") }.to change(login_user.musics, :count).by(0)
      expect(response).to have_http_status(:unauthorized)
      expect(response.body).to include('error')
    end
  end
end

  describe '#buy_wallpaper' do
    context '認証成功' do
      it '壁紙の購入に成功' do
        expect { post("/api/v1/user/wallpaper/#{new_wallpaper.id}", headers: header) }.to change(login_user.wallpapers, :count).by(1)
        expect(response).to have_http_status(:ok)
        expect(response.body).to include('wallpapers')
      end

      it '不正なidでリクエスト' do
        expect { post('/api/v1/user/wallpaper/9999', headers: header) }.to change(login_user.wallpapers, :count).by(0)
        expect(response).to have_http_status(:bad_request)
        expect(response.body).to include('error')
      end

      it 'coinが不足している' do
        expect { post("/api/v1/user/wallpaper/#{new_wallpaper.id}", headers: poor_header) }.to change(login_user.wallpapers, :count).by(0)
        expect(response).to have_http_status(:bad_request)
        expect(response.body).to include('error')

      end

      it 'すでに購入済みの壁紙' do
        login_user.wallpapers = Wallpaper.all
        expect { post('/api/v1/user/wallpaper/1', headers: header) }.to change(login_user.wallpapers, :count).by(0)
        expect(response).to have_http_status(:bad_request)
        expect(response.body).to include('error')
      end
    end

    context '認証失敗' do
      it '未ログイン状態では壁紙を購入できない' do
        expect { post("/api/v1/user/wallpaper/#{new_wallpaper.id}") }.to change(login_user.wallpapers, :count).by(0)
        expect(response).to have_http_status(:unauthorized)
        expect(response.body).to include('error')
      end
    end
  end

  describe '#playlist' do
    context '認証成功' do
      it 'プレイリストを取得できる' do
        login_user.playlist = Playlist.create(musics: Music.all)
        login_user.save
        get('/api/v1/user/playlist', headers: header)
        expect(response).to have_http_status(:ok)
        expect(response.body).to include('playlist')
      end
    end

    context '認証失敗' do
      it 'プレイリストを取得できない' do
        get('/api/v1/user/playlist')
        expect(response).to have_http_status(:unauthorized)
        expect(response.body).to include('error')
      end
    end
  end

  describe '#register_playlist' do
    context '認証成功' do
      it 'プレイリストを更新できる' do
        Playlist.create(user: login_user, musics: Music.all)
        body = { musicIds: [1, 2] }
        expect { put('/api/v1/user/playlist', headers: header, params: body) }.to change(login_user.playlist.musics, :count).by(-1)
        expect(response).to have_http_status(:ok)
        expect(response.body).to include('playlist')
      end
    end

    context '認証失敗' do
      it 'プレイリストを更新できない' do
        Playlist.create(user: login_user, musics: Music.all)
        body = { musicIds: [1] }
        expect { put('/api/v1/user/playlist', params: body) }.to change(login_user.playlist.musics, :count).by(0)
        expect(response).to have_http_status(:unauthorized)
        expect(response.body).to include('error')
      end
    end

  end

  describe '#register_solo_wallpaper' do
    context '認証成功' do
      it 'solo roomの壁紙を更新できる' do
        login_user.solo_wallpaper = Wallpaper.find_by(is_default_solo: true)
        login_user.save
        body = { wallpaperId: new_wallpaper.id }
        put(api_v1_user_wallpaper_solo_path, headers: header, params: body)
        login_user.reload
        expect(response).to have_http_status(:ok)
        expect(response.body).to include('wallpaper')
        expect(login_user.solo_wallpaper.id).to eq(new_wallpaper.id)
      end
    end

    context '認証失敗' do
      it 'solo roomの壁紙を更新できない' do
        login_user.solo_wallpaper = Wallpaper.find_by(is_default_solo: true)
        login_user.save
        body = { wallpaperId: new_wallpaper.id }
        put(api_v1_user_wallpaper_solo_path, params: body)
        login_user.reload
        expect(response).to have_http_status(:unauthorized)
        expect(response.body).to include('error')
        expect(login_user.solo_wallpaper.id).not_to eq(new_wallpaper.id)
      end
    end
  end

  describe '#register_multi_wallpaper' do
    context '認証成功' do
      it 'multi roomの壁紙を更新できる' do
        login_user.multi_wallpaper = Wallpaper.find_by(is_default_multi: true)
        login_user.save
        body = { wallpaperId: new_wallpaper.id }
        put(api_v1_user_wallpaper_multi_path, headers: header, params: body)
        login_user.reload
        expect(response).to have_http_status(:ok)
        expect(response.body).to include('wallpaper')
        expect(login_user.multi_wallpaper.id).to eq(new_wallpaper.id)
      end
    end

    context '認証失敗' do
      it 'multi roomの壁紙を更新できない' do
        login_user.multi_wallpaper = Wallpaper.find_by(is_default_multi: true)
        login_user.save
        body = { wallpaperId: new_wallpaper.id }
        put(api_v1_user_wallpaper_multi_path, params: body)
        login_user.reload
        expect(response).to have_http_status(:unauthorized)
        expect(response.body).to include('error')
        expect(login_user.multi_wallpaper.id).not_to eq(new_wallpaper.id)
      end
    end
  end
end
