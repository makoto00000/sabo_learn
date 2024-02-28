import Image from "next/image";
import styles from "./UserInfo.module.scss";

export default function UserInfo() {
  return (
    <div className={styles.container}>
      <div className={styles.userImageBg}>
        <Image
          className={styles.userImage}
          src="/solo.png"
          width={37}
          height={37}
          alt="userImage"
        ></Image>
      </div>
      <div className={styles.userInfo}>
        <div className={styles.userCoin}>
          <Image
            className={styles.coinImage}
            src="/coin_icon.png"
            width={12}
            height={12}
            alt="coinIcon"
          ></Image>
          <span className={styles.coinCount}>1234</span>
          <span className={styles.coinUnit}>sp</span>
        </div>
        <div className={styles.userName}>username</div>
      </div>
      <Image
        className={styles.caretDown}
        src="/fi-ss-caret-down.png"
        width={21}
        height={24}
        alt="caret-down"
      ></Image>
    </div>
  );
}
