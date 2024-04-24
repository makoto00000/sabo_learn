import Image from "next/image";
import { useEffect } from "react";
import { Music, Wallpaper } from "@/app/types/User";
import { useLoading } from "@/app/components/elements/loading/useLoading";
import Loading from "@/app/components/elements/loading/Loading";
import styles from "@/app/features/home/components/homeContent/shop/components/wallpaper/WallpaperShop.module.scss";

export default function WallpaperShop({
  wallpapers,
  userWallpapers,
  openModal,
}: {
  wallpapers: Wallpaper[];
  userWallpapers: Wallpaper[];
  openModal: (
    itemType: "background" | "music",
    wallpaper: Wallpaper | null,
    music: Music | null
  ) => void;
}) {
  const userWallpapersIds = userWallpapers.map((wallpaper) => wallpaper.id);

  const { isLoading, handleIsLoading } = useLoading();
  useEffect(() => {
    handleIsLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleImageLoad = () => {
    handleIsLoading(false);
  };

  return (
    <div className={`${styles.main} content`}>
      {wallpapers.map((wallpaper) => (
        <div
          key={wallpaper.id}
          className={styles.item}
          onClick={() => openModal("background", wallpaper, null)}
        >
          <div className={styles.imageContainer}>
            <Image
              className={styles.wallpaperImage}
              src={`/wallpapers/${wallpaper.src}`}
              width={300}
              height={169}
              priority
              alt="wallpaper image"
              onLoad={handleImageLoad}
            ></Image>
            {isLoading && <Loading />}
            {userWallpapersIds.includes(wallpaper.id) && (
              <div className={`${styles.muskText} ${styles.filter}`}>
                購入済
              </div>
            )}
          </div>
          <div className={styles.price}>
            <Image
              className={styles.coinImage}
              src="/coin_icon.png"
              width={30}
              height={30}
              priority
              alt="coin image"
            ></Image>
            <p className={styles.priceValue}>{wallpaper.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
