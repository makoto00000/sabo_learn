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
  
  return (
    <div className={`${styles.main} content`}>
      <h1 className={styles.settingTitle}>現在の設定</h1>
      <div className={styles.settingContent}>
        {/* <div className={styles.arrow}>
          <Image
            className={styles.arrowImage}
            src={"/arrow_right.png"}
            width={50}
            height={50}
            alt="arrow image"
          ></Image>
          <p className={styles.arrowText}>Drag & Drop</p>
        </div> */}

        <MusicList notSetMusics={notSetMusics} playlist={playlist} />

      </div>

    </div>
  );
}
