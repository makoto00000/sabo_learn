"use server";

import { redirect } from "next/navigation";
import { getCookie } from "./Cookie";
import { Music, Wallpaper } from "../types/User";

export async function addCoinAction(time: number, coin: number) {
  const token = getCookie("token");
  const res = await fetch(`${process.env.API_URL}/api/v1/user/coin`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      coin: coin,
    }),
  });
  if (res.status === 200) {
    const data: Promise<{ coin: number; prevCoin: number }> = await res.json();
    redirect(`/?time=${time}&coin=${coin}&prevCoin=${(await data).prevCoin}`);
  }
}

export async function registerPlaylist(musicIds: number[]) {
  const token = getCookie("token");
  const res = await fetch(`${process.env.API_URL}/api/v1/user/playlist`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      musicIds: musicIds,
    }),
  });
  if (res.status === 200) {
    const data: Promise<Music> = await res.json();
    return data;
  }
}

export async function registerWallpaper(roomType: "solo" | "multi",wallpaperId: number) {
  const token = getCookie("token");

  const res = await fetch(`${process.env.API_URL}/api/v1/user/wallpaper/${roomType}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      wallpaperId: wallpaperId,
    }),
  });
  if (res.status === 200) {
    const data: Promise<Wallpaper> = await res.json();
    return data;
  }
}

export async function buyMusic(musicId: number) {
  const token = getCookie("token");

  const res = await fetch(`${process.env.API_URL}/api/v1/user/music/${musicId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.status === 200) {
    const data: Promise<Music> = await res.json();
    console.log(data)
    return data;
  }
}

export async function buyWallpaper(wallpaperId: number) {
  const token = getCookie("token");

  const res = await fetch(`${process.env.API_URL}/api/v1/user/wallpaper/${wallpaperId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.status === 200) {
    const data: Promise<Wallpaper> = await res.json();
    return data;
  }
}
