import Link from "next/link";
import styles from "@/app/unsupported/unsupported.module.scss";

export default function Unsupported() {
  return (
    <div className={`${styles.container} background`}>
      <div className={`${styles.content} content`}>
        <h1 className={styles.title}>Sorry!</h1>
        <p className={styles.text}>Multi Roomはお使いの端末、またはブラウザに対応していません。<br />現在PC環境で、Google Chromeのみサポートされています。</p>
        <Link className={styles.link} href={"https://www.google.com/intl/ja/chrome/"}>Google Chromeをインストール</Link><br />
        <Link className={styles.link} href={"/"}>戻る</Link>
        
        </div>
      </div>
  );
}