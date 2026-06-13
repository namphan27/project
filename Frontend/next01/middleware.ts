import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decodeJwt } from 'jose';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('accessToken')?.value;

  console.log(`[Middleware] Path: ${pathname}, HasToken: ${!!token}`);

  if (pathname === '/auth/login') return NextResponse.next();

  if (token) {
    try {
      const payload = decodeJwt(token);
      const role = (payload.role as string)?.toUpperCase();
      console.log(`[Middleware] User Role: ${role}`);

      if (role === 'ADMIN') {
        return NextResponse.next();
      } else {
        if (pathname.startsWith('/admin')) {
          return NextResponse.redirect(new URL('/', request.url));
        }
      }
    } catch (e) {
      console.log("[Middleware] Token decode error:", e);
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  if (pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};