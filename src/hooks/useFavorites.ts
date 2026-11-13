import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    setFavorites(storage.getFavorites());
  }, []);

  const toggleFavorite = (appId: string) => {
    const updated = storage.toggleFavorite(appId);
    setFavorites(updated);
  };

  const isFavorite = (appId: string) => {
    return favorites.includes(appId);
  };

  const clearFavorites = () => {
    storage.setFavorites([]);
    setFavorites([]);
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    clearFavorites,
  };
};
