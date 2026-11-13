import React from 'react';
import { AppLanguage, QuechuaDialect } from '../types';
import { SunIllustration, LlamaIllustration } from './icons/AppIllustrations';
import { audioService } from '../services/audioService';
import { Check, Sparkles, Volume2, X } from 'lucide-react';

interface LanguageSelectorModalProps {
  isOpen: boolean;
  onClose?: () => void;
  currentLang: AppLanguage;
  currentDialect: QuechuaDialect;
  onSelectLanguage: (lang: AppLanguage, dialect: QuechuaDialect) => void;
  canDismiss?: boolean;
}

export const LanguageSelectorModal: React.FC<LanguageSelectorModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  currentDialect,
  onSelectLanguage,
  canDismiss = true,
}) => {
  if (!isOpen) return null;

  const handleSelectQuechua = (dialect: QuechuaDialect) => {
    audioService.playSuccessSound();
    audioService.speakQuechua('Allin hamusqa Yachay Kids-man! Kusisqa yachakusunchis.', dialect);
    onSelectLanguage('quechua', dialect);
    onClose?.();
  };

  const handleSelectSpanish = () => {
    audioService.playSuccessSound();
    audioService.speakSpanish('¡Bienvenido a Yachay Kids! Aprendamos juntos.');
    onSelectLanguage('spanish', currentDialect);
    onClose?.();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-amber-50 to-orange-50 dark:from-slate-900 dark:to-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-amber-300 dark:border-amber-700 max-h-[90vh] overflow-y-auto no-scrollbar text-slate-800 dark:text-slate-100">
        {/* Dismiss Button (if allowed) */}
        {canDismiss && onClose && (
          <button
            onClick={() => {
              audioService.playPop();
              onClose();
            }}
            className="absolute top-4 right-4 p-2 rounded-full bg-amber-200/70 hover:bg-amber-300 dark:bg-slate-700 text-slate-700 dark:text-slate-200 transition"
            aria-label="Cerrar ventana"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Welcome Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="relative mb-3">
            <SunIllustration className="w-20 h-20 animate-bounce-gentle" />
            <div className="absolute -bottom-2 -right-3">
              <LlamaIllustration className="w-12 h-12" />
            </div>
          </div>

          <h2 className="text-3xl font-extrabold text-amber-950 dark:text-amber-300 tracking-tight font-['Fredoka']">
            Yachay Kids
          </h2>
          <p className="text-sm font-semibold text-amber-800 dark:text-amber-200 mt-1">
            Allin hamusqayki · Bienvenidos
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-sm">
            Escoge tu lengua de aprendizaje para comenzar a jugar sin necesidad de internet:
          </p>
        </div>

        {/* Main Language Choices */}
        <div className="space-y-4">
          {/* QUECHUA MAIN CARD */}
          <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-5 border-2 border-amber-400 dark:border-amber-600 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🇵🇪</span>
                <h3 className="text-xl font-bold text-amber-900 dark:text-amber-200 font-['Fredoka']">
                  Quechua (Runasimi)
                </h3>
              </div>
              <button
                onClick={() => audioService.speakQuechua('Allin hamusqa! Runasimi')}
                className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 hover:bg-amber-200"
                title="Escuchar saludo en quechua"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 mb-3">
              Selecciona la variedad lingüística que utilizas en tu comunidad:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Quechua Chanka */}
              <button
                onClick={() => handleSelectQuechua('chanka')}
                className={`flex flex-col text-left p-3 rounded-xl border-2 transition active:scale-95 ${
                  currentLang === 'quechua' && currentDialect === 'chanka'
                    ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-100'
                    : 'border-slate-200 dark:border-slate-700 hover:border-amber-400 bg-white dark:bg-slate-800'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-bold text-sm">Quechua Chanka</span>
                  {currentLang === 'quechua' && currentDialect === 'chanka' && (
                    <Check className="w-4 h-4 text-amber-600" />
                  )}
                </div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Ayacucho · Apurímac · Huancavelica
                </span>
                <span className="text-[10px] text-amber-700 dark:text-amber-400 font-medium mt-1">
                  «Allinllanchu masiy»
                </span>
              </button>

              {/* Quechua Collao */}
              <button
                onClick={() => handleSelectQuechua('collao')}
                className={`flex flex-col text-left p-3 rounded-xl border-2 transition active:scale-95 ${
                  currentLang === 'quechua' && currentDialect === 'collao'
                    ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-100'
                    : 'border-slate-200 dark:border-slate-700 hover:border-amber-400 bg-white dark:bg-slate-800'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-bold text-sm">Quechua Collao</span>
                  {currentLang === 'quechua' && currentDialect === 'collao' && (
                    <Check className="w-4 h-4 text-amber-600" />
                  )}
                </div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Cusco · Puno · Arequipa
                </span>
                <span className="text-[10px] text-amber-700 dark:text-amber-400 font-medium mt-1">
                  «Napaykullayki masiy»
                </span>
              </button>
            </div>
          </div>

          {/* SPANISH CARD */}
          <button
            onClick={handleSelectSpanish}
            className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition active:scale-95 ${
              currentLang === 'spanish'
                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100'
                : 'border-slate-200 dark:border-slate-700 hover:border-emerald-400 bg-white dark:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-3 text-left">
              <span className="text-2xl">📚</span>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 font-['Fredoka']">
                  Español / Castellano
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Aprende quechua desde el español con pronunciaciones y juegos
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {currentLang === 'spanish' && (
                <Check className="w-5 h-5 text-emerald-600" />
              )}
            </div>
          </button>
        </div>

        {/* Info Banner */}
        <div className="mt-6 p-3 rounded-xl bg-amber-100/70 dark:bg-slate-800 border border-amber-200 dark:border-slate-700 flex items-center gap-2 text-xs text-amber-900 dark:text-amber-200">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            Puedes cambiar de idioma en cualquier momento usando el botón en la barra superior.
          </span>
        </div>
      </div>
    </div>
  );
};
