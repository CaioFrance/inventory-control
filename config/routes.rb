Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users
      resources :products
      resources :suppliers

      post '/login', to: 'authentication#login'
    end
  end
  resources '*a', to: 'home#index'
  root 'home#index'
end
