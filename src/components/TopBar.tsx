import React from 'react';
import { AppLanguage, MainTab, QuechuaDialect } from '../types';
import { Volume2, VolumeX, Globe } from 'lucide-react';
import { audioService } from '../services/audioService';

interface TopBarProps {
  currentTab: MainTab;
  onSelectTab: (tab: MainTab) => void;
  appLang: AppLanguage;
  dialect: QuechuaDialect;
  onOpenLanguageModal: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentTab,
  onSelectTab,
  appLang,
  dialect,
  onOpenLanguageModal,
  isMuted,
  onToggleMute,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-amber-500/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-amber-600/30 dark:border-slate-800 text-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single line, text wordmark in display face) */}
        <div
          onClick={() => onSelectTab('games')}
          className="flex items-center gap-2.5 cursor-pointer whitespace-nowrap shrink-0 group"
          role="button"
          tabIndex={0}
        >
          <span className="w-9 h-9 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center font-bold text-xl shadow-inner group-hover:scale-105 transition-transform">
            ☀️
          </span>
          <span className="text-xl md:text-2xl font-extrabold tracking-tight text-white drop-shadow-sm font-['Fredoka']">
            Yachay Kids
          </span>
          <span className="hidden sm:inline text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-600/60 text-amber-100 border border-amber-400/40">
            100% Offline
          </span>
        </div>

        {/* Zone 2: 4-5 Navigation links (Single-line, quiet hover underline) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <button
            onClick={() => onSelectTab('games')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              currentTab === 'games'
                ? 'text-white font-bold border-b-2 border-white'
                : 'text-amber-100 hover:text-white'
            }`}
          >
            {appLang === 'quechua' ? 'Pukllaykuna (Juegos)' : 'Juegos'}
          </button>

          <button
            onClick={() => onSelectTab('translator')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              currentTab === 'translator'
                ? 'text-white font-bold border-b-2 border-white'
                : 'text-amber-100 hover:text-white'
            }`}
          >
            {appLang === 'quechua' ? 'Tijraq (Traductor)' : 'Traductor'}
          </button>

          <button
            onClick={() => onSelectTab('pictograms')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              currentTab === 'pictograms'
                ? 'text-white font-bold border-b-2 border-white'
                : 'text-amber-100 hover:text-white'
            }`}
          >
            {appLang === 'quechua' ? 'Siq\'ikuna (Pictogramas)' : 'Pictogramas'}
          </button>

          <button
            onClick={() => onSelectTab('videos')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              currentTab === 'videos'
                ? 'text-white font-bold border-b-2 border-white'
                : 'text-amber-100 hover:text-white'
            }`}
          >
            {appLang === 'quechua' ? 'Willakuy (Cuentos)' : 'Videos y Cuentos'}
          </button>

          <button
            onClick={() => onSelectTab('settings')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              currentTab === 'settings'
                ? 'text-white font-bold border-b-2 border-white'
                : 'text-amber-100 hover:text-white'
            }`}
          >
            {appLang === 'quechua' ? 'Allichay (Ajustes)' : 'Ajustes'}
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action (Language Switcher & Audio Button) */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              audioService.playPop();
              onToggleMute();
            }}
            aria-label="Silenciar o activar sonido"
            className="w-10 h-10 rounded-xl bg-amber-600/70 hover:bg-amber-600 flex items-center justify-center text-white transition active:scale-95"
          >
            {isMuted ? <VolumeX className="w-5 h-5 text-red-200" /> : <Volume2 className="w-5 h-5" />}
          </button>

          <button
            onClick={() => {
              audioService.playPop();
              onOpenLanguageModal();
            }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white text-amber-900 font-bold text-xs sm:text-sm hover:bg-amber-50 active:scale-95 shadow transition whitespace-nowrap shrink-0"
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
