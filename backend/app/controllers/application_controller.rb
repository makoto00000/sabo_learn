class ApplicationController < ActionController::API
  def create_token(user_id)
    payload = { user_id: }
    secret_key = Rails.application.credentials.secret_key_base
    JWT.encode(payload, secret_key)
  end

  def authenticate
    authorization_header = request.headers[:authorization]
    if authorization_header
      token = authorization_header.split[1]
      secret_key = Rails.application.credentials.secret_key_base

      begin
        decoded_token = JWT.decode(token, secret_key)
        @current_user = User.find(decoded_token[0]['user_id'])
      rescue ActiveRecord::RecordNotFound
        render_unauthorized
      rescue JWT::DecodeError # rubocop:disable Lint/DuplicateBranch
        render_unauthorized
      end

    else
      render_unauthorized
    end
  end

  def render_unauthorized
    render json: { errors: 'Unauthorized' }, status: :unauthorized
  end
end
