import styles from "@/app/components/signup/SignupContent.module.scss";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
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
  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const [includeAlphabet, setIncludeAlphabet] = useState<boolean>(false);
  const [includeNumOrSpecialChars, setIncludeNumSpecialChars] =
    useState<boolean>(false);
  const [OverTenChars, setOverTenChars] = useState<boolean>(false);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const isIncludeAlphabet = (password: string) => {
      const regex = /[a-zA-Z]/;
      return regex.test(password);
    };
    const isIncludeNumOrSpecialChars = (password: string) => {
      const regex = /[0-9#?!&]/;
      return regex.test(password);
    };
    const isOverTenChars = (password: string) => {
      return password.length >= 10;
    };
    if (userData.password) {
      const password = userData.password;
      if (
        isIncludeAlphabet(password) &&
        isIncludeNumOrSpecialChars(password) &&
        isOverTenChars(password)
      ) {
        passwordInputRef.current!.style.border = "0.5px solid #888";
        nextButtonRef.current!.disabled = false;
      } else {
        passwordInputRef.current!.style.border = "1px solid #C00000";
        nextButtonRef.current!.disabled = true;
      }
      setIncludeAlphabet(isIncludeAlphabet(password));
      setIncludeNumSpecialChars(isIncludeNumOrSpecialChars(password));
      setOverTenChars(isOverTenChars(password));
    }
  }, [userData.password]);

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
            ref={passwordInputRef}
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
          <li
            style={
              userData.password === undefined
                ? {}
                : includeAlphabet
                ? { color: "#1ED760" }
                : { color: "#C00000" }
            }
          >
            <Image
              className={styles.listIcon}
              src={
                userData.password === undefined
                  ? "/list.png"
                  : includeAlphabet
                  ? "/check.png"
                  : "/exclamation.png"
              }
              width={12}
              height={12}
              alt="list icon"
            ></Image>
            英字を1字以上含む
          </li>
          <li
            style={
              userData.password === undefined
                ? {}
                : includeNumOrSpecialChars
                ? { color: "#1ED760" }
                : { color: "#C00000" }
            }
          >
            <Image
              className={styles.listIcon}
              src={
                userData.password === undefined
                  ? "/list.png"
                  : includeNumOrSpecialChars
                  ? "/check.png"
                  : "/exclamation.png"
              }
              width={12}
              height={12}
              alt="list icon"
            ></Image>
            数字または特殊文字 (例：#、?、!、&) を1つ以上含む
          </li>
          <li
            style={
              userData.password === undefined
                ? {}
                : OverTenChars
                ? { color: "#1ED760" }
                : { color: "#C00000" }
            }
          >
            <Image
              className={styles.listIcon}
              src={
                userData.password === undefined
                  ? "/list.png"
                  : OverTenChars
                  ? "/check.png"
                  : "/exclamation.png"
              }
              width={12}
              height={12}
              alt="list icon"
            ></Image>
            合計で10文字以上
          </li>
        </ul>
      </div>
      <button
        ref={nextButtonRef}
        className={styles.formButton}
        type="button"
        onClick={() => handlePage(2)}
        disabled={userData.password === undefined}
      >
        次へ
      </button>
    </div>
  );
}
