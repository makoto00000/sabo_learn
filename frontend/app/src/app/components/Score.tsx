"use client";

import { LegacyRef, MutableRefObject, useEffect, useRef } from "react";
import styles from "./Score.module.scss";
import Image from "next/image";

type ScoreProps = {
  scoreTime: number,
  point: number,
  getPointRef: LegacyRef<HTMLSpanElement>,
  showAnimation: boolean,
  isStudyingRef: MutableRefObject<boolean>,
}

export default function Score({
  scoreTime,
  point,
  getPointRef,
  showAnimation,
  isStudyingRef,
}: ScoreProps) {

  const scoreTimeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleTimer = ()=> {
      if (isStudyingRef.current) {
        scoreTimeRef.current!.style.color = "#ffffff"
      } else {
        scoreTimeRef.current!.style.color = "#C00000"
      }
    }
    handleTimer();
  }, [isStudyingRef.current])

  const getTimeStringFromSeconds = (seconds: number): string => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor(Math.floor(seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    const hh = h.toString().padStart(2, "0");
    const mm = m.toString().padStart(2, "0");
    const ss = s.toString().padStart(2, "0");
    return `${hh}:${mm}:${ss}`;
  };

  return (
    <div className={styles.record}>
      <div className={styles.time} ref={scoreTimeRef}>
        Time{" "}{getTimeStringFromSeconds(scoreTime)}
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
        <span className={styles.coinUnit}>sp</span>
        {showAnimation && (
          <span className={styles.plusCoin} ref={getPointRef}>
            +100
          </span>
        )}
      </div>
    </div>
  );
}
