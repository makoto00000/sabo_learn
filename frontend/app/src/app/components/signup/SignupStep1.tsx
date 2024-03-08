import styles from "@/app/components/signup/SignupContent.module.scss";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { User } from "@/app/types/User";

export default function SignupStep1({
  handlePage,
  handleChangePassword,
  userData,
}: {
  handlePage: (page: number) => void;
  handleChangePassword: (e: ChangeEvent<HTMLInputElement>) => void;
  userData: User;
}) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const toggleShowPassword = ()=> {
    setShowPassword(prev => !prev)
  }
  return (
    <div className={styles.container}>
      <div className={`${styles.progressBar} ${styles.progressBar1}`}></div>
      <div className={styles.stepContainer}>
        <Image
          className={styles.prevArrow}
          src="/prev_arrow.png"
          width={11}
          height={20}
          alt="previous arrow"
          onClick={() => handlePage(0)}
        ></Image>
        <div className={styles.stepContent}>
          <div className={styles.stepNumber}>ステップ1 / 3</div>
          <div className={styles.stepText}>パスワードを作成</div>
        </div>
      </div>
      <div className={styles.formContent}>
        <div className={styles.formControl}>
          <label className={styles.formLabel} htmlFor="password">
            パスワード
          </label>
          <input
            className={styles.formInput}
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            value={userData.password}
            onChange={handleChangePassword}
          />
          <Image
            className={styles.eyeIcon}
            src={showPassword ? "/eye.png" : "/eye_off.png"}
            width={24}
            height={24}
            alt="eye-off icon"
            onClick={() => toggleShowPassword()}
          ></Image>
        </div>
      </div>
      <div className={styles.validation}>
        <p>パスワードは、以下の条件を満たす必要があります。</p>
        <ul>
          <li>
            <Image
              className={styles.listIcon}
              src="/list.png"
              width={12}
              height={12}
              alt="list icon"
            ></Image>
            英字を1字以上含む
          </li>
          <li>
            <Image
              className={styles.listIcon}
              src="/list.png"
              width={12}
              height={12}
              alt="list icon"
            ></Image>
            数字または特殊文字 (例：#、?、!、&) を1つ以上含む
          </li>
          <li>
            <Image
              className={styles.listIcon}
              src="/list.png"
              width={12}
              height={12}
              alt="list icon"
            ></Image>
            合計で10文字以上
          </li>
        </ul>
      </div>
      <button
        className={styles.formButton}
        type="button"
        onClick={() => handlePage(2)}
      >
        次へ
      </button>
    </div>
  );
}
