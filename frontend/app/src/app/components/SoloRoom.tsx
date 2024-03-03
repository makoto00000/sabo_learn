"use client";

import styles from "./SoloRoom.module.scss";
import Image from "next/image";
import Link from "next/link";
import MyVideo from "./MyVideo";
import Score from "./Score";
import { useVideo } from "@/app/hooks/useVideo";
import MusicPlayer from "./MusicPlayer";

export default function SoloRoom() {
  const {
    videoFrameRef,
    videoRef,
    canvasRef,
    mosaicVideoRef,
    statusRef,
    // time,
    isStudyingRef,
    scoreTime,
    point,
    getPointRef,
    showAnimation
  } = useVideo();

  const MyVideoProps = {
    videoFrameRef: videoFrameRef,
    videoRef: videoRef,
    canvasRef: canvasRef,
    mosaicVideoRef: mosaicVideoRef,
    statusRef: statusRef,
  };


  const ScoreProps = {
    scoreTime: scoreTime,
    point: point,
    getPointRef: getPointRef,
    showAnimation: showAnimation,
    isStudyingRef: isStudyingRef,
  };

  return (
    <div className={styles.container}>
      <div className={styles.layer}></div>
      <div className={styles.contents}>
        <h1 className={styles.roomName}>Solo Room</h1>
        <Score {...ScoreProps} />
        <MyVideo {...MyVideoProps} />

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
      <MusicPlayer />
    </div>
  );
}
