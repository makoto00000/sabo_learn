"use client";

import React, { useState } from "react";
import styles from "./Carousel.module.scss";
import Card from "./Card";

const cards = [
  {
    id: 1,
    title: "部屋に入ったら作業開始",
    image: "/lp/feature_card1.png",
    text: "ビデオが起動して、タイマーがスタートしますので、ご自身の作業を開始してください。",
  },
  {
    id: 2,
    title: "サボり判定",
    image: "/lp/feature_card2.png",
    text: "30秒間動きが無ければ、サボっているとみなされ、タイマーはストップします。",
  },
  {
    id: 3,
    title: "作業時間をポイント化",
    image: "/lp/feature_card3.png",
    text: "作業時間に応じてポイントを付与します。このポイントは、音楽や壁紙の購入に使用できます。",
  },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () => {
    const newIndex = (currentIndex + 1) % cards.length;
    setCurrentIndex(newIndex);
  };

  const goToPrevSlide = () => {
    const newIndex = (currentIndex - 1 + cards.length) % cards.length;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const transformStyle = {
    transform: `translateX(calc(-${currentIndex * 100}% - ${currentIndex * 50}px))`,
  };

  return (
    <div className={styles.container}>
      <div className={styles.carousel}>
        <button onClick={goToPrevSlide} className={styles.prevButton}>
          &lt;
        </button>
        <div className={styles["slide-container"]}>
          {cards.map((card) => (
            <div className={styles.slide} key={card.id} style={transformStyle}>
              <Card {...card} />
            </div>
          ))}
        </div>
        <button onClick={goToNextSlide} className={styles.nextButton}>
          &gt;
        </button>
      </div>
      <div className={styles["indicator-container"]}>
        {cards.map((_, index) => (
          <div
            key={index}
            className={`${styles.indicator} ${
              index === currentIndex ? styles.active : ""
            }`}
            onClick={() => goToSlide(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
