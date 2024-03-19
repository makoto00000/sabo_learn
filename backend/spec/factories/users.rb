FactoryBot.define do
  factory :user do
    sequence(:name) { |n| "user_#{n}" }
    sequence(:email) { |n| "user_#{n}@example.com" }
    password { 'password1234' }
    password_confirmation { 'password1234' }
    birthday { '1992-01-01' }
  end
end
