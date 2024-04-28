import Link from "next/link";
import Image from "next/image";
import styles from "./Sidebar.module.scss";
import { SideNav } from "./types/sideNavType";

export default function Sidebar({
  handleComponent,
}: {
  handleComponent: (componentName: SideNav) => void;
}) {
  return (
    <nav className={styles.container}>
      <div className={styles.logoContainer}>
        <Link href="/" className={styles.logoLink}>
          <Image
            className={styles.logo}
            src="/logo.png"
            width={148}
            height={35}
            priority
            alt="logo"
          ></Image>
        </Link>
      </div>
      <ul className={styles.menus}>
        <li onClick={() => handleComponent("select")}>
          <Image
            className={styles.listIcon}
            src="/room_icon.png"
            width={27}
            height={30}
            alt="roomIcon"
          ></Image>
          <a>Room</a>
        </li>
        <li onClick={() => handleComponent("shop")} id={"shop"}>
          <Image
            className={styles.listIcon}
            src="/store_icon.png"
            width={27}
            height={30}
            alt="storeIcon"
          ></Image>
          <a>Shop</a>
        </li>
        <li onClick={() => handleComponent("setting")} id={"setting"}>
          <Image
            className={styles.listIcon}
            src="/setting_icon.png"
            width={27}
            height={27}
            alt="settingIcon"
          ></Image>
          <a>Setting</a>
        </li>
      </ul>
    </nav>
  );
}
