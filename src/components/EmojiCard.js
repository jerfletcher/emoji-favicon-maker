import React, { forwardRef } from 'react';
import Link from 'next/link';
import { generateSlug } from '@/lib/emojiUtils';

const EmojiCard = forwardRef(({ emoji }, ref) => {
  return (
    <div ref={ref} className="emoji-item bg-gray-100 rounded-lg p-2 m-2 w-52" title={emoji.name}>
      <Link href={`/emoji/${generateSlug(emoji.name)}`}>
        <div className="flex items-center space-x-2">
          <span className="emoji twemoji w-12 text-center">{emoji.char}</span>
          <span className="emoji notoColor w-12 text-center">{emoji.char}</span>
          <span className="emoji native w-12 text-center">{emoji.char}</span>
        </div>
        <span className="emoji-name block text-center mt-2">{emoji.name}</span>
      </Link>
    </div>
  );
});

export default EmojiCard;