import styles from "./Loading.module.scss";
export default function Loading() {
  return (
    <div className={styles.container}>
      <div className={styles.loader}>
        <h1>LOADING</h1>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}
