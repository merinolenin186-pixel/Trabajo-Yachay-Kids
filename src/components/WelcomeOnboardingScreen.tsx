import React, { useState, useRef } from 'react';
import { AppLanguage, QuechuaDialect } from '../types';
import { AVATAR_OPTIONS } from '../data/avatarsData';
import { useUserProfile } from '../context/UserProfileContext';
import { audioService } from '../services/audioService';
import confetti from 'canvas-confetti';
import {
  Volume2,
  Check,
  ArrowRight,
  ArrowLeft,
  Camera,
  User,
  Globe,
  Sparkles,
} from 'lucide-react';

interface WelcomeOnboardingScreenProps {
  currentLang: AppLanguage;
  currentDialect: QuechuaDialect;
  onSelectLanguage: (lang: AppLanguage, dialect: QuechuaDialect) => void;
}

export const WelcomeOnboardingScreen: React.FC<WelcomeOnboardingScreenProps> = ({
  currentLang,
  currentDialect,
  onSelectLanguage,
}) => {
  const { profile, completeOnboarding } = useUserProfile();

  const [step, setStep] = useState<1 | 2>(1);
  const [selectedAvatarId, setSelectedAvatarId] = useState<string>(
    profile.avatarId || AVATAR_OPTIONS[0].id
  );
  const [customImage, setCustomImage] = useState<string | null>(
    profile.avatarId === 'custom' ? profile.avatarImage : null
  );
  const [childName, setChildName] = useState<string>(
    profile.onboarded ? profile.name : AVATAR_OPTIONS[0].name
  );
  const [hasTypedCustomName, setHasTypedCustomName] = useState<boolean>(false);
  const [lang, setLang] = useState<AppLanguage>(currentLang || 'quechua');
  const [dialect, setDialect] = useState<QuechuaDialect>(currentDialect || 'chanka');
  const [activeWaveId, setActiveWaveId] = useState<string | null>(null);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedPresetAvatar =
    AVATAR_OPTIONS.find(a => a.id === selectedAvatarId) || AVATAR_OPTIONS[0];

  const activeAvatarImage =
    selectedAvatarId === 'custom' && customImage ? customImage : selectedPresetAvatar.image;

  const displayName = childName.trim() || selectedPresetAvatar.name;

  const handleChooseAvatar = (avatarId: string) => {
    const found = AVATAR_OPTIONS.find(a => a.id === avatarId);
    if (!found) return;

    audioService.playPop();
    setSelectedAvatarId(found.id);
    setActiveWaveId(found.id);
    setTimeout(() => setActiveWaveId(null), 1000);

    if (!hasTypedCustomName || AVATAR_OPTIONS.some(a => a.name === childName.trim())) {
      setChildName(found.name);
      setHasTypedCustomName(false);
    }

    if (lang === 'quechua') {
      audioService.speakQuechua(found.greetingQuechua, dialect);
    } else {
      audioService.speakSpanish(found.greetingSpanish);
    }
  };

  const handleUploadCustomPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
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
          const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
          setCustomImage(dataUrl);
          setSelectedAvatarId('custom');
          audioService.playSuccessSound();
        }
      };
      img.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSpeakPreviewGreeting = () => {
    if (lang === 'quechua') {
      audioService.speakQuechua(
        `Allinllanchu ${displayName}! Yachay Kids-man allin hamusqayki.`,
        dialect
      );
    } else {
      audioService.speakSpanish(`¡Hola ${displayName}! Bienvenido a Yachay Kids.`);
    }
  };

  const handleFinishOnboarding = () => {
    audioService.playFanfare();
    confetti({
      particleCount: 90,
      spread: 85,
      origin: { y: 0.6 },
    });
    onSelectLanguage(lang, dialect);
    completeOnboarding({
      name: displayName,
      avatarId: selectedAvatarId,
      avatarImage: activeAvatarImage,
    });
    setTimeout(() => {
      if (lang === 'quechua') {
        audioService.speakQuechua(
          `Allin hamusqayki ${displayName}! Kusisqa pukllasunchis.`,
          dialect
        );
      } else {
        audioService.speakSpanish(`¡Bienvenido ${displayName}! Vamos a aprender jugando.`);
      }
    }, 350);
  };

  return (
    <div className="min-h-screen overflow-x-clip bg-gradient-to-b from-amber-50 via-orange-50/60 to-amber-100/70 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between p-3 sm:p-6 lg:p-8 pb-[max(1rem,env(safe-area-inset-bottom))] font-['Fredoka']">
      {/* Top Minimal Brand Header */}
      <div className="max-w-5xl w-full mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 sm:pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-xl sm:text-2xl shadow-md shrink-0">
            ☀️
          </div>
          <div className="min-w-0">
            <h1 className="text-xl sm:text-3xl font-extrabold text-amber-950 dark:text-amber-200 tracking-tight leading-none">
              Yachay Kids
            </h1>
            <p className="text-[11px] sm:text-xs font-medium text-slate-600 dark:text-slate-400 mt-1 truncate">
              Educación Inicial Bilingüe · Quechua & Español
            </p>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="grid grid-cols-2 sm:flex items-center gap-2 text-xs font-bold w-full sm:w-auto">
          <button
            type="button"
            onClick={() => {
              audioService.playPop();
              setStep(1);
            }}
            className={`px-3 py-2.5 min-h-[44px] rounded-xl transition cursor-pointer whitespace-nowrap text-center ${
              step === 1
                ? 'bg-amber-500 text-white shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
            }`}
          >
            1. Nombre y Amiguito
          </button>
          <button
            type="button"
            onClick={() => {
              audioService.playPop();
              setStep(2);
            }}
            className={`px-3 py-2.5 min-h-[44px] rounded-xl transition cursor-pointer whitespace-nowrap text-center ${
              step === 2
                ? 'bg-amber-500 text-white shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
            }`}
          >
            2. Elegir Idioma
          </button>
        </div>
      </div>

      {/* Main Centered Onboarding Card */}
      <div className="max-w-5xl w-full mx-auto my-auto bg-white dark:bg-slate-900 rounded-3xl border border-amber-200 dark:border-slate-800 shadow-xl p-4 sm:p-8 lg:p-10">
        {step === 1 ? (
          <div className="space-y-6 sm:space-y-8">
            {/* Step 1 Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4 sm:pb-6">
              <div className="space-y-1.5 max-w-2xl">
                <p className="text-xs font-bold text-amber-700 dark:text-amber-400">
                  Allin hamusqayki · Bienvenido a jugar
                </p>
                <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight text-balance leading-tight">
                  ¿Cómo te gustaría llamarte? Elige tu amiguito favorito
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-['Plus_Jakarta_Sans']">
                  Toca cualquier dibujito para escucharlo saludar y elegir tu nombre, o escribe el tuyo abajo.
                </p>
              </div>

              {/* Selected Live Preview Chip */}
              <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-amber-50 dark:bg-slate-800 border border-amber-200 dark:border-slate-700 shrink-0">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-amber-100 dark:bg-slate-700 border-2 border-amber-400 shrink-0">
                  {activeAvatarImage && !imgErrors[selectedAvatarId] ? (
                    <img
                      src={activeAvatarImage}
                      alt={`Personaje elegido de ${displayName}`}
                      referrerPolicy="no-referrer"
                      onError={() => setImgErrors(prev => ({ ...prev, [selectedAvatarId]: true }))}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl bg-amber-200 text-amber-900 font-bold">
                      {displayName.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="min-w-[120px]">
                  <span className="text-xs text-slate-500 dark:text-slate-400 block">
                    Tu amiguito elegido
                  </span>
                  <strong className="text-lg font-extrabold text-slate-900 dark:text-white block truncate max-w-[150px]">
                    {displayName}
                  </strong>
                  <button
                    type="button"
                    onClick={handleSpeakPreviewGreeting}
                    className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-amber-700 dark:text-amber-400 hover:underline cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Escuchar saludo</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Interactive Generated Preschool Mascot Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {AVATAR_OPTIONS.map(avatar => {
                const isSelected = selectedAvatarId === avatar.id;
                const isWaving = activeWaveId === avatar.id;

                return (
                  <button
                    key={avatar.id}
                    type="button"
                    onClick={() => handleChooseAvatar(avatar.id)}
                    className={`group relative flex flex-col text-left rounded-3xl p-2.5 border-2 transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-amber-500 ${
                      isSelected
                        ? 'border-amber-500 bg-amber-50/90 dark:bg-amber-950/30 shadow-lg -translate-y-1'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-amber-300 hover:-translate-y-0.5 hover:shadow-md'
                    } ${isWaving ? 'scale-[1.04]' : ''}`}
                  >
                    {/* Interactive Photo Container */}
                    <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-amber-100 dark:bg-slate-700 mb-2.5">
                      {!imgErrors[avatar.id] ? (
                        <img
                          src={avatar.image}
                          alt={`${avatar.name}: ${avatar.meaningSpanish}`}
                          referrerPolicy="no-referrer"
                          onError={() => setImgErrors(prev => ({ ...prev, [avatar.id]: true }))}
                          className={`w-full h-full object-cover transition-transform duration-300 ${
                            isSelected ? 'scale-105' : 'group-hover:scale-105'
                          }`}
                        />
                      ) : (
                        <div
                          className="w-full h-full flex items-center justify-center text-3xl font-extrabold text-white"
                          style={{ backgroundColor: avatar.accentColor }}
                        >
                          {avatar.name.charAt(0)}
                        </div>
                      )}

                      {/* Audio / Selection Overlay Indicator */}
                      <div className="absolute top-2 right-2 flex items-center gap-1">
                        {isSelected ? (
                          <span className="w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center shadow">
                            <Check className="w-4 h-4 stroke-[3]" />
                          </span>
                        ) : (
                          <span className="w-7 h-7 rounded-full bg-black/45 text-white flex items-center justify-center opacity-85 group-hover:opacity-100 transition">
                            <Volume2 className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>

                      {/* Animated greeting caption on active card */}
                      {isSelected && (
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent p-2 text-white">
                          <span className="text-[11px] font-bold block leading-tight">
                            {lang === 'quechua' ? '¡Allinllanchu!' : '¡Hola!'}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Name & Mascot Title */}
                    <div className="px-0.5 space-y-0.5">
                      <span className="text-base font-extrabold text-slate-900 dark:text-white block truncate">
                        {avatar.name}
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block leading-snug font-['Plus_Jakarta_Sans']">
                        {avatar.meaningSpanish}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Custom Name Input & Optional Custom Photo Upload */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end bg-slate-50 dark:bg-slate-800/70 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div className="lg:col-span-7 space-y-1.5">
                <label
                  htmlFor="child-custom-name"
                  className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-200"
                >
                  <User className="w-4 h-4 text-amber-600" />
                  <span>¿Prefieres escribir tu propio nombre?</span>
                </label>
                <input
                  id="child-custom-name"
                  type="text"
                  maxLength={24}
                  value={childName}
                  onChange={e => {
                    setChildName(e.target.value);
                    setHasTypedCustomName(true);
                  }}
                  placeholder="Escribe aquí cómo te gustaría llamarte..."
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 focus:border-amber-500 outline-none text-base font-bold text-slate-900 dark:text-white"
                />
              </div>

              <div className="lg:col-span-5 grid grid-cols-2 sm:flex sm:flex-nowrap items-center gap-2.5 sm:gap-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleUploadCustomPhoto}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full sm:flex-1 px-3 sm:px-4 py-3 min-h-[44px] rounded-xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 hover:border-amber-400 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer whitespace-nowrap"
                >
                  <Camera className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{customImage ? 'Cambiar foto' : 'Subir foto'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    audioService.playPop();
                    setStep(2);
                  }}
                  className="w-full sm:w-auto px-4 sm:px-6 py-3 min-h-[44px] rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-sm shadow-md active:scale-95 transition flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                >
                  <span>Siguiente</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6 sm:space-y-8">
            {/* Step 2 Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-b border-slate-100 dark:border-slate-800 pb-4 sm:pb-5">
              <div>
                <p className="text-xs font-bold text-amber-700 dark:text-amber-400">
                  Último paso para empezar a jugar
                </p>
                <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-0.5 leading-tight">
                  ¡Hola, {displayName}! ¿En qué idioma quieres aprender?
                </h2>
              </div>

              <button
                type="button"
                onClick={() => {
                  audioService.playPop();
                  setStep(1);
                }}
                className="self-start sm:self-auto px-4 py-2.5 min-h-[44px] rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer whitespace-nowrap"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Cambiar nombre o foto</span>
              </button>
            </div>

            {/* Language Selection */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-200">
                <Globe className="w-4 h-4 text-amber-600" />
                <span>Elige tu idioma favorito:</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  type="button"
                  onClick={() => {
                    audioService.playPop();
                    setLang('quechua');
                    setDialect('chanka');
                    audioService.speakQuechua(`Allinllanchu ${displayName}`, 'chanka');
                  }}
                  className={`p-5 rounded-3xl border-2 text-left transition cursor-pointer ${
                    lang === 'quechua' && dialect === 'chanka'
                      ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/30 shadow-md'
                      : 'border-slate-200 dark:border-slate-700 hover:border-amber-300 bg-white dark:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">🇵🇪</span>
                    {lang === 'quechua' && dialect === 'chanka' && (
                      <Check className="w-5 h-5 text-amber-600" />
                    )}
                  </div>
                  <span className="font-extrabold text-lg text-slate-900 dark:text-white block">
                    Quechua Chanka
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block mt-1 font-['Plus_Jakarta_Sans']">
                    Ayacucho · Apurímac · Huancavelica
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    audioService.playPop();
                    setLang('quechua');
                    setDialect('collao');
                    audioService.speakQuechua(`Napaykullayki ${displayName}`, 'collao');
                  }}
                  className={`p-5 rounded-3xl border-2 text-left transition cursor-pointer ${
                    lang === 'quechua' && dialect === 'collao'
                      ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/30 shadow-md'
                      : 'border-slate-200 dark:border-slate-700 hover:border-amber-300 bg-white dark:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">🏔️</span>
                    {lang === 'quechua' && dialect === 'collao' && (
                      <Check className="w-5 h-5 text-amber-600" />
                    )}
                  </div>
                  <span className="font-extrabold text-lg text-slate-900 dark:text-white block">
                    Quechua Collao
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block mt-1 font-['Plus_Jakarta_Sans']">
                    Cusco · Puno · Arequipa
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    audioService.playPop();
                    setLang('spanish');
                    audioService.speakSpanish(`¡Hola ${displayName}! Aprenderemos quechua jugando.`);
                  }}
                  className={`p-5 rounded-3xl border-2 text-left transition cursor-pointer ${
                    lang === 'spanish'
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 shadow-md'
                      : 'border-slate-200 dark:border-slate-700 hover:border-emerald-300 bg-white dark:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">📚</span>
                    {lang === 'spanish' && <Check className="w-5 h-5 text-emerald-600" />}
                  </div>
                  <span className="font-extrabold text-lg text-slate-900 dark:text-white block">
                    Español / Castellano
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block mt-1 font-['Plus_Jakarta_Sans']">
                    Aprende quechua desde el español con juegos
                  </span>
                </button>
              </div>
            </div>

            {/* Child Preview & Enter App CTA */}
            <div className="bg-amber-50/70 dark:bg-slate-800/80 rounded-3xl p-5 border border-amber-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={activeAvatarImage}
                  alt={displayName}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-400 shadow-sm shrink-0"
                />
                <div>
                  <span className="text-xs font-bold text-amber-700 dark:text-amber-400 block">
                    ¡Todo listo para jugar!
                  </span>
                  <strong className="text-lg font-extrabold text-slate-900 dark:text-white block">
                    {displayName}
                  </strong>
                  <span className="text-xs text-slate-600 dark:text-slate-300 font-['Plus_Jakarta_Sans']">
                    {lang === 'quechua'
                      ? `Idioma: Quechua (${dialect === 'chanka' ? 'Chanka' : 'Collao'})`
                      : 'Idioma: Español'}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleFinishOnboarding}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-base sm:text-lg shadow-lg active:scale-95 transition flex items-center justify-center gap-2.5 cursor-pointer whitespace-nowrap shrink-0"
              >
                <Sparkles className="w-5 h-5" />
                <span>
                  {lang === 'quechua' ? '¡Pukllasunchis! (Entrar)' : '¡Entrar a jugar!'}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Subtle Footer */}
      <div className="max-w-5xl w-full mx-auto pt-4 text-center text-xs text-slate-500 dark:text-slate-400 font-['Plus_Jakarta_Sans']">
        Yachay Kids · Inclusión educativa y lingüística para niños quechuahablantes del Perú · 100% Offline
      </div>
    </div>
  );
};
