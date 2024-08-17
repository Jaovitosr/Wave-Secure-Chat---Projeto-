Rails.application.routes.draw do
  get 'rooms/index'
  get '/signin', to: 'sessions#new'
  post '/signin', to: 'sessions#create'
  delete '/signout', to: 'sessions#destroy'
  resources :rooms do
    resources :messages
  end
  resources :users
  root 'rooms#index'
  get 'clear_session', to: 'sessions#clear_session'
end