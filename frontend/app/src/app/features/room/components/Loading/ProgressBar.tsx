import styles from "@/app/features/room/components/Loading/ProgressBar.module.scss";

export default function ProgressBar() {
  return (
    <div className={styles.container}>
      <div className={styles.load}>loading...</div>
      <div className={styles.progressbar}>
        <span className={styles.loading}></span>
      </div>
    </div>
  );
}
