require_relative 'boot'

require 'rails/all'

Bundler.require(*Rails.groups)

module Backend
  class Application < Rails::Application
    config.load_defaults 7.1
    config.autoload_lib(ignore: %w[assets tasks])
    config.api_only = true

    config.generators do |g|
      g.test_framework :rspec,
                       fixtures: false
    end
  end
end
