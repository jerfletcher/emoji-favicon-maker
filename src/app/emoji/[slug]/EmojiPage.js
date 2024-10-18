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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1>{emoji.name}</h1>
      <div style={{ fontSize: '4rem' }}>
        <span className="emoji twemoji">{emoji.char}</span>
        <span className="emoji notoColor">{emoji.char}</span>
      </div>
      <p>Category: {emoji.category}</p>
      <button onClick={downloadZip} style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}>Download Icon Zip</button>
      <Link href="/" style={{ marginTop: '20px', fontSize: '16px', color: 'blue', textDecoration: 'underline' }}>
        Back to Home
      </Link>
    </div>
  );
}