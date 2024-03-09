Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post '/user', to: 'users#create'
      get '/user', to: 'users#current_user'
      post '/login', to: 'authentication#login'
    end
  end
  get 'up' => 'rails/health#show', as: :rails_health_check
end
