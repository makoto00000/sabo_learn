require 'rails_helper'

RSpec.describe 'GooglesController' do
  before do
    create_list(:music, 3)
    create(:solo_wallpaper)
    create(:multi_wallpaper)
  end

  let(:user_count) { User.count }

  describe '#callback' do

    context 'ログイン成功' do
      let(:success_params) {  { name: 'testgoogle', email: 'testgoogle@mail.com', uid: '211179818033166377843', provider: 'google' } }

      describe '初めてのログイン' do
        it 'ユーザーが追加されてidをtoken化して返す' do
          expect { post '/auth/google/callback', params: success_params }.to change(User, :count).by(1)
          expect(response).to have_http_status(:ok)
          expect(response.body).to include('token')
        end
      end

      describe '2回目以降のログイン' do
        it '2回目以降はメールアドレスが一致するユーザーのidをtoken化して返す' do
          post '/auth/google/callback', params: success_params
          expect { post '/auth/google/callback', params: success_params }.to change(User, :count).by(0)
          expect(response).to have_http_status(:ok)
          expect(response.body).to include('token')
        end
      end
    end

    context 'ログイン失敗' do
      let(:failed_params) { {name: nil, email: nil, uid: nil, provider: nil} }

      describe '初めてのログイン' do
        it 'ユーザーが登録されずtokenも返されない' do
          expect { post '/auth/google/callback', params: failed_params }.to change(User, :count).by(0)
          expect(response).to have_http_status(:internal_server_error)
          expect(response.body).not_to include('token')
        end
      end

      describe '2回目以降のログイン' do
        it 'tokenを返さない' do
          post '/auth/google/callback', params: failed_params
          expect { post '/auth/google/callback', params: failed_params }.to change(User, :count).by(0)
          expect(response).to have_http_status(:internal_server_error)
          expect(response.body).not_to include('token')
        end
      end
    end
  end
end
