"use client";

import { RefObject } from "react";
import styles from "./MyVideo.module.scss";

type MyVideoProps = {
  videoFrameRef: RefObject<HTMLDivElement>;
  videoRef: RefObject<HTMLVideoElement>;
  canvasRef: RefObject<HTMLCanvasElement>;
  statusRef: RefObject<HTMLParagraphElement>;
  // time: number;
};

export default function MyVideo({
  videoFrameRef,
  videoRef,
  canvasRef,
  statusRef,
  // time,
}:MyVideoProps) {

  return (
    <div className={styles.videoContainer}>
      <div>
        <div className={styles.video}>
          <div ref={videoFrameRef} className={styles.videoFrame}>
            <video
              id="local_video"
              ref={videoRef}
              className={styles.myVideo}
              width={346}
              height={346}
              // width={320}
              // height={346}
              autoPlay
              muted
              playsInline
              style={{filter: "blur(10px)"}}
              ></video>
            <canvas
              ref={canvasRef}
              className={styles.mosaicVideo}
              // width={320}
              // height={348}
              width={348}
              height={348}
              style={{filter: "blur(10px)"}}
            ></canvas>
          </div>
          <p ref={statusRef} className={styles.status}>
            Studying
          </p>
        </div>
      </div>
    </div>
  );
}
