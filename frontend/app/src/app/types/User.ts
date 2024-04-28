import { RefObject } from "react";

export type User = {
  name: string | undefined;
  email: string | undefined;
  password: string | undefined;
  birthday: Date | undefined;
  coin: number | undefined;
  wallpapers: Wallpaper[];
  musics: Music[];
  soloWallpaper: Wallpaper;
  multiWallpaper: Wallpaper;
  notSetMusics: Music[];
  playlist: Music[];
  isNewUser: boolean;
};

export type Wallpaper = {
  id: number
  title: string
  src: string
  price: number
}

export type Music = {
  id: number | string
  title: string
  artist: string
  image: string
  src: string
  price: number
  ref: RefObject<HTMLAudioElement> | null
}

export type Playlist = {
  musics: Music[]
}
