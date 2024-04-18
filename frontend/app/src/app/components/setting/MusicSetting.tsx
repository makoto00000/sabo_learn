import Image from "next/image";
import styles from "@/app/components/setting/MusicSetting.module.scss";
import { Music } from "@/app/types/User";
import { useState, useEffect } from "react";
import MusicList from "./playlist/MusicList";

const trackPath = "/tracks/";

export default function MusicSetting({
  notSetMusics,
  playlist,
}: {
  notSetMusics: Music[];
  playlist: Music[];
}) {

  // const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  // アンマウント時に音楽を止める
  // useEffect(() => {
  //   let audioRef = null;
  //   if (currentIndex) {
  //     audioRef = musics[currentIndex].ref;
  //   }
  //   return () => {
  //     if (audioRef && audioRef.current) {
  //       audioRef.current.pause();
  //     }
  //   };
  // }, [currentIndex, musics]);

  // 音楽を再生
  // const playMusic = (selectIndex: number) => {
  //   if (currentIndex === selectIndex) {
  //     if (musics[currentIndex].ref.current?.played) {
  //       musics[currentIndex].ref.current?.pause();
  //     }
  //     setCurrentIndex(null);
  //   } else {
  //     if (currentIndex !== null) {
  //       musics[currentIndex].ref.current?.pause();
  //     }
  //     musics[selectIndex].ref.current!.volume = 0.3;
  //     musics[selectIndex].ref.current?.play();
  //     setCurrentIndex(selectIndex);
  //   }
  // };
  
  return (
    <div className={`${styles.main} content`}>
      <h1 className={styles.settingTitle}>現在の設定</h1>
      <div className={styles.settingContent}>
        {/* <div className={styles.musics}>
          <h2 className={styles.listTitle}>購入曲</h2>
          <table className={styles.musicsTable}>
            {musics.map((music, index) => (
            <tr key={music.id} className={styles.music}>
              <td className={styles.musicData}>
                <div className={styles.musicInfo}>
                  <Image
                    className={styles.musicImage}
                    src={`${trackPath}${music.image}`}
                    width={50}
                    height={50}
                    alt="music image"
                  ></Image>
                  <div className={styles.titleInfo}>
                    <div className={styles.title}>{music.title}</div>
                    <div className={styles.artist}>{music.artist}</div>
                  </div>
                </div>
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
              </td>
            </tr>
            ))}
          </table>
        </div>
        <div className={styles.musics}>
          <h2 className={styles.listTitle}>プレイリスト</h2>
          <table className={styles.musicsTable}>
            {musics.map((music, index) => (
            <tr key={music.id} className={styles.music}>
              <td className={styles.musicData}>
                <div className={styles.musicInfo}>
                  <Image
                    className={styles.musicImage}
                    src={`${trackPath}${music.image}`}
                    width={50}
                    height={50}
                    alt="music image"
                  ></Image>
                  <div className={styles.titleInfo}>
                    <div className={styles.title}>{music.title}</div>
                    <div className={styles.artist}>{music.artist}</div>
                  </div>
                </div>
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
                  <audio
                    src={`${trackPath}${music.src}`}
                    ref={music.ref}
                  />
                </div>
              </td>
            </tr>
            ))}
          </table>
        </div> */}

        <div className={styles.arrow}>
          <Image
            className={styles.arrowImage}
            src={"/arrow_right.png"}
            width={50}
            height={50}
            alt="arrow image"
          ></Image>
          <p className={styles.arrowText}>Drag & Drop</p>
        </div>

        <MusicList notSetMusics={notSetMusics} playlist={playlist} />

      </div>

    </div>
  );
}
