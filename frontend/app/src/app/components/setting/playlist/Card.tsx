import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { Music } from "@/app/types/User";
import styles from "@/app/components/setting/playlist/Card.module.scss";
import Image from "next/image";

const trackPath = "/tracks/";

export default function Card({
  music,
  playMusic,
  isPlaying,
  currentId,
}: {
  music: Music;
  playMusic: (src: string, playingId: string) => void;
  isPlaying: boolean;
  currentId: string | null;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: String(music.id),
  });

  const style = {
    opacity: 1,
    color: "#333",
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <tr style={style} ref={setNodeRef} className={styles.music}>
      <td className={styles.musicData}>
        <div className={styles.musicInfo}>
          <Image
            className={styles.musicImage}
            src={`${trackPath}${music.image}`}
            width={50}
            height={50}
            alt="music image"
          ></Image>
          <div className={styles.titleInfo}>
            <div className={styles.title}>{music.title}</div>
            <div className={styles.artist}>{music.artist}</div>
          </div>
        </div>
        <div className={styles.control}>
          <Image
            className={styles.playButton}
            src={
              String(music.id) === currentId && isPlaying
                ? `/pause_icon.png`
                : `/start_icon.png`
            }
            width={22}
            height={22}
            alt="play icon"
            onClick={() => {
              playMusic(`${trackPath}${music.src}`, String(music.id));
            }}
          ></Image>
          <Image
            ref={setActivatorNodeRef}
            {...attributes}
            {...listeners}
            style={{ cursor: isDragging ? "grabbing" : "grab" }}
            src={"/grab_icon.png"}
            width={22}
            height={22}
            alt="grab icon"
          ></Image>
        </div>
      </td>
    </tr>
  );
}
