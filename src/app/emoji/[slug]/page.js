import { getEmoji, generateSlug } from '@/lib/emojiUtils';
import EmojiPage from '@/components/EmojiPage';

const fetchEmojis = async () => {
  const response = await fetch('https://cdn.jsdelivr.net/npm/emoji.json@13.1.0/emoji.json');
  return await response.json();
};

export default async function EmojiServerPage({ params }) {
  const { slug } = params;
  const emoji = await getEmoji(slug);

  return <EmojiPage emoji={emoji} />;
}

export async function generateStaticParams() {
  const emojis = await fetchEmojis();
  return emojis.map(emoji => ({
    slug: generateSlug(emoji.name),
  }));
}