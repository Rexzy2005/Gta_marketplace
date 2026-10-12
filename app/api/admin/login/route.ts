import { NextResponse } from 'next/server';
import {
  getAdminCredentialsFromEnv,
  verifyAdminCredentials,
} from '../../../../lib/admin-auth';
import { createAdminSession } from '../../../../lib/admin-session';

const SESSION_COOKIE = 'admin_session';

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  if (
    typeof body !== 'object' ||
    body === null ||
    typeof (body as { username?: unknown }).username !== 'string' ||
    typeof (body as { password?: unknown }).password !== 'string'
  ) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const { username, password } = body as { username: string; password: string };
  const credentials = getAdminCredentialsFromEnv();
  const sessionSecret = process.env.ADMIN_SESSION_SECRET?.trim();
  if (!credentials || !sessionSecret) {
    return NextResponse.json({ error: 'Authentication unavailable' }, { status: 503 });
  }

  if (!verifyAdminCredentials(username, password, credentials)) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const session = createAdminSession(username, sessionSecret);
  if (!session) {
    return NextResponse.json({ error: 'Authentication unavailable' }, { status: 503 });
  }

  const response = NextResponse.json({ authenticated: true });
  response.cookies.set({
    name: SESSION_COOKIE,
    value: session,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 8 * 60 * 60,
  });
  return response;
}