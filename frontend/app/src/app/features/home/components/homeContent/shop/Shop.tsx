"use client";

import React from "react";
import { useState } from "react";
import BuyConfirmModal from "@/app/features/home/components/homeContent/shop/BuyConfirmModal";
import { Music, User, Wallpaper } from "@/app/types/User";
import MusicShop from "./components/music/MusicShop";
import WallpaperShop from "./components/wallpaper/WallpaperShop";
import useTab from "@/app/features/home/components/contentTab/hooks/useTab";
import ContentTab from "@/app/features/home/components/contentTab/ContentTab";
import styles from "@/app/features/home/components/homeContent//shop/Shop.module.scss";

export default function Shop({
  currentUser,
  wallpapers,
  musics,
}: {
  currentUser: User;
  wallpapers: Wallpaper[];
  musics: Music[];
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
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

  const contentTabProps = useTab();

  return (
    <div className={styles.container}>
      {isOpen && (
        <BuyConfirmModal
          itemType={contentTabProps.tab}
          wallpaper={selectWallpaper}
          music={selectMusic}
          closeModal={closeModal}
          userCoin={currentUser.coin}
          itemPrice={itemPrice}
        />
      )}
      <div className={styles.content}>
        <ContentTab {...contentTabProps} />
        {contentTabProps.tab === "background" && (
          <WallpaperShop
            wallpapers={wallpapers}
            userWallpapers={currentUser.wallpapers}
            openModal={openModal}
          />
        )}
        {contentTabProps.tab === "music" && (
          <MusicShop
            musics={musics}
            userMusics={currentUser.musics}
            openModal={openModal}
          />
        )}
      </div>
    </div>
  );
}
