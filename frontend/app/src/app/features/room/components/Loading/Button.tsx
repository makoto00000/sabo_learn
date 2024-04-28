import styles from "@/app/features/room/components/Loading/Button.module.scss";
import Image from "next/image";

export default function Button({ handleClose }: { handleClose: () => void }) {
  return (
    <div className={styles.container} onClick={() => handleClose()}>
      <button className={styles.loginButton}>
        自習室へ移動
        <Image
          className={styles.doorIcon}
          src="/lp/door_icon.png"
          width={22}
          height={22}
          alt="door icon"
        ></Image>
      </button>
    </div>
  );
}
