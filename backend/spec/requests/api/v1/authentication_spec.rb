require 'rails_helper'

RSpec.describe 'AuthenticationsController' do
  describe '#login' do

    let(:login_user) { create(:user) }

    context 'ログイン成功' do
      it 'ユーザー名でログインし、ユーザー情報が返される' do
        post api_v1_login_path, params: { user: { email_or_name: login_user.name, password: 'password1234' }}
        expect(response).to have_http_status(:ok)
        expect(response.body).to include('user')
      end

      it 'メールアドレスでログインし、ユーザー情報が返される' do
        post api_v1_login_path, params: { user: { email_or_name: login_user.email, password: 'password1234' }}
        expect(response).to have_http_status(:ok)
        expect(response.body).to include('user')
      end
    end

    context 'ログイン失敗' do
      it 'エラーが返される' do
        post api_v1_login_path, params: { user: { email: '', password: '' }}
        expect(response).to have_http_status(:unauthorized)
        expect(response.body).to include('ユーザー名またはパスワードが正しくありません。')
      end
    end
  end

end
