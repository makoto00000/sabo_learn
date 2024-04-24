"use client";

import styles from "./HomeContent.module.scss";
import UserInfo from "@/app/features/home/components/userInfo/UserInfo";
import RoomSelect from "./roomSelect/RoomSelect";
import { Music, User, Wallpaper } from "@/app/types/User";
import Sidebar from "@/app/features/home/components/sideNav/Sidebar";
import Shop from "@/app/features/home/components/homeContent/shop/Shop";
import Setting from "./setting/Setting";
import useSideNav from "../sideNav/hooks/useSideNav";

export default function HomeContent({
  currentUser,
  wallpapers,
  musics,
}: {
  currentUser: User | null;
  wallpapers: Wallpaper[] | null;
  musics: Music[] | null;
}) {
  const sideNavProps = useSideNav();

  if (currentUser !== null && wallpapers !== null && musics !== null) {
    return (
      <div className={`${styles.container} background`}>
        <Sidebar handleComponent={sideNavProps.handleComponent} />
        <div className={styles.mainContent}>
          <div className={styles.userInfoContainer}>
            {currentUser && <UserInfo {...currentUser} />}
          </div>
          {sideNavProps.componentName === "select" && <RoomSelect />}
          {sideNavProps.componentName === "shop" && (
            <Shop
              currentUser={currentUser}
              wallpapers={wallpapers}
              musics={musics}
            />
          )}
          {sideNavProps.componentName === "setting" && (
            <Setting currentUser={currentUser} />
          )}
        </div>
      </div>
    );
  }
}
