import Link from "next/link";
import Image from "next/image";
import styles from './Sidebar.module.scss'

export default function Sidebar() {
  return (
    <nav className={styles.container}>
      <Image className={styles.logo} src="/logo.png" width={148} height={35} alt="logo"></Image>
      <ul className={styles.menus}>
        <li>
          <Image className={styles.listIcon} src="/room_icon.png" width={27} height={30} alt="roomIcon"></Image>
          <Link href="/">Room</Link>
        </li>
        <li>
          <Image className={styles.listIcon} src="/store_icon.png" width={27} height={30} alt="roomIcon"></Image>
          <Link href="/">Shop</Link>
        </li>
        <li>
          <Image className={styles.listIcon} src="/record_icon.png" width={27} height={30} alt="roomIcon"></Image>
          <Link href="/">Record</Link>
        </li>
      </ul>
    </nav>
  );
}
