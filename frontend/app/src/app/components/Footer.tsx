import Link from "next/link";
import styles from "@/app/components/Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <nav>
        <ul>
          <li>
            <Link href="/terms">利用規約</Link>
          </li>
          <li>
            <Link href="/privacy">プライバシーポリシー</Link>
          </li>
        </ul>
      </nav>
      <div className={styles.copyright}>
        Copyright © SaboLearn. All Rights Reserved.
      </div>
    </footer>
  );
}
