"use client"

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Score.module.scss";
import Image from "next/image";

export default function Score() {

  const [time, setTime] = useState<number>(0);
  const [point, setPoint] = useState<number>(0);
  const getPointRef = useRef<HTMLSpanElement>(null);
  const [showAnimation, setShowAnimation] = useState<boolean>(false);
  const isRunningRef = useRef<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    startTimer();
    return()=> stopTimer();
  }, [])
  
  const startTimer = useCallback(() => {
    isRunningRef.current = true;
    if (intervalRef) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
        setTime((prevTime) => {
          if((prevTime % 60) === 0) {
            setPoint((prevPoint) => prevPoint + 100)
            setShowAnimation(true);
          };
          return prevTime;
        });
      }, 1000);
    }
  },[]);

  const stopTimer = useCallback(() => {
    isRunningRef.current = false;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  },[]);

  useEffect(() => {
    if (showAnimation) {
      getPointRef.current!.addEventListener('animationend', () => {
        setShowAnimation(false);
      });
    }
  }, [showAnimation]);

  return (
    <div className={styles.record}>
      <div className={styles.time}>Time {Math.floor(time / 360).toString().padStart(2, "0")}:{Math.floor(time / 60).toString().padStart(2, "0")}:{Math.floor(time % 60).toString().padStart(2, "0")}</div>
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
        {showAnimation && <span className={styles.plusCoin} ref={getPointRef}>+100</span>}
      </div>
    </div>
  )
}