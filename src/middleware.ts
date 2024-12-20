// app/middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export function middleware(request: NextRequest) {
  const cookieName = 'access_token';
  const cookie = cookies().get(cookieName)?.value;

  if (!cookie) {
    return NextResponse.redirect(new URL('/auth/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/dashboard/:path*',
}