import styles from "@/app/features/room/components/Loading/Card.module.scss"
import Image from "next/image";

export default function Card({...card}:{
  id: number;
  title: string;
  image: string;
  text: string;
}) {
  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>{card.title}</div>
      <Image
        className={styles.cardImage}
        src={card.image}
        width={300}
        height={189}
        priority
        alt="card_image"
      ></Image>
      <p className={styles.cardText}>
        {card.text}
      </p>
    </div>
  );
}
