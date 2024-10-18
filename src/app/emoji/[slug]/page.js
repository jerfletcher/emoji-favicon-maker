import { getEmoji, generateSlug } from './emojiUtils';
import EmojiPage from './EmojiPage';

export default async function EmojiServerPage({ params }) {
  const { slug } = params;
  const emoji = await getEmoji(slug);

  return <EmojiPage emoji={emoji} />;
}

export async function generateStaticParams() {
  const response = await fetch('https://cdn.jsdelivr.net/npm/emoji.json@13.1.0/emoji.json');
  const emojis = await response.json();
  return emojis.map(emoji => ({
    slug: generateSlug(emoji.name),
  }));
}