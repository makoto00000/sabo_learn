import styles from "@/app/components/signup/SignupContent.module.scss";
import Image from "next/image";
import { User } from "@/app/types/User";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function SignupStep2({
  handlePage,
  handleChangeUsername,
  handleChangeYear,
  handleChangeMonth,
  handleChangeDay,
  year,
  month,
  day,
  userData,
}: {
  handlePage: (page: number) => void;
  handleChangeUsername: (e: ChangeEvent<HTMLInputElement>) => void;
  handleChangeYear: (e: ChangeEvent<HTMLInputElement>) => void;
  handleChangeMonth: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleChangeDay: (e: ChangeEvent<HTMLInputElement>) => void;
  year: number | undefined;
  month: number | undefined;
  day: number | undefined;
  userData: User;
}) {
  const [invalidUsername, setInvalidUsername] = useState<boolean>(false);
  const [invalidYear, setInvalidYear] = useState<boolean>(false);
  const [invalidDay, setInvalidDay] = useState<boolean>(false);
  const [invalidDate, setInvalidDate] = useState<boolean>(false);
  const [invalidAge, setInvalidAge] = useState<boolean>(false);
  const usernameInputRef = useRef<HTMLInputElement>(null);
  const yearInputRef = useRef<HTMLInputElement>(null);
  const dayInputRef = useRef<HTMLInputElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const username = userData.name;

    const isValidUesrname = (username: string) => {
      return username.length !== 0;
    };
    const isValidYear = (year: number) => {
      return year >= 1900;
    };
    const isValidDay = (day: number) => {
      return day >= 1 && day <= 31;
    };
    const isValidDate = (year: number, month: number, day: number) => {
      month = month - 1;
      const date = new Date(year, month, day);
      return (
        date.getFullYear() === year &&
        date.getMonth() === month &&
        date.getDate() === day
      );
    };
    const isOverThirteen = (year: number, month: number, day: number) => {
      const today = new Date();
      const birthday = new Date(year, month - 1, day);
      const diffMilliseconds = today.getTime() - birthday.getTime();
      const diffYears = diffMilliseconds / (1000 * 60 * 60 * 24 * 365);
      return diffYears >= 13;
    };

    if (
      username !== undefined &&
      year !== undefined &&
      month !== undefined &&
      day !== undefined
    ) {
      if (
        isValidUesrname(username) &&
        isValidYear(year) &&
        isValidDay(day) &&
        isValidDate(year, month, day) &&
        isOverThirteen(year, month, day)
      ) {
        nextButtonRef.current!.disabled = false;
      } else {
        nextButtonRef.current!.disabled = true;
      }
    }
    if (username !== undefined) {
      if (isValidUesrname(username)) {
        usernameInputRef.current!.style.border = "0.5px solid #888";
      } else {
        usernameInputRef.current!.style.border = "1px solid #C00000";
      }
      setInvalidUsername(!isValidUesrname(username));
    }

    if (year !== undefined && month !== undefined && day !== undefined) {
      if (
        isValidYear(year) &&
        isValidDate(year, month, day) &&
        isOverThirteen(year, month, day)
      ) {
        yearInputRef.current!.style.border = "0.5px solid #888";
      } else {
        yearInputRef.current!.style.border = "1px solid #C00000";
      }
      if (isValidDay(day) && isValidDate(year, month, day)) {
        dayInputRef.current!.style.border = "0.5px solid #888";
      } else {
        dayInputRef.current!.style.border = "1px solid #C00000";
      }
      setInvalidYear(!isValidYear(year));
      setInvalidDay(!isValidDay(day));
      setInvalidDate(!isValidDate(year, month, day));
      setInvalidAge(!isOverThirteen(year, month, day));
    }
  }, [userData.name, year, month, day]);
  return (
    <div className={styles.container}>
      <div className={`${styles.progressBar} ${styles.progressBar2}`}></div>
      <div className={styles.stepContainer}>
        <Image
          className={styles.prevArrow}
          src="/prev_arrow.png"
          width={11}
          height={20}
          alt="previous arrow"
          onClick={() => handlePage(1)}
        ></Image>
        <div className={styles.stepContent}>
          <div className={styles.stepNumber}>ステップ2 / 3</div>
          <div className={styles.stepText}>必要な情報を入力してください。</div>
        </div>
      </div>
      <div className={styles.formContent}>
        <div className={styles.formControl}>
          <label className={styles.formLabel} htmlFor="username">
            ユーザー名
          </label>
          <p className={styles.subLabel}>
            この名前がプロフィールに表示されます。
          </p>
          <input
            ref={usernameInputRef}
            className={styles.formInput}
            type="text"
            name="username"
            id="username"
            autoComplete="name"
            value={userData.name}
            onChange={handleChangeUsername}
          />
          {invalidUsername && (
            <div className={styles.invalidMessageContainer}>
              <Image
                className={styles.exclamationIcon}
                src="/exclamation.png"
                width={12}
                height={12}
                alt="exclamation_icon"
              ></Image>
              <p className={styles.invalidMessage}>
                プロフィール用に名前を入力してください。
              </p>
            </div>
          )}
        </div>
        <div className={styles.formControl}>
          <label className={styles.formLabel} htmlFor="year">
            生年月日
          </label>
          <p className={styles.subLabel}>
            生年月日の情報が必要な理由は<Link className={styles.reasonBirthDay} href="/">こちら</Link>
            をご覧ください。
          </p>
          <div className={styles.inputContainer}>
            <input
              required
              ref={yearInputRef}
              className={`${styles.formInput} ${styles.yearInput}`}
              type="numeric"
              maxLength={4}
              name="year"
              id="year"
              placeholder="yyyy"
              value={year}
              onChange={handleChangeYear}
            />
            <select
              className={styles.monthSelect}
              name="month"
              id="month"
              defaultValue={""}
              value={month}
              onChange={handleChangeMonth}
            >
              <option value="" disabled>
                mm
              </option>
              <option value="1">1月</option>
              <option value="2">2月</option>
              <option value="3">3月</option>
              <option value="4">4月</option>
              <option value="5">5月</option>
              <option value="6">6月</option>
              <option value="7">7月</option>
              <option value="8">8月</option>
              <option value="9">9月</option>
              <option value="10">10月</option>
              <option value="11">11月</option>
              <option value="12">12月</option>
            </select>
            <input
              required
              ref={dayInputRef}
              className={`${styles.formInput} ${styles.dayInput}`}
              maxLength={2}
              type="numeric"
              name="day"
              id="day"
              placeholder="dd"
              value={day}
              onChange={handleChangeDay}
            />
          </div>
          {invalidYear && (
            <div className={styles.invalidMessageContainer}>
              <Image
                className={styles.exclamationIcon}
                src="/exclamation.png"
                width={12}
                height={12}
                alt="exclamation_icon"
              ></Image>
              <p className={styles.invalidMessage}>
                1900年以降の誕生年を入力してください。
              </p>
            </div>
          )}
          {invalidDay && (
            <div className={styles.invalidMessageContainer}>
              <Image
                className={styles.exclamationIcon}
                src="/exclamation.png"
                width={12}
                height={12}
                alt="exclamation_icon"
              ></Image>
              <p className={styles.invalidMessage}>
                生年月日の日を1から31までの数字で入力してください。
              </p>
            </div>
          )}
          {invalidDate && (
            <div className={styles.invalidMessageContainer}>
              <Image
                className={styles.exclamationIcon}
                src="/exclamation.png"
                width={12}
                height={12}
                alt="exclamation_icon"
              ></Image>
              <p className={styles.invalidMessage}>存在しない日付です。</p>
            </div>
          )}
          {invalidAge && (
            <div className={styles.invalidMessageContainer}>
              <Image
                className={styles.exclamationIcon}
                src="/exclamation.png"
                width={12}
                height={12}
                alt="exclamation_icon"
              ></Image>
              <p className={styles.invalidMessage}>
                お客様は、SaboLearnアカウントの作成が可能な最低年齢に達していないようです。
                <Link className={styles.invalidMessageLink} href="/">もっと詳しく</Link>。
              </p>
            </div>
          )}
        </div>
      </div>

      <button
        ref={nextButtonRef}
        className={styles.formButton}
        type="button"
        onClick={() => handlePage(3)}
        disabled={
          userData.name === undefined ||
          year === undefined ||
          month === undefined ||
          day === undefined
        }
      >
        次へ
      </button>
    </div>
  );
}
