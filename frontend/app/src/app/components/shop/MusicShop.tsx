import Image from "next/image";
import styles from "@/app/components/shop/MusicShop.module.scss";
import {
  useState,
  ChangeEvent,
  useEffect,
  SyntheticEvent,
  CSSProperties,
} from "react";
import { Music } from "@/app/types/User";
import React from "react";
import { Wallpaper } from "@/app/types/User";
import { useLoading } from "@/app/hooks/useLoading";
import Loading from "../Loading";

export default function MusicShop({
  musics,
  userMusics,
  openModal,
}: {
  musics: Music[];
  userMusics: Music[];
  openModal: (
    itemType: "background" | "music",
    wallpaper: Wallpaper | null,
    music: Music | null
  ) => void;
}) {
  const trackPath = "/tracks/";

  const newMusics = musics.map((music) => ({
    ...music,
    ref: React.createRef<HTMLAudioElement>(),
  }));

  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const userMusicsIds: number[] = userMusics.map((music) => Number(music.id));

  // アンマウント時に音楽を止める
  useEffect(() => {
    let audioRef = null;
    if (currentIndex) {
      audioRef = musics[currentIndex].ref;
    }
    return () => {
      if (audioRef && audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [currentIndex, musics]);

  // 音楽を再生
  const playMusic = (selectIndex: number) => {
    if (currentIndex === selectIndex) {
      if (newMusics[currentIndex].ref.current?.played) {
        newMusics[currentIndex].ref.current?.pause();
      }
      setCurrentIndex(null);
    } else {
      if (currentIndex !== null) {
        newMusics[currentIndex].ref.current?.pause();
      }
      newMusics[selectIndex].ref.current!.volume = 0.3;
      newMusics[selectIndex].ref.current?.play();
      setCurrentIndex(selectIndex);
    }
  };

  /** 秒数を「0:00:00」の形式に変換する処理 */
  const getTimeStringFromSeconds = (seconds: number): string => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor(Math.floor(seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    const hh = h.toString().padStart(2, "0");
    const mm = m.toString().padStart(2, "0");
    const ss = s.toString().padStart(2, "0");
    return `${mm}:${ss}`;
  };

  /** 音声の再生時間（秒）をstate管理 */
  const [musicStates, setMusicStates] = useState(
    newMusics.map(() => ({
      currentTime: 0,
      duration: 0,
    }))
  );
  // 再生時間が変更されたときのハンドラー
  const handleTimeUpdate = (
    index: number,
    e: SyntheticEvent<HTMLAudioElement, Event>
  ) => {
    setMusicStates((prevState) => {
      const newState = [...prevState];
      newState[index].currentTime = newMusics[index].ref.current!.currentTime;
      return newState;
    });
  };
  // 曲の読み込み完了時のハンドラー
  const handleLoadedMetadata = (
    index: number,
    e: SyntheticEvent<HTMLAudioElement, Event>
  ) => {
    console.log("読み込み完了")
    handleIsLoading(false)
    setMusicStates((prevState) => {
      const newState = [...prevState];
      newState[index].duration = newMusics[index].ref.current!.duration;
      return newState;
    });
  };

  const {isLoading, handleIsLoading} = useLoading();
  useEffect(() => {
    handleIsLoading(true)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // シークバーの入力値を反映させる処理
  const handleChangeTimePosition = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const currentTime = parseInt(e.target.value);
    setMusicStates((prevState) => {
      const newState = [...prevState];
      newState[index].currentTime = currentTime;
      return newState;
    });
    newMusics[index].ref.current!.currentTime = currentTime;
  };

  // シークバーの見た目を管理
  const seekBarBackground: (
    currentTime: number,
    duration: number
  ) => CSSProperties = (currentTime, duration) => {
    return {
      background: `linear-gradient(to right, #C4C4C4 ${
        (100 * currentTime) / duration
      }%, #535353 ${(100 * currentTime) / duration}%)`,
    };
  };

  return (
    <div className={`${styles.main} content`}>
        <table className={styles.itemTable}>
          <tbody className={styles.tableBody}>
            {newMusics.map((music, index) => (
              <tr key={music.id} className={styles.item}>
                {isLoading && <Loading />}
                <td className={styles.musicInfoData}>
                  <div className={styles.musicInfo}>
                    <Image
                      className={styles.musicImage}
                      src={`${trackPath}${music.image}`}
                      width={70}
                      height={70}
                      alt="music image"
                    ></Image>
                    <div className={styles.titleInfo}>
                      <div className={styles.title}>{music.title}</div>
                      <div className={styles.artist}>{music.artist}</div>
                    </div>
                  </div>
                </td>
                <td className={styles.controlData}>
                  <div className={styles.control}>
                    <Image
                      className={`${styles.playButton} ${styles.controller}`}
                      src={
                        index === currentIndex && !music.ref.current?.paused
                          ? `/pause_icon.png`
                          : `/start_icon.png`
                      }
                      width={22}
                      height={22}
                      alt="play icon"
                      onClick={() => {
                        playMusic(index);
                      }}
                    ></Image>
                  </div>
                  <audio
                    src={`${trackPath}${music.src}`}
                    ref={music.ref}
                    onTimeUpdate={(e) => handleTimeUpdate(index, e)}
                    onLoadedMetadata={(e) => handleLoadedMetadata(index, e)}
                  />
                </td>
                <td className={styles.seekBarData}>
                  <div className={styles.seekBarContainer}>
                    <span className={styles.time}>
                      {getTimeStringFromSeconds(musicStates[index].currentTime)}{" "}
                      /&nbsp;
                      {musicStates[index].duration
                        ? getTimeStringFromSeconds(musicStates[index].duration)
                        : "00:00"}
                    </span>
                    <input
                      type="range"
                      min={0}
                      max={
                        musicStates[index].duration
                          ? musicStates[index].duration
                          : 0
                      }
                      value={musicStates[index].currentTime}
                      onChange={(e) => handleChangeTimePosition(index, e)}
                      className={`${styles.seekBar} ${styles.controller}`}
                      style={seekBarBackground(
                        musicStates[index].currentTime,
                        musicStates[index].duration
                      )}
                    ></input>
                  </div>
                </td>
                <td className={styles.priceData}>
                  <div className={styles.price}>
                    <Image
                      className={styles.coinImage}
                      src="/coin_icon.png"
                      width={30}
                      height={30}
                      priority
                      alt="coin image"
                    ></Image>
                    <p className={styles.priceValue}>{music.price}</p>
                  </div>
                </td>
                <td className={styles.buyButtonData}>
                  <div className={styles.buyButtonContainer}>
                    {userMusicsIds.includes(Number(music.id)) ? (
                      <button className={`${styles.boughtButton} ${styles.button}`} disabled>
                        購入済
                      </button>
                    ) : (
                      <button
                        className={`${styles.buyButton} ${styles.button}`}
                        onClick={() => openModal("music", null, music)}
                      >
                        購入
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  );
}
