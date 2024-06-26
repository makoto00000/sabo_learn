"use client";

import { RefObject, useEffect, useState } from "react";
import styles from "./MyVideo.module.scss";

type MyVideoProps = {
  videoFrameRef: RefObject<HTMLDivElement>;
  videoRef: RefObject<HTMLVideoElement>;
  canvasRef: RefObject<HTMLCanvasElement>;
  statusRef: RefObject<HTMLParagraphElement>;
};

export default function MyVideo({
  videoFrameRef,
  videoRef,
  canvasRef,
  statusRef,
}: MyVideoProps) {
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
              autoPlay
              muted
              playsInline
            ></video>
            <canvas
              ref={canvasRef}
              className={styles.mosaicVideo}
              width={346}
              height={346}
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
