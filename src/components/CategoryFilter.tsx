import React from 'react';
import { categories } from '../config/applications';

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: any) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory
}) => {
  return (
    <div className="w-full relative mt-3">
      {/* Scrollable Capsule Row */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1 px-1 -mx-1 select-none">
        {categories.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold tracking-wide border transition-all duration-300 cursor-pointer active:scale-95 ${
                isActive
                  ? 'bg-gradient-to-r from-brand-blue to-brand-cyan text-white border-transparent shadow-md'
                  : 'bg-black/5 dark:bg-white/5 text-brand-secondary border-black/5 dark:border-white/10 hover:text-brand-navy dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10'
              }`}
              style={isActive ? { boxShadow: '0 2px 10px rgba(22, 185, 255, 0.25)' } : undefined}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Subtle Side Fade Overlay (visual indication that there is more content to scroll) */}
      <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-brand-navy/0 to-transparent pointer-events-none" />
    </div>
  );
};
