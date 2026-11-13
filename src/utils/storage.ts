// LocalStorage Wrapper for Nexora One

const KEYS = {
  THEME: 'nexora_theme',
  FAVORITES: 'nexora_favorites',
  RECENTS: 'nexora_recents',
  NOTIFICATIONS: 'nexora_notifications',
};

export type ThemeType = 'dark' | 'light' | 'auto';

export const storage = {
  // Theme management
  getTheme: (): ThemeType => {
    return (localStorage.getItem(KEYS.THEME) as ThemeType) || 'light'; // Default to light mode
  },
  setTheme: (theme: ThemeType): void => {
    localStorage.setItem(KEYS.THEME, theme);
  },

  // Favorites management
  getFavorites: (): string[] => {
    try {
      const data = localStorage.getItem(KEYS.FAVORITES);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },
  setFavorites: (favorites: string[]): void => {
    localStorage.setItem(KEYS.FAVORITES, JSON.stringify(favorites));
  },
  toggleFavorite: (appId: string): string[] => {
    const favorites = storage.getFavorites();
    const updated = favorites.includes(appId)
      ? favorites.filter(id => id !== appId)
      : [...favorites, appId];
    storage.setFavorites(updated);
    return updated;
  },

  // Recently used applications (Limit to last 5, most recent first)
  getRecents: (): string[] => {
    try {
      const data = localStorage.getItem(KEYS.RECENTS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },
  setRecents: (recents: string[]): void => {
    localStorage.setItem(KEYS.RECENTS, JSON.stringify(recents));
  },
  addRecent: (appId: string): string[] => {
    const recents = storage.getRecents();
    // Filter out existing occurrence to move it to the front
    const filtered = recents.filter(id => id !== appId);
    const updated = [appId, ...filtered].slice(0, 5); // Store top 5
    storage.setRecents(updated);
    return updated;
  },
  clearRecents: (): void => {
    localStorage.removeItem(KEYS.RECENTS);
  },

  // Notifications toggle
  getNotificationsEnabled: (): boolean => {
    return localStorage.getItem(KEYS.NOTIFICATIONS) !== 'false'; // Default to true
  },
  setNotificationsEnabled: (enabled: boolean): void => {
    localStorage.setItem(KEYS.NOTIFICATIONS, String(enabled));
  }
};
