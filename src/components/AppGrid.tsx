import React from 'react';
import type { Application } from '../config/applications';
import { AppCard } from './AppCard';
import { Info } from 'lucide-react';

interface AppGridProps {
  apps: Application[];
  favorites: string[];
  onToggleFav: (appId: string) => void;
  onOpen: (app: Application) => void;
  onOpenDetails: (app: Application) => void;
}

export const AppGrid: React.FC<AppGridProps> = ({
  apps,
  favorites,
  onToggleFav,
  onOpen,
  onOpenDetails
}) => {
  if (apps.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-6 text-center glass-effect rounded-3xl border border-black/5 dark:border-white/5 mt-4">
        <Info className="w-10 h-10 text-brand-blue dark:text-brand-cyan opacity-60 mb-3 animate-pulse" />
        <h4 className="text-base font-extrabold text-brand-navy dark:text-white">No applications found</h4>
        <p className="text-xs text-brand-secondary mt-1 max-w-[240px]">
          Try modifying your search term or selecting a different category filter.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 w-full">
      {apps.map((app) => (
        <AppCard
          key={app.id}
          app={app}
          isFav={favorites.includes(app.id)}
          onToggleFav={() => onToggleFav(app.id)}
          onOpen={() => onOpen(app)}
          onOpenDetails={() => onOpenDetails(app)}
        />
      ))}
    </div>
  );
};
