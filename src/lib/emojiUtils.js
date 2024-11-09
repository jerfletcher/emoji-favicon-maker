
const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

let cachedEmojis = null;
let lastFetchTime = 0;

export async function fetchEmojis() {
  const now = new Date().getTime();

  if (cachedEmojis && (now - lastFetchTime < ONE_DAY_IN_MS)) {
    return cachedEmojis;
  }

  const response = await fetch('https://cdn.jsdelivr.net/npm/emoji.json@13.1.0/emoji.json');
  cachedEmojis = await response.json();
  lastFetchTime = now;
  return cachedEmojis;
}

export async function getEmoji(slug) {
  const emojis = await fetchEmojis();
  return emojis.find(e => generateSlug(e.name) === slug) || null;
}

export const generateSlug = (name) => {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
};