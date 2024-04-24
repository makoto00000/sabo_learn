import styles from "@/app/features/home/components/homeContent/setting/music/MusicSetting.module.scss";
import { Music } from "@/app/types/User";
import MusicList from "./playlist/MusicList";

const trackPath = "/tracks/";

export default function MusicSetting({
  notSetMusics,
  playlist,
}: {
  notSetMusics: Music[];
  playlist: Music[];
}) {
  return (
    <div className={`${styles.main} content`}>
      <h1 className={styles.settingTitle}>現在の設定</h1>
      <div className={styles.settingContent}>
        <MusicList notSetMusics={notSetMusics} playlist={playlist} />
      </div>
    </div>
  );
}
