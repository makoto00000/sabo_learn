// ユーザーのビデオに関する処理

import { useCallback, useEffect, useRef, useState } from "react";
import { MotionDetection } from "@/app/features/room/utils/MotionDetection";
import { useScoreTimer } from "./useScoreTimer";

export function useVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const videoFrameRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);

  const [time, setTime] = useState<number>(0);
  const isRunningRef = useRef<boolean>(false);
  const isStudyingRef = useRef<boolean>(true);
  const [isStudying, setIsStudying] = useState<boolean>(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const isConnectingRef = useRef<boolean>(false);

  const [isPlayVideo, setIsPlayVideo] = useState<boolean | null>(null);

  // onMove onStop の中でisConnectingを反映させるため、stateとrefを組み合わせる
  const handleIsConnecting = useCallback((isConnecting: boolean) => {
    setIsConnecting(isConnecting);
    // console.log(`isConnecting: ${isConnecting}`);
  }, []);

  useEffect(() => {
    isConnectingRef.current = isConnecting;
  }, [isConnecting]);

  // サボっていると判定される秒数
  const saboJudgementTime = 1;

  const {
    scoreTime,
    point,
    getPointRef,
    showAnimation,
    startScoreTimer,
    stopScoreTimer,
  } = useScoreTimer();

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    if (video && canvas) {
      video.autoplay = true;
      video.muted = true;
      video.playsInline = true;
      let ctx: CanvasRenderingContext2D | null = null;
      ctx = canvas.getContext("2d", { willReadFrequently: true });
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
            ctx.drawImage(video, 0, 0, width, height);
            ctx.drawImage(canvas, 0, 0, width, height);
            ctx.filter = "blur(10px)";
          }
          requestAnimationFrame(draw);
        }
      };

      if (video !== null && canvas !== null) {
        video.addEventListener("loadedmetadata", handleMetadataLoad);
        const medias = {
          audio: false,
          video: {
            facingMode: "user",
            frameRate: 3,
            width: 346,
            height: 346,
            // width: { ideal: 346 },
            // height: { ideal: 346 },
          },
        };
        navigator.mediaDevices
          .getUserMedia(medias)
          .then(async (stream) => {
            if (video) {
              video.srcObject = stream;
              video.play();
              setIsPlayVideo(true);
              await successCallback();
            }
          })
          .catch((error) => {
            errorCallback(error);
            console.log("ユーザーに拒否されました")
            setIsPlayVideo(false);
          });
      }
    }

    return () => {
      if (video && video.srcObject) {
        const stream = video.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach((track) => {
          track.stop();
        });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function successCallback() {
    const video = videoRef.current;
    const fps = 1;
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
      if (!isConnectingRef.current) {
        resetTimer();
      }
    }

    function onStop() {
      if (!isConnectingRef.current) {
        if (!isRunningRef.current) {
          startTimer();
        }
      }
    }
  }

  function errorCallback(err: any) {
    alert(err);
  }

  const stopTimer = useCallback(() => {
    isRunningRef.current = false;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startTimer = () => {
    isRunningRef.current = true;
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 1);

      setTime((prevTime) => {
        if (prevTime >= saboJudgementTime) {
          if (statusRef.current && videoFrameRef.current) {
            isStudyingRef.current = false;
            setIsStudying(false);
            statusRef.current.innerText = "Sabo?";
            statusRef.current.style.color = "#D00000";
            videoFrameRef.current.style.borderColor = "#D00000";
            stopScoreTimer();
            stopTimer();
          }
        }
        return prevTime;
      });
    }, 1000);
  };

  const resetTimer = () => {
    isRunningRef.current = false;
    clearInterval(intervalRef.current!);
    setTime(0);
    if (statusRef.current && videoFrameRef.current) {
      statusRef.current.innerText = "Studying";
      statusRef.current.style.color = "#00F143";
      videoFrameRef.current.style.borderColor = "#00F143";
    }
    if (!isStudyingRef.current) {
      startScoreTimer();
      isStudyingRef.current = true;
      setIsStudying(true);
    }
  };


  return {
    videoFrameRef,
    videoRef,
    canvasRef,
    statusRef,
    time,
    isStudying,
    handleIsConnecting,
    isConnecting,
    scoreTime,
    point,
    getPointRef,
    showAnimation,
    stopTimer,
    isPlayVideo,
  };
}