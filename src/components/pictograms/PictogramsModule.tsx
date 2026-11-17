import React, { useState, useEffect } from 'react';
import { AppLanguage, QuechuaDialect, PictogramCategory, PictogramItem } from '../../types';
import { PICTOGRAMS_DATA } from '../../data/pictogramsData';
import { audioService } from '../../services/audioService';
import {
  Volume2,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
} from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useAdmin } from '../../context/AdminContext';
import { useUserProfile } from '../../context/UserProfileContext';
import {
  LlamaIllustration,
  CondorIllustration,
  CuyIllustration,
  SunIllustration,
  PotatoIllustration,
  CornIllustration,
  RainbowIllustration,
  PachaGirlIllustration,
} from '../icons/AppIllustrations';
import {
  DogIllustration,
  CatIllustration,
  PumaIllustration,
  QuinuaIllustration,
  ChunoIllustration,
  LucumaIllustration,
  OllucoIllustration,
  ColorSplashIllustration,
  NumberPictogramIllustration,
  MotherIllustration,
  FatherIllustration,
  BabyIllustration,
  GrandmotherIllustration,
  GrandfatherIllustration,
  HeadIllustration,
  EyeIllustration,
  EarIllustration,
  MouthIllustration,
  HandIllustration,
  FootIllustration,
  MoonIllustration,
  StarIllustration,
  MountainIllustration,
  RiverIllustration,
  SchoolIllustration,
  PencilIllustration,
  BookIllustration,
  ChairIllustration,
  TableIllustration,
  BackpackIllustration,
  EmotionIllustration,
  SleepIllustration,
  EatIllustration,
  PlayIllustration,
  StudyIllustration,
  DanceIllustration,
  WashHandsIllustration,
} from '../icons/PictogramIllustrations';

interface PictogramsModuleProps {
  appLang: AppLanguage;
  dialect: QuechuaDialect;
}

export const PictogramsModule: React.FC<PictogramsModuleProps> = ({
  appLang,
  dialect,
}) => {
  const [activeCategory, setActiveCategory] = useState<PictogramCategory>('animales');
  const [fullscreenItem, setFullscreenItem] = useState<PictogramItem | null>(null);
  const { setIsCaaModalOpen } = useAccessibility();
  const { hiddenOptions, customTexts } = useAdmin();
  const { profile } = useUserProfile();
  const { cardScale, showPhonetics, showDialectNotes } = profile.config;

  const categories: { id: PictogramCategory; quechua: string; spanish: string; icon: string }[] = [
    { id: 'animales', quechua: 'Uywakuna', spanish: 'Animales', icon: '🦙' },
    { id: 'alimentos', quechua: 'Mikhunakuna', spanish: 'Alimentos', icon: '🌽' },
    { id: 'colores', quechua: 'Llimpikuna', spanish: 'Colores', icon: '🎨' },
    { id: 'numeros', quechua: 'Yupaykuna', spanish: 'Números', icon: '🔢' },
    { id: 'familia', quechua: 'Ayllu', spanish: 'Familia', icon: '👨‍👩‍👧' },
    { id: 'cuerpo', quechua: 'Uku kurku', spanish: 'Partes del cuerpo', icon: '👂' },
    { id: 'naturaleza', quechua: 'Pachamama', spanish: 'Naturaleza', icon: '☀️' },
    { id: 'escuela', quechua: 'Yachaywasi', spanish: 'Escuela', icon: '✏️' },
    { id: 'emociones', quechua: 'Sonqo / Emociones', spanish: 'Emociones', icon: '😊' },
    { id: 'actividades', quechua: 'Ruranakuna', spanish: 'Actividades', icon: '🏃' },
  ];

  const visibleCategories = categories.filter(
    cat => !hiddenOptions.pictogramCategories.includes(cat.id)
  );

  useEffect(() => {
    if (
      visibleCategories.length > 0 &&
      !visibleCategories.some(cat => cat.id === activeCategory)
    ) {
      setActiveCategory(visibleCategories[0].id);
    }
  }, [hiddenOptions.pictogramCategories, activeCategory]);

  const filteredItems = PICTOGRAMS_DATA.filter(
    item =>
      item.category === activeCategory &&
      !hiddenOptions.pictogramIds.includes(item.id)
  );

  const playQuechua = (item: PictogramItem) => {
    const word =
      dialect === 'chanka' && item.name.dialectNotes?.chanka
        ? item.name.dialectNotes.chanka
        : dialect === 'collao' && item.name.dialectNotes?.collao
        ? item.name.dialectNotes.collao
        : item.name.quechua;
    audioService.speakQuechua(word, dialect);
  };

  const playSpanish = (item: PictogramItem) => {
    audioService.speakSpanish(item.name.spanish);
  };

  const renderPictogramDrawing = (svgDrawing: string, sizeClass = 'w-20 h-20') => {
    switch (svgDrawing) {
      // Animales
      case 'llama':
        return <LlamaIllustration className={sizeClass} />;
      case 'condor':
        return <CondorIllustration className={sizeClass} />;
      case 'dog':
        return <DogIllustration className={sizeClass} />;
      case 'cat':
        return <CatIllustration className={sizeClass} />;
      case 'cuy':
        return <CuyIllustration className={sizeClass} />;
      case 'puma':
        return <PumaIllustration className={sizeClass} />;

      // Alimentos
      case 'potato':
        return <PotatoIllustration className={sizeClass} />;
      case 'potato-dark':
        return <ChunoIllustration className={sizeClass} />;
      case 'corn':
        return <CornIllustration className={sizeClass} />;
      case 'wheat':
        return <QuinuaIllustration className={sizeClass} />;
      case 'fruit':
        return <LucumaIllustration className={sizeClass} />;
      case 'olluco':
        return <OllucoIllustration className={sizeClass} />;

      // Colores
      case 'color-red':
        return <ColorSplashIllustration color="#ef4444" border="#b91c1c" className={sizeClass} />;
      case 'color-green':
        return <ColorSplashIllustration color="#10b981" border="#047857" className={sizeClass} />;
      case 'color-blue':
        return <ColorSplashIllustration color="#0284c7" border="#0369a1" className={sizeClass} />;
      case 'color-yellow':
        return <ColorSplashIllustration color="#facc15" border="#ca8a04" className={sizeClass} />;
      case 'color-white':
        return <ColorSplashIllustration color="#f8fafc" border="#94a3b8" className={sizeClass} />;
      case 'color-black':
        return <ColorSplashIllustration color="#1e293b" border="#020617" className={sizeClass} />;

      // Números
      case 'num-1':
        return <NumberPictogramIllustration num={1} color="#0284c7" className={sizeClass} />;
      case 'num-2':
        return <NumberPictogramIllustration num={2} color="#10b981" className={sizeClass} />;
      case 'num-3':
        return <NumberPictogramIllustration num={3} color="#f59e0b" className={sizeClass} />;
      case 'num-4':
        return <NumberPictogramIllustration num={4} color="#ec4899" className={sizeClass} />;
      case 'num-5':
        return <NumberPictogramIllustration num={5} color="#8b5cf6" className={sizeClass} />;
      case 'num-10':
        return <NumberPictogramIllustration num={10} color="#d97706" className={sizeClass} />;

      // Familia
      case 'mother':
        return <MotherIllustration className={sizeClass} />;
      case 'father':
        return <FatherIllustration className={sizeClass} />;
      case 'baby':
        return <BabyIllustration className={sizeClass} />;
      case 'grandmother':
        return <GrandmotherIllustration className={sizeClass} />;
      case 'grandfather':
        return <GrandfatherIllustration className={sizeClass} />;
      case 'sister':
        return <PachaGirlIllustration className={sizeClass} />;

      // Partes del cuerpo
      case 'head':
        return <HeadIllustration className={sizeClass} />;
      case 'eye':
        return <EyeIllustration className={sizeClass} />;
      case 'ear':
        return <EarIllustration className={sizeClass} />;
      case 'mouth':
        return <MouthIllustration className={sizeClass} />;
      case 'hand':
        return <HandIllustration className={sizeClass} />;
      case 'foot':
        return <FootIllustration className={sizeClass} />;

      // Naturaleza
      case 'sun':
        return <SunIllustration className={sizeClass} />;
      case 'moon':
        return <MoonIllustration className={sizeClass} />;
      case 'star':
        return <StarIllustration className={sizeClass} />;
      case 'mountain':
        return <MountainIllustration className={sizeClass} />;
      case 'river':
        return <RiverIllustration className={sizeClass} />;
      case 'rainbow':
        return <RainbowIllustration className={sizeClass} />;

      // Escuela
      case 'school':
        return <SchoolIllustration className={sizeClass} />;
      case 'pencil':
        return <PencilIllustration className={sizeClass} />;
      case 'book':
        return <BookIllustration className={sizeClass} />;
      case 'chair':
        return <ChairIllustration className={sizeClass} />;
      case 'table':
        return <TableIllustration className={sizeClass} />;
      case 'backpack':
        return <BackpackIllustration className={sizeClass} />;

      // Emociones
      case 'smile':
        return <EmotionIllustration mood="happy" className={sizeClass} />;
      case 'frown':
        return <EmotionIllustration mood="sad" className={sizeClass} />;
      case 'angry':
        return <EmotionIllustration mood="angry" className={sizeClass} />;
      case 'surprise':
        return <EmotionIllustration mood="scared" className={sizeClass} />;
      case 'calm':
        return <EmotionIllustration mood="calm" className={sizeClass} />;

      // Actividades
      case 'bed':
        return <SleepIllustration className={sizeClass} />;
      case 'utensils':
        return <EatIllustration className={sizeClass} />;
      case 'play':
        return <PlayIllustration className={sizeClass} />;
      case 'study':
        return <StudyIllustration className={sizeClass} />;
      case 'dance':
        return <DanceIllustration className={sizeClass} />;
      case 'wash':
        return <WashHandsIllustration className={sizeClass} />;

      default:
        return <StarIllustration className={sizeClass} />;
    }
  };

  const handleNextInFullscreen = () => {
    if (!fullscreenItem) return;
    const curIdx = filteredItems.findIndex(i => i.id === fullscreenItem.id);
    const nextIdx = (curIdx + 1) % filteredItems.length;
    const nextItem = filteredItems[nextIdx];
    setFullscreenItem(nextItem);
    playQuechua(nextItem);
  };

  const handlePrevInFullscreen = () => {
    if (!fullscreenItem) return;
    const curIdx = filteredItems.findIndex(i => i.id === fullscreenItem.id);
    const prevIdx = (curIdx - 1 + filteredItems.length) % filteredItems.length;
    const prevItem = filteredItems[prevIdx];
    setFullscreenItem(prevItem);
    playQuechua(prevItem);
  };

  return (
    <div className="space-y-6">
      {/* Banner CAA / Tablero de habla para personas no verbales */}
      <div className="bg-gradient-to-r from-teal-500 to-emerald-600 rounded-3xl p-4 sm:p-5 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl shrink-0">
            🗣️
          </div>
          <div>
            <h3 className="font-extrabold text-base sm:text-lg">
              {appLang === 'quechua' ? 'Rimay Taqi (Mana rimay atiqkunapaq)' : 'Tablero de Comunicación Aumentativa (CAA)'}
            </h3>
            <p className="text-xs text-teal-100 font-medium">
              {appLang === 'quechua'
                ? 'Ñit\'iy simikunata rimachinaykipaq quechua hinallataq castillanopi.'
                : 'Diseñado para niños y personas no verbales o con dificultades del habla: expresa necesidades con voz.'}
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            audioService.playPop();
            setIsCaaModalOpen(true);
          }}
          className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-white text-teal-800 font-black text-xs sm:text-sm hover:bg-teal-50 active:scale-95 transition shadow-sm flex items-center justify-center gap-2 shrink-0 cursor-pointer"
        >
          <MessageSquare className="w-4 h-4" />
          <span>{appLang === 'quechua' ? 'Tablerota kichay' : 'Abrir Tablero de Habla'}</span>
        </button>
      </div>

      {/* Category selector slider */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3 px-1">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
            {appLang === 'quechua'
              ? `Katiguryakuna (${visibleCategories.length} categorías):`
              : `Categorías de pictogramas (${visibleCategories.length}):`}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {appLang === 'quechua'
              ? customTexts.pictogramsDescription.quechua
              : customTexts.pictogramsDescription.spanish}
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {visibleCategories.map(cat => {
            const isCur = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  audioService.playPop();
                  setActiveCategory(cat.id);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition whitespace-nowrap shrink-0 active:scale-95 ${
                  isCur
                    ? 'bg-amber-500 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-amber-100'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{appLang === 'quechua' ? cat.quechua : cat.spanish}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Pictograms Grid (Adapts density & details cleanly on phones and desktop) */}
      <div
        className={`grid gap-3 sm:gap-4 ${
          cardScale === 'large'
            ? 'grid-cols-2 lg:grid-cols-3'
            : cardScale === 'compact'
            ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5'
            : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
        }`}
      >
        {filteredItems.map(item => (
          <div
            key={item.id}
            className={`group relative bg-white dark:bg-slate-800 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-700 hover:border-amber-400 dark:hover:border-amber-500 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center justify-between ${
              cardScale === 'large' ? 'p-3.5 sm:p-6' : 'p-3 sm:p-5'
            }`}
          >
            {/* Expand trigger */}
            <button
              onClick={() => {
                audioService.playPop();
                setFullscreenItem(item);
                playQuechua(item);
              }}
              className="absolute top-2.5 right-2.5 p-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-500 hover:text-amber-600 transition cursor-pointer"
              title="Ver tarjeta grande"
              aria-label={`Ampliar ${item.name.spanish}`}
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>

            {/* Illustration */}
            <div
              onClick={() => playQuechua(item)}
              className={`flex items-center justify-center my-1.5 sm:my-2 cursor-pointer group-hover:scale-105 transition-transform ${
                cardScale === 'large' ? 'w-20 h-20 sm:w-28 sm:h-28' : 'w-16 h-16 sm:w-24 sm:h-24'
              }`}
            >
              {renderPictogramDrawing(
                item.svgDrawing,
                cardScale === 'large' ? 'w-16 h-16 sm:w-24 sm:h-24' : 'w-14 h-14 sm:w-20 sm:h-20'
              )}
            </div>

            {/* Titles & Syllables */}
            <div className="w-full my-1.5 sm:my-2 min-w-0">
              <h3
                className={`font-extrabold text-slate-900 dark:text-white font-['Fredoka'] truncate ${
                  cardScale === 'large' ? 'text-lg sm:text-2xl' : 'text-base sm:text-xl'
                }`}
              >
                {item.name.quechua}
              </h3>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                {item.name.spanish}
              </p>
              {showPhonetics && item.syllables && (
                <span className="text-[11px] font-mono text-amber-700 dark:text-amber-400 block mt-1 truncate">
                  [{item.syllables}]
                </span>
              )}
              {showDialectNotes && item.name.dialectNotes && (
                <span className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 block mt-1 line-clamp-2">
                  Chanka: {item.name.dialectNotes.chanka || item.name.quechua} · Collao:{' '}
                  {item.name.dialectNotes.collao || item.name.quechua}
                </span>
              )}
            </div>

            {/* Dual Audio Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 mt-2 w-full pt-2 border-t border-slate-100 dark:border-slate-700/60">
              <button
                onClick={() => playQuechua(item)}
                className="flex items-center justify-center gap-1.5 py-2 min-h-[38px] px-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-sm active:scale-95 transition cursor-pointer"
                title="Pronunciación en quechua"
              >
                <Volume2 className="w-3.5 h-3.5 shrink-0" />
                <span>Quechua</span>
              </button>

              <button
                onClick={() => playSpanish(item)}
                className="flex items-center justify-center gap-1.5 py-2 min-h-[38px] px-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold text-xs active:scale-95 transition cursor-pointer"
                title="Pronunciación en español"
              >
                <Volume2 className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>Español</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* FULLSCREEN CARD MODAL */}
      {fullscreenItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-amber-400 text-center space-y-6">
            <button
              onClick={() => setFullscreenItem(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-200 hover:bg-slate-200 transition"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Giant Illustration */}
            <div className="py-4 flex items-center justify-center">
              {renderPictogramDrawing(fullscreenItem.svgDrawing, 'w-36 h-36')}
            </div>

            {/* Words */}
            <div className="space-y-1">
              <h2 className="text-4xl font-extrabold text-amber-950 dark:text-amber-200 font-['Fredoka']">
                {fullscreenItem.name.quechua}
              </h2>
              <p className="text-lg font-bold text-slate-600 dark:text-slate-300">
                {fullscreenItem.name.spanish}
              </p>
              {fullscreenItem.syllables && (
                <div className="inline-block px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-mono text-sm font-bold">
                  {fullscreenItem.syllables}
                </div>
              )}
            </div>

            {/* Pronunciation triggers */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => playQuechua(fullscreenItem)}
                className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md active:scale-95 transition"
              >
                <Volume2 className="w-5 h-5" />
                <span>Quechua</span>
              </button>
              <button
                onClick={() => playSpanish(fullscreenItem)}
                className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-800 dark:text-slate-100 font-bold text-sm shadow-sm active:scale-95 transition"
              >
                <Volume2 className="w-5 h-5 text-amber-600" />
                <span>Español</span>
              </button>
            </div>

            {/* Navigation Carousel */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
              <button
                onClick={handlePrevInFullscreen}
                className="flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400 hover:text-amber-800"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Anterior</span>
              </button>
              <span className="text-xs text-slate-400">
                {filteredItems.findIndex(i => i.id === fullscreenItem.id) + 1} de {filteredItems.length}
              </span>
              <button
                onClick={handleNextInFullscreen}
                className="flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400 hover:text-amber-800"
              >
                <span>Siguiente</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
