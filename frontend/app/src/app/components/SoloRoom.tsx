"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./SoloRoom.module.scss";
import Image from "next/image";
import Link from "next/link";
import { MotionDetection } from "@/app/utils/MotionDetection";

export default function SoloRoom() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoFrameRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);

  const [time, setTime] = useState<number>(0);
  const timeRef = useRef<number>(0);
  const isRunningRef = useRef<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const playVideo = async () => {
      const medias = {
        audio: false,
        video: {
          facingMode: "user",
        },
      };

      try {
        const stream = await navigator.mediaDevices.getUserMedia(medias);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        await successCallback(stream);
      } catch (error) {
        errorCallback(error);
      }
    };
    const script = document.createElement("script");
    script.src = "https://docs.opencv.org/3.4.0/opencv.js";
    script.async = true;
    document.body.appendChild(script);

    playVideo();
  }, [videoRef]);

  async function successCallback(stream: MediaStream) {
    const video = videoRef.current;
    const status = statusRef.current;
    const fps = 8;
    if (video) {
      video.oncanplay = () => {
        new MotionDetection({
          video,
          onMove,
          onStop,
          fps,
        });
      };
    }

    function onMove() {
      if (status) {
        // status.innerText = "MOVE";
        resetTimer();
      }
    }

    function onStop() {
      if (status) {
        // status.innerText = "STOP";
        if (!isRunningRef.current) {
          startTimer();
        }
      }
    }
  }

  function errorCallback(err: any) {
    alert(err);
  }

  const startTimer = () => {
    isRunningRef.current = true;
    if (intervalRef) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);

        setTime((prevTime) => {
          if (prevTime > 5) {
            if (statusRef.current && videoFrameRef.current) {
              statusRef.current.innerText = "Sabo?";
              statusRef.current.style.color = "#D00000";
              videoFrameRef.current.style.border = "6px solid #D00000";
            }
          }
          return prevTime;
        });
      }, 1000);
      console.log("start");
    }
  };

  const resetTimer = () => {
    isRunningRef.current = false;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      setTime(0);
      if (statusRef.current && videoFrameRef.current) {
        statusRef.current.innerText = "Studying";
        statusRef.current.style.color = "#00F143";
        videoFrameRef.current.style.border = "6px solid #00F143";
      }
      console.log("reset");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.layer}></div>
      <div className={styles.contents}>
        <h1 className={styles.roomName}>Solo Room</h1>
        <div className={styles.record}>
          <div className={styles.time}>Time 01:22:33</div>
          <div className={styles.point}>
            <Image
              className={styles.coinImage}
              src="/coin_icon.png"
              width={40}
              height={40}
              alt="coinIcon"
            ></Image>
            <span className={styles.coinCount}>1234</span>
            <span className={styles.coinUnit}>sp</span>
            <span className={styles.plusCoin}>+100</span>
          </div>
        </div>
        <div className={styles.videoContainer}>
          <div ref={videoFrameRef} className={styles.videoFrame}>
            <video
              ref={videoRef}
              width={346}
              height={346}
              playsInline
              autoPlay
            ></video>
          </div>
          <p ref={statusRef} className={styles.status}>
            Studying
          </p>
          <p>{time}</p>
        </div>

        <Image
          className={styles.logo}
          src="/logo.png"
          width={148}
          height={35}
          alt="logo"
        ></Image>
        <nav className={styles.navigation}>
          <ul className={styles.menus}>
            <li>
              <Image
                className={styles.listIcon}
                src="/restroom_icon.png"
                width={30}
                height={30}
                alt="roomIcon"
              ></Image>
              <Link href="/">Rest Room</Link>
            </li>
            <li>
              <Image
                className={styles.listIcon}
                src="/exit_icon.png"
                width={30}
                height={30}
                alt="roomIcon"
              ></Image>
              <Link href="/">Exit</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
