"use client";

import Link from 'next/link';

export default function EmojiPage({ emoji }) {
  if (!emoji) {
    return <div>Emoji not found</div>;
  }

  const downloadZip = () => {
    // Assuming you have a function to generate the zip file URL
    const zipUrl = `/path/to/emoji/${emoji.name}.zip`;
    window.location.href = zipUrl;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">{emoji.name}</h1>
      <div className="text-6xl my-4">
        <span className="emoji twemoji">{emoji.char}</span>
        <span className="emoji notoColor">{emoji.char}</span>
      </div>
      <p className="text-lg">Category: {emoji.category}</p>
      <button onClick={downloadZip} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Download Icon Zip</button>
      <Link href="/" className="mt-4 text-blue-500 underline">
        Back to Home
      </Link>
    </div>
  );
}