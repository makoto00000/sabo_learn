import styles from "@/app/components/signup/SignupContent.module.scss";
import Image from "next/image";
import { User } from "@/app/types/User";
import { ChangeEvent} from "react";

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
            className={styles.formInput}
            type="text"
            name="username"
            id="username"
            autoComplete="name"
            value={userData.username}
            onChange={handleChangeUsername}
          />
        </div>
        <div className={styles.formControl}>
          <label className={styles.formLabel} htmlFor="year">
            生年月日
          </label>
          <p className={styles.subLabel}>
            生年月日の情報が必要な理由はこちらをご覧ください。
          </p>
          <div className={styles.inputContainer}>
            <input
              className={`${styles.formInput} ${styles.yearInput}`}
              type="number"
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
              className={`${styles.formInput} ${styles.dayInput}`}
              type="text"
              name="day"
              id="day"
              placeholder="dd"
              value={day}
              onChange={handleChangeDay}
            />
          </div>
        </div>
      </div>

      <button
        className={styles.formButton}
        type="button"
        onClick={() => handlePage(3)}
      >
        次へ
      </button>
    </div>
  );
}
