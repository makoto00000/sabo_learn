class Api::V1::UsersController < ApplicationController
  before_action :authenticate, only: %i[current_user add_coin]

  def create
    @user = User.new(user_params)
    if @user.save
      token = create_token(@user.id)
      render_user_include_token(@user, token, :created)
    else
      render json: { errors: { body: @user.errors } }, status: :unprocessable_entity
    end
  end

  def current_user
    if @current_user
      render_user(@current_user, :ok)
    else
      render json: { errors: { body: @current_user.errors } }, status: :unprocessable_entity
    end
  end

  def add_coin
    add_coin_count = params[:coin].to_i
    if @current_user
      prev_coin_count = @current_user.coin
      new_coin_count = prev_coin_count + add_coin_count
      if @current_user.update!(coin: new_coin_count)
        render json: { coin: new_coin_count, prevCoin: prev_coin_count }, status: :ok
      else
        render json: { error: '更新に失敗しました', pending_coin: add_coin_count }, status: :unprocessable_entity
      end
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation, :birthday)
  end

  def render_user(user, status_code)
    render json: { user: { name: user.name, email: user.email, birthday: user.birthday, coin: user.coin } }, status: status_code
  end

  def render_user_include_token(user, jwt_token, status_code)
    render json: { user: { name: user.name, email: user.email, birthday: user.birthday, coin: user.coin, token: jwt_token } }, status: status_code
  end
end
