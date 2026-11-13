import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';

export const useRecentApps = () => {
  const [recents, setRecents] = useState<string[]>([]);

  useEffect(() => {
    setRecents(storage.getRecents());
  }, []);

  const addRecent = (appId: string) => {
    const updated = storage.addRecent(appId);
    setRecents(updated);
  };

  const clearRecents = () => {
    storage.clearRecents();
    setRecents([]);
  };

  return {
    recents,
    addRecent,
    clearRecents,
  };
};
