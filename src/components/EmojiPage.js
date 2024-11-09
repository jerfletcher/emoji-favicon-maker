"use client";

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { convertToFavicon } from '@/lib/faviconUtils';
import { Suspense } from 'react';

function EmojiContent({ emoji }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (!emoji) {
    return <div>Emoji not found</div>;
  }

  const fontClasses = ['twemoji', 'notoColor', 'native'];
  const sizes = [16, 32, 48, 180];

  const downloadZip = (fontClass) => {
    convertToFavicon(emoji.char, emoji.name, fontClass);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold">{emoji.name}</h1>
        <p className="text-lg">Category: {emoji.category}</p>
        <div className="flex flex-wrap justify-center">
          {fontClasses.map((fontClass) => (
            <div key={fontClass} className="my-4 mx-2 p-4 border rounded-lg bg-gray-100">
              <div className="flex items-center space-x-4">
                {sizes.map((size) => (
                  <span key={size} className={`emoji ${fontClass}`} style={{ fontSize: `${size}px` }}>
                    {emoji.char}
                  </span>
                ))}
              </div>
              <div className="flex justify-center">
                <button onClick={() => downloadZip(fontClass)} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
                  Download {fontClass} Icon Zip
                </button>
              </div>
            </div>
          ))}
        </div>
        <nav className="mt-4">
          <Link href="/" className="text-blue-500 underline">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span>{emoji.name}</span>
        </nav>
      </div>
    </div>
  );
}

export default function EmojiPage({ emoji }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EmojiContent emoji={emoji} />
    </Suspense>
  );
}