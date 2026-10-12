import { NextResponse } from 'next/server';
import { parseCategoryStatusInput } from '../../../../../lib/admin-category-input';
import { setAdminCategoryActive } from '../../../../../lib/admin-category-repository';
import { verifyAdminSession } from '../../../../../lib/admin-session';
import { prisma } from '../../../../../lib/prisma';

const SESSION_COOKIE = 'admin_session';

function getSessionCookie(request: Request): string | undefined {
  const cookieHeader = request.headers.get('cookie');
  return cookieHeader
    ?.split(';')
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${SESSION_COOKIE}=`))
    ?.slice(SESSION_COOKIE.length + 1);
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
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

  const parsed = parseCategoryStatusInput(body);
  if ('error' in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const { id } = await context.params;
  if (!id) return NextResponse.json({ error: 'Category id is required' }, { status: 400 });

  try {
    const category = await setAdminCategoryActive(prisma, id, parsed.data.isActive);
    return NextResponse.json({ category });
  } catch (error) {
    if (typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2025') {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Unable to update category' }, { status: 500 });
  }
}