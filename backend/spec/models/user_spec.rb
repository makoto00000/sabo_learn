require 'rails_helper'

RSpec.describe User do
  describe 'validation' do
    context 'バリデーション成功' do
      it 'ユーザー作成' do
        user = build(:user, name: 'testvalid', email: 'test_validation@mail.com', password: 'password1234!?#&', password_confirmation: 'password1234!?#&', birthday: '1992-01-01')
        expect(user).to be_valid
        expect(user.errors).to be_empty
      end
    end

    context 'バリデーション失敗' do
      it 'ユーザーネーム空欄は無効' do
        user = build(:user, name: '', email: 'test@mail.com', password: 'password1234', password_confirmation: 'password1234', birthday: '1992-01-01')
        expect(user).not_to be_valid
        expect(user.errors[:name]).to eq ["can't be blank"]
      end

      it 'メールアドレス空欄は無効' do
        user = build(:user, name: 'testuser', email: '', password: 'password1234', password_confirmation: 'password1234', birthday: '1992-01-01')
        expect(user).not_to be_valid
        expect(user.errors[:email]).to eq ["can't be blank", 'is invalid']
      end

      it '無効なメールアドレス' do
        user = build(:user, name: 'testuser', email: 'invalidaddress', password: 'password1234', password_confirmation: 'password1234', birthday: '1992-01-01')
        expect(user).not_to be_valid
        expect(user.errors[:email]).to eq ['is invalid']
      end

      it 'パスワード10文字未満は無効' do
        user = build(:user, name: 'testuser', email: 'test@mail.com', password: 'password1', password_confirmation: 'password1', birthday: '1992-01-01')
        expect(user).not_to be_valid
        expect(user.errors[:password]).to eq ['is too short (minimum is 10 characters)']
      end

      it '[a-zA-Z]が含まれないパスワードは無効' do
        user = build(:user, name: 'testuser', email: 'test@mail.com', password: '0123456789', password_confirmation: '0123456789', birthday: '1992-01-01')
        expect(user).not_to be_valid
        expect(user.errors[:password]).to eq ['is invalid']
      end

      it '[0-9#!?&]が含まれないパスワードは無効' do
        user = build(:user, name: 'testuser', email: 'test@mail.com', password: 'abcdefghij', password_confirmation: 'abcdefghij', birthday: '1992-01-01')
        expect(user).not_to be_valid
        expect(user.errors[:password]).to eq ['is invalid']
      end

      it '[a-zA-Z0-9#!?&]が以外の文字が含まれるパスワードは無効' do
        user = build(:user, name: 'testuser', email: 'test@mail.com', password: 'password1234!?#&><,.', password_confirmation: 'password1234!?#&><,.', birthday: '1992-01-01')
        expect(user).not_to be_valid
        expect(user.errors[:password]).to eq ['is invalid']
      end
    end
  end
end
