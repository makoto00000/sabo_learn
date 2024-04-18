import styles from "@/app/components/shop/BuyConfirmModal.module.scss";
import Image from "next/image";
import { buyMusic, buyWallpaper } from "@/app/utils/Actions";
import { Wallpaper, Music } from "@/app/types/User";
import { useRouter } from "next/navigation";
import { useLoading } from "@/app/hooks/useLoading";
import Loading from "../Loading";

export default function BuyConfirmModal({
  closeModal,
  itemType,
  wallpaper,
  music,
  userCoin,
  itemPrice,
}: {
  closeModal: () => void;
  itemType: "background" | "music";
  wallpaper: Wallpaper | null;
  music: Music | null;
  userCoin: number | undefined;
  itemPrice: number | null;
}) {
  const router = useRouter();

  const { isLoading, handleIsLoading } = useLoading();

  const buyItemAction = async (itemId: number) => {
    handleIsLoading(true);

    try {
      let data;
      if (itemType === "music") {
        const data = await buyMusic(itemId);
        console.log(data)
        handleIsLoading(false);
        
      } else if (itemType === "background") {
        const data = await buyWallpaper(itemId);
        console.log(data)
        handleIsLoading(false);

      } else {
        throw new Error("invalid item type");
      }
      router.refresh();
      closeModal();
    } catch (error) {
      handleIsLoading(false);
      console.log(error);
    }
  };

  const isLackCoin = () => {
    if (itemPrice !== null && userCoin !== undefined && itemPrice > userCoin) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div
      className={styles.container}
      // onClick={isLoading ? undefined : () => closeModal()} //TODO 購入ボタンを押すとこれが発火してしまう。
    >
      {isLoading && <Loading />}
      <div className={styles.modal}>
        <h2>以下のアイテムを購入します</h2>
        <div className={styles.item}>
          {itemType === "background" && wallpaper && (
            <div className={styles.itemInfo}>
              <Image
                className={styles.wallpaperImage}
                src={`/wallpapers/${wallpaper.src}`}
                width={300}
                height={169}
                priority
                alt="wallpaper image"
              ></Image>
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
          )}
          {itemType === "music" && music && (
            <div className={styles.itemInfo}>
              <Image
                className={styles.musicImage}
                src={`/tracks/${music.image}`}
                width={70}
                height={70}
                alt="music image"
              ></Image>
              <div className={styles.titleInfo}>
                <div className={styles.title}>{music.title}</div>
                <div className={styles.artist}>{music.artist}</div>
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
                <p className={styles.priceValue}>{music.price}</p>
              </div>
            </div>
          )}
        </div>

        <div className={styles.userCoinContainer}>
          <h3 className={styles.userCoinHead}>購入後のコイン</h3>
          <div className={styles.userCoin}>
            <div className={styles.price}>
              <Image
                className={styles.coinImage}
                src="/coin_icon.png"
                width={30}
                height={30}
                priority
                alt="coin image"
              ></Image>
              <p className={styles.priceValue}>{userCoin}</p>
            </div>
            <Image
              className={styles.arrowImage}
              src="/arrow_right.png"
              width={30}
              height={30}
              priority
              alt="arrow right"
            ></Image>
            {userCoin !== undefined && itemPrice !== null ? (
              userCoin - itemPrice >= 0 ? (
                <p className={styles.afterPriceValue}>{userCoin - itemPrice}</p>
              ) : (
                <p className={`${styles.afterPriceValue} ${styles.warning}`}>
                  -{itemPrice - userCoin}
                </p>
              )
            ) : null}
          </div>
          {isLackCoin() && (
            <div className={styles.warning}>所持コインが不足しています</div>
          )}
        </div>

        <div className={styles.buttonContainer}>
          <button className={styles.cancelButton} onClick={() => closeModal()}>
            キャンセル
          </button>

          {itemType === "music" && music && (
            <button
              className={styles.applyButton}
              onClick={() => buyItemAction(Number(music.id))}
              disabled={isLackCoin()}
            >
              購入
            </button>
          )}
          {itemType === "background" && wallpaper && (
            <button
              className={styles.applyButton}
              onClick={() => buyItemAction(Number(wallpaper.id))}
              disabled={isLackCoin()}
            >
              購入
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
