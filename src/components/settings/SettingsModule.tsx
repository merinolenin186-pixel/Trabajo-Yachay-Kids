import React, { useState } from 'react';
import { AppLanguage, QuechuaDialect } from '../../types';
import { audioService } from '../../services/audioService';
import { InstallGuideModal } from '../InstallGuideModal';
import { ApkDownloadModal } from '../ApkDownloadModal';
import {
  Globe,
  Volume2,
  CheckCircle2,
  BookCheck,
  Download,
  Smartphone,
  ShieldCheck,
  Lock,
  LogOut,
  Sliders,
  User,
  Camera,
  RotateCcw,
  Star,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { useUserProfile } from '../../context/UserProfileContext';
import { AVATAR_OPTIONS } from '../../data/avatarsData';

interface SettingsModuleProps {
  appLang: AppLanguage;
  dialect: QuechuaDialect;
  onSetLanguage: (lang: AppLanguage) => void;
  onSetDialect: (dialect: QuechuaDialect) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenAdminPanel?: () => void;
}

export const SettingsModule: React.FC<SettingsModuleProps> = ({
  appLang,
  dialect,
  onSetLanguage,
  onSetDialect,
  isMuted,
  onToggleMute,
  onOpenAdminPanel,
}) => {
  const { isAuthenticated, adminUsername, setIsLoginModalOpen, logout } = useAdmin();
  const {
    profile,
    updateProfile,
    updateLevelConfig,
    resetOnboardingForPresentation,
  } = useUserProfile();
  const [showInstallGuide, setShowInstallGuide] = useState(false);
  const [showApkModal, setShowApkModal] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const speechSpeed = profile.config.speechSpeed;

  const handleSpeedChange = (speed: 'normal' | 'slow') => {
    audioService.playPop();
    updateLevelConfig({ speechSpeed: speed });
    audioService.setSpeechRate(speed === 'slow' ? 0.75 : 0.95);
    audioService.speakQuechua(
      speed === 'slow' ? 'Allillamanta rimani' : 'Usqhaylla rimani',
      dialect
    );
  };

  const handleUploadCustomAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDim = 320;
        const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          updateProfile({
            avatarId: 'custom',
            avatarImage: canvas.toDataURL('image/jpeg', 0.85),
          });
          audioService.playSuccessSound();
        }
      };
      img.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Title */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-['Fredoka']">
            {appLang === 'quechua' ? 'Allichaykuna (Configuración)' : 'Configuración de Yachay Kids'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Perfil del niño, lengua originaria y sistema de audio accesible.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            audioService.playPop();
            resetOnboardingForPresentation();
          }}
          className="self-start sm:self-auto px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs shadow-sm active:scale-95 transition flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
          title="Volver a la pantalla inicial de bienvenida y selección de foto"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Pantalla de Bienvenida</span>
        </button>
      </div>

      {/* 0. PERFIL DEL NIÑO */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-bold text-base text-slate-900 dark:text-white font-['Fredoka']">
            <User className="w-5 h-5 text-amber-600" />
            <span>Perfil del Niño (Nombre y Dibujito)</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-extrabold text-amber-700 dark:text-amber-400 tabular-nums">
            <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
            <span>{profile.stars} estrellas ganadas</span>
          </div>
        </div>

        {/* Name & Avatar Picker */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-4 flex items-center gap-3">
            <img
              src={profile.avatarImage}
              alt={profile.name}
              referrerPolicy="no-referrer"
              className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-400 shrink-0"
            />
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleUploadCustomAvatar}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer whitespace-nowrap"
              >
                <Camera className="w-3.5 h-3.5 text-amber-600" />
                <span>Subir foto</span>
              </button>
            </div>
          </div>

          <div className="md:col-span-8">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1">
              Nombre del niño:
            </label>
            <input
              type="text"
              maxLength={24}
              value={profile.name}
              onChange={e => updateProfile({ name: e.target.value })}
              placeholder="Nombre..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-amber-500 outline-none text-sm font-bold text-slate-900 dark:text-white"
            />
          </div>
        </div>

        {/* Quick 6 Interactive Avatar Thumbnails */}
        <div>
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-2">
            Personajes interactivos con foto:
          </span>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
            {AVATAR_OPTIONS.map(av => {
              const selected = profile.avatarId === av.id;
              return (
                <button
                  key={av.id}
                  type="button"
                  onClick={() => {
                    audioService.playPop();
                    updateProfile({ avatarId: av.id, avatarImage: av.image });
                  }}
                  className={`p-1.5 rounded-2xl border-2 text-center transition cursor-pointer ${
                    selected
                      ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/30 shadow-sm'
                      : 'border-slate-200 dark:border-slate-700 hover:border-amber-300'
                  }`}
                >
                  <img
                    src={av.image}
                    alt={av.name}
                    referrerPolicy="no-referrer"
                    className="w-full aspect-square rounded-xl object-cover mb-1"
                  />
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 block truncate">
                    {av.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Visual & Pedagogical Toggles for Inicial */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-700 space-y-3">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block">
            Visualización y ayudas para niños de inicial:
          </span>

          {/* Card Scale Segmented Control */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Tamaño visual de tarjetas y pictogramas
            </span>
            <div className="flex items-center gap-1 p-1 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              {(
                [
                  { id: 'large', label: 'Grandes' },
                  { id: 'standard', label: 'Estándar' },
                  { id: 'compact', label: 'Compactas' },
                ] as const
              ).map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    audioService.playPop();
                    updateLevelConfig({ cardScale: opt.id });
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    profile.config.cardScale === opt.id
                      ? 'bg-amber-500 text-white'
                      : 'text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {(
              [
                {
                  key: 'autoSpeakOnTap',
                  label: 'Audio automático al avanzar',
                  desc: 'Lee números y tarjetas sin presionar botón',
                },
                {
                  key: 'showPhonetics',
                  label: 'Mostrar guía fonética y sílabas',
                  desc: 'Ej: [huk], [is-kay] en tarjetas',
                },
                {
                  key: 'showDialectNotes',
                  label: 'Comparar Chanka y Collao',
                  desc: 'Muestra variantes dialectales lado a lado',
                },
                {
                  key: 'showVisualHints',
                  label: 'Pistas visuales en juegos',
                  desc: 'Ayudas amigables al contar y responder',
                },
              ] as const
            ).map(item => {
              const enabled = profile.config[item.key];
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => {
                    audioService.playPop();
                    updateLevelConfig({ [item.key]: !enabled });
                  }}
                  className={`p-3 rounded-2xl border text-left flex items-center justify-between gap-3 transition cursor-pointer ${
                    enabled
                      ? 'border-amber-400 bg-amber-50/60 dark:bg-amber-950/20'
                      : 'border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-900/50'
                  }`}
                >
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">
                      {item.label}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                      {item.desc}
                    </span>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold shrink-0 ${
                      enabled
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {enabled ? 'ON' : 'OFF'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 1. SELECCIÓN DE IDIOMA */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div className="flex items-center gap-2 font-bold text-base text-slate-900 dark:text-white font-['Fredoka']">
          <Globe className="w-5 h-5 text-amber-600" />
          <span>{appLang === 'quechua' ? 'Simi akllay (Idioma de la aplicación)' : 'Idioma principal de la aplicación'}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => {
              audioService.playSuccessSound();
              onSetLanguage('quechua');
              audioService.speakQuechua('Runasimi akllasqa kachkan', dialect);
            }}
            className={`p-4 rounded-2xl border-2 text-left transition active:scale-95 ${
              appLang === 'quechua'
                ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-950 dark:text-amber-100'
                : 'border-slate-200 dark:border-slate-700 hover:border-amber-400 bg-white dark:bg-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-extrabold text-base font-['Fredoka']">Quechua (Runasimi)</span>
              {appLang === 'quechua' && <CheckCircle2 className="w-5 h-5 text-amber-600" />}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Menús, juegos e instrucciones priorizan la lengua quechua.
            </p>
          </button>

          <button
            onClick={() => {
              audioService.playSuccessSound();
              onSetLanguage('spanish');
              audioService.speakSpanish('Español seleccionado como idioma principal');
            }}
            className={`p-4 rounded-2xl border-2 text-left transition active:scale-95 ${
              appLang === 'spanish'
                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100'
                : 'border-slate-200 dark:border-slate-700 hover:border-emerald-400 bg-white dark:bg-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-extrabold text-base font-['Fredoka']">Español / Castellano</span>
              {appLang === 'spanish' && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Instrucciones en español con aprendizaje continuo de quechua.
            </p>
          </button>
        </div>
      </div>

      {/* 2. VARIEDAD DEL QUECHUA */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div className="flex items-center gap-2 font-bold text-base text-slate-900 dark:text-white font-['Fredoka']">
          <BookCheck className="w-5 h-5 text-amber-600" />
          <span>
            {appLang === 'quechua' ? 'Runasimi laya (Variedad del Quechua)' : 'Variedad del Quechua'}
          </span>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400">
          En el Perú existen distintas variedades del quechua. Esta selección ajusta la ortografía, vocabulario y pronunciación sin mezclar variantes:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => {
              audioService.playPop();
              onSetDialect('chanka');
              audioService.speakQuechua('Quechua Chanka akllasqa: Allinllanchu masiy', 'chanka');
            }}
            className={`p-4 rounded-2xl border-2 text-left transition active:scale-95 ${
              dialect === 'chanka'
                ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-950 dark:text-amber-100'
                : 'border-slate-200 dark:border-slate-700 hover:border-amber-400 bg-white dark:bg-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-extrabold text-base font-['Fredoka']">Quechua Chanka</span>
              {dialect === 'chanka' && <CheckCircle2 className="w-5 h-5 text-amber-600" />}
            </div>
            <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 block mb-1">
              Ayacucho · Apurímac · Huancavelica
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Sistema trivocálico (a, i, u). Vocabulario tradicional: Allqo (perro), Yaku (agua), Añay (gracias).
            </p>
          </button>

          <button
            onClick={() => {
              audioService.playPop();
              onSetDialect('collao');
              audioService.speakQuechua('Quechua Collao akllasqa: Napaykullayki masiy', 'collao');
            }}
            className={`p-4 rounded-2xl border-2 text-left transition active:scale-95 ${
              dialect === 'collao'
                ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-950 dark:text-amber-100'
                : 'border-slate-200 dark:border-slate-700 hover:border-amber-400 bg-white dark:bg-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-extrabold text-base font-['Fredoka']">Quechua Collao</span>
              {dialect === 'collao' && <CheckCircle2 className="w-5 h-5 text-amber-600" />}
            </div>
            <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 block mb-1">
              Cusco · Puno · Arequipa
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Consonantes glotalizadas y aspiradas. Vocabulario: Allqu (perro), Unu (agua), Sulpayki (gracias).
            </p>
          </button>
        </div>
      </div>

      {/* 3. SISTEMA DE AUDIO Y VELOCIDAD INFANTIL */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-base text-slate-900 dark:text-white font-['Fredoka']">
            <Volume2 className="w-5 h-5 text-amber-600" />
            <span>{appLang === 'quechua' ? 'Uyariy (Audio y Pronunciación)' : 'Audio y Pronunciación Infantil'}</span>
          </div>

          <button
            onClick={() => {
              audioService.playPop();
              onToggleMute();
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              isMuted
                ? 'bg-red-100 text-red-700'
                : 'bg-emerald-100 text-emerald-800'
            }`}
          >
            {isMuted ? 'Sonido silenciado' : 'Sonido activado'}
          </button>
        </div>

        <div className="pt-2">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-2">
            Velocidad de pronunciación para niños:
          </span>
          <div className="grid grid-cols-2 gap-3 max-w-sm">
            <button
              onClick={() => handleSpeedChange('slow')}
              className={`p-3 rounded-2xl border-2 font-bold text-xs transition active:scale-95 ${
                speechSpeed === 'slow'
                  ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200'
                  : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              🐢 Pausado / Lento (Recomendado)
            </button>
            <button
              onClick={() => handleSpeedChange('normal')}
              className={`p-3 rounded-2xl border-2 font-bold text-xs transition active:scale-95 ${
                speechSpeed === 'normal'
                  ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200'
                  : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              🏃 Normal
            </button>
          </div>
        </div>
      </div>

      {/* 4. INSTALACIÓN EN CELULAR Y DESCARGA .APK */}
      <div className="bg-amber-50 dark:bg-slate-800/90 p-6 rounded-3xl border-2 border-amber-400 dark:border-amber-600 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-xl shadow-md shrink-0">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-amber-950 dark:text-amber-200 font-['Fredoka']">
                Instalar en tu Celular (Android / iOS)
              </h3>
              <p className="text-xs text-amber-800/90 dark:text-amber-300 font-medium">
                Acceso directo desde tu pantalla de inicio y funcionamiento 100% sin internet.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => {
                audioService.playPop();
                setShowInstallGuide(true);
              }}
              className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs shadow-md active:scale-95 transition flex items-center gap-2 cursor-pointer"
              title="Instalar directamente en el celular"
            >
              <Smartphone className="w-4 h-4" />
              <span>Instalar en Celular</span>
            </button>

            <button
              onClick={() => {
                audioService.playPop();
                setShowApkModal(true);
              }}
              className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md active:scale-95 transition flex items-center gap-2 cursor-pointer"
              title="Descargar archivo instalador .APK"
            >
              <Download className="w-4 h-4" />
              <span>Descargar .APK</span>
            </button>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-900/70 border border-amber-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-1">
          <p>
            • <strong>Instalar en Celular (Recomendado)</strong>: Agrega la aplicación a la pantalla de inicio de tu teléfono como una App nativa (PWA de Google) en 2 toques, sin errores de paquetes ni configuraciones complicadas.
          </p>
          <p>
            • <strong>Descargar .APK</strong>: Paquete instalador de Android con guía técnica explicativa y resolución de errores de análisis en móviles.
          </p>
        </div>
      </div>

      <InstallGuideModal
        isOpen={showInstallGuide}
        onClose={() => setShowInstallGuide(false)}
      />

      <ApkDownloadModal
        isOpen={showApkModal}
        onClose={() => setShowApkModal(false)}
      />

      {/* 5. ADMINISTRACIÓN Y PERSONALIZACIÓN */}
      <div className="bg-slate-900 dark:bg-slate-900 p-6 rounded-3xl border-2 border-slate-700 text-white shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center shadow-md shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-extrabold font-['Fredoka']">
                  Panel de Administrador
                </h3>
                {isAuthenticated && (
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    Sesión activa ({adminUsername})
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Cambia colores, edita descripciones, agrega secciones, videos o audios con subtítulos traducidos automáticamente y oculta opciones.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => {
                    audioService.playPop();
                    onOpenAdminPanel?.();
                  }}
                  className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs shadow-md active:scale-95 transition flex items-center gap-2 cursor-pointer"
                >
                  <Sliders className="w-4 h-4" />
                  <span>Abrir Panel Admin</span>
                </button>
                <button
                  onClick={() => {
                    audioService.playPop();
                    logout();
                  }}
                  className="px-3.5 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition flex items-center gap-1.5 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Salir</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  audioService.playPop();
                  setIsLoginModalOpen(true);
                }}
                className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs shadow-md active:scale-95 transition flex items-center gap-2 cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>Iniciar Sesión Admin</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Pedagogy note */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 space-y-2">
        <span className="font-bold text-slate-700 dark:text-slate-300 block">
          Yachay Kids · Proyecto de Inclusión Digital y Lingüística
        </span>
        <p>
          Diseñado bajo los lineamientos de la Educación Intercultural Bilingüe (EIB) del Perú, promoviendo el derecho de todos los niños a aprender en su propia lengua originaria.
        </p>
      </div>
    </div>
  );
};
