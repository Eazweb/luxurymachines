import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/admin/:path*'],
};

export function middleware(request: NextRequest) {
  const adminSession = request.cookies.get('admin_session');
  
  // If this is the admin login page, allow access
  if (request.nextUrl.pathname === '/admin/login') {
    // If already logged in, redirect to admin dashboard
    if (adminSession?.value === 'true') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    return NextResponse.next();
  }
  
  // For all other admin routes, check if logged in
  if (adminSession?.value !== 'true') {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
  
  return NextResponse.next();
} 