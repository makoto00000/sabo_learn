import { Wallpaper} from "@/app/types/User";

export const getWallpapers: () => Promise<Wallpaper[] | null> = async () => {

  try {
    const res = await fetch(`${process.env.API_URL}/api/v1/wallpapers`, {
      method : "GET",
      cache: "no-store",
    });

    const data:{wallpapers: Wallpaper[], error: string} = await res.json();
    if (res.ok) {
      return data.wallpapers;
    } else {
      console.error(data.error)
      return null;
    }

  } catch (error) {
    console.error(error)
    return null;
  }
};
