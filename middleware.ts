// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

// Initialize Firebase Admin once
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID!,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
      // private key needs newline fixes
      privateKey: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    }),
  });
}

const auth = getAuth();

const ADMIN_PATHS = ['/admin', '/jobs/new', '/reports']; // adjust as needed

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Bypass public assets and API routes
  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.match(/\.(.*)$/)) {
    return NextResponse.next();
  }

  // Get token from Authorization header: "Bearer <idToken>"
  const authHeader = req.headers.get('authorization') || '';
  const idTokenMatch = authHeader.match(/^Bearer (.+)$/);
  let decoded: any = null;

  if (idTokenMatch) {
    const idToken = idTokenMatch[1];
    try {
      decoded = await auth.verifyIdToken(idToken, true); // true enforces check of revocation if needed
    } catch (e) {
      // invalid or expired token
      console.warn('Token verification failed:', e);
    }
  }

  // If route requires auth and no valid token -> redirect to login
  const requiresAdmin = ADMIN_PATHS.some(p => pathname.startsWith(p));
  const requiresAuth = requiresAdmin || pathname.startsWith('/dashboard'); // other protected routes

  if (requiresAuth && !decoded) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Role-based guard (example: only users with custom claim `role: 'admin'`)
  if (requiresAdmin) {
    const role = decoded?.role || decoded?.customClaims?.role || decoded?.admin; // depending on how you set it
    if (role !== 'admin') {
      // Optionally send 403 or redirect
      return NextResponse.rewrite(new URL('/unauthorized', req.url));
    }
  }

  // Optionally attach user info as headers to downstream (be careful with sensitive data)
  if (decoded) {
    const res = NextResponse.next();
    res.headers.set('x-user-uid', decoded.uid);
    res.headers.set('x-user-role', decoded.role || 'user');
    return res;
  }

  return NextResponse.next();
}

// Specify matcher if using Next.js 13+ to limit middleware scope
export const config = {
  matcher: ['/admin/:path*', '/jobs/:path*', '/reports/:path*', '/dashboard/:path*'],
};
