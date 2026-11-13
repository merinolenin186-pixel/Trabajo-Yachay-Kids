import React, { useState } from 'react';
import { AppLanguage, QuechuaDialect } from '../../types';
import { audioService } from '../../services/audioService';
import { InstallGuideModal } from '../InstallGuideModal';
import { ApkDownloadModal } from '../ApkDownloadModal';
import {
  Globe,
  Volume2,
  CheckCircle2,
  ShieldCheck,
  HeartHandshake,
  Sparkles,
  BookCheck,
  Download,
  Smartphone,
} from 'lucide-react';

interface SettingsModuleProps {
  appLang: AppLanguage;
  dialect: QuechuaDialect;
  onSetLanguage: (lang: AppLanguage) => void;
  onSetDialect: (dialect: QuechuaDialect) => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const SettingsModule: React.FC<SettingsModuleProps> = ({
  appLang,
  dialect,
  onSetLanguage,
  onSetDialect,
  isMuted,
  onToggleMute,
}) => {
  const [speechSpeed, setSpeechSpeed] = useState<'normal' | 'slow'>('slow');
  const [showInstallGuide, setShowInstallGuide] = useState(false);
  const [showApkModal, setShowApkModal] = useState(false);

  const handleSpeedChange = (speed: 'normal' | 'slow') => {
    audioService.playPop();
    setSpeechSpeed(speed);
    audioService.setSpeechRate(speed === 'slow' ? 0.75 : 0.95);
    audioService.speakQuechua(
      speed === 'slow' ? 'Allillamanta rimani' : 'Usqhaylla rimani',
      dialect
    );
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Title */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-['Fredoka']">
          {appLang === 'quechua' ? 'Allichaykuna (Configuración)' : 'Configuración de Yachay Kids'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Ajustes de lengua, variedad lingüística del quechua y sistema de audio accesible para niños.
        </p>
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
