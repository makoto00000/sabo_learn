import Link from "next/link";
import Image from "next/image";
import styles from "@/app/unsupported/unsupported.module.scss";

export default function Unsupported() {
  return (
    <div className={`${styles.container} background`}>
      <div className={`${styles.content} content`}>
        <h1 className={styles.title}>Sorry!</h1>
        <p className={styles.text}>Multi Roomはお使いのブラウザに対応していません。<br />現在Google Chromeのみサポートされています。</p>
        <Link className={styles.link} href={"https://www.google.com/intl/ja/chrome/"}>Google Chromeをインストール</Link><br />
        <Link className={styles.link} href={"/"}>戻る</Link>
        
        </div>
      </div>
  );
}