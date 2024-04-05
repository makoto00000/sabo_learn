"use client";

import {
  RefObject,
} from "react";
import styles from "./MyVideo.module.scss";
import React from "react";
import { getTimeStringFromSeconds } from "@/app/utils/Format";
import { useWebRTC } from "../hooks/useWebRTC";

type MyVideoProps = {
  videoFrameRef: RefObject<HTMLDivElement>;
  videoRef: RefObject<HTMLVideoElement>;
  canvasRef: RefObject<HTMLCanvasElement>;
  statusRef: RefObject<HTMLParagraphElement>;
  handleIsConnecting: (isConnecting: boolean) => void;
  // isConnecting: boolean,
  // isStudying: boolean;
  userName: string
};

const MultiVideo = ({
  videoFrameRef,
  videoRef,
  canvasRef,
  statusRef,
  handleIsConnecting,
  // isConnecting,
  // isStudying,
  userName,
}: MyVideoProps) => {

  const { videoContainerRef, connect } = useWebRTC({
    canvasRef,
    handleIsConnecting,
    // isConnecting,
    // isStudying,
    userName,
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
              playsInline
              onPlay={() => connect()}
            ></video>
            <canvas
              ref={canvasRef}
              className={styles.mosaicVideo}
              width={348}
              height={348}
            ></canvas>
            <p className={styles.userName}>{userName}</p>
          </div>
          <p ref={statusRef} className={styles.status}>
            Studying
          </p>
          {/* {getTimeStringFromSeconds(time)} */}
        </div>
      </div>
    </div>
  );
};

// function DummyVideo() {
//   return (
//     <div>
//       <div className={`${styles.video} ${styles.multiVideo}`}>
//         <div className={styles.videoFrame}>
//           <video
//             className={styles.connectVideo}
//             width={346}
//             height={346}
//             autoPlay
//             playsInline
//           ></video>
//         </div>
//         <p className={styles.status}>Studying</p>
//       </div>
//     </div>
//   );
// }

export default React.memo(MultiVideo);
