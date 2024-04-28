"use client";

import styles from "./SoloRoom.module.scss";
import Image from "next/image";
import MyVideo from "./MyVideo";
import Score from "./Score";
import { useVideo } from "@/app/features/room/hooks/useVideo";
import MusicPlayer from "./MusicPlayer";
import { useEffect, useState } from "react";
import ExitConfirmModal from "./ExitConfirmModal";
import { User } from "@/app/types/User";
import Loading from "./Loading";

export default function SoloRoom({ currentUser }: { currentUser: User }) {
  const {
    videoFrameRef,
    videoRef,
    canvasRef,
    statusRef,
    // isStudyingRef,
    isStudying,
    scoreTime,
    point,
    getPointRef,
    showAnimation,
    handleIsConnecting,
    // time,
    isPlayVideo,
  } = useVideo();

  const MyVideoProps = {
    videoFrameRef: videoFrameRef,
    videoRef: videoRef,
    canvasRef: canvasRef,
    statusRef: statusRef,
    isStudying: isStudying,
    handleIsConnecting: handleIsConnecting,
    // time: time,
  };

  const ScoreProps = {
    scoreTime: scoreTime,
    point: point,
    getPointRef: getPointRef,
    showAnimation: showAnimation,
    isStudying: isStudying,
    // isStudyingRef: isStudyingRef,
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleBackButton = (event: { preventDefault: () => void }) => {
      event.preventDefault();
      alert("Exitから退室しないと、獲得したコインが反映されません。");
      window.history.forward();
    };

    const handleBeforeUnload = (event: {
      preventDefault: () => void;
      returnValue: string;
    }) => {
      event.preventDefault();
      event.returnValue =
        "Exitから退室しないと、獲得したコインが反映されません。";
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handleBackButton);
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("popstate", handleBackButton);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const wallpapersPath = "/wallpapers/";

  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: `url("${wallpapersPath}${currentUser.soloWallpaper.src}")`,
      }}
    >
      {isOpen && <ExitConfirmModal {...{ closeModal, scoreTime, point }} />}
      <Loading isPlayVideo={isPlayVideo}/>
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
          priority
        ></Image>
        <nav className={styles.navigation}>
          <ul className={styles.menus}>
            {/* <li>
              <Image
                className={styles.listIcon}
                src="/restroom_icon.png"
                width={30}
                height={30}
                alt="roomIcon"
              ></Image>
              <Link href="/">Rest Room</Link>
            </li> */}
            <li onClick={() => openModal()}>
              <Image
                className={styles.listIcon}
                src="/exit_icon.png"
                width={30}
                height={30}
                alt="roomIcon"
              ></Image>
              Exit
            </li>
          </ul>
        </nav>
      </div>
      <MusicPlayer playlist={currentUser.playlist} />
    </div>
  );
}
