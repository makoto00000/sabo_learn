"use server";

import { redirect } from "next/navigation";
import { getCookie } from "./Cookie";

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
  if(res.status === 200) {
    const data:Promise<{coin: number, prevCoin: number}> = await res.json()
    redirect(`/?time=${time}&coin=${coin}&prevCoin=${(await data).prevCoin}`);
  }
};
