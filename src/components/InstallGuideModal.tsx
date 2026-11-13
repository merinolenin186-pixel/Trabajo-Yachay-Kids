import React, { useState } from 'react';
import { Smartphone, QrCode, Check, Copy, X, ArrowRight, Download, Sparkles, WifiOff } from 'lucide-react';
import { audioService } from '../services/audioService';

interface InstallGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallGuideModal: React.FC<InstallGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeOS, setActiveOS] = useState<'android' | 'ios'>('android');

  if (!isOpen) return null;

  const appUrl =
    typeof window !== 'undefined'
      ? window.location.origin
      : 'https://ais-pre-il2b5wct7m2opj6n5pcrok-302269478806.us-east5.run.app';

  // SVG QR Code generator pointing to appUrl using quickcharts or inline SVG
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
    appUrl
  )}&bgcolor=ffffff&color=d97706&margin=10`;

  const handleCopyLink = () => {
    audioService.playPop();
    navigator.clipboard.writeText(appUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-amber-400 text-slate-800 dark:text-slate-100 max-h-[92vh] overflow-y-auto no-scrollbar space-y-6">
        {/* Close Button */}
        <button
          onClick={() => {
            audioService.playPop();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition"
          aria-label="Cerrar ventana"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center mb-3 shadow-inner">
            <Smartphone className="w-8 h-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-950 dark:text-amber-200 font-['Fredoka']">
            Descargar e Instalar en tu Celular
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-md">
            Yachay Kids es una aplicación PWA que se instala directamente en tu teléfono sin necesidad de descargarla de una tienda y funciona <strong>100% sin conexión a internet</strong>.
          </p>
        </div>

        {/* QR Code & Direct Link Box */}
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 dark:bg-slate-800/80 border-2 border-amber-200 dark:border-slate-700 flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <div className="p-2 bg-white rounded-2xl shadow-sm border border-amber-200 shrink-0">
            <img
              src={qrCodeUrl}
              alt="Código QR para abrir en celular"
              className="w-32 h-32 sm:w-36 sm:h-36 rounded-xl"
            />
          </div>

          <div className="flex-1 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-200/80 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 text-[11px] font-bold">
              <QrCode className="w-3.5 h-3.5" />
              <span>Paso 1: Escanea con tu celular</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Apunta la cámara de tu teléfono al código QR para abrir Yachay Kids directamente en tu navegador móvil.
            </p>
            <div className="pt-1">
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-sm active:scale-95 transition"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? '¡Enlace copiado!' : 'Copiar enlace directo'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Step-by-Step OS Selector */}
        <div>
          <div className="flex items-center justify-center gap-2 mb-4">
            <button
              onClick={() => {
                audioService.playPop();
                setActiveOS('android');
              }}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 ${
                activeOS === 'android'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-emerald-50'
              }`}
            >
              <span>🤖</span>
              <span>Para celulares Android</span>
            </button>

            <button
              onClick={() => {
                audioService.playPop();
                setActiveOS('ios');
              }}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 ${
                activeOS === 'ios'
                  ? 'bg-sky-600 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-sky-50'
              }`}
            >
              <span>🍎</span>
              <span>Para iPhone o iPad (iOS)</span>
            </button>
          </div>

          {/* Android Steps */}
          {activeOS === 'android' && (
            <div className="space-y-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-emerald-500 text-white font-black text-xs flex items-center justify-center shrink-0">
                  1
                </span>
                <p className="text-slate-700 dark:text-slate-200">
                  Abre el enlace en <strong>Google Chrome</strong> (o tu navegador habitual) en tu celular.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-emerald-500 text-white font-black text-xs flex items-center justify-center shrink-0">
                  2
                </span>
                <p className="text-slate-700 dark:text-slate-200">
                  Verás un botón verde arriba que dice <strong>«Instalar App»</strong>. Toca ese botón. Si no aparece, toca los <strong>3 puntos (⋮)</strong> en la esquina superior derecha de Chrome.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-emerald-500 text-white font-black text-xs flex items-center justify-center shrink-0">
                  3
                </span>
                <p className="text-slate-700 dark:text-slate-200">
                  Selecciona <strong>«Instalar aplicación»</strong> o <strong>«Añadir a la pantalla principal»</strong> y confirma.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-emerald-500 text-white font-black text-xs flex items-center justify-center shrink-0">
                  ✓
                </span>
                <p className="text-emerald-800 dark:text-emerald-300 font-bold">
                  ¡Listo! Aparecerá el ícono de <strong>Yachay Kids</strong> en tu pantalla de inicio como cualquier aplicación nativa, lista para usarse sin internet.
                </p>
              </div>
            </div>
          )}

          {/* iOS Steps */}
          {activeOS === 'ios' && (
            <div className="space-y-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-sky-500 text-white font-black text-xs flex items-center justify-center shrink-0">
                  1
                </span>
                <p className="text-slate-700 dark:text-slate-200">
                  Abre el enlace en el navegador <strong>Safari</strong> de tu iPhone o iPad.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-sky-500 text-white font-black text-xs flex items-center justify-center shrink-0">
                  2
                </span>
                <p className="text-slate-700 dark:text-slate-200">
                  Toca el botón <strong>Compartir</strong> (el ícono del cuadrito con una flecha hacia arriba ⬆️ en la barra inferior de Safari).
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-sky-500 text-white font-black text-xs flex items-center justify-center shrink-0">
                  3
                </span>
                <p className="text-slate-700 dark:text-slate-200">
                  Desliza hacia abajo en las opciones y pulsa en <strong>«Añadir a pantalla de inicio»</strong> (Add to Home Screen).
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-sky-500 text-white font-black text-xs flex items-center justify-center shrink-0">
                  ✓
                </span>
                <p className="text-sky-800 dark:text-sky-300 font-bold">
                  Toca <strong>«Añadir»</strong> arriba a la derecha. La app se guardará en tu pantalla y la podrás abrir en pantalla completa sin conexión.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Offline confirmation badge */}
        <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 flex items-center gap-3 text-xs text-emerald-900 dark:text-emerald-200 font-bold">
          <WifiOff className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>
            Una vez instalada, puedes activar el «Modo Avión» o desactivar el Wi-Fi: todos los juegos, audios y cuentos funcionarán al 100%.
          </span>
        </div>

        {/* Done Button */}
        <button
          onClick={() => {
            audioService.playPop();
            onClose();
          }}
          className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md active:scale-95 transition"
        >
          ¡Entendido, volver a la app!
        </button>
      </div>
    </div>
  );
};
