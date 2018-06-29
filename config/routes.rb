Rails.application.routes.draw do
  resources :users
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  get  '/scrape/:league', to: 'games#scrape'
  post '/games',          to: 'games#retrieve_given_params'
  post '/zip_codes',      to: 'user_zip_codes#update'
  post '/retrieve_zip',   to: 'user_zip_codes#show'

  resources :games
  resources :users, only: [:create]
  resources :teams do
    resources :nicknames
  end
  resources :user_notification_preferences, only: [:index, :create]

  # Sessions
  get    '/login',  to: 'sessions#new'
  post   '/login',  to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
end
