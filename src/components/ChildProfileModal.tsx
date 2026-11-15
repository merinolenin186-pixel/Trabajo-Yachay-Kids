import React from 'react';
import { AppLanguage, QuechuaDialect } from '../types';
import { useUserProfile } from '../context/UserProfileContext';
import { audioService } from '../services/audioService';
import { X, Star, Volume2, Sliders, RotateCcw } from 'lucide-react';

interface ChildProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  appLang: AppLanguage;
  dialect: QuechuaDialect;
  onOpenSettings: () => void;
}

export const ChildProfileModal: React.FC<ChildProfileModalProps> = ({
  isOpen,
  onClose,
  appLang,
  dialect,
  onOpenSettings,
}) => {
  const { profile, resetOnboardingForPresentation } = useUserProfile();

  if (!isOpen) return null;

  const handleGreet = () => {
    if (appLang === 'quechua') {
      audioService.speakQuechua(`Allinllanchu ${profile.name}! Kusisqa pukllay.`, dialect);
    } else {
      audioService.speakSpanish(`¡Hola ${profile.name}! Qué alegría jugar contigo.`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 shadow-2xl border border-amber-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 space-y-6">
        <button
          type="button"
          onClick={() => {
            audioService.playPop();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition cursor-pointer"
          aria-label="Cerrar perfil"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Child Header */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={handleGreet}
            className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-md shrink-0 group cursor-pointer"
            title="Tocar para escuchar saludo"
          >
            <img
              src={profile.avatarImage}
              alt={profile.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
            <span className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center shadow">
              <Volume2 className="w-3.5 h-3.5" />
            </span>
          </button>

          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white font-['Fredoka']">
              {profile.name}
            </h2>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {appLang === 'quechua' ? 'Yachay Kids · Pukllaq' : 'Pequeño explorador de Yachay Kids'}
            </p>
            <div className="flex items-center gap-3 text-xs font-bold text-amber-700 dark:text-amber-400 tabular-nums">
              <span className="inline-flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                {profile.stars} {profile.stars === 1 ? 'estrella' : 'estrellas'}
              </span>
              <span>·</span>
              <span>{profile.completedActivities.length} actividades</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={() => {
              audioService.playPop();
              onClose();
              onOpenSettings();
            }}
            className="px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <Sliders className="w-4 h-4 text-amber-600" />
            <span>Cambiar nombre o foto</span>
          </button>

          <button
            type="button"
            onClick={() => {
              audioService.playPop();
              onClose();
              resetOnboardingForPresentation();
            }}
            className="px-4 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Pantalla de Bienvenida</span>
          </button>
        </div>
      </div>
    </div>
  );
};
