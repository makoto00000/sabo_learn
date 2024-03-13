require 'rails_helper'

RSpec.describe 'UsersController' do

  let(:login_user) { create(:user) }
  let(:token) { login_user_token login_user }
  let(:header) { { Authorization: "Bearer #{token}" } }

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
        expect(response.body).to include('errors')
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
        expect(response.body).to include('errors')
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
        expect(response.body).to include('errors')
      end

      it 'リクエストパラメータが不正' do
        put(api_v1_user_coin_path, params: { invalid_param: 'invalid' }, headers: header)
        expect(response).to have_http_status(:ok)
        expect(response.parsed_body['coin']).to eq(0)
        expect(login_user.coin).to eq(user_coin)
      end
    end
  end
end
