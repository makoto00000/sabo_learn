import ResultModal from "./features/room/components/ResultModal";
import HomeContent from "./features/home/components/homeContent/HomeContent";
import { getCurrentUser } from "@/app/utils/UserAPI";
import { getWallpapers } from "./utils/wallpaperAPI";
import { getMusics } from "./utils/MusicAPI";
import React from "react";

export default async function Home() {
  const currentUser = await getCurrentUser();
  const wallpapers = await getWallpapers();
  let musics = await getMusics();
  if (musics !== null) {
    musics = musics.map((music) => ({
      ...music,
      ref: React.createRef<HTMLAudioElement>(),
    }));
  }

  return (
    <main className="main">
      <HomeContent
        currentUser={currentUser}
        wallpapers={wallpapers}
        musics={musics}
      />
      <ResultModal />
    </main>
  );
}
