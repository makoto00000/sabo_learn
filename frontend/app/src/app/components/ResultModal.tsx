"use client";
import styles from "@/app/components/ExitConfirmModal.module.scss";
import { getTimeStringFromSeconds } from "@/app/utils/Format";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import CountUp from "react-countup";

export default function ResultModal() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scoreTime, setScoreTime] = useState<number | null>(null);
  const [earnCoin, setEarnCoin] = useState<number | null>(null);
  const [prevCoin, setPrevCoin] = useState<number | null>(null);

  const closeModal = () => {
    setIsOpen(false);
    router.replace("/");
  };

  useEffect(() => {
    if (
      searchParams.has("time") &&
      searchParams.has("coin") &&
      searchParams.has("prevCoin")
    ) {
      const time = Number(searchParams.get("time"));
      const coin = Number(searchParams.get("coin"));
      const prevCoin = Number(searchParams.get("prevCoin"));
      setIsOpen(true);
      setScoreTime(time);
      setEarnCoin(coin);
      setPrevCoin(prevCoin);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isOpen) return null;
  if (isOpen)
    return (
      <div
        className={styles.container}
        onClick={() => closeModal()}
      >
        <div className={styles.modal}>
          <h2>お疲れさまでした！</h2>
          <div className={styles.score}>
            {/* <div className={styles.timeContainer}>
            <h3>現在の作業時間</h3>
            <div className={styles.time}>
              {getTimeStringFromSeconds(scoreTime)}
            </div>
          </div> */}
            <div className={styles.coinContainer}>
              <h3>所持コイン</h3>
              <div className={styles.coinScore}>
                <Image
                  className={styles.coin}
                  src="/coin_icon.png"
                  width={30}
                  height={30}
                  alt="coin"
                ></Image>
                <div className={styles.coin}>
                  <CountUp
                    start={prevCoin!}
                    end={earnCoin! + prevCoin!}
                    delay={2}
                    duration={1.5}
                  />
                </div>
                <span className={styles.unit}></span>
                <div className={styles.addCoin}>
                  + <CountUp start={earnCoin!} end={0} delay={2} duration={1.5} />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <button
              className={styles.cancelButton}
              onClick={() => closeModal()}
            >
              閉じる
            </button>
            {/* <button
            className={styles.applyButton}
            >
              記録を確認
            </button> */}
          </div>
        </div>
      </div>
    );
}
