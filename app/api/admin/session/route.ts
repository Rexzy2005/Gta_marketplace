
import { NextResponse } from 'next/server';
import { verifyAdminSession } from '../../../../lib/admin-session';

const SESSION_COOKIE = 'admin_session';

function getSessionCookie(request: Request): string | undefined {
  const cookieHeader = request.headers.get('cookie');
  return cookieHeader
    ?.split(';')
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${SESSION_COOKIE}=`))
    ?.slice(SESSION_COOKIE.length + 1);
}

export async function GET(request: Request) {
  const sessionSecret = process.env.ADMIN_SESSION_SECRET?.trim();
  if (!sessionSecret) {
    return NextResponse.json({ error: 'Authentication unavailable' }, { status: 503 });
  }

  const username = verifyAdminSession(getSessionCookie(request) ?? '', sessionSecret);
  if (!username) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  return NextResponse.json({ authenticated: true, username });
}