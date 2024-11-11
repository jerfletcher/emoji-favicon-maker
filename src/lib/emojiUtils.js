import emojisServer from '@/lib/data/emoji.json';

let emojis = emojisServer;
if (typeof window !== 'undefined') {
  // Client-side
  emojis = require('@/lib/data/emoji.json');
}

export async function fetchEmojis() {
  if (typeof window === 'undefined') {
    // Server-side
    emojis = await import('@/lib/data/emoji.json').then(module => module.default);
  }
  return emojis;
}

export async function getEmoji(slug) {
  const allEmojis = await fetchEmojis();
  return allEmojis.find(e => generateSlug(e.name) === slug) || null;
}

export const generateSlug = (name) => {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
};