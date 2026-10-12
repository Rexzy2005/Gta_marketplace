import { NextResponse } from 'next/server';
import {
  createAdminCategory,
  listAdminCategories,
} from '../../../../lib/admin-category-repository';
import { parseCreateCategoryInput } from '../../../../lib/admin-category-input';
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

export async function POST(request: Request) {
  const sessionSecret = process.env.ADMIN_SESSION_SECRET?.trim();
  if (!sessionSecret) {
    return NextResponse.json({ error: 'Authentication unavailable' }, { status: 503 });
  }

  if (!verifyAdminSession(getSessionCookie(request) ?? '', sessionSecret)) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const parsed = parseCreateCategoryInput(body);
  if ('error' in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  try {
    const category = await createAdminCategory(prisma, parsed.data);
    return NextResponse.json({ category }, { status: 201 });
  } catch (error) {
    if (typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2002') {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Unable to create category' }, { status: 500 });
  }
}