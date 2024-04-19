import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverEvent,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import Column, { ColumnType } from "./Column";
import { useEffect, useRef, useState } from "react";
import { Music } from "@/app/types/User";
import React from "react";
import styles from "@/app/components/setting/playlist/Card.module.scss";
import { registerPlaylist } from "@/app/utils/Actions";
import { useLoading } from "@/app/hooks/useLoading";
import Loading from "../../Loading";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function MusicList({
  notSetMusics,
  playlist,
}: {
  notSetMusics: Music[];
  playlist: Music[];
}) {
  // idはstring型でなければ使えない
  const newNotSetMusics = notSetMusics.map((music) => ({
    ...music,
    id: music.id.toString(),
    ref: React.createRef<HTMLAudioElement>(),
  }));
  const newPlaylist = playlist.map((music) => ({
    ...music,
    id: music.id.toString(),
    ref: React.createRef<HTMLAudioElement>(),
  }));

  let dndData: ColumnType[] = [
    {
      id: "column1",
      title: "購入曲",
      musics: newNotSetMusics,
    },
    {
      id: "column2",
      title: "プレイリスト",
      musics: newPlaylist,
    },
  ];

  const [columns, setColumns] = useState<ColumnType[]>(dndData);

  const findColumn = (unique: string | null) => {
    if (!unique) {
      return null;
    }
    // overの対象がcolumnの場合があるためそのままidを返す
    if (columns.some((column) => column.id === unique)) {
      return columns.find((column) => column.id === unique) ?? null;
    }
    const id = String(unique);
    const itemWithColumnId = columns.flatMap((column) => {
      const columnId = column.id;
      return column.musics.map((music) => ({
        musicId: String(music.id),
        columnId: columnId,
      }));
    });
    const columnId = itemWithColumnId.find(
      (music) => music.musicId === id
    )?.columnId;
    return columns.find((column) => column.id === columnId) ?? null;
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over, delta } = event;
    const activeId = String(active.id);
    const overId = over ? String(over.id) : null;
    const activeColumn = findColumn(activeId);
    const overColumn = findColumn(overId);
    if (!activeColumn || !overColumn || activeColumn === overColumn) {
      return null;
    }
    setColumns((prevState) => {
      const activeItems = activeColumn.musics;
      const overItems = overColumn.musics;
      const activeIndex = activeItems.findIndex(
        (music) => String(music.id) === activeId
      );
      const overIndex = overItems.findIndex(
        (music) => String(music.id) === overId
      );
      const newIndex = () => {
        const putOnBelowLastItem =
          overIndex === overItems.length - 1 && delta.y > 0;
        const modifier = putOnBelowLastItem ? 1 : 0;
        return overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      };
      return prevState.map((column) => {
        if (column.id === activeColumn.id) {
          column.musics = activeItems.filter(
            (music) => String(music.id) !== activeId
          );
          return column;
        } else if (column.id === overColumn.id) {
          column.musics = [
            ...overItems.slice(0, newIndex()),
            activeItems[activeIndex],
            ...overItems.slice(newIndex(), overItems.length),
          ];
          return column;
        } else {
          return column;
        }
      });
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const activeId = String(active.id);
    const overId = over ? String(over.id) : null;
    const activeColumn = findColumn(activeId);
    const overColumn = findColumn(overId);
    if (!activeColumn || !overColumn || activeColumn !== overColumn) {
      return null;
    }
    const activeIndex = activeColumn.musics.findIndex(
      (music) => String(music.id) === activeId
    );
    const overIndex = overColumn.musics.findIndex(
      (music) => String(music.id) === overId
    );
    if (activeIndex !== overIndex) {
      setColumns((prevState) => {
        return prevState.map((column) => {
          if (column.id === activeColumn.id) {
            column.musics = arrayMove(
              overColumn.musics,
              activeIndex,
              overIndex
            );
            return column;
          } else {
            return column;
          }
        });
      });
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);

  const playMusic = (src: string, playingId: string) => {
    if (audioRef.current) {
      const audio = audioRef.current;
      if (currentId === playingId && isPlaying) {
        audio.pause();
        setIsPlaying(false);
        return;
      }
      audio.src = src;
      audio.play();
      setIsPlaying(true);
      setCurrentId(playingId);
    }
  };

  // アンマウント時に音楽を止める
  useEffect(() => {
    let audio: HTMLAudioElement;
    if (audioRef.current) {
      audio = audioRef.current;
    }
    return () => {
      if(audio) {
        audio.pause();
      }
    };
  }, [audioRef]);

  const router = useRouter();

  const { isLoading, handleIsLoading } = useLoading();

  const RegisterPlaylistAction = async (musicIds: number[]) => {
    handleIsLoading(true);
    try {
      const data = await registerPlaylist(musicIds);
      handleIsLoading(false);
      setInitialPlaylistIds(columns[1].musics.map((music) => music.id));
      setIsChangePlaylist(false);
      router.refresh();
    } catch (error) {
      handleIsLoading(false);
      console.log(error);
    }
  };

  const resetColumns = () => {
    setColumns(dndData);
  };

  const [isChangePlaylist, setIsChangePlaylist] = useState(false);
  const [initialPlaylistIds, setInitialPlaylistIds] = useState(
    columns[1].musics.map((music) => music.id)
  );

  useEffect(() => {
    const currentPlaylistIds = columns[1].musics.map((music) => music.id);
    function isChangeArrays(
      arr1: (string | number)[],
      arr2: (string | number)[]
    ) {
      if (arr1.length !== arr2.length) {
        return true;
      }
      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
          return true;
        }
      }
      return false;
    }

    if (isChangeArrays(initialPlaylistIds, currentPlaylistIds)) {
      setIsChangePlaylist(true);
    } else {
      setIsChangePlaylist(false);
    }
    if (columns[1].musics.map((music) => music.id).length === 0) {
      setIsChangePlaylist(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      autoScroll
    >
      {isLoading && <Loading />}
      <div className={styles.container}>
        <audio ref={audioRef}></audio>
        <Column
          key={columns[0].id}
          column={columns[0]}
          playMusic={playMusic}
          isPlaying={isPlaying}
          currentId={currentId}
        ></Column>
        <div className={styles.arrow}>
          <Image
            className={styles.arrowImage}
            src={"/arrow_right.png"}
            width={50}
            height={50}
            alt="arrow image"
          ></Image>
          <p className={styles.arrowText}>Drag & Drop</p>
        </div>
        <Column
          key={columns[1].id}
          column={columns[1]}
          playMusic={playMusic}
          isPlaying={isPlaying}
          currentId={currentId}
        ></Column>
      </div>
      <div className={styles.buttonContainer}>
        <button className={`${styles.resetButton} ${styles.button}`} onClick={() => resetColumns()}>
          リセット
        </button>
        <button
          className={`${styles.registerButton} ${styles.button}`}
          onClick={() =>
            RegisterPlaylistAction(
              columns[1].musics.map((music) => Number(music.id))
            )
          }
          disabled={!isChangePlaylist}
        >
          登録
        </button>
      </div>
    </DndContext>
  );
}
