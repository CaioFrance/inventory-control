Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :suppliers
    end
  end
  root 'home#index'
  resources '*a', to: 'application#not_found'
end
