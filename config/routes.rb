Rails.application.routes.draw do
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  resources :users do
    resources :phones, controller: 'user_phones' do
      post 'verify', on: :member
    end
  end
  get  '/scrape/:league',        to: 'games#scrape'
  post '/games',                 to: 'games#retrieve_given_params'
  post '/zip_codes',             to: 'user_zip_codes#update'
  post '/retrieve_zip',          to: 'user_zip_codes#show'
  post '/update_favorite_teams', to: 'user_favorite_teams#update_all'

  resources :games
  resources :users, only: [:create]
  resources :teams do
    resources :nicknames
  end
  resources :user_notification_preferences, only: [:index, :create, :destroy, :update]
  resources  :user_favorite_teams


  # Sessions
  get    '/login',  to: 'sessions#new'
  post   '/login',  to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
end
