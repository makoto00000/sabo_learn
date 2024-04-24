import Link from "next/link";
import styles from "./RoomSelect.module.scss";
import Image from "next/image";

export default function RoomSelect() {

  return (
    <div className={styles.selectContainer}>
      <div className={styles.solo}>
        <Link href="/soloroom">
          <Image
            className={styles.soloImage}
            src="/solo.png"
            width={320}
            height={320}
            sizes="100vw"
            style={{
              maxWidth: 230,
              height: "auto",
            }}
            priority
            alt="solo"
          ></Image>
          <p className={`${styles.roomName} ${styles.roomNameSolo}`}>
            Solo Room
          </p>
        </Link>
      </div>
      <div className={styles.multi}>
        <Link href="/multiroom">
          {/* <div className={styles.musk}>開 発 中</div> */}
          <Image
            className={styles.multiImage}
            src="/multi.png"
            width={320}
            height={320}
            sizes="100vw"
            style={{
              maxWidth: 230,
              height: "auto",
            }}
            priority
            alt="multi"
          ></Image>
          <p className={styles.roomName}>Multi Room</p>
        </Link>
      </div>
  </div>
  );
}
