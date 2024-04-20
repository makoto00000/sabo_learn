FactoryBot.define do
  factory :user do
    sequence(:name) { |n| "user_#{n}" }
    sequence(:email) { |n| "user_#{n}@example.com" }
    password { 'password1234' }
    password_confirmation { 'password1234' }
    birthday { '1992-01-01' }
    coin { 10000 }
  end

  factory :poor_user, class: 'User' do
    sequence(:name) { |n| "user_#{n}" }
    sequence(:email) { |n| "user_#{n}@example.com" }
    password { 'password1234' }
    password_confirmation { 'password1234' }
    birthday { '1992-01-01' }
    coin { 0 }
  end
end
