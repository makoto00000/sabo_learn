import { getCurrentUser } from "@/app/utils/UserAPI"
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const currentUser = await getCurrentUser();
  if (currentUser === null && request.nextUrl.pathname === '/room') {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  if (currentUser === null && request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/lp', request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/room/:path*', '/:path*'],
}
