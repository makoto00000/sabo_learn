require 'rails_helper'

RSpec.describe "Api::V1::Googles", type: :request do
  describe "GET /callback" do
    it "returns http success" do
      get "/api/v1/google/callback"
      expect(response).to have_http_status(:success)
    end
  end

end
