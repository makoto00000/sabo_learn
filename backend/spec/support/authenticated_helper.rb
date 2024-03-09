module AuthenticationHelper
  def login_user_token(user)
    post api_v1_login_path, params: { user: {email: user.email, password: user.password } }
    JSON.parse(response.body)['user']['token']
  end
end
