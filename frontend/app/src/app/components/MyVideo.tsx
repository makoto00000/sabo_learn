"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./MyVideo.module.scss";
import { MotionDetection } from "@/app/utils/MotionDetection";

export default function MyVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mosaicVideoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const videoFrameRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);

  const [time, setTime] = useState<number>(0);
  const isRunningRef = useRef<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // サボっていると判定される秒数
  const saboJudgementTime = 60;

  useEffect(() => {
    const video = videoRef.current!;
    const mosaicVideo = mosaicVideoRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d");

    const handleMetadataLoad = () => {
      if (video.videoWidth && video.videoHeight) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        draw();
      }
    };

    const draw = () => {
      if (video.videoWidth && video.videoHeight) {
        const width = video.videoWidth;
        const height = video.videoHeight;
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          // videoを12分の1に縮小してcanvasに描画
          ctx.drawImage(video, 0, 0, width / 12, height / 12);
          // canvasに描画されているものを12倍にしてcanvasに描画
          ctx.drawImage(
            canvas,
            0,
            0,
            width / 12,
            height / 12,
            0,
            0,
            width,
            height
          );
        }
        requestAnimationFrame(draw);
      }
    };

    if (video && canvas) {
      video.addEventListener("loadedmetadata", handleMetadataLoad);
      const medias = {
        audio: false,
        video: {
          facingMode: "user",
          frameRate: { ideal: 3, max: 5 },
          width: 346,
          height: 346,
        },
      };
      navigator.mediaDevices
        .getUserMedia(medias)
        .then((stream) => {
          if (video) {
            video.srcObject = stream;
            video.play();
            const canvasStream = canvas.captureStream();
            mosaicVideo.srcObject = canvasStream;
            mosaicVideo.play();
            successCallback(stream);
          }
        })
        .catch((error) => {
          errorCallback(error);
        });
    }

    const script = document.createElement("script");
    script.src = "https://docs.opencv.org/3.4.0/opencv.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (video && video.srcObject) {
        const stream = video.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach((track) => {
          track.stop();
        });
      }
    };
  }, []);

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
        resetTimer();
      }
    }

    function onStop() {
      if (status) {
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
          if (prevTime > saboJudgementTime) {
            if (statusRef.current && videoFrameRef.current) {
              statusRef.current.innerText = "Sabo?";
              statusRef.current.style.color = "#D00000";
              videoFrameRef.current.style.border = "6px solid #D00000";
            }
          }
          return prevTime;
        });
      }, 1000);
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
    }
  };

  return (
    <div className={styles.videoContainer}>
      <div ref={videoFrameRef} className={styles.videoFrame}>
        <video
          ref={videoRef}
          className={styles.myVideo}
          width={346}
          height={346}
          autoPlay
          playsInline
        ></video>
        <canvas
          ref={canvasRef}
          width={346}
          height={346}
          style={{ display: "none" }}
        ></canvas>
        <video
          ref={mosaicVideoRef}
          className={styles.mosaicVideo}
          width={346}
          height={346}
          autoPlay
          playsInline
        ></video>
      </div>
      <p ref={statusRef} className={styles.status}>
        Studying
      </p>
      <p>{time}</p>
    </div>
  );
}
