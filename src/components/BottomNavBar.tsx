import React from 'react';
import { AppLanguage, MainTab } from '../types';
import { Gamepad2, Languages, Image as ImageIcon, Film, Settings } from 'lucide-react';
import { audioService } from '../services/audioService';
import { useAdmin } from '../context/AdminContext';

interface BottomNavBarProps {
  currentTab: MainTab;
  onSelectTab: (tab: MainTab) => void;
  appLang: AppLanguage;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentTab,
  onSelectTab,
  appLang,
}) => {
  const { hiddenOptions } = useAdmin();

  const tabs = [
    {
      id: 'games' as MainTab,
      icon: Gamepad2,
      label: appLang === 'quechua' ? 'Pukllay' : 'Juegos',
      sub: appLang === 'quechua' ? 'Juegos' : 'Pukllay',
    },
    {
      id: 'translator' as MainTab,
      icon: Languages,
      label: appLang === 'quechua' ? 'Tijraq' : 'Traductor',
      sub: appLang === 'quechua' ? 'Traductor' : 'Tijraq',
    },
    {
      id: 'pictograms' as MainTab,
      icon: ImageIcon,
      label: appLang === 'quechua' ? "Siq'i" : 'Pictogramas',
      sub: appLang === 'quechua' ? 'Pictogramas' : "Siq'i",
    },
    {
      id: 'videos' as MainTab,
      icon: Film,
      label: appLang === 'quechua' ? 'Willakuy' : 'Videos',
      sub: appLang === 'quechua' ? 'Videos' : 'Willakuy',
    },
    {
      id: 'settings' as MainTab,
      icon: Settings,
      label: appLang === 'quechua' ? 'Allichay' : 'Ajustes',
      sub: appLang === 'quechua' ? 'Ajustes' : 'Allichay',
    },
  ];

  const visibleTabs = tabs.filter(
    tab => tab.id === 'settings' || !hiddenOptions.mainTabs.includes(tab.id)
  );

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] pb-[env(safe-area-inset-bottom)]"
      aria-label="Navegación móvil inferior"
    >
      <div
        className="grid items-center h-16 max-w-lg mx-auto px-1"
        style={{ gridTemplateColumns: `repeat(${visibleTabs.length}, minmax(0, 1fr))` }}
      >
        {visibleTabs.map(tab => {
          const isActive = currentTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => {
                audioService.playPop();
                onSelectTab(tab.id);
              }}
              className={`flex flex-col items-center justify-center min-h-[48px] min-w-[48px] py-1 rounded-xl transition-all ${
                isActive
                  ? 'text-amber-600 dark:text-amber-400 font-bold scale-105'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <div
                className={`p-1.5 rounded-xl transition-colors ${
                  isActive
                    ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400'
                    : 'text-slate-500'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] tracking-tight leading-none mt-1 truncate max-w-full px-0.5">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
