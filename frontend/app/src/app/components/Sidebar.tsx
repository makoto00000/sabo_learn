import Link from "next/link";
import Image from "next/image";
import styles from "./Sidebar.module.scss";

type ComponentType = "select" | "shop" | "setting";
export default function Sidebar({handleComponent}: {handleComponent: (componentName: ComponentType) => void}) {
  return (
    <nav className={styles.container}>
      <Link href="/">
        <Image
          className={styles.logo}
          src="/logo.png"
          width={148}
          height={35}
          sizes="100vw"
          style={{
            width: '50%',
            maxWidth: '148px',
            height: 'auto',
          }}
          priority
          alt="logo"
        ></Image>
      </Link>
      <ul className={styles.menus}>
        <li onClick={()=>handleComponent("select")}>
          <Image
            className={styles.listIcon}
            src="/room_icon.png"
            width={27}
            height={30}
            alt="roomIcon"
          ></Image>
          <a>Room</a>
        </li>
        <li onClick={()=>handleComponent("shop")}>
          <Image className={styles.listIcon} src="/store_icon.png" width={27} height={30} alt="storeIcon"></Image>
          <a>Shop</a>
          {/* <Link href="/">Shop</Link> */}
        </li>
        <li onClick={()=>handleComponent("setting")}>
          <Image className={styles.listIcon} src="/setting_icon.png" width={27} height={27} alt="settingIcon"></Image>
          <a>Setting</a>
        </li>
        {/*
        <li>
          <Image className={styles.listIcon} src="/record_icon.png" width={27} height={30} alt="roomIcon"></Image>
          <Link href="/">Record</Link>
        </li> */}
      </ul>
    </nav>
  );
}
