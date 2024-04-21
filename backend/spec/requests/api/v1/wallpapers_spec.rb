require 'rails_helper'

RSpec.describe 'Api::V1::Wallpapers' do
  before do
    create(:new_wallpaper)
  end

  describe 'GET /all_wallpapers' do
    it 'returns http success' do
      get api_v1_wallpapers_path
      expect(response).to have_http_status(:ok)
      expect(response.body).to include('wallpapers')
    end
  end

end
