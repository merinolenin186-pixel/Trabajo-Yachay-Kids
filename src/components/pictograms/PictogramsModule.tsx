import React, { useState } from 'react';
import { AppLanguage, QuechuaDialect, PictogramCategory, PictogramItem } from '../../types';
import { PICTOGRAMS_DATA } from '../../data/pictogramsData';
import { audioService } from '../../services/audioService';
import {
  Volume2,
  Sparkles,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  MessageSquare,
} from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';
import {
  LlamaIllustration,
  CondorIllustration,
  CuyIllustration,
  SunIllustration,
  PotatoIllustration,
  CornIllustration,
  RainbowIllustration,
  ChaskiBoyIllustration,
  PachaGirlIllustration,
} from '../icons/AppIllustrations';

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

  const filteredItems = PICTOGRAMS_DATA.filter(item => item.category === activeCategory);

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
      case 'llama':
        return <LlamaIllustration className={sizeClass} />;
      case 'condor':
        return <CondorIllustration className={sizeClass} />;
      case 'cuy':
        return <CuyIllustration className={sizeClass} />;
      case 'potato':
      case 'potato-dark':
        return <PotatoIllustration className={sizeClass} />;
      case 'corn':
        return <CornIllustration className={sizeClass} />;
      case 'sun':
        return <SunIllustration className={sizeClass} />;
      case 'rainbow':
        return <RainbowIllustration className={sizeClass} />;
      case 'father':
      case 'school':
        return <ChaskiBoyIllustration className={sizeClass} />;
      case 'mother':
      case 'sister':
        return <PachaGirlIllustration className={sizeClass} />;
      case 'color-red':
        return <div className="w-16 h-16 rounded-full bg-red-500 shadow-md border-4 border-white" />;
      case 'color-green':
        return <div className="w-16 h-16 rounded-full bg-emerald-500 shadow-md border-4 border-white" />;
      case 'color-blue':
        return <div className="w-16 h-16 rounded-full bg-sky-500 shadow-md border-4 border-white" />;
      case 'color-yellow':
        return <div className="w-16 h-16 rounded-full bg-amber-400 shadow-md border-4 border-white" />;
      case 'color-white':
        return <div className="w-16 h-16 rounded-full bg-slate-100 shadow-md border-4 border-slate-300" />;
      case 'color-black':
        return <div className="w-16 h-16 rounded-full bg-slate-900 shadow-md border-4 border-slate-700" />;
      case 'num-1':
        return <span className="text-6xl font-black text-sky-600 font-['Fredoka']">1</span>;
      case 'num-2':
        return <span className="text-6xl font-black text-emerald-600 font-['Fredoka']">2</span>;
      case 'num-3':
        return <span className="text-6xl font-black text-amber-600 font-['Fredoka']">3</span>;
      case 'num-4':
        return <span className="text-6xl font-black text-pink-600 font-['Fredoka']">4</span>;
      case 'num-5':
        return <span className="text-6xl font-black text-purple-600 font-['Fredoka']">5</span>;
      case 'num-10':
        return <span className="text-6xl font-black text-orange-600 font-['Fredoka']">10</span>;
      case 'head':
        return <span className="text-5xl">👤</span>;
      case 'eye':
        return <span className="text-5xl">👀</span>;
      case 'ear':
        return <span className="text-5xl">👂</span>;
      case 'mouth':
        return <span className="text-5xl">👄</span>;
      case 'hand':
        return <span className="text-5xl">✋</span>;
      case 'foot':
        return <span className="text-5xl">🦶</span>;
      case 'pencil':
        return <span className="text-5xl">✏️</span>;
      case 'book':
        return <span className="text-5xl">📖</span>;
      case 'chair':
        return <span className="text-5xl">🪑</span>;
      case 'table':
        return <span className="text-5xl">🪵</span>;
      case 'backpack':
        return <span className="text-5xl">🎒</span>;
      case 'smile':
        return <span className="text-5xl">😄</span>;
      case 'frown':
        return <span className="text-5xl">😢</span>;
      case 'angry':
        return <span className="text-5xl">😠</span>;
      case 'surprise':
        return <span className="text-5xl">😮</span>;
      case 'calm':
        return <span className="text-5xl">😌</span>;
      case 'bed':
        return <span className="text-5xl">🛏️</span>;
      case 'utensils':
        return <span className="text-5xl">🥣</span>;
      case 'play':
        return <span className="text-5xl">⚽</span>;
      case 'study':
        return <span className="text-5xl">📚</span>;
      case 'dance':
        return <span className="text-5xl">💃</span>;
      case 'wash':
        return <span className="text-5xl">🧼</span>;
      case 'star':
        return <span className="text-5xl">⭐</span>;
      case 'moon':
        return <span className="text-5xl">🌙</span>;
      case 'mountain':
        return <span className="text-5xl">🏔️</span>;
      case 'river':
        return <span className="text-5xl">🌊</span>;
      case 'baby':
        return <span className="text-5xl">👶</span>;
      case 'grandmother':
        return <span className="text-5xl">👵</span>;
      case 'grandfather':
        return <span className="text-5xl">👴</span>;
      default:
        return <span className="text-5xl">✨</span>;
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
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-3 px-1">
          {appLang === 'quechua' ? 'Katiguryakuna (10 categorías):' : 'Categorías de pictogramas (10):'}
        </span>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {categories.map(cat => {
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

      {/* Pictograms Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredItems.map(item => (
          <div
            key={item.id}
            className="group relative bg-white dark:bg-slate-800 rounded-3xl p-5 border-2 border-slate-200 dark:border-slate-700 hover:border-amber-400 dark:hover:border-amber-500 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center justify-between"
          >
            {/* Expand trigger */}
            <button
              onClick={() => {
                audioService.playPop();
                setFullscreenItem(item);
                playQuechua(item);
              }}
              className="absolute top-3 right-3 p-1.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-400 hover:text-amber-600 transition"
              title="Ver tarjeta grande"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>

            {/* Illustration */}
            <div
              onClick={() => playQuechua(item)}
              className="w-24 h-24 flex items-center justify-center my-2 cursor-pointer group-hover:scale-105 transition-transform"
            >
              {renderPictogramDrawing(item.svgDrawing, 'w-20 h-20')}
            </div>

            {/* Titles & Syllables */}
            <div className="w-full my-2">
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white font-['Fredoka']">
                {item.name.quechua}
              </h3>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-0.5">
                {item.name.spanish}
              </p>
              {item.syllables && (
                <span className="text-[11px] font-mono text-amber-700 dark:text-amber-400 block mt-1">
                  [{item.syllables}]
                </span>
              )}
            </div>

            {/* Dual Audio Buttons */}
            <div className="flex items-center gap-2 mt-2 w-full pt-2 border-t border-slate-100 dark:border-slate-700/60">
              <button
                onClick={() => playQuechua(item)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-sm active:scale-95 transition"
                title="Pronunciación en quechua"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Quechua</span>
              </button>

              <button
                onClick={() => playSpanish(item)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold text-xs active:scale-95 transition"
                title="Pronunciación en español"
              >
                <Volume2 className="w-3.5 h-3.5 text-slate-500" />
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
