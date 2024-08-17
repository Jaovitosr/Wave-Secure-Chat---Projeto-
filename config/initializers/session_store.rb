# config/initializers/session_store.rb
Rails.application.config.session_store :cookie_store, key: "_your_app_session_#{Rails.env}_#{ENV['PORT'] || 3000}"

