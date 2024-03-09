Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post '/users', to: 'users#create'
      get '/user', to: 'users#current_user'
      post '/users/login', to: 'authentication#login'
    end
  end
  get 'up' => 'rails/health#show', as: :rails_health_check
end
