"use client";

import styles from "@/app/features/home/components/homeContent/setting/Setting.module.scss";
import { User } from "@/app/types/User";
import React from "react";
import WallpaperSetting from "./wallpaper/WallpaperSetting";
import MusicSetting from "./music/MusicSetting";
import useTab from "@/app/features/home/components/contentTab/hooks/useTab";
import ContentTab from "@/app/features/home/components/contentTab/ContentTab";

export default function Shop({ currentUser }: { currentUser: User }) {
  const contentTabProps = useTab();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <ContentTab {...contentTabProps} />
        {contentTabProps.tab === "background" && (
          <WallpaperSetting
            soloWallpaper={currentUser.soloWallpaper}
            multiWallpaper={currentUser.multiWallpaper}
            wallpapers={currentUser.wallpapers}
          />
        )}
        {contentTabProps.tab === "music" && (
          <MusicSetting
            notSetMusics={currentUser.notSetMusics}
            playlist={currentUser.playlist}
          />
        )}
      </div>
    </div>
  );
}
