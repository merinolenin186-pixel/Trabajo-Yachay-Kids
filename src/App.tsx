/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AppLanguage, MainTab, GameSubTab, QuechuaDialect } from './types';
import { TopBar } from './components/TopBar';
import { BottomNavBar } from './components/BottomNavBar';
import { LanguageSelectorModal } from './components/LanguageSelectorModal';
import { GamesHub } from './components/games/GamesHub';
import { NumbersGame } from './components/games/NumbersGame';
import { MemoryGame } from './components/games/MemoryGame';
import { ColorsGame } from './components/games/ColorsGame';
import { AnimalsGame } from './components/games/AnimalsGame';
import { FoodsGame } from './components/games/FoodsGame';
import { TranslatorModule } from './components/translator/TranslatorModule';
import { PictogramsModule } from './components/pictograms/PictogramsModule';
import { VideosModule } from './components/videos/VideosModule';
import { SettingsModule } from './components/settings/SettingsModule';
import { ApkDownloadModal } from './components/ApkDownloadModal';
import { AccessibilityProvider, useAccessibility } from './context/AccessibilityContext';
import { AdminProvider, useAdmin } from './context/AdminContext';
import { UserProfileProvider, useUserProfile } from './context/UserProfileContext';
import { WelcomeOnboardingScreen } from './components/WelcomeOnboardingScreen';
import { ChildProfileModal } from './components/ChildProfileModal';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AccessibilityBar } from './components/accessibility/AccessibilityBar';
import { NonVerbalBoardModal } from './components/accessibility/NonVerbalBoardModal';
import { audioService } from './services/audioService';
import { WifiOff, Heart, MessageSquare } from 'lucide-react';

const STORAGE_LANG_KEY = 'yachay_kids_lang';
const STORAGE_DIALECT_KEY = 'yachay_kids_dialect';
const STORAGE_WELCOMED_KEY = 'yachay_kids_welcomed';

function AppContent() {
  const [appLang, setAppLang] = useState<AppLanguage>('quechua');
  const [dialect, setDialect] = useState<QuechuaDialect>('chanka');
  const [currentTab, setCurrentTab] = useState<MainTab>('games');
  const [currentGameSubTab, setCurrentGameSubTab] = useState<GameSubTab>('hub');
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isApkModalOpen, setIsApkModalOpen] = useState(false);
  const [isFirstLaunch, setIsFirstLaunch] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const { isCaaModalOpen, setIsCaaModalOpen, screenReaderVoice, speakAccessible } = useAccessibility();
  const { isOnboardingOpen } = useUserProfile();
  const {
    isAuthenticated,
    isLoginModalOpen,
    setIsLoginModalOpen,
    hiddenOptions,
    customTexts,
  } = useAdmin();

  // Initialize saved language & dialect from storage
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem(STORAGE_LANG_KEY) as AppLanguage | null;
      const savedDialect = localStorage.getItem(STORAGE_DIALECT_KEY) as QuechuaDialect | null;

      if (savedLang) setAppLang(savedLang);
      if (savedDialect) setDialect(savedDialect);
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Ensure current tab stays valid if hidden by admin or logged out from admin tab
  useEffect(() => {
    if (currentTab === 'admin' && !isAuthenticated) {
      setCurrentTab('settings');
      return;
    }
    if (
      currentTab !== 'settings' &&
      currentTab !== 'admin' &&
      hiddenOptions.mainTabs.includes(currentTab)
    ) {
      const fallbackOrder: MainTab[] = ['games', 'translator', 'pictograms', 'videos', 'settings'];
      const nextVisible = fallbackOrder.find(
        t => t === 'settings' || !hiddenOptions.mainTabs.includes(t)
      );
      setCurrentTab(nextVisible || 'settings');
    }
  }, [currentTab, isAuthenticated, hiddenOptions.mainTabs]);

  const handleSelectLanguage = (lang: AppLanguage, dial: QuechuaDialect) => {
    setAppLang(lang);
    setDialect(dial);
    try {
      localStorage.setItem(STORAGE_LANG_KEY, lang);
      localStorage.setItem(STORAGE_DIALECT_KEY, dial);
      localStorage.setItem(STORAGE_WELCOMED_KEY, 'true');
    } catch {}
    setIsFirstLaunch(false);
  };

  const handleToggleMute = () => {
    const muted = audioService.toggleMute();
    setIsMuted(muted);
  };

  const handleSelectTab = (tab: MainTab) => {
    setCurrentTab(tab);
    if (tab === 'games') {
      setCurrentGameSubTab('hub');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (screenReaderVoice) {
      const tabName =
        tab === 'games'
          ? 'Sección Juegos Educativos'
          : tab === 'translator'
          ? 'Sección Traductor'
          : tab === 'pictograms'
          ? 'Sección Pictogramas'
          : tab === 'videos'
          ? 'Sección Cuentos y Videos'
          : tab === 'admin'
          ? 'Panel de Administrador'
          : 'Sección Configuración';
      speakAccessible(tabName);
    }
  };

  const getFallbackTab = (): MainTab => {
    const order: MainTab[] = ['games', 'translator', 'pictograms', 'videos', 'settings'];
    return order.find(t => t === 'settings' || !hiddenOptions.mainTabs.includes(t)) || 'settings';
  };

  // Pre-entry Welcome Gate: Ask child's name, interactive avatar photo, language & user level
  if (isOnboardingOpen) {
    return (
      <WelcomeOnboardingScreen
        currentLang={appLang}
        currentDialect={dialect}
        onSelectLanguage={handleSelectLanguage}
      />
    );
  }

  return (
    <div className="yachay-app-shell min-h-screen overflow-x-clip bg-amber-50/50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-['Fredoka'] antialiased selection:bg-amber-500 selection:text-white pb-24 md:pb-10">
      {/* Universal Accessibility Toolbar */}
      {hiddenOptions.showAccessibilityBar && (
        <AccessibilityBar
          appLang={appLang}
          dialect={dialect}
        />
      )}

      {/* Top Bar with 3-Zone Contract */}
      <TopBar
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        appLang={appLang}
        dialect={dialect}
        onOpenLanguageModal={() => setIsLanguageModalOpen(true)}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full min-w-0 mx-auto px-3 sm:px-6 py-4 sm:py-6">
        {/* Banner with Offline Indicator & Non-verbal CAA */}
        {(hiddenOptions.showOfflineBadge || hiddenOptions.showCaaButton) &&
          currentTab !== 'admin' && (
            <div className="mb-4 sm:mb-6 flex flex-wrap items-center justify-between gap-2 text-xs">
              {hiddenOptions.showOfflineBadge ? (
                <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 font-bold border border-emerald-300 dark:border-emerald-700 text-[11px] sm:text-xs">
                  <WifiOff className="w-3.5 h-3.5 shrink-0" />
                  <span>
                    {appLang === 'quechua'
                      ? 'Mana internetwan purin (100% Offline)'
                      : 'Modo 100% Sin Conexión'}
                  </span>
                </div>
              ) : (
                <div />
              )}

              {hiddenOptions.showCaaButton && (
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => {
                      audioService.playPop();
                      setIsCaaModalOpen(true);
                    }}
                    className="flex items-center gap-1.5 px-3 py-2 min-h-[38px] rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs shadow-sm active:scale-95 transition cursor-pointer"
                    title="Tablero de comunicación para personas no verbales"
                  >
                    <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                    <span>Tablero Habla</span>
                  </button>
                </div>
              )}
            </div>
          )}

        {/* Tab 1: Educational Games */}
        {currentTab === 'games' && (
          <>
            {currentGameSubTab === 'hub' && (
              <GamesHub
                appLang={appLang}
                dialect={dialect}
                onSelectGame={game => setCurrentGameSubTab(game)}
              />
            )}
            {currentGameSubTab === 'numbers' && (
              <NumbersGame
                appLang={appLang}
                dialect={dialect}
                onBackToHub={() => setCurrentGameSubTab('hub')}
              />
            )}
            {currentGameSubTab === 'memory' && (
              <MemoryGame
                appLang={appLang}
                dialect={dialect}
                onBackToHub={() => setCurrentGameSubTab('hub')}
              />
            )}
            {currentGameSubTab === 'colors' && (
              <ColorsGame
                appLang={appLang}
                dialect={dialect}
                onBackToHub={() => setCurrentGameSubTab('hub')}
              />
            )}
            {currentGameSubTab === 'animals' && (
              <AnimalsGame
                appLang={appLang}
                dialect={dialect}
                onBackToHub={() => setCurrentGameSubTab('hub')}
              />
            )}
            {currentGameSubTab === 'foods' && (
              <FoodsGame
                appLang={appLang}
                dialect={dialect}
                onBackToHub={() => setCurrentGameSubTab('hub')}
              />
            )}
          </>
        )}

        {/* Tab 2: Quechua-Spanish Offline Translator */}
        {currentTab === 'translator' && (
          <TranslatorModule appLang={appLang} dialect={dialect} />
        )}

        {/* Tab 3: Educational Pictograms Library */}
        {currentTab === 'pictograms' && (
          <PictogramsModule appLang={appLang} dialect={dialect} />
        )}

        {/* Tab 4: Bilingual Animated Video Stories & Custom Audios */}
        {currentTab === 'videos' && (
          <VideosModule appLang={appLang} dialect={dialect} />
        )}

        {/* Tab 5: Settings & Dialect Configuration */}
        {currentTab === 'settings' && (
          <SettingsModule
            appLang={appLang}
            dialect={dialect}
            onSetLanguage={l => {
              setAppLang(l);
              try {
                localStorage.setItem(STORAGE_LANG_KEY, l);
              } catch {}
            }}
            onSetDialect={d => {
              setDialect(d);
              try {
                localStorage.setItem(STORAGE_DIALECT_KEY, d);
              } catch {}
            }}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
            onOpenAdminPanel={() => handleSelectTab('admin')}
          />
        )}

        {/* Tab 6: Administrator CMS Dashboard */}
        {currentTab === 'admin' && isAuthenticated && (
          <AdminDashboard
            appLang={appLang}
            dialect={dialect}
            onExitAdmin={() => handleSelectTab(getFallbackTab())}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 py-6 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300">
            <span>{customTexts.appName || 'Yachay Kids'}</span>
            <span>·</span>
            <span>Perú Suyumanta</span>
          </div>
          <p className="flex items-center gap-1">
            <span>{customTexts.footerText}</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          </p>
        </div>
      </footer>

      {/* Fixed Mobile Thumb-Zone Navigation Bar */}
      <BottomNavBar
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        appLang={appLang}
      />

      {/* Welcome & Language Selection Modal */}
      <LanguageSelectorModal
        isOpen={isLanguageModalOpen}
        onClose={() => setIsLanguageModalOpen(false)}
        currentLang={appLang}
        currentDialect={dialect}
        onSelectLanguage={handleSelectLanguage}
        canDismiss={!isFirstLaunch}
      />

      {/* APK Download Modal */}
      <ApkDownloadModal
        isOpen={isApkModalOpen}
        onClose={() => setIsApkModalOpen(false)}
      />

      {/* Non-Verbal AAC Communication Board Modal */}
      <NonVerbalBoardModal
        isOpen={isCaaModalOpen}
        onClose={() => setIsCaaModalOpen(false)}
        appLang={appLang}
        dialect={dialect}
      />

      {/* Child Profile & Level Quick-Switcher Modal */}
      <ChildProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        appLang={appLang}
        dialect={dialect}
        onOpenSettings={() => handleSelectTab('settings')}
      />

      {/* Administrator Login Modal */}
      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccess={() => handleSelectTab('admin')}
      />
    </div>
  );
}

export default function App() {
  return (
    <AdminProvider>
      <UserProfileProvider>
        <AccessibilityProvider>
          <AppContent />
        </AccessibilityProvider>
      </UserProfileProvider>
    </AdminProvider>
  );
}
