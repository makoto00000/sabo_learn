"use client";
import Image from "next/image";
import styles from "./UserInfo.module.scss";
import { useState, useRef, useEffect } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { User } from "../../../../types/User";

export default function UserInfo({ name, coin }: User) {
  const router = useRouter();
  const caretRef = useRef<HTMLImageElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };
  useEffect(() => {
    if (isOpen) {
      caretRef.current!.classList.remove(styles.caretDown);
      caretRef.current!.classList.add(styles.rotate180);
      modalRef.current!.classList.remove(styles.close);
      modalRef.current!.classList.add(styles.open);
    } else {
      caretRef.current!.classList.remove(styles.rotate180);
      caretRef.current!.classList.add(styles.caretDown);
      modalRef.current!.classList.remove(styles.open);
      modalRef.current!.classList.add(styles.close);
    }
  }, [isOpen]);

  const handleSignOut = async () => {
    try {
      const response = await fetch("/api/logout", { method: "POST" });
      if (response.status === 200) {
        await signOut({ redirect: false });
        router.replace("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.userInfoContainer} onClick={() => toggleOpen()} id={"userInfo"}>
        <div className={styles.userImageBg}>
          <Image
            className={styles.userImage}
            src="/solo.png"
            width={37}
            height={37}
            alt="userImage"
          ></Image>
        </div>
        <div className={styles.userInfo}>
          <div className={styles.userCoin}>
            <Image
              className={styles.coinImage}
              src="/coin_icon.png"
              width={12}
              height={12}
              alt="coinIcon"
            ></Image>
            <span className={styles.coinCount}>{coin}</span>
            {/* <span className={styles.coinUnit}>sp</span> */}
          </div>
          <div className={styles.userName}>{name}</div>
        </div>
        <Image
          ref={caretRef}
          className={styles.caretDown}
          src="/fi-ss-caret-down.png"
          width={21}
          height={24}
          alt="caret-down"
        ></Image>
      </div>
      <div className={`${styles.modal} ${styles.close}`} ref={modalRef}>
        <nav>
          <ul>
            <li className={styles.menuItem} onClick={() => handleSignOut()}>
              Log out
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
