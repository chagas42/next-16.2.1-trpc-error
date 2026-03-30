import { clerkMiddleware } from "@clerk/nextjs/server";
import { geolocation } from "@vercel/functions";
import { NextResponse } from "next/server";

export default clerkMiddleware(async (_getAuth, req) => {
  const requestHeaders = new Headers(req.headers);

  const { country } = geolocation(req);
  if (process.env.NODE_ENV === "production" && country) {
    requestHeaders.set("x-geo-country", country);
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
    // Always run for dashboard routes
    "/",
  ],
};
