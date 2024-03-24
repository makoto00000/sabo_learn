import Link from "next/link";
import styles from "./RoomSelect.module.scss";
import Image from "next/image";
import UserInfo from "./UserInfo";
import { getCurrentUser } from "../utils/UserAPI";
export default async function RoomSelect() {
  const currentUser = await getCurrentUser();

  return (
    <div className={`${styles.container} background`}>
      {currentUser && <UserInfo {...currentUser} />}
      <div className={styles.selectContainer}>
        <div className={styles.solo}>
          <Link href="/room">
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
          <Link href="">
            <div className={styles.musk}>開 発 中</div>
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
    </div>
  );
}
