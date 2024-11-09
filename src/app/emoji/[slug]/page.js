import { getEmoji, generateSlug, fetchEmojis } from '@/lib/emojiUtils';
import EmojiPage from '@/components/EmojiPage';

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