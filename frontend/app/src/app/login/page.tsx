"use client";
import styles from "@/app/signup/signup.module.scss";
import contentStyles from "@/app/components/signup/SignupContent.module.scss";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { User } from "@/app/types/User";
import { signIn } from "next-auth/react";

export default function Login() {
  const [email, setEmail] = useState<User["email"]>();
  const [password, setPassword] = useState<User["password"]>();
  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <main>
      <div className={`${styles.container} background`}>
        <header className={styles.header}>
          <Link href="/">
            <Image
              className={styles.logo}
              src="/logo.png"
              width={148}
              height={35}
              alt="logo"
            ></Image>
          </Link>
        </header>
        <div className={`${styles.content} content`}>
          <div className={contentStyles.container}>
            <h1 className={contentStyles.head}>SaboLearnにログイン</h1>
            <div className={contentStyles.formContent}>
              {/* <form action="" className={contentStyles.form}>
                <div className={contentStyles.formControl}>
                  <label className={contentStyles.formLabel} htmlFor="email">
                    メールアドレスまたはユーザー名
                  </label>
                  <input
                    // ref={emailInputRef}
                    className={contentStyles.formInput}
                    type="text"
                    name="email"
                    id="email"
                    autoComplete="email"
                    placeholder="メールアドレスまたはユーザー名"
                    value={email}
                    onChange={handleChangeEmail}
                  />
                </div>
                <div className={contentStyles.formControl}>
                  <label className={contentStyles.formLabel} htmlFor="password">
                    パスワード
                  </label>
                  <input
                    className={contentStyles.formInput}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    value={password}
                    onChange={handleChangePassword}
                  />
                  <Image
                    className={contentStyles.eyeIcon}
                    src={showPassword ? "/eye.png" : "/eye_off.png"}
                    width={24}
                    height={24}
                    alt="eye-off icon"
                    onClick={() => toggleShowPassword()}
                  ></Image>
                </div>
                <button
                  className={contentStyles.formButton}
                  type="button"
                  // onClick={() => handlePage(1)}
                >
                  ログイン
                </button>
                <div className={contentStyles.forgotLink}>
                  <Link href="/">パスワードをお忘れですか？</Link>
                </div>
              </form>
              <div className={contentStyles.divLine}>または</div> */}
              <button
                className={contentStyles.googleButton}
                onClick={() =>
                  signIn(
                    "google",
                    { callbackUrl: `${process.env.NEXT_PUBLIC_ROOT_URL}` },
                    { prompt: "login" }
                  )
                }
              >
                <Image
                  className={contentStyles.googleLogo}
                  src="/google.png"
                  width={20}
                  height={20}
                  alt="google_logo"
                ></Image>
                Googleで続行
              </button>
              {/* <div className={contentStyles.border}></div>
              <div className={contentStyles.loginLink}>
                アカウントをお持ちでない場合は
                <Link className={contentStyles.link} href="/signup">
                  SaboLearnに登録する
                </Link>
              </div> */}
            </div>
          </div>
        </div>
        <footer className={styles.footer}>
          {/* このサイトはreCAPTCHAによって保護されており、Googleの
          <Link target="_blank" href="https://policies.google.com/privacy">
            プライバシーポリシー
          </Link>
          と
          <Link target="_blank" href="https://policies.google.com/terms">
            利用規約
          </Link>
          が適用されます。 */}
        </footer>
      </div>
    </main>
  );
}
