Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :products
      resources :suppliers
    end
  end
  resources '*a', to: 'home#index'
  root 'home#index'
end
