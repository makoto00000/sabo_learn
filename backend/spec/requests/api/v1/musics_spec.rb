require 'rails_helper'

RSpec.describe 'Api::V1::Musics' do
  before do
    create(:new_music)
  end

  describe 'GET /all_musics' do
    it 'returns http success' do
      get api_v1_musics_path
      expect(response).to have_http_status(:ok)
      expect(response.body).to include('musics')
    end
  end
end
