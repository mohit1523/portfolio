import { createHmac, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const SESSION_COOKIE = 'portfolio_admin_session';

function getAuthSecret() {
  return process.env.AUTH_SECRET || 'change-this-auth-secret-in-env';
}

function sign(value: string) {
  return createHmac('sha256', getAuthSecret()).update(value).digest('hex');
}

export function getAdminCredentials() {
  return {
    username: process.env.ADMIN_USERNAME || 'admin',
    password: process.env.ADMIN_PASSWORD || 'ChangeMe123!',
  };
}

export async function createAdminSession(username: string) {
  const payload = `${username}:${Date.now()}`;
  const signature = sign(payload);
  const store = await cookies();

  store.set(SESSION_COOKIE, `${payload}:${signature}`, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearAdminSession() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

export async function isAdminAuthenticated() {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) {
    return false;
  }

  const parts = token.split(':');
  if (parts.length < 3) {
    return false;
  }

  const [username, issuedAt, signature] = parts;
  const payload = `${username}:${issuedAt}`;
  const expected = sign(payload);

  try {
    return timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  } catch {
    return false;
  }
}

export async function requireAdminSession() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    redirect('/admin/login');
  }
}
