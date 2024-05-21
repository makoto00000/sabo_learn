"use client";

import { RefObject, useRef } from "react";
import styles from "./MyVideo.module.scss";
import React from "react";
import { useWebRTC } from "../hooks/useWebRTC";

type MyVideoProps = {
  videoFrameRef: RefObject<HTMLDivElement>;
  videoRef: RefObject<HTMLVideoElement>;
  canvasRef: RefObject<HTMLCanvasElement>;
  statusRef: RefObject<HTMLParagraphElement>;
  // handleIsConnecting: (isConnecting: boolean) => void;
  userName: string;
};

const MultiVideo = ({
  videoFrameRef,
  videoRef,
  canvasRef,
  statusRef,
  // handleIsConnecting,
  userName,
}: MyVideoProps) => {
  const enterRoomSoundRef = useRef<HTMLAudioElement>(null);
  const exitRoomSoundRef = useRef<HTMLAudioElement>(null);

  const { videoContainerRef, connect } = useWebRTC({
    canvasRef,
    // handleIsConnecting,
    userName,
    enterRoomSoundRef,
    exitRoomSoundRef,
  });

  return (
    <div className={styles.videoContainer} ref={videoContainerRef}>
      <div>
        <div className={`${styles.video} ${styles.multiVideo}`}>
          <div ref={videoFrameRef} className={styles.videoFrame}>
            <video
              id="local_video"
              ref={videoRef}
              className={styles.myVideo}
              width={346}
              height={346}
              autoPlay
              muted
              playsInline
              style={{ filter: "blur(10px)" }}
              onPlay={() => connect()}
            ></video>
            <canvas
              ref={canvasRef}
              className={styles.mosaicVideo}
              width={348}
              height={348}
              style={{ filter: "blur(10px)" }}
            ></canvas>
            <p className={styles.userName}>{userName}</p>
          </div>
          <p ref={statusRef} className={styles.status}>
            Studying
          </p>
        </div>
      </div>
      <audio src="/multiroom/enter_room.mp3" ref={enterRoomSoundRef}></audio>
      <audio src="/multiroom/exit_room.mp3" ref={exitRoomSoundRef}></audio>
    </div>
  );
};

export default React.memo(MultiVideo);
