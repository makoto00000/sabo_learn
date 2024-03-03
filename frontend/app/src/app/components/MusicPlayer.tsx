"use client";

import styles from "@/app/components/MusicPlayer.module.scss";
import Image from "next/image";
import { ChangeEvent, FormEvent, FormEventHandler, useEffect, useRef, useState } from "react";

type musicInfo = {
  title: string;
  artist: string;
  image: string;
  src: string;
};

export default function MusicPlayer() {
  const imageSrc = "/player/";
  const [title, setTitle] = useState<string>("Sample Music");
  const [artist, setArtist] = useState<string>("Sample Artist");
  const [image, setImage] = useState<string>("music_image.png");


  const audioRef = useRef<HTMLAudioElement>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);

  const handleTogglePlay = () => {
    if (!isAudioPlaying) {
      audioRef.current!.play();
      setIsAudioPlaying(true);
    }
    if (isAudioPlaying) {
      audioRef.current!.pause();
      setIsAudioPlaying(false);
    }
  };

  /** 音声の再生時間（s）をstate管理 */
  const [source, setSource] = useState<string>("summer-walk.mp3");
  const [duration, setDuration] = useState<number>(0);
  const [timePosition, setTimePosition] = useState(0);
  const timePositionRef = useRef(null);

  /** 音声の再生時間を更新する処理 */
  useEffect(() => {
    setTimePosition(audioRef.current!.currentTime);
    setDuration(audioRef.current!.duration);

  }, [audioRef.current, setTimePosition]);

  /** 秒数を「0:00:00」の形式に変換する処理 */
  const getTimeStringFromSeconds = (seconds: number): string => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor(Math.floor(seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    const hh = h.toString().padStart(2, "0");
    const mm =  m.toString().padStart(2, "0");
    const ss =  s.toString().padStart(2, "0");
    return `${hh}:${mm}:${ss}`;
  };

  const handleTimeUpdate = () => {
    setTimePosition(audioRef.current!.currentTime);
  };

  const handleEnded = () => {
    setTimePosition(0);
    setIsAudioPlaying(false);
  };

  const handleChangeTimePosition = (e: ChangeEvent<HTMLInputElement>) => {
    const position = parseInt(e.target.value);
    setTimePosition(position);
    audioRef.current!.currentTime = position;
  };


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
            className={`${styles.shuffleButton} ${styles.controller}`}
            src={`${imageSrc}shuffle.png`}
            width={24}
            height={24}
            alt="shuffle icon"
          ></Image>
          <Image
            className={`${styles.previousButton} ${styles.controller}`}
            src={`${imageSrc}previous.png`}
            width={24}
            height={24}
            alt="previous icon"
          ></Image>
          <Image
            className={`${styles.playButton} ${styles.controller}`}
            src={isAudioPlaying ? `${imageSrc}pause.png` : `${imageSrc}play.png`}
            width={51}
            height={51}
            alt="play icon"
            onClick={() => {
              handleTogglePlay();
            }}
          ></Image>
          <Image
            className={`${styles.nextButton} ${styles.controller}`}
            src={`${imageSrc}next.png`}
            width={24}
            height={24}
            alt="next icon"
          ></Image>
          <Image
            className={`${styles.repeatButton} ${styles.controller}`}
            src={`${imageSrc}repeat.png`}
            width={24}
            height={24}
            alt="repeat icon"
          ></Image>
        </div>
        <audio
          src={`${imageSrc}${source}`}
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
        />
        <div className={styles.seekBarContainer}>
          <span className={styles.currentTime}>
            {getTimeStringFromSeconds(timePosition)}
          </span>
          <input
            type="range"
            min={0}
            max={duration}
            value={timePosition}
            onChange={handleChangeTimePosition}
            ref={timePositionRef}
            className={`${styles.seekBar} ${styles.controller}`}
          ></input>
          <span className={styles.totalTime}>
            {getTimeStringFromSeconds(duration)}
          </span>
        </div>
      </div>
      <div className={styles.volume}>
        <Image
          className={`${styles.controlButton} ${styles.controller}`}
          src={`${imageSrc}speaker.png`}
          width={24}
          height={24}
          alt="repeat icon"
        ></Image>
        <div className={`${styles.volumeBar} ${styles.controller}`}></div>
      </div>
    </div>
  );
}
