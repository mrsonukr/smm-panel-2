import React from 'react';
import { Instagram, Facebook, Youtube, Twitter, Music } from 'lucide-react';

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }) => {
  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'instagram':
        return <Instagram className="w-5 h-5" />;
      case 'facebook':
        return <Facebook className="w-5 h-5" />;
      case 'youtube':
        return <Youtube className="w-5 h-5" />;
      case 'twitter':
        return <Twitter className="w-5 h-5" />;
      case 'tiktok':
        return <Music className="w-5 h-5" />;
      default:
        return <div className="w-5 h-5 bg-gray-400 rounded" />;
    }
  };

  return (
    <div className="flex flex-wrap gap-3 mb-8">
      <button
        onClick={() => onCategoryChange(null)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
          activeCategory === null
            ? 'bg-blue-500 text-white shadow-md'
            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
        }`}
      >
        All Services
      </button>
      
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            activeCategory === category.id
              ? 'bg-blue-500 text-white shadow-md'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          {getCategoryIcon(category.icon)}
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;