"use client";
import Image from "next/image";
import { useState } from "react";
import styles from "@/app/lp/lp.module.scss";

export default function FAQ() {
  const faqs = [
    {
      question: "入室した後はどうしたらいいの？",
      answer: `作業を開始してください。\nカメラが起動し、時間経過に伴ってポイントが付与されます。\nポイントは退室時に付与されます。`,
    },
    {
      question: "ポイントは何に使える？",
      answer: `アプリ内で様々なアイテムや機能拡張に使用することができます。`,
    },
    {
      question: "どんな勉強をすればいいの？",
      answer: `宿題、レポート、資格試験など、どんな勉強でもOKです。また勉強以外にも、ブログ執筆や、イラスト作成、資料作成など、様々な作業を行ってもOKです。`,
    },
    {
      question: "他の人に部屋や顔を見られるの？",
      answer: `映像にはモザイク処理が施されます。\nまたマイク機能はないため音を拾う心配もありません。`,
    },
  ];

  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const toggleFAQ = (index: number) => {
    setOpenIndexes((prevIndexes) => {
      if (prevIndexes.includes(index)) {
        return prevIndexes.filter((i) => i !== index);
      } else {
        return [...prevIndexes, index];
      }
    });
  };
  return (
    <div className={styles.faq}>
      {faqs.map((faq, index) => (
        <div key={index} className={styles.faqItem}>
          <div className={styles.question} onClick={() => toggleFAQ(index)}>
            <div className={styles.questionText}>{faq.question}</div>
            <Image
              className={`${styles.triangleIcon} ${
                openIndexes.includes(index)
                  ? styles.rotateOpen
                  : styles.rotateClose
              }`}
              src="/lp/triangle.png"
              width={30}
              height={16}
              alt="triangle icon"
            />
          </div>
          <div
            className={`${styles.answer} ${
              openIndexes.includes(index) ? styles.open : styles.close
            }`}
          >
            <div>{faq.answer}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
