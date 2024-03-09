class Api::V1::AuthenticationController < ApplicationController
  def login
    @user = User.find_by(email: params[:user][:email_or_name]) ||
            User.find_by(name: params[:user][:email_or_name])
    if @user&.authenticate(params[:user][:password])
      token = create_token(@user.id)
      render json: { user: { email: @user.email, token:, name: @user.name, coin: @user.coin, birthday: @user.birthday } }
    else
      render json: { error: 'ユーザー名またはパスワードが正しくありません。' }, status: :unauthorized
    end
  end

end
