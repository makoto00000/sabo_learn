import styles from "@/app/components/signup/SignupContent.module.scss";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent } from "react";
import { User } from "@/app/types/User";

export default function SignupContent({
  handlePage,
  handleChangeEmail,
  userData,
}: {
  handlePage: (page: number) => void;
  handleChangeEmail: (e: ChangeEvent<HTMLInputElement>) => void;
  userData: User;
}) {
  return (
    <div className={styles.container}>
      <h1 className={styles.head}>登録して自習を始めよう</h1>
      <div className={styles.formContent}>
        <form action="" className={styles.form}>
          <div className={styles.formControl}>
            <label className={styles.formLabel} htmlFor="email">
              メールアドレス
            </label>
            <input
              className={styles.formInput}
              type="text"
              name="email"
              id="email"
              autoComplete="email"
              placeholder="name@domain.com"
              value={userData.email}
              onChange={handleChangeEmail}
            />
          </div>
          <button
            className={styles.formButton}
            type="button"
            onClick={() => handlePage(1)}
          >
            次へ
          </button>
        </form>
        <div className={styles.divLine}>または</div>
        <button className={styles.googleButton}>
          <Image
            className={styles.googleLogo}
            src="/google.png"
            width={20}
            height={20}
            alt="google_logo"
          ></Image>
          Googleで続行
        </button>
        <div className={styles.border}></div>
        <div className={styles.loginLink}>
          アカウントをすでにお持ちの場合は、
          <Link className={styles.link} href="/login">
            ここからログインしてください。
          </Link>
        </div>
      </div>
    </div>
  );
}
