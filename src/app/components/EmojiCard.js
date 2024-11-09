import Link from 'next/link';
import { generateSlug } from '../lib/emojiUtils';

export default function EmojiCard({ emoji }) {
  return (
    <div className="emoji-item" title={emoji.name}>
      <Link href={`/emoji/${generateSlug(emoji.name)}`}>
        <div className="grid grid-cols-2 gap-1">
          <span className="emoji twemoji">{emoji.char}</span>
          <span className="emoji notoColor">{emoji.char}</span>
          <span className="emoji native">{emoji.char}</span>
          <span className="emoji"></span> {/* Empty spot */}
        </div>
        <span className="emoji-name">{emoji.name}</span>
      </Link>
    </div>
  );
}