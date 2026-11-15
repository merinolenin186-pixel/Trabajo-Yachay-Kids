import React from 'react';
import { useAccessibility, FontSizeOption } from '../../context/AccessibilityContext';
import { useAdmin } from '../../context/AdminContext';
import { audioService } from '../../services/audioService';
import { Eye, Volume2, Type, MessageSquare } from 'lucide-react';
import { AppLanguage, QuechuaDialect } from '../../types';

interface AccessibilityBarProps {
  appLang: AppLanguage;
  dialect: QuechuaDialect;
}

export const AccessibilityBar: React.FC<AccessibilityBarProps> = ({
  appLang,
  dialect,
}) => {
  const {
    highContrast,
    toggleHighContrast,
    fontSize,
    setFontSize,
    screenReaderVoice,
    toggleScreenReaderVoice,
    setIsCaaModalOpen,
  } = useAccessibility();
  const { hiddenOptions } = useAdmin();

  const cycleFontSize = () => {
    audioService.playPop();
    const next: FontSizeOption =
      fontSize === 'normal' ? 'large' : fontSize === 'large' ? 'extralarge' : 'normal';
    setFontSize(next);
    audioService.speakSpanish(
      next === 'normal'
        ? 'Tamaño de letra normal'
        : next === 'large'
        ? 'Tamaño de letra grande'
        : 'Tamaño de letra extra grande'
    );
  };

  return (
    <div
      role="region"
      aria-label="Herramientas de accesibilidad universal"
      className="yachay-accessibility-bar bg-amber-600/95 dark:bg-slate-900 border-b border-amber-700/40 dark:border-slate-800 text-white py-1.5 px-2.5 sm:px-4 text-xs"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 overflow-x-auto no-scrollbar whitespace-nowrap">
        {/* Left Accessibility quick toggles */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="hidden sm:inline-flex text-[11px] font-bold text-amber-200 dark:text-amber-400 mr-1 items-center gap-1">
            <span>♿ Accesibilidad:</span>
          </span>

          {/* High Contrast button */}
          <button
            onClick={toggleHighContrast}
            aria-pressed={highContrast}
            className={`flex items-center gap-1 px-2.5 py-1.5 min-h-[34px] rounded-lg font-bold text-[11px] transition active:scale-95 shrink-0 cursor-pointer ${
              highContrast
                ? 'bg-yellow-400 text-black border-2 border-white'
                : 'bg-amber-700/80 hover:bg-amber-700 text-white'
            }`}
            title="Modo Alto Contraste para baja visión"
          >
            <Eye className="w-3.5 h-3.5 shrink-0" />
            <span className="sm:hidden">{highContrast ? 'Contraste: SÍ' : 'Contraste'}</span>
            <span className="hidden sm:inline">{highContrast ? 'Alto Contraste: SÍ' : 'Alto Contraste'}</span>
          </button>

          {/* Font Size button */}
          <button
            onClick={cycleFontSize}
            className="flex items-center gap-1 px-2.5 py-1.5 min-h-[34px] rounded-lg bg-amber-700/80 hover:bg-amber-700 text-white font-bold text-[11px] transition active:scale-95 shrink-0 cursor-pointer"
            title="Cambiar tamaño de letra (A / A+ / A++)"
          >
            <Type className="w-3.5 h-3.5 shrink-0" />
            <span>
              <span className="hidden sm:inline">Letra: </span>
              {fontSize === 'normal' ? 'Normal' : fontSize === 'large' ? 'Grande' : 'A++'}
            </span>
          </button>

          {/* Voice Screen Reader button */}
          <button
            onClick={toggleScreenReaderVoice}
            aria-pressed={screenReaderVoice}
            className={`flex items-center gap-1 px-2.5 py-1.5 min-h-[34px] rounded-lg font-bold text-[11px] transition active:scale-95 shrink-0 cursor-pointer ${
              screenReaderVoice
                ? 'bg-emerald-400 text-black font-extrabold'
                : 'bg-amber-700/80 hover:bg-amber-700 text-white'
            }`}
            title="Lector de voz para personas con discapacidad visual"
          >
            <Volume2 className="w-3.5 h-3.5 shrink-0" />
            <span className="sm:hidden">{screenReaderVoice ? 'Voz: SÍ' : 'Voz'}</span>
            <span className="hidden sm:inline">{screenReaderVoice ? 'Lector de Voz: ACTIVO' : 'Lector de Voz'}</span>
          </button>
        </div>

        {/* Right buttons: Non-verbal CAA board */}
        {hiddenOptions.showCaaButton && (
          <div className="flex items-center gap-1.5 ml-auto shrink-0">
            <button
              onClick={() => {
                audioService.playPop();
                setIsCaaModalOpen(true);
              }}
              className="flex items-center gap-1 px-2.5 py-1.5 min-h-[34px] rounded-lg bg-pink-600 hover:bg-pink-700 text-white font-bold text-[11px] shadow-sm transition active:scale-95 shrink-0 cursor-pointer"
              title="Tablero de habla para personas que no pueden hablar"
            >
              <MessageSquare className="w-3.5 h-3.5 shrink-0" />
              <span className="sm:hidden">🗣️ Hablar</span>
              <span className="hidden sm:inline">🗣️ Tablero de Habla (No verbal)</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
