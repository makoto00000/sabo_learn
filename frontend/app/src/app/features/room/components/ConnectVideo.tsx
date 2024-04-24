import styles from "@/app/features/room/components/MyVideo.module.scss";
import { RefObject, useEffect, useRef } from "react";

export default function ConnectVideo({
  socketId,
  stream,
  videoFrameRef,
  statusRef,
  userName,
  // isStudying,
}: {
  socketId: string;
  stream: MediaStream;
  videoFrameRef: RefObject<HTMLDivElement>;
  statusRef: RefObject<HTMLParagraphElement>;
  userName: string;
  // isStudying: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      // videoRef.current.play();
    }
  }, [stream, videoRef]);

  return (
    <div className={`${styles.video} ${styles.multiVideo}`}>
      <div className={styles.videoFrame} ref={videoFrameRef}>
        <video
          ref={videoRef}
          id={`video-${socketId}`}
          className={styles.connectVideo}
          width={346}
          height={346}
          autoPlay
          playsInline
          onCanPlay={()=>videoRef.current?.play()}
        ></video>
        <p className={styles.userName}>{userName}</p>
      </div>
      <p className={styles.status} ref={statusRef}>
        Studying
      </p>
    </div>
  );
}
