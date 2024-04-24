import { useState } from "react";

export default function useTab() {
  const [tab, setTab] = useState<"background" | "music">("background");

  const setTabBackground = () => {
    setTab("background");
  };
  const setTabMusic = () => {
    setTab("music");
  };

  const activeColor = "#111111"
  const inActiveColor = "#313131"

  return {
    tab,
    setTabBackground,
    setTabMusic,
    activeColor,
    inActiveColor
  };
}
