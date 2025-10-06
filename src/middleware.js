import { NextResponse } from "next/server";

export async function middleware(request) {
  const accessToken = request.cookies.get("accessToken")?.value ?? "";
  const id = request.cookies.get("id")?.value ?? "";
  const currentPath = request.nextUrl.pathname;

  if (id && accessToken) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_URL}users/${id}`, {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    

    const data = await res.json();

    // Check if API call was successful
    if (data.error_code === 401) {
      // Token is invalid, redirect to login
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    if (
      data.status !== "active" &&
      currentPath !== "/auth/pending-verification"
    ) {
      return NextResponse.redirect(
        new URL("/auth/pending-verification", request.url)
      );
    }

    // If user is active and on pending-verification page, redirect to main page
    if (
      data.status === "active" &&
      currentPath === "/auth/pending-verification"
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    if (!accessToken && !currentPath.startsWith("/auth/")) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next|favicon.ico|auth|unauthorized|privacy|images|docxs|offer).*)",
  ],
};
