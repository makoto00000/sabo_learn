require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'validation' do
    it 'ユーザーを問題なく作成' do
      user = build(:user, name: "testuser", email: "test@mail.com", password: "password1234!?#&", password_confirmation: "password1234!?#&", birthday: "1992-01-01")
      expect(user).to be_valid
      expect(user.errors).to be_empty
    end

    it 'ユーザーネーム空欄は無効' do
      user = build(:user, name: "", email: "test@mail.com", password: "password1234", password_confirmation: "password1234", birthday: "1992-01-01")
      expect(user).to be_invalid
      expect(user.errors[:name]).to eq ["can't be blank"]
    end

    it 'メールアドレス空欄は無効' do
      user = build(:user, name: "testuser", email: "", password: "password1234", password_confirmation: "password1234", birthday: "1992-01-01")
      expect(user).to be_invalid
      expect(user.errors[:email]).to eq ["can't be blank", "is invalid"]
    end

    it '無効なメールアドレス' do
      user = build(:user, name: "testuser", email: "invalidaddress", password: "password1234", password_confirmation: "password1234", birthday: "1992-01-01")
      expect(user).to be_invalid
      expect(user.errors[:email]).to eq ["is invalid"]
    end
    
    it 'パスワード10文字未満は無効' do
      user = build(:user, name: "testuser", email: "test@mail.com", password: "password1", password_confirmation: "password1", birthday: "1992-01-01")
      expect(user).to be_invalid
      expect(user.errors[:password]).to eq ["is too short (minimum is 10 characters)"]
    end

    it '[a-zA-Z]が含まれないパスワードは無効' do
      user = build(:user, name: "testuser", email: "test@mail.com", password: "0123456789", password_confirmation: "0123456789", birthday: "1992-01-01")
      expect(user).to be_invalid
      expect(user.errors[:password]).to eq ["is invalid"]
    end

    it '[0-9#!?&]が含まれないパスワードは無効' do
      user = build(:user, name: "testuser", email: "test@mail.com", password: "abcdefghij", password_confirmation: "abcdefghij", birthday: "1992-01-01")
      expect(user).to be_invalid
      expect(user.errors[:password]).to eq ["is invalid"]
    end

    it '[a-zA-Z0-9#!?&]が以外の文字が含まれるパスワードは無効' do
      user = build(:user, name: "testuser", email: "test@mail.com", password: "password1234!?#&><,.", password_confirmation: "password1234!?#&><,.", birthday: "1992-01-01")
      expect(user).to be_invalid
      expect(user.errors[:password]).to eq ["is invalid"]
    end
  end
end
