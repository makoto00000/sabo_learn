
import Link from "next/link";
import styles from "./RoomSelect.module.scss";
import Image from "next/image";
import UserInfo from "./UserInfo";
export default function RoomSelect() {

  return (
    <div className={`${styles.container} background`}>
      <UserInfo />
      <Link href="/room">
        <div className={styles.solo}>
          <Image
            className={styles.soloImage}
            src="/solo.png"
            width={230}
            height={230}
            alt="solo"
          ></Image>
          <p className={`${styles.roomName} ${styles.roomNameSolo}`}>
            Solo Room
          </p>
        </div>
      </Link>
      <div className={styles.multi}>
        <Image
          className={styles.multiImage}
          src="/multi.png"
          width={320}
          height={172}
          alt="multi"
        ></Image>
        <p className={styles.roomName}>Multi Room</p>
      </div>
    </div>
  );
}
