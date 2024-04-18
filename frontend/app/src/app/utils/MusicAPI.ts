import { Music } from "@/app/types/User";

export const getMusics: () => Promise<Music[] | null> = async () => {

  try {
    const res = await fetch(`${process.env.API_URL}/api/v1/musics`, {
      method : "GET",
      cache: "no-store",
    });

    const data:{musics: Music[], error: string} = await res.json();
    if (res.ok) {
      return data.musics;
    } else {
      console.error(data.error)
      return null;
    }

  } catch (error) {
    console.error(error)
    return null;
  }
};
