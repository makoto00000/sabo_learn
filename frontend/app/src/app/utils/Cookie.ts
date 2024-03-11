import { cookies } from 'next/headers'

export const getCookie = (name: string) => {
  const cookieStore = cookies();
  const cookie = cookieStore.get(name);
  return cookie?.value;
}

export const setCookie = (name: string, value: string) => {
  cookies().set({
    name: name,
    value: value,
    expires: Date.now() + 24 * 60 * 60 * 1000,
    httpOnly: true,
    path: '/',
  })
}

export const deleteCookie = (name: string) => {
  cookies().delete(name)
}