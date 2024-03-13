Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post '/user', to: 'users#create'
      get '/user', to: 'users#current_user'
      put '/user/coin', to: 'users#add_coin'
      post '/login', to: 'authentication#login'
    end
  end
  get 'up' => 'rails/health#show', as: :rails_health_check
  post '/auth/:provider/callback', to: 'api/v1/google#callback'
end
