Rails.application.routes.draw do
  resources :product_types
  resources :products
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  devise_for :admins, controllers: {
    sessions: 'admins/sessions',
    passwords: 'admins/passwords',
    confirmations: 'admins/confirmations',
    registrations: 'admins/registrations'
  }

  devise_scope :admin do
    put "/admins/confirmation" => "admins/confirmations#update", :as => :admin_confirm
    get "/admins/sign_up_success" => "admins/registrations#sign_up_success", :as => :admin_sign_up_success
    get "/admins/change_password_success" => "admins/confirmations#change_password_success", :as => :admin_change_password_success
    get "/admins/resend_confirmation_success" => "admins/confirmations#resend_confirmation_success", :as => :admin_resend_confirmation_success
  end

  root 'home#index'

  namespace :admins do
    get 'admin_list', to: 'admins#index'
    get 'dashboard', to: 'dashboard#index'
    # send_reset_password_instructions_complete
    get 'password/send_reset_password_instructions_complete', to: 'passwords/send_reset_password_instructions_complete#index', as: 'send_reset_password_instructions_complete'
    # update password complete
    get 'password/update_password_complete', to: 'passwords/update_password_complete#index', as: 'update_password_complete'
  end
end
