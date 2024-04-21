import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import Card from "./Card";
import { Music } from "@/app/types/User";
import styles from "@/app/components/setting/playlist/Card.module.scss";

export type ColumnType = {
  id: string;
  title: string;
  musics: Music[];
};

export default function Column({
  column,
  playMusic,
  isPlaying,
  currentId,
}: {
  column: ColumnType;
  playMusic: (src: string, playingId: string) => void;
  isPlaying: boolean;
  currentId: string | null;
}) {
  const { setNodeRef } = useDroppable({ id: column.id });
  return (
    <SortableContext
      id={column.id}
      items={column.musics}
      strategy={rectSortingStrategy}
    >
      <div className={styles.musicsContainer}>
        <h2 className={styles.listTitle}>{column.title}</h2>
        <div ref={setNodeRef} className={styles.musics}>
          <table className={styles.musicsTable}>
            <tbody>
              {column.musics.map((music) => (
                <Card
                  key={music.id}
                  music={music}
                  playMusic={playMusic}
                  isPlaying={isPlaying}
                  currentId={currentId}
                ></Card>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </SortableContext>
  );
}

// export default Column;
