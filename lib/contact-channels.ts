export type ContactChannel = 'discord' | 'telegram';

const allowedHosts: Record<ContactChannel, readonly string[]> = {
  discord: ['discord.com', 'discord.gg'],
  telegram: ['t.me', 'telegram.me'],
};

export function validateContactUrl(channel: ContactChannel, value: string | undefined): string | null {
  if (!value) return null;

  try {
    const url = new URL(value);
    const hostIsAllowed = allowedHosts[channel].some(
      (host) => url.hostname === host || url.hostname.endsWith(`.${host}`),
    );
    if (url.protocol !== 'https:' || !hostIsAllowed) return null;
    return url.toString();
  } catch {
    return null;
  }
}

export const configuredContactChannels = {
  discord: validateContactUrl('discord', process.env.NEXT_PUBLIC_DISCORD_URL),
  telegram: validateContactUrl('telegram', process.env.NEXT_PUBLIC_TELEGRAM_URL),
} as const;