import styles from "@/app/components/setting/SelectWallpaper.module.scss";
import { Wallpaper } from "@/app/types/User";
import Image from "next/image";
import SettingConfirmModal from "./SettingConfirmModal";
import { useState } from "react";
import { useLoading } from "@/app/hooks/useLoading";
import { registerWallpaper } from "@/app/utils/Actions";
import { useRouter } from "next/navigation";
import Loading from "../Loading";

export default function SelectWallpaper({
  soloWallpaper,
  multiWallpaper,
  wallpapers,
  closeSelectView,
  roomType,
}: {
  soloWallpaper: Wallpaper;
  multiWallpaper: Wallpaper;
  wallpapers: Wallpaper[];
  closeSelectView: () => void;
  roomType: "Solo" | "Multi";
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectWallpaper, setSelectWallpaper] = useState<Wallpaper | null>(
    null
  );

  const openModal = (wallpaper: Wallpaper) => {
    setSelectWallpaper(wallpaper);
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const { isLoading, handleIsLoading } = useLoading();

  const router = useRouter();

  const RegisterWallpaperAction = async (
    roomType: "Solo" | "Multi",
    wallpaperId: number
  ) => {
    handleIsLoading(true);
    let room: "solo" | "multi" | null = null;
    if (roomType === "Solo") {
      room = "solo";
    }
    if (roomType === "Multi") {
      room = "multi";
    }
    try {
      if (room !== null) {
        const data = await registerWallpaper(room, wallpaperId);
        handleIsLoading(false);
        router.refresh();
      }
    } catch (error) {
      handleIsLoading(false);
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      {isLoading && <Loading />}
      {isOpen && (
        <SettingConfirmModal
          closeModal={closeModal}
          wallpaper={selectWallpaper}
          roomType={roomType}
        />
      )}
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>{roomType} Roomの背景を選択</h1>
        <Image
          className={styles.prevImage}
          src={"/prev_icon.png"}
          width={42}
          height={42}
          priority
          alt="prev button image"
          onClick={() => closeSelectView()}
        ></Image>
      </div>
      <div className={styles.items}>
        {wallpapers.map((wallpaper) => (
          <div key={wallpaper.id} className={styles.imageContainer}>
            <Image
              className={styles.wallpaperImage}
              src={`/wallpapers/${wallpaper.src}`}
              width={300}
              height={169}
              priority
              alt="wallpaper image"
            ></Image>
            {wallpaper.id === soloWallpaper.id && roomType === "Solo" && (
              <div className={`${styles.muskText} ${styles.filter}`}>
                選択中
              </div>
            )}
            {wallpaper.id === multiWallpaper.id && roomType === "Multi" && (
              <div className={`${styles.muskText} ${styles.filter}`}>
                選択中
              </div>
            )}
            <div
              className={`${styles.hoverText} ${styles.filter}`}
              onClick={() => RegisterWallpaperAction(roomType, wallpaper.id)}
            >
              この背景を設定
            </div>
          </div>
        ))}
        {wallpapers.map((wallpaper) => (
          <div key={wallpaper.id} className={styles.imageContainer}>
            <Image
              className={styles.wallpaperImage}
              src={`/wallpapers/${wallpaper.src}`}
              width={300}
              height={169}
              priority
              alt="wallpaper image"
            ></Image>
            {wallpaper.id === soloWallpaper.id && roomType === "Solo" && (
              <div className={`${styles.muskText} ${styles.filter}`}>
                選択中
              </div>
            )}
            {wallpaper.id === multiWallpaper.id && roomType === "Multi" && (
              <div className={`${styles.muskText} ${styles.filter}`}>
                選択中
              </div>
            )}
            <div
              className={`${styles.hoverText} ${styles.filter}`}
              onClick={() => RegisterWallpaperAction(roomType, wallpaper.id)}
            >
              この背景を設定
            </div>
          </div>
        ))}
        {wallpapers.map((wallpaper) => (
          <div key={wallpaper.id} className={styles.imageContainer}>
            <Image
              className={styles.wallpaperImage}
              src={`/wallpapers/${wallpaper.src}`}
              width={300}
              height={169}
              priority
              alt="wallpaper image"
            ></Image>
            {wallpaper.id === soloWallpaper.id && roomType === "Solo" && (
              <div className={`${styles.muskText} ${styles.filter}`}>
                選択中
              </div>
            )}
            {wallpaper.id === multiWallpaper.id && roomType === "Multi" && (
              <div className={`${styles.muskText} ${styles.filter}`}>
                選択中
              </div>
            )}
            <div
              className={`${styles.hoverText} ${styles.filter}`}
              onClick={() => RegisterWallpaperAction(roomType, wallpaper.id)}
            >
              この背景を設定
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
