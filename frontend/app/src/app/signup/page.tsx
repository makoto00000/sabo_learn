"use client";

import styles from "@/app/signup/signup.module.scss";
import Image from "next/image";
import SignupContent from "@/app/components/signup/SignupContent";
import SignupStep1 from "../components/signup/SignupStep1";
import SignupStep2 from "../components/signup/SignupStep2";
import SignupStep3 from "../components/signup/SignupStep3";
import { ChangeEvent, useEffect, useState } from "react";
import { User } from "@/app/types/User";

export default function Signup() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const handlePage = (page: number) => {
    setCurrentPage(page);
  };

  const [userData, setUserData] = useState<User | null>(null);

  const [year, setYear] = useState<number>();
  const [month, setMonth] = useState<number>();
  const [day, setDay] = useState<number>();

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    if (userData) {
      setUserData({ ...userData, email: e.target.value });
    }
  };
  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    if (userData) {
      setUserData({ ...userData, password: e.target.value });
    }
  };
  const handleChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    if (userData) {
      setUserData({ ...userData, name: e.target.value });
    }
  };
  const handleChangeBirthday = (birthday: string) => {
    if (userData) {
      setUserData({ ...userData, birthday: new Date(birthday) });
    }
  };
  const handleChangeYear = (e: ChangeEvent<HTMLInputElement>) => {
    const integerPattern = /^[1-9]\d*$/;
    if (integerPattern.test(e.target.value)) {
      setYear(Number(e.target.value));
    }
  };
  const handleChangeMonth = (e: ChangeEvent<HTMLSelectElement>) => {
    setMonth(Number(e.target.value));
  };
  const handleChangeDay = (e: ChangeEvent<HTMLInputElement>) => {
    const integerPattern = /^[1-9]\d*$/;
    if (integerPattern.test(e.target.value)) {
      setDay(Number(e.target.value));
    }
  };

  useEffect(() => {
    handleChangeBirthday(`${year}-${month}-${day}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, month, day]);

  return (
    <main>
      <div className={`${styles.container} background`}>
        <header className={styles.header}>
          <Image
            className={styles.logo}
            src="/logo.png"
            width={148}
            height={35}
            alt="logo"
          ></Image>
        </header>
        <div className={`${styles.content} content`}>
          {currentPage === 0 && userData && (
            <SignupContent {...{ handlePage, handleChangeEmail, userData }} />
          )}
          {currentPage === 1 && userData && (
            <SignupStep1 {...{ handlePage, handleChangePassword, userData }} />
          )}
          {currentPage === 2 && userData && (
            <SignupStep2
              {...{
                handlePage,
                handleChangeUsername,
                handleChangeYear,
                handleChangeMonth,
                handleChangeDay,
                year,
                month,
                day,
                userData,
              }}
            />
          )}
          {currentPage === 3 && userData && (
            <SignupStep3 {...{ handlePage, userData }} />
          )}
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
