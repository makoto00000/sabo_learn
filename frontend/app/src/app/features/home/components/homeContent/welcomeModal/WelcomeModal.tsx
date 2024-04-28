"use client";

import styles from "@/app/features/home/components/homeContent/welcomeModal/WelcomeModal.module.scss";
import { useState } from "react";
import { driver } from "driver.js";

const driverObj = driver({
  allowClose: false,
  nextBtnText: "次へ",
  prevBtnText: "戻る",
  doneBtnText: "完了",
  popoverClass: "popover-custom",
  steps: [
    {
      element: "#solo",
      popover: {
        title: "Solo Room",
        description: "1人用の作業部屋。じっくり作業したい人はこっち!",
        side: "left",
        align: "start",
      },
    },
    {
      element: "#multi",
      popover: {
        title: "Multi Room",
        description:
          "最大4人まで入室できるオンライン部屋。仲間と一緒に頑張りたい人はこっち!",
        side: "left",
        align: "start",
      },
    },
    {
      element: "#userInfo",
      popover: {
        title: "コインを獲得",
        description:
          "作業時間に応じてコインが獲得できるよ。現在のコインはここで確認してね。",
        side: "left",
        align: "start",
      },
    },
    {
      element: "#shop",
      popover: {
        title: "アイテムショップ",
        description: "コインを使って、部屋の背景や音楽を購入できるよ！",
        side: "left",
        align: "start",
      },
    },
    {
      element: "#setting",
      popover: {
        title: "セッティング",
        description: "購入したアイテムはここから設定してね。",
        side: "left",
        align: "start",
      },
    },
    {
      element: "#solo",
      popover: {
        title: "さっそく作業を開始しよう！",
        description:
          "入室したらビデオカメラが起動します！ブラウザの設定からビデオカメラを許可してね。ビデオにはモザイクがかかっているので安心!",
        side: "left",
        align: "start",
      },
    },
  ],
});

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(true);

  const closeModal = () => {
    setIsOpen(false);
  };

  const startDrive = () => {
    closeModal();
    driverObj.drive();
  };

  if (!isOpen) return null;
  if (isOpen)
    return (
      <div className={styles.container}>
        <div className={styles.modal}>
          <h2>Sabo Learnへようこそ!</h2>
          <div className={styles.modalText}>
            まずは簡単な説明で使い方を覚えよう。
          </div>
          <div className={styles.buttonContainer}>
            <button
              className={styles.cancelButton}
              onClick={() => closeModal()}
            >
              キャンセル
            </button>
            <button className={styles.applyButton} onClick={() => startDrive()}>
              使い方を見る
            </button>
          </div>
        </div>
      </div>
    );
}
