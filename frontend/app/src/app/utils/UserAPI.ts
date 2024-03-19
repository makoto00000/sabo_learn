import { getCookie } from "@/app/utils/Cookie";
import { User } from "@/app/types/User";

export const getCurrentUser: () => Promise<User> = async () => {
  const token = getCookie("token");
  const res = await fetch(`${process.env.API_URL}/api/v1/user`, {
    cache: "no-store",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.ok) {
    const currentUser = await res.json();
    return currentUser.user;
  } else {
    return null;
  }
};