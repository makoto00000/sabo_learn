FactoryBot.define do
  factory :music do
    sequence(:title) { |n| "test_#{n}" }
    artist { 'test_artist' }
    sequence(:src) { |n| "test_#{n}.mp3" }
    sequence(:image) { |n| "test_#{n}.png" }
    is_default { true }
    price { 500 }
  end

  factory :new_music, class: 'Music' do
    sequence(:title) { |n| "test_new#{n}" }
    artist { 'test_artist' }
    sequence(:src) { |n| "test_new#{n}.mp3" }
    sequence(:image) { |n| "test_new#{n}.png" }
    is_default { false }
    price { 500 }
  end
end
