import { useLoading } from "@/app/components/elements/loading/useLoading";
import { Music } from "@/app/types/User";
import React, {
  ChangeEvent,
  CSSProperties,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";

export default function useMusic({
  musics,
  userMusics,
}: {
  musics: Music[];
  userMusics: Music[];
}) {
  const trackPath = "/tracks/";

  const newMusics = musics.map((music) => ({
    ...music,
    ref: React.createRef<HTMLAudioElement>(),
  }));

  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const userMusicsIds: number[] = userMusics.map((music) => Number(music.id));

  // アンマウント時に音楽を止める
  useEffect(() => {
    let audioRef: React.RefObject<HTMLAudioElement> | null = null;
    if (currentIndex) {
      audioRef = musics[currentIndex].ref;
    }
    return () => {
      if (audioRef && audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [currentIndex, musics]);

  // 音楽を再生
  const playMusic = (selectIndex: number) => {
    if (currentIndex === selectIndex) {
      if (newMusics[currentIndex].ref.current?.played) {
        newMusics[currentIndex].ref.current?.pause();
      }
      setCurrentIndex(null);
    } else {
      if (currentIndex !== null) {
        newMusics[currentIndex].ref.current?.pause();
      }
      newMusics[selectIndex].ref.current!.volume = 0.3;
      newMusics[selectIndex].ref.current?.play();
      setCurrentIndex(selectIndex);
    }
  };

  /** 秒数を「0:00:00」の形式に変換する処理 */
  const getTimeStringFromSeconds = (seconds: number): string => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor(Math.floor(seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    const hh = h.toString().padStart(2, "0");
    const mm = m.toString().padStart(2, "0");
    const ss = s.toString().padStart(2, "0");
    return `${mm}:${ss}`;
  };

  /** 音声の再生時間（秒）をstate管理 */
  const [musicStates, setMusicStates] = useState(
    newMusics.map(() => ({
      currentTime: 0,
      duration: 0,
    }))
  );
  // 再生時間が変更されたときのハンドラー
  const handleTimeUpdate = (
    index: number,
    e: SyntheticEvent<HTMLAudioElement, Event>
  ) => {
    setMusicStates((prevState) => {
      const newState = [...prevState];
      newState[index].currentTime = newMusics[index].ref.current!.currentTime;
      return newState;
    });
  };
  // 曲の読み込み完了時のハンドラー
  const handleLoadedMetadata = (
    index: number,
    e: SyntheticEvent<HTMLAudioElement, Event>
  ) => {
    handleIsLoading(false);
    setMusicStates((prevState) => {
      const newState = [...prevState];
      newState[index].duration = newMusics[index].ref.current!.duration;
      return newState;
    });
  };

  const { isLoading, handleIsLoading } = useLoading();
  useEffect(() => {
    handleIsLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // シークバーの入力値を反映させる処理
  const handleChangeTimePosition = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const currentTime = parseInt(e.target.value);
    setMusicStates((prevState) => {
      const newState = [...prevState];
      newState[index].currentTime = currentTime;
      return newState;
    });
    newMusics[index].ref.current!.currentTime = currentTime;
  };

  // シークバーの見た目を管理
  const seekBarBackground: (
    currentTime: number,
    duration: number
  ) => CSSProperties = (currentTime, duration) => {
    return {
      background: `linear-gradient(to right, #C4C4C4 ${
        (100 * currentTime) / duration
      }%, #535353 ${(100 * currentTime) / duration}%)`,
    };
  };

  return {
    newMusics,
    isLoading,
    trackPath,
    currentIndex,
    playMusic,
    handleTimeUpdate,
    handleLoadedMetadata,
    getTimeStringFromSeconds,
    musicStates,
    handleChangeTimePosition,
    seekBarBackground,
    userMusicsIds,
  };
}
