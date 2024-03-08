import styles from "@/app/login/login.module.scss";
import Image from "next/image";

export default function Login() {
  return (
    <main className="main">
      <div className={styles.container}>
        <header className={styles.header}>
          <Image
            className={styles.logo}
            src="/logo.png"
            width={148}
            height={35}
            alt="logo"
          ></Image>
        </header>
        <div className={styles.content}></div>
        <footer className={styles.footer}>
          このサイトはreCAPTCHAによって保護されており、Googleのプライバシーポリシーと利用規約が適用されます。
        </footer>
      </div>
    </main>
  );
}
