FactoryBot.define do
  factory :solo_wallpaper, class: 'Wallpaper' do
    title { 'solo_wallpaper' }
    src { 'solo_wallpaper.png' }
    price { 1000 }
    is_default_solo { true }
    is_default_multi { false }
  end

  factory :multi_wallpaper, class: 'Wallpaper' do
    title { 'multi_wallpaper' }
    src { 'multi_wallpaper.png' }
    price { 1000 }
    is_default_solo { false }
    is_default_multi { true }
  end

  factory :new_wallpaper, class: 'Wallpaper' do
    title { 'new_wallpaper' }
    src { 'new_wallpaper.png' }
    price { 1000 }
    is_default_solo { false }
    is_default_multi { false }
  end
end
