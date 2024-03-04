"use client";

import { RefObject } from "react";
import styles from "./MyVideo.module.scss";

type MyVideoProps = {
  videoFrameRef: RefObject<HTMLDivElement>,
  videoRef: RefObject<HTMLVideoElement>,
  canvasRef: RefObject<HTMLCanvasElement>,
  mosaicVideoRef: RefObject<HTMLVideoElement>,
  statusRef: RefObject<HTMLParagraphElement>,
  // time
}

export default function MyVideo({
  videoFrameRef,
  videoRef,
  canvasRef,
  mosaicVideoRef,
  statusRef,
  // time
}: MyVideoProps) {
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
      {/* <p>{time}</p> */}
    </div>
  );
}
