import React from 'react';
import { AppLanguage, MainTab, QuechuaDialect } from '../types';
import { Volume2, VolumeX, Globe, ShieldCheck } from 'lucide-react';
import { audioService } from '../services/audioService';
import { useAdmin } from '../context/AdminContext';
import { useUserProfile } from '../context/UserProfileContext';

interface TopBarProps {
  currentTab: MainTab;
  onSelectTab: (tab: MainTab) => void;
  appLang: AppLanguage;
  dialect: QuechuaDialect;
  onOpenLanguageModal: () => void;
  onOpenProfileModal: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentTab,
  onSelectTab,
  appLang,
  dialect,
  onOpenLanguageModal,
  onOpenProfileModal,
  isMuted,
  onToggleMute,
}) => {
  const { customTexts, hiddenOptions, isAuthenticated } = useAdmin();
  const { profile } = useUserProfile();

  const navItems: { id: MainTab; quechua: string; spanish: string }[] = [
    { id: 'games', quechua: 'Pukllaykuna (Juegos)', spanish: 'Juegos' },
    { id: 'translator', quechua: 'Tijraq (Traductor)', spanish: 'Traductor' },
    { id: 'pictograms', quechua: "Siq'ikuna (Pictogramas)", spanish: 'Pictogramas' },
    { id: 'videos', quechua: 'Willakuy (Cuentos)', spanish: 'Videos y Cuentos' },
    { id: 'settings', quechua: 'Allichay (Ajustes)', spanish: 'Ajustes' },
  ];

  const visibleNavItems = navItems.filter(
    item => item.id === 'settings' || !hiddenOptions.mainTabs.includes(item.id)
  );

  return (
    <header className="yachay-topbar sticky top-0 z-40 w-full bg-amber-500/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-amber-600/30 dark:border-slate-800 text-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark */}
        <div
          onClick={() => onSelectTab(visibleNavItems[0]?.id || 'games')}
          className="flex items-center gap-2.5 cursor-pointer whitespace-nowrap shrink-0 group"
          role="button"
          tabIndex={0}
        >
          <span className="w-9 h-9 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center font-bold text-xl shadow-inner group-hover:scale-105 transition-transform">
            ☀️
          </span>
          <span className="text-xl md:text-2xl font-extrabold tracking-tight text-white drop-shadow-sm font-['Fredoka']">
            {customTexts.appName || 'Yachay Kids'}
          </span>
          {hiddenOptions.showOfflineBadge && (
            <span className="hidden sm:inline text-xs font-semibold px-2 py-0.5 rounded-full bg-black/20 text-white/95 border border-white/25">
              100% Offline
            </span>
          )}
        </div>

        {/* Zone 2: Navigation links */}
        <nav className="hidden md:flex items-center gap-5 text-sm font-medium">
          {visibleNavItems.map(item => (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
                currentTab === item.id
                  ? 'text-white font-bold border-b-2 border-white'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              {appLang === 'quechua' ? item.quechua : item.spanish}
            </button>
          ))}

          {isAuthenticated && (
            <button
              onClick={() => onSelectTab('admin')}
              className={`whitespace-nowrap shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-xl transition cursor-pointer ${
                currentTab === 'admin'
                  ? 'bg-white text-slate-900 font-bold shadow-sm'
                  : 'bg-black/20 hover:bg-black/30 text-white font-bold'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin</span>
            </button>
          )}
        </nav>

        {/* Zone 3: Language Switcher & Audio Button */}
        <div className="flex items-center gap-2 shrink-0">
          {isAuthenticated && (
            <button
              onClick={() => onSelectTab('admin')}
              aria-label="Panel Administrador"
              className="md:hidden w-10 h-10 rounded-xl bg-black/25 hover:bg-black/35 flex items-center justify-center text-white transition active:scale-95 cursor-pointer"
              title="Panel Administrador"
            >
              <ShieldCheck className="w-5 h-5" />
            </button>
          )}

          <button
            onClick={() => {
              audioService.playPop();
              onToggleMute();
            }}
            aria-label="Silenciar o activar sonido"
            className="w-10 h-10 rounded-xl bg-black/20 hover:bg-black/30 flex items-center justify-center text-white transition active:scale-95 cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-5 h-5 text-red-200" /> : <Volume2 className="w-5 h-5" />}
          </button>

          <button
            onClick={() => {
              audioService.playPop();
              onOpenProfileModal();
            }}
            className="flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-xl bg-black/20 hover:bg-black/30 text-white font-bold text-xs transition active:scale-95 whitespace-nowrap shrink-0 cursor-pointer"
            title="Ver perfil y nivel del niño"
          >
            <img
              src={profile.avatarImage}
              alt={profile.name}
              referrerPolicy="no-referrer"
              className="w-7 h-7 rounded-lg object-cover border border-white/60 shrink-0"
            />
            <span className="max-w-[84px] truncate">{profile.name}</span>
          </button>

          <button
            onClick={() => {
              audioService.playPop();
              onOpenLanguageModal();
            }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white text-amber-900 font-bold text-xs sm:text-sm hover:bg-amber-50 active:scale-95 shadow transition whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Globe className="w-4 h-4 text-amber-600" />
            <span>
              {appLang === 'quechua' ? `Quechua (${dialect})` : 'Español'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
