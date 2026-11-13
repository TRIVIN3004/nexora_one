import { useState, useEffect } from 'react';
import { applications } from './config/applications';
import type { Application } from './config/applications';
import { useFavorites } from './hooks/useFavorites';
import { useRecentApps } from './hooks/useRecentApps';
import { storage } from './utils/storage';
import type { ThemeType } from './utils/storage';

// Component imports
import { SplashScreen } from './components/SplashScreen';
import { BottomNavigation } from './components/BottomNavigation';
import type { TabType } from './components/BottomNavigation';
import { DesktopSidebar } from './components/DesktopSidebar';
import { AppDetailsModal } from './components/AppDetailsModal';
import { OfflineAlertModal } from './components/OfflineAlertModal';
import { CalendarTool } from './components/CalendarTool';
import { CalculatorTool } from './components/CalculatorTool';

// 5 Core Integrated Portals
import { NexoraConnectPortal } from './portals/NexoraConnectPortal';
import { NexoraShowcasePortal } from './portals/NexoraShowcasePortal';
import { DailyProgressPortal } from './portals/DailyProgressPortal';
import { PrdamsPortal } from './portals/PrdamsPortal';
import { InternshipPortal } from './portals/InternshipPortal';

// Page imports
import { Home } from './pages/Home';
import { Apps } from './pages/Apps';
import { Favorites } from './pages/Favorites';
import { Settings } from './pages/Settings';
import { About } from './pages/About';

export type PortalType = 'connect' | 'showcase' | 'dpr' | 'prdams' | 'internship';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [showAboutPage, setShowAboutPage] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  // Active Core Portal state
  const [activePortal, setActivePortal] = useState<PortalType | null>(null);

  // Desktop Responsive Mode
  const [isDesktopMode, setIsDesktopMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('nexora_desktop_mode');
    if (saved !== null) return saved === 'true';
    return window.innerWidth >= 840;
  });

  const toggleDesktopMode = () => {
    setIsDesktopMode(prev => {
      const next = !prev;
      localStorage.setItem('nexora_desktop_mode', String(next));
      return next;
    });
  };

  // Theme settings
  const [theme, setTheme] = useState<ThemeType>(() => storage.getTheme());

  // Local Page overlays state
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  // App Modal & Interstitial Details
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [appToLaunch, setAppToLaunch] = useState<Application | null>(null);
  const [isOfflineAlertOpen, setIsOfflineAlertOpen] = useState(false);

  // Hooks data
  const { favorites, toggleFavorite, isFavorite, clearFavorites } = useFavorites();
  const { recents, addRecent, clearRecents } = useRecentApps();

  // Network connection state listener
  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);

    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);

    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  // Keyboard Shortcuts (Esc to close, Alt+1..5 for direct portal switching)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activePortal) {
          setActivePortal(null);
        } else if (selectedApp) {
          setSelectedApp(null);
        } else if (isCalendarOpen) {
          setIsCalendarOpen(false);
        } else if (isCalculatorOpen) {
          setIsCalculatorOpen(false);
        }
      }

      // Alt + numbers for direct portal navigation
      if (e.altKey) {
        if (e.key === '1') setActivePortal('connect');
        if (e.key === '2') setActivePortal('showcase');
        if (e.key === '3') setActivePortal('dpr');
        if (e.key === '4') setActivePortal('prdams');
        if (e.key === '5') setActivePortal('internship');
        if (e.key === '0') setActivePortal(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePortal, selectedApp, isCalendarOpen, isCalculatorOpen]);

  // Theme apply and listener
  useEffect(() => {
    const root = document.documentElement;
    const applyTheme = (t: ThemeType) => {
      if (t === 'dark') {
        root.classList.add('dark');
        document.body.classList.add('dark');
      } else if (t === 'light') {
        root.classList.remove('dark');
        document.body.classList.remove('dark');
      } else {
        const systemIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (systemIsDark) {
          root.classList.add('dark');
          document.body.classList.add('dark');
        } else {
          root.classList.remove('dark');
          document.body.classList.remove('dark');
        }
      }
    };

    applyTheme(theme);
    storage.setTheme(theme);

    if (theme === 'auto') {
      const media = window.matchMedia('(prefers-color-scheme: dark)');
      const mediaListener = (e: MediaQueryListEvent) => {
        if (e.matches) {
          root.classList.add('dark');
          document.body.classList.add('dark');
        } else {
          root.classList.remove('dark');
          document.body.classList.remove('dark');
        }
      };
      media.addEventListener('change', mediaListener);
      return () => media.removeEventListener('change', mediaListener);
    }
  }, [theme]);

  // Handle URL / Portal opening
  const handleOpenApp = (app: Application) => {
    addRecent(app.id);
    setSelectedApp(null);

    // Direct in-app portal routing
    if (app.portalType) {
      setActivePortal(app.portalType);
      return;
    }

    // Local tools interception
    if (app.url === 'local:calendar') {
      setIsCalendarOpen(true);
      return;
    }
    if (app.url === 'local:calculator') {
      setIsCalculatorOpen(true);
      return;
    }

    if (navigator.onLine) {
      window.open(app.url, '_blank', 'noopener,noreferrer');
    } else {
      setAppToLaunch(app);
      setIsOfflineAlertOpen(true);
    }
  };

  const handleRetryLaunch = () => {
    if (appToLaunch && navigator.onLine) {
      setIsOfflineAlertOpen(false);
      window.open(appToLaunch.url, '_blank', 'noopener,noreferrer');
      setAppToLaunch(null);
    }
  };

  // Navigating tabs
  const handleTabChange = (tab: TabType) => {
    setActivePortal(null);
    setShowAboutPage(false);
    setActiveTab(tab);
  };

  const renderActiveContent = () => {
    // 1. Render active integrated portal
    if (activePortal === 'connect') {
      return <NexoraConnectPortal onBack={() => setActivePortal(null)} />;
    }
    if (activePortal === 'showcase') {
      return <NexoraShowcasePortal onBack={() => setActivePortal(null)} />;
    }
    if (activePortal === 'dpr') {
      return <DailyProgressPortal onBack={() => setActivePortal(null)} />;
    }
    if (activePortal === 'prdams') {
      return <PrdamsPortal onBack={() => setActivePortal(null)} />;
    }
    if (activePortal === 'internship') {
      return <InternshipPortal onBack={() => setActivePortal(null)} />;
    }

    // 2. Render about page
    if (showAboutPage) {
      return <About onBackToSettings={() => setShowAboutPage(false)} />;
    }

    // 3. Render tabs
    switch (activeTab) {
      case 'home':
        return (
          <Home
            apps={applications}
            favorites={favorites}
            recents={recents}
            onToggleFav={toggleFavorite}
            onOpenApp={handleOpenApp}
            onOpenDetails={setSelectedApp}
            onNavigateToCatalog={() => handleTabChange('apps')}
            isOnline={isOnline}
          />
        );
      case 'apps':
        return (
          <Apps
            apps={applications}
            favorites={favorites}
            onToggleFav={toggleFavorite}
            onOpenApp={handleOpenApp}
            onOpenDetails={setSelectedApp}
          />
        );
      case 'favorites':
        return (
          <Favorites
            apps={applications}
            favorites={favorites}
            onToggleFav={toggleFavorite}
            onOpenApp={handleOpenApp}
            onOpenDetails={setSelectedApp}
            onNavigateToCatalog={() => handleTabChange('apps')}
          />
        );
      case 'settings':
        return (
          <Settings
            onClearFavorites={clearFavorites}
            onClearRecents={clearRecents}
            onClearCalendarNotes={() => {
              localStorage.removeItem('nexora_calendar_notes');
            }}
            onNavigateToAbout={() => setShowAboutPage(true)}
            onThemeChange={setTheme}
            currentTheme={theme}
          />
        );
      default:
        return null;
    }
  };

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className={`w-full min-h-screen flex ${isDesktopMode ? 'bg-[#030A17]' : 'justify-center items-center p-0 sm:p-4'}`}>
      
      {/* Desktop Sidebar (visible on wider screens) */}
      {isDesktopMode && (
        <DesktopSidebar
          activeTab={activeTab}
          onTabChange={handleTabChange}
          onOpenPortal={setActivePortal}
          onOpenCalendar={() => setIsCalendarOpen(true)}
          onOpenCalculator={() => setIsCalculatorOpen(true)}
          isDesktopMode={isDesktopMode}
          onToggleDesktopMode={toggleDesktopMode}
          activePortal={activePortal}
        />
      )}

      {/* Main App Frame */}
      <div className={`flex flex-col relative transition-all duration-300 ${
        isDesktopMode 
          ? 'flex-1 h-screen overflow-hidden bg-white dark:bg-[#06152F]'
          : 'app-container shadow-2xl rounded-none sm:rounded-[40px]'
      }`}>
        
        {/* Dynamic Content Panel */}
        <div className="flex-grow flex flex-col overflow-hidden relative">
          {renderActiveContent()}
        </div>

        {/* Floating Bottom Tab Navigation (Mobile view & when no portal is open) */}
        {!activePortal && !showAboutPage && (
          <div className={isDesktopMode ? 'md:hidden' : 'block'}>
            <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />
          </div>
        )}

        {/* Details Sheet Modal */}
        <AppDetailsModal
          app={selectedApp}
          isOpen={selectedApp !== null}
          isFav={selectedApp ? isFavorite(selectedApp.id) : false}
          onToggleFav={() => selectedApp && toggleFavorite(selectedApp.id)}
          onClose={() => setSelectedApp(null)}
          onOpenApp={() => selectedApp && handleOpenApp(selectedApp)}
        />

        {/* Offline Connection Alert Interstitial */}
        <OfflineAlertModal
          isOpen={isOfflineAlertOpen}
          onClose={() => {
            setIsOfflineAlertOpen(false);
            setAppToLaunch(null);
          }}
          onRetry={handleRetryLaunch}
        />

        {/* Local Calendar Overlay */}
        <CalendarTool
          isOpen={isCalendarOpen}
          onClose={() => setIsCalendarOpen(false)}
        />

        {/* Local Calculator Overlay */}
        <CalculatorTool
          isOpen={isCalculatorOpen}
          onClose={() => setIsCalculatorOpen(false)}
        />
      </div>
    </div>
  );
}

export default App;
