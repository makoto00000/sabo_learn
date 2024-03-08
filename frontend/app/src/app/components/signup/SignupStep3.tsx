import styles from "@/app/components/signup/SignupContent.module.scss";
import Image from "next/image";
import Link from "next/link";
import { User } from "@/app/types/User";

export default function SignupStep3({
  handlePage,
  userData,
}: {
  handlePage: (page: number) => void;
  userData: User;
}) {
  return (
    <div className={styles.container}>
      <div className={`${styles.progressBar} ${styles.progressBar3}`}></div>
      <div className={styles.stepContainer}>
        <Image
          className={styles.prevArrow}
          src="/prev_arrow.png"
          width={11}
          height={20}
          alt="previous arrow"
          onClick={() => handlePage(2)}
        ></Image>
        <div className={styles.stepContent}>
          <div className={styles.stepNumber}>ステップ3 / 3</div>
          <div className={styles.stepText}>利用規約</div>
        </div>
      </div>
      <div className={styles.formContent}>
        <div className={styles.formControl}>
          <div className={styles.agreementContainer}>
            <input
              className={styles.agreementCheckbox}
              type="checkbox"
              name="agreement"
            />
            <p>
              <Link className={styles.accentLink} href="/">
                SaboLearnの利用規約
              </Link>
              に同意します。
            </p>
          </div>
        </div>
      </div>
      <p className={styles.privacyExpranation}>
        SaboLearnが個人情報をどのように収集、利用、共有、保護しているかについての詳細は、
        <Link className={styles.accentLink} href="/">
          SaboLearnのプライバシーポリシー
        </Link>
        をご覧ください。
      </p>
      <button className={styles.formButton} type="button">
        登録する
      </button>
    </div>
  );
}
