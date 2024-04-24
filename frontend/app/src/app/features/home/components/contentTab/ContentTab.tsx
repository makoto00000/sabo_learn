import styles from "@/app/features/home/components/contentTab/ContentTab.module.scss";
import useTab from "@/app/features/home/components/contentTab/hooks/useTab";
import {
  contentTabProps,
  Tab,
} from "@/app/features/home/components/contentTab/types/Tab";

export default function ContentTab({
  tab,
  setTabBackground,
  setTabMusic,
  activeColor,
  inActiveColor,
}: contentTabProps) {
  return (
    <nav className={styles.tabContainer}>
      <li
        className={styles.tab}
        onClick={() => setTabBackground()}
        style={
          tab === "background"
            ? { background: activeColor }
            : { background: inActiveColor }
        }
      >
        Background
      </li>
      <li
        className={styles.tab}
        onClick={() => setTabMusic()}
        style={
          tab === "music"
            ? { background: activeColor }
            : { background: inActiveColor }
        }
      >
        Music
      </li>
    </nav>
  );
}
