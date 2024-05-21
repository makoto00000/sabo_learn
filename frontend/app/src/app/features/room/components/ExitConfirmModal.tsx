import styles from "@/app/features/room/components/ExitConfirmModal.module.scss";
import Image from "next/image";
import { getTimeStringFromSeconds } from "@/app/utils/Format";
import { addCoinAction } from "@/app/utils/Actions";

export default function ExitConfirmModal({
  closeModal,
  scoreTime,
  point,
}: {
  closeModal: () => void;
  scoreTime: number;
  point: number;
}) {
  const handleAddCoinAction = async (time: number, coin: number) => {
    try {
      await addCoinAction(time, coin);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container} onClick={() => closeModal()}>
      <div className={styles.modal}>
        <h2>退室しますか？</h2>
        <div className={styles.score}>
          <div className={styles.timeContainer}>
            <h3>現在の作業時間</h3>
            <div className={styles.time}>
              {getTimeStringFromSeconds(scoreTime)}
            </div>
          </div>
          <div className={styles.coinContainer}>
            <h3>獲得コイン</h3>
            <div className={styles.coinScore}>
              <Image
                className={styles.coin}
                src="/coin_icon.png"
                width={30}
                height={30}
                alt="coin"
              ></Image>
              <div className={styles.coin}>{point}</div>
              <span className={styles.unit}>sp</span>
            </div>
          </div>
        </div>
        <div className={styles.message}>
          あと<span className={styles.accent}>{60 - (scoreTime % 60)}秒</span>
          でさらに
          <span className={styles.accent}>100コイン</span>獲得できます。
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.cancelButton} onClick={() => closeModal()}>
            キャンセル
          </button>
          <button
            className={styles.applyButton}
            onClick={() => handleAddCoinAction(scoreTime, point)}
          >
            退室
          </button>
        </div>
      </div>
    </div>
  );
}
