// 勉強時間と獲得ポイントに関する処理

import { useCallback, useEffect, useRef, useState } from "react";

export function useScoreTimer() {
  const [scoreTime, setScoreTime] = useState<number>(0);
  const [point, setPoint] = useState<number>(0);
  const getPointRef = useRef<HTMLSpanElement>(null);
  const [showAnimation, setShowAnimation] = useState<boolean>(false);
  const isRunningRef = useRef<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // 60秒ごとにポイント獲得
  const getPointInterval = 60;

  // 一定時間ごとに獲得できるポイント
  const getPointValue = 100;

  useEffect(() => {
    startScoreTimer();
    return () => stopScoreTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startScoreTimer = useCallback(() => {
    isRunningRef.current = true;
    if (intervalRef) {
      intervalRef.current = setInterval(() => {
        setScoreTime((prevTime) => prevTime + 1);
        setScoreTime((prevTime) => {
          if (prevTime % getPointInterval === 0) {
            setPoint((prevPoint) => prevPoint + getPointValue);
            setShowAnimation(true);
          }
          return prevTime;
        });
      }, 1000);
    }
  }, []);

  const stopScoreTimer = useCallback(() => {
    isRunningRef.current = false;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (showAnimation) {
      getPointRef.current!.addEventListener("animationend", () => {
        setShowAnimation(false);
      });
    }
  }, [showAnimation]);

  return {
    scoreTime,
    startScoreTimer,
    stopScoreTimer,
    point,
    getPointRef,
    showAnimation,
    isRunningRef,
    intervalRef,
  };
}
