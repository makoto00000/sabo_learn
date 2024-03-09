require 'rails_helper'

RSpec.describe 'UsersController' do

  describe '#current_user' do
    # before do
    #   @login_user = create(:user)
    # end
    let(:login_user) { create(:user) }

    let(:token) { login_user_token login_user }
    let(:header) { { Authorization: "Bearer #{token}" } }

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
end
