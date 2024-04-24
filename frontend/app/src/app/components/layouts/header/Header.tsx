import Link from "next/link";
import Image from "next/image";
import styles from "@/app/components/layouts/header/Header.module.scss"

export default function Header() {
  return(
    <header className={styles.header}>
    <Link href="/">
      <Image
        className={styles.logo}
        src="/logo.png"
        width={148}
        height={35}
        alt="logo"
      ></Image>
    </Link>
  </header>
  )
}