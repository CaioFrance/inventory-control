Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users
      resources :products
      resources :suppliers
      get '/suppliers/all/without_pagination', to: 'suppliers#all_without_pagination'

      post '/login', to: 'authentication#login'
    end
  end
  get '/*path', to: 'home#index'
  get 'home/index'
  root 'home#index'
end
