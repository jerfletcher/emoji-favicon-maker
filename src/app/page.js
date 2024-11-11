"use client";
import { Suspense } from 'react';
import { useEffect, useState, useRef, useCallback } from 'react';
import { fetchEmojis } from '@/lib/emojiUtils';
import EmojiCard from '@/components/EmojiCard';
import FilterBar from '@/components/FilterBar';

export default function Home() {
  const [allEmojis, setAllEmojis] = useState([]);
  const [activeCategories, setActiveCategories] = useState(new Set());
  const [filter, setFilter] = useState('');
  const [visibleEmojis, setVisibleEmojis] = useState([]);
  const [filterBarHeight, setFilterBarHeight] = useState(0);
  const observer = useRef();

  useEffect(() => {
    async function loadEmojis() {
      const emojis = await fetchEmojis();
      setAllEmojis(emojis);
      const groupedEmojis = groupEmojisByCategory(emojis);
      setActiveCategories(new Set(Object.keys(groupedEmojis)));
    }
    loadEmojis();
  }, []);

  useEffect(() => {
    const savedFilter = localStorage.getItem('filter') || '';
    const savedScrollPosition = localStorage.getItem('scrollPosition') || 0;
    const savedCategories = JSON.parse(localStorage.getItem('activeCategories')) || [];
    setFilter(savedFilter);
    setActiveCategories(new Set(savedCategories));

    const emojiCardHeight = 100;
    const emojisPerRow = 5;
    const emojisToLoad = Math.ceil(savedScrollPosition / emojiCardHeight) * emojisPerRow;

    setVisibleEmojis(allEmojis.slice(0, Math.max(emojisToLoad, 50)));
  }, [allEmojis]);

  useEffect(() => {
    const savedScrollPosition = localStorage.getItem('scrollPosition') || 0;
    window.scrollTo(0, parseInt(savedScrollPosition, 10));
  }, [visibleEmojis]);

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

  const lastEmojiElementRef = useCallback(node => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setVisibleEmojis(prev => {
          const newVisibleEmojis = [...prev];
          const nextBatch = allEmojis.slice(prev.length, prev.length + 100);
          return newVisibleEmojis.concat(nextBatch);
        });
      }
    });
    if (node) observer.current.observe(node);
  }, [allEmojis]);

  const displayEmojis = (groups) => {
    let emojiCount = 0;
    return Object.entries(groups).map(([category, emojis]) => {
      if (!activeCategories.has(category)) return null;
      return emojis.map((emoji, index) => {
        emojiCount++;
        if (emojiCount <= visibleEmojis.length) {
          if (emojiCount === visibleEmojis.length) {
            return <EmojiCard ref={lastEmojiElementRef} key={emoji.char} emoji={emoji} />;
          }
          return <EmojiCard key={emoji.char} emoji={emoji} />;
        }
        return null;
      });
    });
  };

  const filterEmojis = () => {
    const filteredEmojis = allEmojis.filter(emoji => emoji.name.toLowerCase().includes(filter.toLowerCase()));
    const groupedEmojis = groupEmojisByCategory(filteredEmojis);
    return groupedEmojis;
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    localStorage.setItem('filter', e.target.value);
  };

  const handleCategoryChange = (newCategories) => {
    setActiveCategories(newCategories);
    localStorage.setItem('activeCategories', JSON.stringify(Array.from(newCategories)));
  };

  const groupedEmojis = filterEmojis();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="container mx-auto p-4">
        <FilterBar
          filter={filter}
          handleFilterChange={handleFilterChange}
          groupedEmojis={groupedEmojis}
          activeCategories={activeCategories}
          setActiveCategories={handleCategoryChange}
          allEmojis={allEmojis}
          groupEmojisByCategory={groupEmojisByCategory}
          setFilterBarHeight={setFilterBarHeight}
        />
        <div id="emoji-container" className="emoji-container flex flex-wrap justify-center" style={{ marginTop: filterBarHeight + 44 }}>
          {displayEmojis(groupedEmojis)}
        </div>
      </div>
    </Suspense>
  );
}