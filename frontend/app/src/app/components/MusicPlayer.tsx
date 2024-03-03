"use client";

import styles from "@/app/components/MusicPlayer.module.scss";
import Image from "next/image";
import { useState } from "react";

type musicInfo = {
  title: string;
  artist: string;
  image: string;
  src: string;
};

export default function MusicPlayer() {
  const imageSrc = "/player/"
  const [title, setTitle] = useState<string>("Sample Music");
  const [artist, setArtist] = useState<string>("Sample Artist");
  const [image, setImage] = useState<string>("music_image.png");
  const [src, setSrc] = useState<string>("/");
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [totalTime, setTotalTime] = useState<number>(0);

  return (
    <div className={styles.container}>
      <div className={styles.musicInfo}>
        <Image
          className={styles.musicImage}
          src={`${imageSrc}${image}`}
          width={70}
          height={70}
          alt="music image"
        ></Image>
        <div className={styles.titleInfo}>
          <div className={styles.title}>{title}</div>
          <div className={styles.artist}>{artist}</div>
        </div>
      </div>
      <div className={styles.player}>
        <div className={styles.control}>
        <Image
          className={styles.shuffleButton}
          src={`${imageSrc}shuffle.png`}
          width={24}
          height={24}
          alt="shuffle icon"
        ></Image>
        <Image
          className={styles.previousButton}
          src={`${imageSrc}previous.png`}
          width={24}
          height={24}
          alt="previous icon"
        ></Image>
        <Image
          className={styles.playButton}
          src={`${imageSrc}play.png`}
          width={51}
          height={51}
          alt="play icon"
        ></Image>
        <Image
          className={styles.nextButton}
          src={`${imageSrc}next.png`}
          width={24}
          height={24}
          alt="next icon"
        ></Image>
        <Image
          className={styles.repeatButton}
          src={`${imageSrc}repeat.png`}
          width={24}
          height={24}
          alt="repeat icon"
        ></Image>
        </div>
        <div className={styles.seekBarContainer}>
          <span className={styles.currentTime}>{currentTime}</span>
          <div className={styles.seekBar}></div>
          <span className={styles.totalTime}>{totalTime}</span>
        </div>
      </div>
      <div className={styles.volume}>
        <Image
          className={styles.controlButton}
          src={`${imageSrc}speaker.png`}
          width={24}
          height={24}
          alt="repeat icon"
        ></Image>
        <div className={styles.volumeBar}></div>
      </div>
    </div>
  );
}
