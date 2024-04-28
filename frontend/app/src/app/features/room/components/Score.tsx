"use client";

import { LegacyRef, MutableRefObject, useEffect, useRef } from "react";
import styles from "./Score.module.scss";
import Image from "next/image";
import { getTimeStringFromSeconds } from "@/app/utils/Format";

type ScoreProps = {
  scoreTime: number;
  point: number;
  getPointRef: LegacyRef<HTMLSpanElement>;
  showAnimation: boolean;
  isStudying: boolean;
  // isStudyingRef: MutableRefObject<boolean>,
};

export default function Score({
  scoreTime,
  point,
  getPointRef,
  showAnimation,
  isStudying,
}: // isStudyingRef,
ScoreProps) {
  const scoreTimeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleTimer = () => {
      if (isStudying) {
        scoreTimeRef.current!.style.color = "#ffffff";
      } else {
        scoreTimeRef.current!.style.color = "#C00000";
      }
    };
    handleTimer();
  }, [isStudying]);

  return (
    <div className={styles.record}>
      <div className={styles.time} ref={scoreTimeRef}>
        Time {getTimeStringFromSeconds(scoreTime)}
      </div>
      <div className={styles.point}>
        <Image
          className={styles.coinImage}
          src="/coin_icon.png"
          width={40}
          height={40}
          alt="coinIcon"
        ></Image>
        <span className={styles.coinCount}>{point}</span>
        {/* <span className={styles.coinUnit}>sp</span> */}
        {showAnimation && (
          <span className={styles.plusCoin} ref={getPointRef}>
            +100
          </span>
        )}
      </div>
    </div>
  );
}
