"use client";

import styles from "@/app/features/room/components/Loading.module.scss";
import Carousel from "./Loading/Carousel";
import ProgressBar from "./Loading/ProgressBar";
import Button from "./Loading/Button";
import { useState } from "react";

export default function Loading({
  isPlayVideo,
}: {
  isPlayVideo: boolean | null;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const handleClose = () => {
    setIsOpen(false);
  };

  if (isOpen) {
    return (
      <div className={`background ${styles.container}`}>
        <Carousel />
        {isPlayVideo === false || isPlayVideo === null ? (
          <ProgressBar />
        ) : (
          <Button handleClose={handleClose} />
        )}
      </div>
    );
  }
  if (!isOpen) return null;
}
