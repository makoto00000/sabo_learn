# frozen_string_literal: true

require 'faker'

Music.create(
  title: "Summer Walk",
  artist: "Olexy",
  image: "music-image.png",
  src: "summer-walk.mp3",
  price: "500",
)
Music.create(
  title: "Relaxed Vlog (Night Street)",
  artist: "Ashot-Danielyan-Composer",
  image: "relaxed-vlog-night-street.webp",
  src: "relaxed-vlog-night-street.mp3",
  price: "500",
)
Music.create(
  title: "Ambient Piano and Strings",
  artist: "Daddy_s_Music",
  image: "ambient-piano-and-strings.png",
  src: "ambient-piano-and-strings.mp3",
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
  user.playlist = Playlist.create(musics: default_musics)
  user.save
end