# frozen_string_literal: true

require 'faker'

10.times do
  User.create(
    name: Faker::Internet.unique.username(separators: []),
    email: Faker::Internet.email,
    password: 'password1234',
    password_confirmation: 'password1234',
    birthday: '1992-01-01'
  )
end