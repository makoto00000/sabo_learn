Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get '/musics', to: 'musics#all_musics'
      get '/wallpapers', to: 'wallpapers#all_wallpapers'
      post '/user', to: 'users#create'
      get '/user', to: 'users#current_user'
      put '/user/coin', to: 'users#add_coin'
      post '/login', to: 'authentication#login'
      post '/user/music/:id', to: 'users#buy_music'
      post '/user/wallpaper/:id', to: 'users#buy_wallpaper'
      put '/user/playlist', to: 'users#register_playlist'
      put '/user/wallpaper/solo', to: 'users#register_solo_wallpaper'
      put '/user/wallpaper/multi', to: 'users#register_multi_wallpaper'
      put '/user/isNewUser', to: 'users#change_false_is_new_user'
    end
  end
  get '/health_check' => 'rails/health#show', as: :rails_health_check
  post '/auth/:provider/callback', to: 'api/v1/google#callback'
end
