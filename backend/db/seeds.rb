# frozen_string_literal: true

require 'faker'

Music.create(
  title: "Summer Walk",
  artist: "Olexy",
  image: "music-image.png",
  src: "summer-walk.mp3",
  price: "500",
  is_default: true,
)
Music.create(
  title: "Relaxed Vlog (Night Street)",
  artist: "Ashot-Danielyan-Composer",
  image: "relaxed-vlog-night-street.webp",
  src: "relaxed-vlog-night-street.mp3",
  price: "500",
  is_default: true,
)
Music.create(
  title: "Ambient Piano and Strings",
  artist: "Daddy_s_Music",
  image: "ambient-piano-and-strings.png",
  src: "ambient-piano-and-strings.mp3",
  price: "500",
  is_default: true,
)

Music.create(
  title: "Groovy Ambient Funk",
  artist: "moodmode",
  image: "groovy-ambient-funk.webp",
  src: "groovy-ambient-funk.mp3",
  price: "500",
)
Music.create(
  title: "Movement",
  artist: "SoulProdMusic",
  image: "movement.jpg",
  src: "movement.mp3",
  price: "500",
)
Music.create(
  title: "Solitude (Dark Ambient Electronic)",
  artist: "lucafrancini",
  image: "solitude-dark-ambient-electronic.webp",
  src: "solitude-dark-ambient-electronic.mp3",
  price: "500",
)
Music.create(
  title: "Ethereal Vistas",
  artist: "Starjam",
  image: "ethereal-vistas.webp",
  src: "ethereal-vistas.mp3",
  price: "500",
)
Music.create(
  title: "Perfect Beauty",
  artist: "Good_B_Music",
  image: "perfect-beauty.webp",
  src: "perfect-beauty.mp3",
  price: "500",
)
Music.create(
  title: "Better Day",
  artist: "penguinmusic",
  image: "better-day.webp",
  src: "better-day.mp3",
  price: "500",
)
Music.create(
  title: "Coverless book ( Lofi )",
  artist: "MYAUDIOVISION",
  image: "coverless-book-lofi.jpg",
  src: "coverless-book-lofi.mp3",
  price: "500",
)
Music.create(
  title: "Sad Soul (Chasing a Feeling)",
  artist: "AlexGrohl",
  image: "sad-soul-chasing-a-feeling.webp",
  src: "sad-soul-chasing-a-feeling.mp3",
  price: "500",
)
Music.create(
  title: "Separation",
  artist: "William_King",
  image: "separation.webp",
  src: "separation.mp3",
  price: "500",
)
Music.create(
  title: "Midnight Forest",
  artist: "Syouki_Takahashi",
  image: "midnight-forest.jpg",
  src: "midnight-forest.mp3",
  price: "500",
)

Wallpaper.create(
  title: "solo_wallpaper",
  src: "soloroom_background.png",
  price: "1000",
  is_default_solo: true
)
Wallpaper.create(
  title: "multi_wallpaper",
  src: "multiroom_background.png",
  price: "1000",
  is_default_multi: true
)

12.times do |n|
  Wallpaper.create(
    title: "cafe_#{n + 1}",
    src: "cafe_#{n + 1}.png",
    price: "1000",
  )
end

10.times do
  user = User.create(
    name: Faker::Internet.unique.username(separators: []),
    email: Faker::Internet.email,
    # password: 'password1234',
    # password_confirmation: 'password1234',
    coin: 10000,
    provider: "google",
    uid: "",
    birthday: nil
  )
  
  # 購入済み壁紙にデフォルトのものをセット
  solo_wallpaper = Wallpaper.find_by(is_default_solo: true)
  multi_wallpaper = Wallpaper.find_by(is_default_multi: true)
  user.wallpapers = [solo_wallpaper, multi_wallpaper]

  # 初期壁紙をセット
  user.solo_wallpaper = solo_wallpaper
  user.multi_wallpaper = multi_wallpaper

  # 購入済み音楽にデフォルトのものをセット
  default_musics = Music.where(is_default: true).to_a
  user.musics = default_musics

  # プレイリストにデフォルトの音楽をセット
  user.playlist = Playlist.create(musics: default_musics, music_order: default_musics.pluck(:id).to_s)
  user.save!

end
