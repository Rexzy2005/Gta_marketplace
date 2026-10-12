import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';

const HASH_VERSION = 'scrypt-v1';
const SALT_BYTES = 16;
const KEY_BYTES = 64;

export type AdminCredentials = {
  username: string;
  passwordHash: string;
};

export function createPasswordHash(password: string): string {
  const salt = randomBytes(SALT_BYTES);
  const derivedKey = scryptSync(password, salt, KEY_BYTES);
  return [HASH_VERSION, salt.toString('hex'), derivedKey.toString('hex')].join('$');
}

export function getAdminCredentialsFromEnv(
  environment: NodeJS.ProcessEnv = process.env,
): AdminCredentials | undefined {
  const username = environment.ADMIN_USERNAME?.trim();
  const passwordHash = environment.ADMIN_PASSWORD_HASH?.trim();
  if (!username || !passwordHash) return undefined;
  return { username, passwordHash };
}

export function verifyAdminCredentials(
  username: string,
  password: string,
  credentials: AdminCredentials | undefined = getAdminCredentialsFromEnv(),
): boolean {
  if (!credentials || username !== credentials.username) return false;

  try {
    const [version, saltHex, expectedKeyHex] = credentials.passwordHash.split('$');
    if (version !== HASH_VERSION || !saltHex || !expectedKeyHex) return false;

    const salt = Buffer.from(saltHex, 'hex');
    const expectedKey = Buffer.from(expectedKeyHex, 'hex');
    if (salt.length !== SALT_BYTES || expectedKey.length !== KEY_BYTES) return false;

    const actualKey = scryptSync(password, salt, KEY_BYTES);
    return timingSafeEqual(actualKey, expectedKey);
  } catch {
    return false;
  }
}