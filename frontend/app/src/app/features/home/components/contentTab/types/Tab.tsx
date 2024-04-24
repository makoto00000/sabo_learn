export type Tab = "background" | "music";

export type contentTabProps = {
  tab: Tab;
  setTabBackground: () => void;
  setTabMusic: () => void;
  activeColor: string;
  inActiveColor: string;
};
