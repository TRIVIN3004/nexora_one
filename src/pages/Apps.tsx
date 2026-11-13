import React, { useState } from 'react';
import type { Application } from '../config/applications';
import { SearchBar } from '../components/SearchBar';
import { CategoryFilter } from '../components/CategoryFilter';
import { AppGrid } from '../components/AppGrid';

interface AppsProps {
  apps: Application[];
  favorites: string[];
  onToggleFav: (id: string) => void;
  onOpenApp: (app: Application) => void;
  onOpenDetails: (app: Application) => void;
}

export const Apps: React.FC<AppsProps> = ({
  apps,
  favorites,
  onToggleFav,
  onOpenApp,
  onOpenDetails
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Work' | 'AI' | 'HR' | 'Internship' | 'Management'>('All');

  // Filter application list based on search and category selections
  const filteredApps = apps.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.shortName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || app.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex-grow flex flex-col p-5 pb-24 overflow-y-auto no-scrollbar page-enter page-enter-active">
      {/* Title */}
      <div className="mt-2 mb-4">
        <h2 className="text-xl font-extrabold text-brand-navy dark:text-white">Ecosystem Catalogue</h2>
        <p className="text-xs text-brand-secondary">Search and explore Nexora platforms.</p>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col gap-2.5">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>

      {/* App Grid Container */}
      <div className="flex-grow">
        <AppGrid
          apps={filteredApps}
          favorites={favorites}
          onToggleFav={onToggleFav}
          onOpen={onOpenApp}
          onOpenDetails={onOpenDetails}
        />
      </div>
    </div>
  );
};
