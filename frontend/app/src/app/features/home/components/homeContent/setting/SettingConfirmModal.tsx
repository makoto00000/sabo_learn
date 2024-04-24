import styles from "@/app/features/home/components/homeContent/shop/BuyConfirmModal.module.scss";
import Image from "next/image";
import { Wallpaper } from "@/app/types/User";

export default function SettingConfirmModal({
  closeModal,
  wallpaper,
  roomType
}: {
  closeModal: () => void;
  wallpaper: Wallpaper | null;
  roomType: "Solo" | "Multi"
}) {

  return (
    <div className={styles.container} onClick={() => closeModal()}>
      <div className={styles.modal}>
        <h2>{roomType} Roomに以下の背景を設定します</h2>
        <div className={styles.item}>
          {wallpaper && 
            <Image
              className={styles.wallpaperImage}
              src={`/wallpapers/${wallpaper.src}`}
              width={300}
              height={169}
              priority
              alt="wallpaper image"
            ></Image>
          }
        </div>

        <div className={styles.buttonContainer}>
          <button className={styles.cancelButton} onClick={() => closeModal()}>
            キャンセル
          </button>
          <button className={styles.applyButton}
            // onClick={() => RegisterWallpaperAction(roomType, wallpaper.id)}
            >
            購入
          </button>
        </div>
      </div>
    </div>
  );
}