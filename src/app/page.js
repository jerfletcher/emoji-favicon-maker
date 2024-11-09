"use client"
import { useEffect, useState } from 'react';
import { fetchEmojis, generateSlug } from './lib/emojiUtils';
import EmojiCard from './components/EmojiCard';

export default function Home() {
  const [allEmojis, setAllEmojis] = useState([]);
  const [activeCategories, setActiveCategories] = useState(new Set());
  const [filter, setFilter] = useState('');

  useEffect(() => {
    async function loadEmojis() {
      const emojis = await fetchEmojis();
      setAllEmojis(emojis);
      const groupedEmojis = groupEmojisByCategory(emojis);
      setActiveCategories(new Set(Object.keys(groupedEmojis)));
    }

    loadEmojis();
  }, []);

  const groupEmojisByCategory = (emojis) => {
    return emojis.reduce((groups, emoji) => {
      const category = emoji.category?.split(' (')[0] || 'Other';
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(emoji);
      return groups;
    }, {});
  };

  const displayEmojis = (groups) => {
    return Object.entries(groups).map(([category, emojis]) => {
      if (!activeCategories.has(category)) return null;
      return emojis.map(emoji => (
        <EmojiCard key={emoji.char} emoji={emoji} />
      ));
    });
  };

  const createCategoryCheckboxes = (groups) => {
    return Object.keys(groups).map(category => (
      <div key={category}>
        <input
          type="checkbox"
          id={`checkbox-${category}`}
          checked={activeCategories.has(category)}
          onChange={() => toggleCategory(category)}
        />
        <label htmlFor={`checkbox-${category}`}>{category}</label>
      </div>
    ));
  };

  const toggleCategory = (category) => {
    setActiveCategories(prev => {
      const newCategories = new Set(prev);
      if (newCategories.has(category)) {
        newCategories.delete(category);
      } else {
        newCategories.add(category);
      }
      return newCategories;
    });
  };

  const convertToFavicon = (emoji, name, fontClass) => {
    const sizes = [16, 32, 48, 180];
    const zip = new JSZip();
  
    sizes.forEach(size => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = size;
      canvas.height = size;
      ctx.font = `${size * 0.75}px ${fontClass}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(emoji, canvas.width / 2, canvas.height / 2);
  
      canvas.toBlob(blob => {
        const fileName = size === 180 ? `${name}_180.png` : `${name}_${size}.ico`;
        zip.file(fileName, blob);
        if (size === sizes[sizes.length - 1]) {
          createManifestAndDownload(zip, name);
        }
      }, size === 180 ? 'image/png' : 'image/x-icon');
    });
  };

  const createManifestAndDownload = (zip, name) => {
    const manifest = {
      icons: [
        { src: `${name}_16.ico`, sizes: "16x16", type: "image/x-icon" },
        { src: `${name}_32.ico`, sizes: "32x32", type: "image/x-icon" },
        { src: `${name}_48.ico`, sizes: "48x48", type: "image/x-icon" },
        { src: `${name}_180.png`, sizes: "180x180", type: "image/png" }
      ]
    };
    zip.file('manifest.json', JSON.stringify(manifest, null, 2));

    zip.generateAsync({ type: 'blob' }).then(content => {
      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${name}_favicons.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  };

  const filterEmojis = () => {
    const filteredEmojis = allEmojis.filter(emoji => emoji.name.toLowerCase().includes(filter.toLowerCase()));
    const groupedEmojis = groupEmojisByCategory(filteredEmojis);
    return groupedEmojis;
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSelectAll = () => {
    const groupedEmojis = groupEmojisByCategory(allEmojis);
    setActiveCategories(new Set(Object.keys(groupedEmojis)));
  };

  const handleUnselectAll = () => {
    setActiveCategories(new Set());
  };

  const groupedEmojis = filterEmojis();

  return (
    <div className="container mx-auto p-4">
      <input type="text" id="emoji-filter" placeholder="Filter by name" className="input-field mb-4 p-2 border rounded" value={filter} onChange={handleFilterChange} />
      <div id="checkbox-container" className="checkbox-container flex flex-wrap justify-center mb-4">
        {createCategoryCheckboxes(groupedEmojis)}
      </div>
      <div className="toggle-buttons flex justify-center mb-4">
        <span className="cursor-pointer text-blue-500 mx-2" onClick={handleSelectAll}>All</span>
        <span className="cursor-pointer text-blue-500 mx-2" onClick={handleUnselectAll}>None</span>
      </div>
      <div id="emoji-container" className="emoji-container flex flex-wrap justify-center">
        {displayEmojis(groupedEmojis)}
      </div>
    </div>
  );
}