"use client";

import styles from "@/app/components/MusicPlayer.module.scss";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";

type tracks = {
  title: string;
  artist: string;
  image: string;
  source: string;
};

const userTracksData = [
  {
    title: "Summer Walk",
    artist: "Olexy",
    image: "music-image.png",
    source: "summer-walk.mp3",
  },
  {
    title: "Relaxed Vlog (Night Street)",
    artist: "Ashot-Danielyan-Composer",
    image: "relaxed-vlog-night-street.webp",
    source: "relaxed-vlog-night-street.mp3",
  },
  {
    title: "Ambient Piano and Strings",
    artist: "Daddy_s_Music",
    image: "ambient-piano-and-strings.png",
    source: "ambient-piano-and-strings.mp3",
  },
];

export default function MusicPlayer() {
  const imagePath = "/player/";
  const trackPath = "/tracks/";

  // TODO バックエンドができたらDBから取得する。
  const [userTracks, setUserTracks] = useState<tracks[]>(userTracksData);

  const [currentTrack, setCurrentTrack] = useState<tracks>(userTracksData[0]);
  const [trackIndex, setTrackIndex] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement>(null);

  // 曲を再生させないとdurationが反映されないため、useEffect内で再生させる。
  // ただし、初回表示時は自動再生させないように初期値をnullとする。
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean | null>(null);

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

  /** 音声の再生時間（秒）をstate管理 */
  const [duration, setDuration] = useState<number>(0);
  const [timePosition, setTimePosition] = useState(0);
  const [isRepeat, setIsRepeat] = useState<boolean>(false);
  const [isShuffle, setIsShuffle] = useState<boolean>(false);

  useEffect(() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  }, [timePosition]);

  /** 秒数を「0:00:00」の形式に変換する処理 */
  const getTimeStringFromSeconds = (seconds: number): string => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor(Math.floor(seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    const hh = h.toString().padStart(2, "0");
    const mm = m.toString().padStart(2, "0");
    const ss = s.toString().padStart(2, "0");
    return `${hh}:${mm}:${ss}`;
  };

  /** 音声の再生時間を更新する処理 */
  const handleTimeUpdate = () => {
    setTimePosition(audioRef.current!.currentTime);
  };

  // 曲が終了したときの処理
  // リピート、シャッフル、スキップもここで実行
  const handleEnded = () => {
    if (isRepeat) {
      setTimePosition(0);
      audioRef.current!.play();
      setIsAudioPlaying(true);
    } else {
      if (isShuffle) {
        shuffleUserTracks();
      } else {
        handleNext();
      }
    }
  };

  // シークバーの入力値を反映させる処理
  const handleChangeTimePosition = (e: ChangeEvent<HTMLInputElement>) => {
    const position = parseInt(e.target.value);
    setTimePosition(position);
    audioRef.current!.currentTime = position;
  };

  // 音楽の音量を管理
  const [volume, setVolume] = useState<number>(30);
  const [isMute, setIsMute] = useState<boolean>(false);

  const handleChangeVolume = (e: ChangeEvent<HTMLInputElement>) => {
    const volume = parseInt(e.target.value);
    setVolume(volume);
    audioRef.current!.volume = volume / 100;
  };

  // ミュートの切り替え
  const toggleMute = () => {
    if (isMute) {
      audioRef.current!.muted = false;
      setIsMute(false);
    } else {
      audioRef.current!.muted = true;
      setIsMute(true);
    }
  };

  // シークバーの見た目を管理
  const seekBarBackground = {
    background: `linear-gradient(to right, #C4C4C4 ${
      (100 * timePosition) / duration
    }%, #535353 ${(100 * timePosition) / duration}%)`,
  };
  // 音量バーの見た目を管理
  const volumeBarBackground = {
    background: `linear-gradient(to right, #C4C4C4 ${volume}%, #535353 ${volume}%)`,
  };

  // スキップの処理
  const handleNext = () => {
    if (trackIndex === userTracks.length - 1) {
      setTrackIndex(0);
      setCurrentTrack(userTracks[0]);
    } else {
      setTrackIndex((prev) => prev + 1);
      setCurrentTrack(userTracks[trackIndex + 1]);
    }
  };

  const handlePrevious = () => {
    if (trackIndex === 0) {
      setTrackIndex(userTracks.length - 1);
      setCurrentTrack(userTracks[userTracks.length - 1]);
    } else {
      setTrackIndex((prev) => prev - 1);
      setCurrentTrack(userTracks[trackIndex - 1]);
    }
  };

  // ! 1曲しか持っていない場合、次の曲になっても再生されない。（ユーザーには初期状態で複数曲をもたせるので問題なし）
  // ! play()を実行しないと、durationが反映されない。
  useEffect(() => {
    audioRef.current!.src = `${trackPath}${currentTrack.source}`;
    if (isAudioPlaying !== null) {
      if (audioRef.current) {
        setDuration(audioRef.current.duration);
        audioRef.current!.play();
        setIsAudioPlaying(true);
      }
    }
  }, [currentTrack]);

  // リピート再生
  const handleRepeat = () => {
    setIsRepeat((prev) => !prev);
  };

  // シャッフル再生
  const handleShuffle = () => {
    setIsShuffle((prev) => !prev);
  };

  const shuffleUserTracks = () => {
    let randomIndex = Math.floor(Math.random() * userTracks.length);
    while (randomIndex === trackIndex) {
      randomIndex = Math.floor(Math.random() * userTracks.length);
    }
    setTrackIndex(randomIndex);
    setCurrentTrack(userTracks[randomIndex]);
  };

  // 曲名、アーティスト名をスクロールさせる
  const titleInfoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const artistRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkOverflowAndAnimate = () => {
      if (titleInfoRef.current && titleRef.current && artistRef.current) {
        const container = titleInfoRef.current;
        const title = titleRef.current;
        const artist = artistRef.current;
        const titleLength = currentTrack.title.length;
        const artistLength = currentTrack.artist.length;

        if (titleLength > 9 || artistLength > 15) {
          container.scrollTo(0, 0);
          title.classList.add(styles.animate);
          artist.classList.add(styles.animate);
        } else {
          title.classList.remove(styles.animate);
          artist.classList.remove(styles.animate);
        }
      }
    };
    checkOverflowAndAnimate();
  }, [currentTrack]);

  return (
    <div className={styles.container}>
      <div className={styles.musicInfo}>
        <Image
          className={styles.musicImage}
          src={`${trackPath}${currentTrack.image}`}
          width={70}
          height={70}
          alt="music image"
        ></Image>
        <div
          className={styles.titleInfo}
          ref={titleInfoRef}
        >
          <div className={styles.title} ref={titleRef}>
            {currentTrack.title}
          </div>
          <div className={styles.artist} ref={artistRef}>
            {currentTrack.artist}
          </div>
        </div>
      </div>
      <div className={styles.player}>
        <div className={styles.control}>
          <Image
            className={`${styles.shuffleButton} ${styles.controller}`}
            src={
              isShuffle
                ? `${imagePath}shuffle.png`
                : `${imagePath}no-shuffle.png`
            }
            width={24}
            height={24}
            alt="shuffle icon"
            onClick={() => handleShuffle()}
          ></Image>
          <Image
            className={`${styles.previousButton} ${styles.controller}`}
            src={`${imagePath}previous.png`}
            width={24}
            height={24}
            alt="previous icon"
            onClick={() => handlePrevious()}
          ></Image>
          <Image
            className={`${styles.playButton} ${styles.controller}`}
            src={
              isAudioPlaying ? `${imagePath}pause.png` : `${imagePath}play.png`
            }
            width={51}
            height={51}
            alt="play icon"
            onClick={() => {
              handleTogglePlay();
            }}
          ></Image>
          <Image
            className={`${styles.nextButton} ${styles.controller}`}
            src={`${imagePath}next.png`}
            width={24}
            height={24}
            alt="next icon"
            onClick={() => handleNext()}
          ></Image>
          <Image
            className={`${styles.repeatButton} ${styles.controller}`}
            src={
              isRepeat ? `${imagePath}one-repeat.png` : `${imagePath}repeat.png`
            }
            width={24}
            height={24}
            alt="repeat icon"
            onClick={() => handleRepeat()}
          ></Image>
        </div>
        <audio
          src={`${trackPath}${currentTrack.source}`}
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
            max={duration ? duration : 0}
            value={timePosition}
            onChange={handleChangeTimePosition}
            className={`${styles.seekBar} ${styles.controller}`}
            style={seekBarBackground}
          ></input>
          <span className={styles.totalTime}>
            {duration ? getTimeStringFromSeconds(duration) : "00:00:00"}
          </span>
        </div>
      </div>
      <div className={styles.volume}>
        <Image
          className={`${styles.controlButton} ${styles.controller}`}
          src={isMute ? `${imagePath}mute.png` : `${imagePath}speaker.png`}
          width={24}
          height={24}
          alt="speaker icon"
          onClick={() => toggleMute()}
        ></Image>
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={handleChangeVolume}
          className={`${styles.volumeBar} ${styles.controller}`}
          style={volumeBarBackground}
        ></input>
      </div>
    </div>
  );
}
