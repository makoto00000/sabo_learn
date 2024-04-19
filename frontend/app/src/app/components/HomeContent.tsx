"use client";

import styles from "./HomeContent.module.scss";
import UserInfo from "./UserInfo";
import RoomSelect from "./RoomSelect";
import { Music, User, Wallpaper } from "../types/User";
import Sidebar from "./Sidebar";
import { Component, useState } from "react";
import Shop from "@/app/components/shop/Shop";
import Setting from "./setting/Setting";

export default function HomeContent({
  currentUser,
  wallpapers,
  musics,
}: {
  currentUser: User | null;
  wallpapers: Wallpaper[] | null;
  musics: Music[] | null;
}) {
  const [componentName, setComponentName] = useState<ComponentType>("select");

  // const currentUser = await getCurrentUser();
  type ComponentType = "select" | "shop" | "setting";
  const handleComponent = (componentName: ComponentType) => {
    setComponentName(componentName);
  };

  if (currentUser !== null && wallpapers !== null && musics !== null) {
    return (
      <div className={`${styles.container} background`}>
        <Sidebar handleComponent={handleComponent} />
        <div className={styles.mainContent}>
          <div className={styles.userInfoContainer}>
            {currentUser && <UserInfo {...currentUser} />}
          </div>
          {componentName === "select" && <RoomSelect />}
          {componentName === "shop" && <Shop currentUser={currentUser} wallpapers={wallpapers} musics={musics}/>}
          {componentName === "setting" && <Setting currentUser={currentUser} />}
        </div>
      </div>
    );
  }
}
