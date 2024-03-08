import styles from "@/app/components/signup/SignupContent.module.scss";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useEffect, useRef, useState } from "react";
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
  const [invalidEmail, setInvalidEmail] = useState<boolean>(false);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const isCollectEmail = (email: string) => {
      return email.match(/^[a-z\d][\w.-]*@[\w.-]+\.[a-z\d]+$/i);
    };
    if (userData.email) {
      if (isCollectEmail(userData.email)) {
        setInvalidEmail(false);
        emailInputRef.current!.style.border = "0.5px solid #888";
        nextButtonRef.current!.disabled = false;
      } else {
        setInvalidEmail(true);
        emailInputRef.current!.style.border = "1px solid #C00000";
        nextButtonRef.current!.disabled = true;
      }
    }
  }, [userData.email]);

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
              ref={emailInputRef}
              className={styles.formInput}
              type="text"
              name="email"
              id="email"
              autoComplete="email"
              placeholder="name@domain.com"
              value={userData.email}
              onChange={handleChangeEmail}
            />
            {invalidEmail && (
              <div className={styles.invalidMessageContainer}>
                <Image
                  className={styles.exclamationIcon}
                  src="/exclamation.png"
                  width={12}
                  height={12}
                  alt="exclamation_icon"
                ></Image>
                <p className={styles.invalidMessage}>
                  このメールアドレスは無効です。
                  <br />
                  example@email.comのような形式でメールアドレスが入力されているか確認してください。
                </p>
              </div>
            )}
            {/* //TODO すでに存在しているメールアドレスであれば以下を表示する  */}
            {/* <div className={styles.attentionMessageContainer}>
              <Image
                className={styles.exclamationIcon}
                src="/attention_exclamation.png"
                width={12}
                height={12}
                alt="exclamation_icon"
              ></Image>
              <p className={styles.attentionMessage}>
                このメールアドレスは既存のアカウントに登録されています。続行するには
                <Link className={styles.attentionMessageLink} href="/login">
                  ログイン
                </Link>
                してください。
              </p>
            </div> */}
          </div>
          <button
          ref={nextButtonRef}
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
