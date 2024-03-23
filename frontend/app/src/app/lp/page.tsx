"use client";
import Link from "next/link";
import { Link as Scroll } from "react-scroll";
import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "@/app/lp/lp.module.scss";
import React from "react";
import { useInView } from "react-intersection-observer";
import Footer from "../components/Footer";

export default function Lp() {
  const [feature1Ref, feature1InView] = useInView({
    rootMargin: "-200px 0px",
    triggerOnce: true,
  });
  const [feature2Ref, feature2InView] = useInView({
    rootMargin: "-200px 0px",
    triggerOnce: true,
  });
  const [feature3Ref, feature3InView] = useInView({
    rootMargin: "-200px 0px",
    triggerOnce: true,
  });
  return (
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
        <div className={styles.headerNavContainer}>
          <nav className={styles.headerNav}>
            <ul className={styles.headerNavUl}>
              <li className={styles.headerNavLi}>
                <Scroll to="about" smooth offset={-50}>
                  SaboLearnとは
                </Scroll>
              </li>
              <li className={styles.headerNavLi}>
                <Scroll to="feature" smooth offset={-50}>
                  サービス特徴
                </Scroll>
              </li>
              <li className={styles.headerNavLi}>
                <Scroll to="howto" smooth offset={-50}>
                  使い方
                </Scroll>
              </li>
              <li className={styles.headerNavLi}>
                <Scroll to="faq" smooth offset={-50}>
                  よくある質問
                </Scroll>
              </li>
            </ul>
          </nav>
          <button className={styles.loginButton}>
            <Link className={styles.loginButtonLink} href="/login">
              ログイン
            </Link>
          </button>
        </div>
      </header>

      <main className={styles.mainContainer}>
        {/* アイキャッチ */}
        <section className={styles.sectionContainer}>
          <div className={styles.mainVisual}>
            <Image
              className={styles.mainVisualImage}
              src="/lp/main_visual.png"
              width={1440}
              height={736}
              layout="responsive"
              alt="main visual"
            ></Image>
            <div className={styles.mainVisualFilter}></div>
            <div className={styles.firstViewContainer}>
              <div className={styles.firstView}>
                勉強しなければいけないのに面倒くさいと感じてしまう。
              </div>
              <div className={styles.firstView}>
                勉強を始めてもいつの間にか集中が途切れてしまいスマホをイジっている
              </div>
            </div>
            <div className={styles.mainVisualText}>
              <p>すぐにサボってしまうあなたへ</p>
              <p>
                <span className={styles.accentColor}>サボらないための環境</span>
                を用意しました
              </p>
            </div>
          </div>
        </section>

        {/* SaboLearnとは */}
        <section id="about" className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>SaboLearnとは</h2>
          <div className={styles.about}>
            <video
              className={styles.aboutVideo}
              src="/lp/about2.mp4"
              autoPlay
              muted
              loop
            ></video>
            <div className={styles.aboutFilter}></div>
            <div className={styles.aboutText}>
              <h3 className={styles.aboutTitle}>What&apos;s Sabo Learn?</h3>
              <p className={styles.aboutParagraph}>
                <span className={styles.accentColor}>サボり</span>を減らして
                <span className={styles.accentColor}>生産性を上げる</span>
                <br />
                そんな場所を無料で提供するアプリです。
              </p>
            </div>
          </div>
        </section>

        {/* サービス特徴 */}
        <section id="feature" className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>サービス特徴</h2>
          <div className={styles.feature}>
            <div
              ref={feature1Ref}
              className={`${styles.featureCard} ${
                feature1InView && styles.show1
              }`}
            >
              <div className={styles.featureNum}>01</div>
              <div className={styles.cardTitle}>シンプルな画面構成</div>
              <Image
                className={styles.cardImage}
                src="/lp/feature_card1.png"
                width={300}
                height={189}
                layout="responsive"
                alt="card_image"
              ></Image>
              <p className={styles.cardText}>
                複雑な機能は一切ありません。
                <br />
                部屋に入って作業する。ただそれだけ。
              </p>
            </div>
            <div
              ref={feature2Ref}
              className={`${styles.featureCard} ${
                feature2InView && styles.show2
              }`}
            >
              <div className={styles.featureNum}>02</div>
              <div className={styles.cardTitle}>サボり判定</div>
              <Image
                className={styles.cardImage}
                src="/lp/feature_card2.png"
                width={300}
                height={189}
                layout="responsive"
                alt="card_image"
              ></Image>
              <p className={styles.cardText}>
                30秒間動きが無ければ、サボっているとみなされ、タイマーはストップします。
              </p>
            </div>
            <div
              ref={feature3Ref}
              className={`${styles.featureCard} ${
                feature3InView && styles.show3
              }`}
            >
              <div className={styles.featureNum}>03</div>
              <div className={styles.cardTitle}>作業時間をポイント化</div>
              <Image
                className={styles.cardImage}
                src="/lp/feature_card1.png"
                width={300}
                height={189}
                layout="responsive"
                alt="card_image"
              ></Image>
              <p className={styles.cardText}>
                作業時間に応じてポイントを付与され、アイテムや機能拡張などに使用できます。*交換機能は実装中
              </p>
            </div>
          </div>
        </section>

        {/* 使い方 */}
        <section id="howto" className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>使い方</h2>
          <div className={styles.howto}>
            <div className={styles.step}>
              <div className={styles.stepLeft}>
                <h3 className={styles.stepTitle}>
                  STEP.1
                  <br />
                  自習室を選択
                </h3>
                <p className={styles.stepParagraph}>
                  １人でじっくり勉強したい人 →{" "}
                  <span className={styles.accentColor}>Solo Room</span>
                  <br />
                  誰かと一緒に頑張りたい人 →{" "}
                  <span className={styles.accentColor}>Multi Room</span>
                </p>
                <span className={styles.attention}>
                  *Multi Roomは現在開発中
                </span>
              </div>
              <Image
                className={styles.stepImage}
                src="/lp/howto_step1.png"
                width={400}
                height={252}
                layout="responsive"
                alt="step1_image"
              ></Image>
            </div>
            <div className={styles.step}>
              <div className={styles.stepLeft}>
                <h3 className={styles.stepTitle}>
                  STEP.2
                  <br />
                  学習開始
                </h3>
                <p className={styles.stepParagraph}>
                  カメラが起動し、タイマーがスタート
                  <br />
                  あとはご自身の作業を開始してください。
                </p>
              </div>
              <Image
                className={styles.stepImage}
                src="/lp/howto_step2.png"
                width={400}
                height={252}
                layout="responsive"
                alt="step2_image"
              ></Image>
            </div>
            <div className={styles.step}>
              <div className={styles.stepLeft}>
                <h3 className={styles.stepTitle}>
                  STEP.3
                  <br />
                  コイン獲得
                </h3>
                <p className={styles.stepParagraph}>
                  退室後に学習時間に応じてコインをゲット。
                  <br />
                  このコインはアプリ内で様々なアイテムと交換できます。
                </p>
              </div>
              <Image
                className={styles.stepImage}
                src="/lp/howto_step3.png"
                width={400}
                height={252}
                layout="responsive"
                alt="step3_image"
              ></Image>
            </div>
          </div>
        </section>

        {/* よくある質問 */}
        <section id="faq" className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>よくある質問</h2>
          <FAQ />
        </section>

        {/* アップデート予定 */}
        <section className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>今後のアップデート予定</h2>
          <div className={styles.update}>
            <ul className={styles.updateList}>
              <li className={styles.updateListItem}>マルチルーム</li>
              <li className={styles.updateListItem}>アイテム交換機能</li>
              <li className={styles.updateListItem}>学習結果をグラフ化</li>
              <span className={styles.subText}>...and more!</span>
            </ul>
          </div>
        </section>

        {/* ログインボタン */}
        <section className={styles.sectionContainer}>
          <div className={styles.login}>
            <span className={styles.buttonMessage}>
              \ さっそく今日の作業を始めよう /
            </span>
            <Link href="/login" className={styles.loginButton}>
              自習室へ移動
              <Image
                className={styles.doorIcon}
                src="/lp/door_icon.png"
                width={42}
                height={42}
                // layout="responsive"
                alt="door icon"
              ></Image>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function FAQ() {
  const [faqs, setFaqs] = useState([
    {
      question: "入室した後はどうしたらいいの？",
      answer: `作業を開始してください。\nカメラが起動し、時間経過に伴ってポイントが付与されます。\nポイントは退室時に付与されます。`,
      isOpen: false,
      triangleRef: React.createRef<HTMLImageElement>(),
      answerRef: React.createRef<HTMLDivElement>(),
    },
    {
      question: "ポイントは何に使える？",
      answer: `アプリ内で様々なアイテムや機能拡張に使用することができます`,
      isOpen: false,
      triangleRef: React.createRef<HTMLImageElement>(),
      answerRef: React.createRef<HTMLDivElement>(),
    },
    {
      question: "どんな勉強をすればいいの？",
      answer: `宿題、レポート、資格試験など、どんな勉強でもOKです。また勉強以外にも、ブログ執筆や、イラスト作成、資料作成など、様々な作業を行ってもOKです。`,
      isOpen: false,
      triangleRef: React.createRef<HTMLImageElement>(),
      answerRef: React.createRef<HTMLDivElement>(),
    },
    {
      question: "他の人に部屋や顔を見られるの？",
      answer: `映像にはモザイク処理が施されます。\nまたマイク機能はないため音を拾う心配もありません。`,
      isOpen: false,
      triangleRef: React.createRef<HTMLImageElement>(),
      answerRef: React.createRef<HTMLDivElement>(),
    },
  ]);
  const toggleFAQ = (index: number) => {
    setFaqs((prevFaqs) => {
      return prevFaqs.map((faq, i) => {
        if (i === index) {
          if (!faq.isOpen) {
            faq.triangleRef?.current!.classList.remove(styles.rotateClose);
            faq.triangleRef?.current!.classList.add(styles.rotateOpen);
            faq.answerRef.current!.classList.remove(styles.close);
            faq.answerRef.current!.classList.add(styles.open);
          } else {
            faq.triangleRef?.current!.classList.remove(styles.rotateOpen);
            faq.triangleRef?.current!.classList.add(styles.rotateClose);
            faq.answerRef.current!.classList.remove(styles.open);
            faq.answerRef.current!.classList.add(styles.close);
          }
          return { ...faq, isOpen: !faq.isOpen };
        } else {
          return { ...faq };
        }
      });
    });
  };
  useEffect(() => {}, [faqs]);
  return (
    <div className={styles.faq}>
      {faqs.map((faq, index) => (
        <div key={index} className={styles.faqItem}>
          <div className={styles.question} onClick={() => toggleFAQ(index)}>
            <div className={styles.questionText}>{faq.question}</div>
            <Image
              className={`${styles.triangleIcon} ${styles.rotateClose}`}
              ref={faq.triangleRef}
              src="/lp/triangle.png"
              width={30}
              height={16}
              alt="triangle icon"
            ></Image>
          </div>
          <div
            className={`${styles.answer} ${styles.close}`}
            ref={faq.answerRef}
          >
            <div>{faq.answer}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
