export async function fetchEmojis() {
  const response = await fetch('https://cdn.jsdelivr.net/npm/emoji.json@13.1.0/emoji.json');
  return await response.json();
}

export async function getEmoji(slug) {
  const emojis = await fetchEmojis();
  return emojis.find(e => generateSlug(e.name) === slug) || null;
}

export const generateSlug = (name) => {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
};