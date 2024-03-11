class Api::V1::GoogleController < ApplicationController
  def callback
    @user = User.find_or_create_by!(provider: params[:provider], uid: params[:uid], name: params[:name], email: params[:email])
    token = create_token(@user.id)
    if @user
      render_user_include_token(@user, token, :ok)
    else
      render json: { error: 'ログインに失敗しました' }, status: :unprocessable_entity
    end
  rescue StandardError => e
    render json: { error: e.message }, status: :internal_server_error
  end

  private
  def render_user_include_token(user, jwt_token, status_code)
    render json: { user: { name: user.name, email: user.email, birthday: user.birthday, coin: user.coin, token: jwt_token } }, status: status_code
  end
end
