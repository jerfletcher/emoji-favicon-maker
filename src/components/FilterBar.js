import React, { useEffect, useRef } from 'react';

const createCategoryTags = (groups, activeCategories, toggleCategory) => {
  return Object.keys(groups).map(category => (
    <div
      key={category}
      className={`cursor-pointer px-2 py-1 m-1 rounded ${activeCategories.has(category) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
      onClick={() => toggleCategory(category)}
    >
      {category}
    </div>
  ));
};

const toggleCategory = (category, setActiveCategories) => {
  setActiveCategories(prev => {
    const newCategories = new Set(prev);
    if (newCategories.has(category)) {
      newCategories.delete(category);
    } else {
      newCategories.add(category);
    }
    localStorage.setItem('activeCategories', JSON.stringify(Array.from(newCategories)));
    return newCategories;
  });
};

const handleSelectAll = (allEmojis, setActiveCategories, groupEmojisByCategory) => {
  const groupedEmojis = groupEmojisByCategory(allEmojis);
  const allCategories = new Set(Object.keys(groupedEmojis));
  setActiveCategories(allCategories);
  localStorage.setItem('activeCategories', JSON.stringify(Array.from(allCategories)));
};

const handleUnselectAll = (setActiveCategories) => {
  setActiveCategories(new Set());
  localStorage.setItem('activeCategories', JSON.stringify([]));
};

export default function FilterBar({ filter, handleFilterChange, groupedEmojis, activeCategories, setActiveCategories, allEmojis, groupEmojisByCategory, setFilterBarHeight }) {
  const filterBarRef = useRef(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      if (entries[0]) {
        setFilterBarHeight(entries[0].contentRect.height);
      }
    });

    if (filterBarRef.current) {
      resizeObserver.observe(filterBarRef.current);
    }

    return () => {
      if (filterBarRef.current) {
        resizeObserver.unobserve(filterBarRef.current);
      }
    };
  }, [filterBarRef, groupedEmojis, activeCategories]);

  return (
    <div ref={filterBarRef} className="fixed top-24 left-8 right-8 bg-white shadow-md z-10 rounded-lg p-4">
      <input
        type="text"
        id="emoji-filter"
        placeholder="Filter by name"
        className="input-field mb-4 p-2 border rounded w-full"
        value={filter}
        onChange={handleFilterChange}
      />
      <div id="checkbox-container" className="checkbox-container flex flex-wrap justify-center mb-4">
        {createCategoryTags(groupedEmojis, activeCategories, (category) => toggleCategory(category, setActiveCategories))}
        <button className="cursor-pointer px-2 py-1 m-1 rounded bg-red-500 text-white" onClick={() => handleSelectAll(allEmojis, setActiveCategories, groupEmojisByCategory)}>All</button>
        <button className="cursor-pointer px-2 py-1 m-1 rounded bg-red-500 text-white" onClick={() => handleUnselectAll(setActiveCategories)}>None</button>
      </div>
    </div>
  );
}