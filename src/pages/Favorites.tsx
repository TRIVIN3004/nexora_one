import React from 'react';
import type { Application } from '../config/applications';
import { AppGrid } from '../components/AppGrid';
import { Star, ArrowRight } from 'lucide-react';

interface FavoritesProps {
  apps: Application[];
  favorites: string[];
  onToggleFav: (id: string) => void;
  onOpenApp: (app: Application) => void;
  onOpenDetails: (app: Application) => void;
  onNavigateToCatalog: () => void;
}

export const Favorites: React.FC<FavoritesProps> = ({
  apps,
  favorites,
  onToggleFav,
  onOpenApp,
  onOpenDetails,
  onNavigateToCatalog
}) => {
  const favoriteApps = apps.filter((app) => favorites.includes(app.id));

  return (
    <div className="flex-grow flex flex-col p-5 pb-24 overflow-y-auto no-scrollbar page-enter page-enter-active">
      {/* Title */}
      <div className="mt-2 mb-5">
        <h2 className="text-xl font-extrabold text-brand-navy dark:text-white flex items-center gap-1.5">
          <Star className="w-5 h-5 text-brand-gold fill-brand-gold" />
          Favorites
        </h2>
        <p className="text-xs text-brand-secondary">Quick access dashboard for pinned platforms.</p>
      </div>

      {/* Grid container */}
      <div className="flex-grow">
        {favoriteApps.length > 0 ? (
          <AppGrid
            apps={favoriteApps}
            favorites={favorites}
            onToggleFav={onToggleFav}
            onOpen={onOpenApp}
            onOpenDetails={onOpenDetails}
          />
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center glass-effect rounded-[32px] border border-black/5 dark:border-white/5 mt-4">
            <div className="w-14 h-14 rounded-2xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold mb-4 animate-[bounce_2s_infinite]">
              <Star className="w-7 h-7 fill-brand-gold/50" />
            </div>
            <h4 className="text-base font-extrabold text-brand-navy dark:text-white">No pinned applications</h4>
            <p className="text-xs text-brand-secondary mt-1.5 max-w-[240px] leading-relaxed">
              Star your most-used Nexora applications. They will appear here for instant offline launching.
            </p>
            <button
              onClick={onNavigateToCatalog}
              className="flex items-center gap-1.5 mt-6 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan text-white text-xs font-bold shadow-md hover:shadow-lg active:scale-95 transition-all"
            >
              Browse Catalogue
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
