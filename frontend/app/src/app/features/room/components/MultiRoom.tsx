"use client";

import styles from "./SoloRoom.module.scss";
import Image from "next/image";
import Score from "./Score";
import { useVideo } from "@/app/features/room/hooks/useVideo";
import MusicPlayer from "./MusicPlayer";
import { useEffect, useState } from "react";
import ExitConfirmModal from "./ExitConfirmModal";
import MultiVideo from "./MultiVideo";
import { User } from "@/app/types/User";
import Loading from "./Loading";

export default function MultiRoom({
  currentUser,
  userName,
}: {
  currentUser: User;
  userName: string;
}) {
  const {
    videoFrameRef,
    videoRef,
    canvasRef,
    statusRef,
    isStudying,
    scoreTime,
    point,
    getPointRef,
    showAnimation,
    handleIsConnecting,
    isPlayVideo,
  } = useVideo();

  const MyVideoProps = {
    videoFrameRef: videoFrameRef,
    videoRef: videoRef,
    canvasRef: canvasRef,
    statusRef: statusRef,
    handleIsConnecting: handleIsConnecting,
    userName,
  };

  const ScoreProps = {
    scoreTime: scoreTime,
    point: point,
    getPointRef: getPointRef,
    showAnimation: showAnimation,
    isStudying: isStudying,
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
        backgroundImage: `url("${wallpapersPath}${currentUser.multiWallpaper.src}")`,
      }}
    >
      <Loading isPlayVideo={isPlayVideo} />
      {isOpen && <ExitConfirmModal {...{ closeModal, scoreTime, point }} />}
      <div className={styles.layer}></div>
      <div className={styles.contents}>
        <h1 className={styles.roomName}>Multi Room</h1>
        <Score {...ScoreProps} />
        <MultiVideo {...MyVideoProps} />

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
