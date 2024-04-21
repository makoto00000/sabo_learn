import { getCurrentUser } from "@/app/utils/UserAPI";
import { NextRequest, NextResponse, userAgent } from "next/server";

// 必要なときだけgetCurrentUserを実行することで読み込み速度向上
export async function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname === "/soloroom" ||
    request.nextUrl.pathname === "/multiroom"
  ) {
    const currentUser = await getCurrentUser();
    if (currentUser === null) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  if (request.nextUrl.pathname === "/") {
    const currentUser = await getCurrentUser();
    if (currentUser === null) {
      return NextResponse.redirect(new URL("/lp", request.url));
    }
  }
  // TODO signupへのアクセスを制限中
  if (request.nextUrl.pathname === "/signup") {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  
  const { browser } = userAgent(request);
  if (browser.name !== "Chrome" && request.nextUrl.pathname === "/multiroom") {
    return NextResponse.redirect(new URL("/unsupported", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/room/:path*", "/:path*"],
};
