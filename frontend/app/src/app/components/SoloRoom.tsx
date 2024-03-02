"use client";

import styles from "./SoloRoom.module.scss";
import Image from "next/image";
import Link from "next/link";
import MyVideo from "./MyVideo";
import Score from "./Score";

export default function SoloRoom() {

  return (
    <div className={styles.container}>
      <div className={styles.layer}></div>
      <div className={styles.contents}>
        <h1 className={styles.roomName}>Solo Room</h1>
        <Score />
        <MyVideo />

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
    </div>
  );
}
