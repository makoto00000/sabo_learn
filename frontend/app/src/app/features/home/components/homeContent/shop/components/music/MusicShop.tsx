import React from "react";
import Image from "next/image";
import { Music } from "@/app/types/User";
import { Wallpaper } from "@/app/types/User";
import Loading from "@/app/components/elements/loading/Loading";
import useMusic from "./hooks/useMusic";
import styles from "@/app/features/home/components/homeContent/shop/components/music/MusicShop.module.scss";

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
  const {
    newMusics,
    isLoading,
    trackPath,
    currentIndex,
    playMusic,
    handleTimeUpdate,
    handleLoadedMetadata,
    getTimeStringFromSeconds,
    musicStates,
    handleChangeTimePosition,
    seekBarBackground,
    userMusicsIds,
  } = useMusic({ musics, userMusics });

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
                    <button
                      className={`${styles.boughtButton} ${styles.button}`}
                      disabled
                    >
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
