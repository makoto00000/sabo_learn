Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post '/user', to: 'users#create'
      get '/user', to: 'users#current_user'
      put '/user/coin', to: 'users#add_coin'
      post '/login', to: 'authentication#login'
      get '/user/musics', to: 'users#parchace_musics'
      get '/user/wallpapers', to: 'users#parchace_wallpapers'
      post '/user/music/:id', to: 'users#buy_music'
      post '/user/wallpaper/:id', to: 'users#buy_wallpaper'
      get '/user/playlist', to: 'users#playlist'
      put '/user/playlist', to: 'users#register_playlist'
      put '/user/wallpaper/solo', to: 'users#register_solo_wallpaper'
      put '/user/wallpaper/multi', to: 'users#register_multi_wallpaper'

    end
  end
  get '/health_check' => 'rails/health#show', as: :rails_health_check
  post '/auth/:provider/callback', to: 'api/v1/google#callback'
end
