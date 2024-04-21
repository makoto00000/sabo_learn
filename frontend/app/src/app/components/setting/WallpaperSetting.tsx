import Image from "next/image";
import styles from "@/app/components/setting/WallpaperSetting.module.scss";
import { Wallpaper } from "@/app/types/User";
import SelectWallpaper from "./SelectWallpaper";
import { useState } from "react";

export default function WallpaperSetting({
  soloWallpaper,
  multiWallpaper,
  wallpapers,
}: {
  soloWallpaper: Wallpaper;
  multiWallpaper: Wallpaper;
  wallpapers: Wallpaper[];
}) {
  const [isSelect, setIsSelect] = useState(false);
  const [settingRoomType, setSettingRoomType] = useState<"Solo" | "Multi">(
    "Solo"
  );
  const openSelectView = (roomType: "Solo" | "Multi") => {
    setIsSelect(true);
    setSettingRoomType(roomType);
  };
  const closeSelectView = () => {
    setIsSelect(false);
  };

  return (
    <div className={`${styles.main} content`}>
      {!isSelect ? (
        <div className={styles.currentSetting}>
          <h1 className={styles.settingTitle}>現在の設定</h1>
          <div className={styles.currentRoomContainer}>
            <div className={styles.soloRoom}>
              <h2 className={styles.roomName}>Solo Room</h2>
              <div className={styles.wallpaperImageContainer}>
                <Image
                  className={styles.wallpaperImage}
                  src={`/wallpapers/${soloWallpaper.src}`}
                  width={300}
                  height={169}
                  priority
                  alt="wallpaper image"
                ></Image>
                <div
                  className={styles.hoverText}
                  onClick={() => openSelectView("Solo")}
                >
                  変更する
                </div>
              </div>
            </div>
            <div className={styles.multiRoom}>
              <h2 className={styles.roomName}>Multi Room</h2>
              <div className={styles.wallpaperImageContainer}>
                <Image
                  className={styles.wallpaperImage}
                  src={`/wallpapers/${multiWallpaper.src}`}
                  width={300}
                  height={169}
                  priority
                  alt="wallpaper image"
                ></Image>
                <div
                  className={styles.hoverText}
                  onClick={() => openSelectView("Multi")}
                >
                  変更する
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <SelectWallpaper
          soloWallpaper={soloWallpaper}
          multiWallpaper={multiWallpaper}
          wallpapers={wallpapers}
          closeSelectView={closeSelectView}
          roomType={settingRoomType}
        />
      )}
    </div>
  );
}
