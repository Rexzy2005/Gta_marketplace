import { describe, expect, it } from 'vitest';
import { validateContactUrl } from './contact-channels';

describe('contact channel configuration', () => {
  it('accepts secure Discord and Telegram destinations', () => {
    expect(validateContactUrl('discord', 'https://discord.gg/legend-lane')).toBe('https://discord.gg/legend-lane');
    expect(validateContactUrl('telegram', 'https://t.me/legend_lane')).toBe('https://t.me/legend_lane');
  });

  it('rejects unsupported hosts and insecure URLs', () => {
    expect(validateContactUrl('discord', 'https://example.com/support')).toBeNull();
    expect(validateContactUrl('telegram', 'http://t.me/legend_lane')).toBeNull();
    expect(validateContactUrl('discord', 'not a url')).toBeNull();
  });

  it('treats missing configuration as unavailable', () => {
    expect(validateContactUrl('discord', undefined)).toBeNull();
    expect(validateContactUrl('telegram', '')).toBeNull();
  });
});