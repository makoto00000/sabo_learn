"use client";

import styles from "@/app/components/setting/Setting.module.scss";
import { useState } from "react";
import { User } from "@/app/types/User";
import React from "react";
import WallpaperSetting from "./WallpaperSetting";
import MusicSetting from "./MusicSetting";

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

export default function Shop({ currentUser }: { currentUser: User }) {
  const [tab, setTab] = useState<"background" | "music">("background");

  const setTabBackground = () => {
    setTab("background");
  };
  const setTabMusic = () => {
    setTab("music");
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <nav className={styles.tabContainer}>
          <li className={styles.tab} 
          onClick={() => setTabBackground()}
          style={tab === "background" ? {background: "#111"} : {background: "#313131"}}
          >
            Background
          </li>
          <li className={styles.tab} 
          onClick={() => setTabMusic()}
          style={tab === "music" ? {background: "#111"} : {background: "#313131"}}
          >
            Music
          </li>
        </nav>
        {tab === "background" && (
          <WallpaperSetting
            soloWallpaper={currentUser.soloWallpaper}
            multiWallpaper={currentUser.multiWallpaper}
            wallpapers={currentUser.wallpapers}
          />
        )}
        {tab === "music" &&
          <MusicSetting
            notSetMusics={currentUser.notSetMusics}
            playlist={currentUser.playlist}
          />
        }
      </div>
    </div>
  );
}
