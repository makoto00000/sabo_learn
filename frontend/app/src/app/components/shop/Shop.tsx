"use client";

import styles from "@/app/components/shop/Shop.module.scss";
import BuyConfirmModal from "@/app/components/shop/BuyConfirmModal";
import { useState } from "react";
import WallpaperShop from "./WallpaperShop";
import MusicShop from "./MusicShop";
import { Music, User, Wallpaper } from "@/app/types/User";
import React from "react";

// const wallpapers: Wallpaper[] = [
//   {
//     id: 1,
//     title: "wallpaper",
//     src: "room_background.png",
//     price: 1000,
//   },
//   {
//     id: 2,
//     title: "wallpaper",
//     src: "room_background.png",
//     price: 2000,
//   },
//   {
//     id: 3,
//     title: "wallpaper",
//     src: "room_background.png",
//     price: 3000,
//   },
//   {
//     id: 4,
//     title: "wallpaper",
//     src: "room_background.png",
//     price: 4000,
//   },
// ];
// const musics: Music[] = [
//   {
//     id: 1,
//     title: "Summer Walk",
//     artist: "Olexy",
//     image: "music-image.png",
//     src: "summer-walk.mp3",
//     price: 500,
//     ref: React.createRef<HTMLAudioElement>(),
//   },
//   {
//     id: 2,
//     title: "Relaxed Vlog (Night Street)",
//     artist: "Ashot-Danielyan-Composer",
//     image: "relaxed-vlog-night-street.webp",
//     src: "relaxed-vlog-night-street.mp3",
//     price: 500,
//     ref: React.createRef<HTMLAudioElement>(),
//   },
//   {
//     id: 3,
//     title: "Ambient Piano and Strings",
//     artist: "Daddy_s_Music",
//     image: "ambient-piano-and-strings.png",
//     src: "ambient-piano-and-strings.mp3",
//     price: 500,
//     ref: React.createRef<HTMLAudioElement>(),
//   },
// ];

export default function Shop({
  currentUser,
  wallpapers,
  musics,
}: {
  currentUser: User;
  wallpapers: Wallpaper[];
  musics: Music[]
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [tab, setTab] = useState<"background" | "music">("background");
  const [selectMusic, setSelectMusic] = useState<Music | null>(null);
  const [selectWallpaper, setSelectWallpaper] = useState<Wallpaper | null>(
    null
  );
  const [itemPrice, setItemPrice] = useState<number | null>(null);

  const openModal = (
    itemType: "background" | "music",
    wallpaper: Wallpaper | null,
    music: Music | null
  ) => {
    if (itemType === "background" && wallpaper) {
      setSelectWallpaper(wallpaper);
      setItemPrice(wallpaper.price);
    }
    if (itemType === "music" && music) {
      setSelectMusic(music);
      setItemPrice(music.price);
    }
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const setTabBackground = () => {
    setTab("background");
  };
  const setTabMusic = () => {
    setTab("music");
  };

  return (
    <div className={styles.container}>
      {isOpen && (
        <BuyConfirmModal
          itemType={tab}
          wallpaper={selectWallpaper}
          music={selectMusic}
          closeModal={closeModal}
          userCoin={currentUser.coin}
          itemPrice={itemPrice}
        />
      )}
      <div className={styles.content}>
        <nav className={styles.tabContainer}>
          <li
            className={styles.tab}
            onClick={() => setTabBackground()}
            style={
              tab === "background"
                ? { background: "#111" }
                : { background: "#313131" }
            }
          >
            Background
          </li>
          <li
            className={styles.tab}
            onClick={() => setTabMusic()}
            style={
              tab === "music"
                ? { background: "#111" }
                : { background: "#313131" }
            }
          >
            Music
          </li>
        </nav>
        {tab === "background" && (
          <WallpaperShop wallpapers={wallpapers} userWallpapers={currentUser.wallpapers} openModal={openModal} />
        )}
        {tab === "music" && <MusicShop musics={musics} userMusics={currentUser.musics} openModal={openModal} />}
      </div>
    </div>
  );
}

// musicを個別のコンポーネントに分ける