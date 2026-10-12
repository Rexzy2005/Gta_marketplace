import { NextResponse } from 'next/server';
import { listAdminCategories } from '../../../../lib/admin-category-repository';
import { verifyAdminSession } from '../../../../lib/admin-session';
import { prisma } from '../../../../lib/prisma';

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

  if (!verifyAdminSession(getSessionCookie(request) ?? '', sessionSecret)) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  const categories = await listAdminCategories(prisma);
  return NextResponse.json({ categories });
}