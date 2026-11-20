import React, { useState, useMemo, useEffect } from 'react';
import { AppLanguage, QuechuaDialect, PictogramItem } from '../../types';
import { PICTOGRAMS_DATA } from '../../data/pictogramsData';
import { audioService } from '../../services/audioService';
import { useUserProfile } from '../../context/UserProfileContext';
import { PictogramDrawing } from '../icons/PictogramDrawing';
import confetti from 'canvas-confetti';
import {
  ChevronLeft,
  Volume2,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  Award,
  Link2,
} from 'lucide-react';

interface WordMatchGameProps {
  appLang: AppLanguage;
  dialect: QuechuaDialect;
  onBackToHub: () => void;
}

const MATCHABLE_CATEGORIES = ['animales', 'escuela', 'naturaleza', 'alimentos', 'cuerpo', 'familia'] as const;

const shuffleArray = <T,>(arr: T[]): T[] => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

export const WordMatchGame: React.FC<WordMatchGameProps> = ({
  appLang,
  dialect,
  onBackToHub,
}) => {
  const { profile, awardStar } = useUserProfile();
  const [pairCount, setPairCount] = useState<3 | 4>(3);
  const [roundNumber, setRoundNumber] = useState(1);
  const [score, setScore] = useState(0);

  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [draggedImageId, setDraggedImageId] = useState<string | null>(null);
  const [dragOverWordId, setDragOverWordId] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [wrongTargetId, setWrongTargetId] = useState<string | null>(null);

  const roundItems = useMemo(() => {
    const catIdx = (roundNumber - 1) % MATCHABLE_CATEGORIES.length;
    const category = MATCHABLE_CATEGORIES[catIdx];
    const pool = PICTOGRAMS_DATA.filter(p => p.category === category);
    const chosen = shuffleArray(pool).slice(0, pairCount);
    return {
      category,
      images: shuffleArray(chosen),
      words: shuffleArray(chosen),
    };
  }, [roundNumber, pairCount]);

  const speakItem = (item: PictogramItem) => {
    const qWord =
      dialect === 'chanka' && item.name.dialectNotes?.chanka
        ? item.name.dialectNotes.chanka
        : dialect === 'collao' && item.name.dialectNotes?.collao
        ? item.name.dialectNotes.collao
        : item.name.quechua;

    if (appLang === 'quechua') {
      audioService.speakQuechua(qWord, dialect);
    } else {
      audioService.speakSpanish(item.name.spanish);
    }
  };

  useEffect(() => {
    setSelectedImageId(null);
    setDraggedImageId(null);
    setDragOverWordId(null);
    setMatchedIds([]);
    setWrongTargetId(null);
  }, [roundNumber, pairCount]);

  const tryMatch = (imageId: string, wordId: string) => {
    if (matchedIds.includes(imageId) || matchedIds.includes(wordId)) return;

    if (imageId === wordId) {
      const nextMatched = [...matchedIds, imageId];
      setMatchedIds(nextMatched);
      setSelectedImageId(null);
      setDraggedImageId(null);
      setDragOverWordId(null);
      setScore(s => s + 1);
      audioService.playSuccessSound();

      const matchedItem = roundItems.images.find(i => i.id === imageId);
      if (matchedItem) {
        setTimeout(() => speakItem(matchedItem), 180);
      }

      if (nextMatched.length === roundItems.images.length) {
        awardStar(`word-match-r${roundNumber}`);
        confetti({
          particleCount: 70,
          spread: 75,
          origin: { y: 0.6 },
        });
      }
    } else {
      audioService.playErrorSound();
      setWrongTargetId(wordId);
      setTimeout(() => setWrongTargetId(null), 600);
    }
  };

  const isRoundComplete = matchedIds.length === roundItems.images.length;

  const categoryLabels: Record<string, string> = {
    animales: appLang === 'quechua' ? 'Uywakuna (Animales)' : 'Animales',
    escuela: appLang === 'quechua' ? 'Yachaywasi (Escuela)' : 'Escuela',
    naturaleza: appLang === 'quechua' ? 'Pachamama (Naturaleza)' : 'Naturaleza',
    alimentos: appLang === 'quechua' ? 'Mikhunakuna (Alimentos)' : 'Alimentos',
    cuerpo: appLang === 'quechua' ? 'Uku kurku (Cuerpo)' : 'Cuerpo humano',
    familia: appLang === 'quechua' ? 'Ayllu (Familia)' : 'La Familia',
  };

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-800 p-3.5 sm:p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
        <button
          onClick={onBackToHub}
          className="flex items-center gap-2 min-h-[40px] text-sm font-bold text-amber-700 dark:text-amber-400 hover:text-amber-800 transition cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 shrink-0" />
          <span>{appLang === 'quechua' ? 'Kutiy pukllaykunaman' : 'Volver a juegos'}</span>
        </button>

        <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-slate-900 p-1 rounded-xl border border-amber-200 dark:border-slate-700">
          <button
            onClick={() => {
              audioService.playPop();
              setPairCount(3);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              pairCount === 3
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Fácil (3 parejas)
          </button>
          <button
            onClick={() => {
              audioService.playPop();
              setPairCount(4);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              pairCount === 4
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Reto (4 parejas)
          </button>
        </div>
      </div>

      {/* Main Board */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-4 sm:p-7 shadow-sm border border-slate-200 dark:border-slate-700 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200 text-xs font-extrabold">
              <Link2 className="w-3.5 h-3.5" />
              {categoryLabels[roundItems.category]}
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-['Fredoka'] mt-2">
              {appLang === 'quechua'
                ? 'Rikchayta sutinwan tinkuchiy'
                : 'Une cada imagen con su nombre'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {profile.name}, toca un dibujo (o arrástralo) y llévalo a su nombre correcto.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
              <Award className="w-4 h-4" />
              <span>Aciertos: {score}</span>
            </div>
            <button
              onClick={() => {
                audioService.playPop();
                setRoundNumber(r => r + 1);
              }}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-amber-100 text-slate-700 dark:text-slate-200 transition cursor-pointer"
              title="Cambiar dibujos"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Two Columns: Images (Left) & Words (Right) */}
        <div className="grid grid-cols-2 gap-3 sm:gap-6 items-stretch">
          {/* Images column */}
          <div className="space-y-3">
            <p className="text-xs font-extrabold uppercase tracking-wide text-slate-500 dark:text-slate-400 text-center">
              1. Dibujos
            </p>
            {roundItems.images.map(item => {
              const isMatched = matchedIds.includes(item.id);
              const isSelected = selectedImageId === item.id;

              return (
                <div
                  key={item.id}
                  draggable={!isMatched}
                  onDragStart={() => {
                    setDraggedImageId(item.id);
                    setSelectedImageId(item.id);
                  }}
                  onDragEnd={() => {
                    setDraggedImageId(null);
                    setDragOverWordId(null);
                  }}
                  onClick={() => {
                    if (isMatched) return;
                    audioService.playPop();
                    setSelectedImageId(prev => (prev === item.id ? null : item.id));
                    speakItem(item);
                  }}
                  role="button"
                  tabIndex={0}
                  className={`relative rounded-2xl p-3 sm:p-4 border-2 transition-all flex flex-col items-center justify-center min-h-[104px] sm:min-h-[120px] select-none ${
                    isMatched
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 opacity-75 cursor-default'
                      : isSelected
                      ? 'bg-amber-50 dark:bg-amber-950/50 border-amber-500 ring-4 ring-amber-300/60 scale-[1.03] shadow-md cursor-grab active:cursor-grabbing'
                      : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-700 hover:border-amber-400 cursor-grab active:cursor-grabbing active:scale-95'
                  }`}
                >
                  <PictogramDrawing
                    drawing={item.svgDrawing}
                    className="w-16 h-16 sm:w-20 sm:h-20"
                  />
                  {isMatched && (
                    <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-extrabold text-emerald-700 dark:text-emerald-300">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      ¡Listo!
                    </span>
                  )}
                  {isSelected && !isMatched && (
                    <span className="mt-1 text-[11px] font-extrabold text-amber-700 dark:text-amber-300 animate-pulse">
                      Ahora toca su nombre →
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Names column */}
          <div className="space-y-3">
            <p className="text-xs font-extrabold uppercase tracking-wide text-slate-500 dark:text-slate-400 text-center">
              2. Nombres
            </p>
            {roundItems.words.map(item => {
              const isMatched = matchedIds.includes(item.id);
              const isDragTarget = dragOverWordId === item.id;
              const isWrong = wrongTargetId === item.id;
              const qWord =
                dialect === 'chanka' && item.name.dialectNotes?.chanka
                  ? item.name.dialectNotes.chanka
                  : dialect === 'collao' && item.name.dialectNotes?.collao
                  ? item.name.dialectNotes.collao
                  : item.name.quechua;

              return (
                <div
                  key={item.id}
                  onDragOver={e => {
                    if (!isMatched) {
                      e.preventDefault();
                      setDragOverWordId(item.id);
                    }
                  }}
                  onDragLeave={() => setDragOverWordId(null)}
                  onDrop={e => {
                    e.preventDefault();
                    setDragOverWordId(null);
                    if (draggedImageId) {
                      tryMatch(draggedImageId, item.id);
                    }
                  }}
                  onClick={() => {
                    if (isMatched) {
                      speakItem(item);
                      return;
                    }
                    if (selectedImageId) {
                      tryMatch(selectedImageId, item.id);
                    } else {
                      audioService.playPop();
                      speakItem(item);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  className={`rounded-2xl p-3 sm:p-4 border-2 transition-all flex items-center justify-between gap-2 min-h-[104px] sm:min-h-[120px] cursor-pointer ${
                    isMatched
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-100'
                      : isWrong
                      ? 'bg-red-50 dark:bg-red-950/50 border-red-500 animate-pulse'
                      : isDragTarget
                      ? 'bg-amber-100 dark:bg-amber-900/50 border-amber-500 scale-[1.03] shadow-md'
                      : selectedImageId
                      ? 'bg-white dark:bg-slate-800 border-dashed border-amber-400 hover:bg-amber-50 active:scale-95'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-amber-300 active:scale-95'
                  }`}
                >
                  <div className="min-w-0 text-left">
                    <span className="block text-base sm:text-xl font-extrabold font-['Fredoka'] text-slate-900 dark:text-white truncate">
                      {appLang === 'quechua' ? qWord : item.name.spanish}
                    </span>
                    <span className="block text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 truncate">
                      {appLang === 'quechua' ? item.name.spanish : qWord}
                    </span>
                    {isMatched && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        ¡Correcto!
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={e => {
                      e.stopPropagation();
                      speakItem(item);
                    }}
                    className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0 hover:bg-amber-200 transition cursor-pointer"
                    aria-label={`Escuchar ${item.name.spanish}`}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Round Complete Banner */}
        {isRoundComplete && (
          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border-2 border-emerald-400 text-center space-y-3 animate-in fade-in">
            <div className="flex items-center justify-center gap-2 text-emerald-800 dark:text-emerald-200 font-extrabold text-base sm:text-lg">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>
                {appLang === 'quechua'
                  ? `¡Kusa, ${profile.name}! Llapan rikchaykunata tinkuchirqanki.`
                  : `¡Excelente, ${profile.name}! Uniste todas las imágenes con su nombre.`}
              </span>
            </div>
            <button
              onClick={() => {
                audioService.playPop();
                setRoundNumber(r => r + 1);
              }}
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md active:scale-95 transition cursor-pointer"
            >
              {appLang === 'quechua' ? 'Qatiqnin ronda (Siguiente)' : '¡Jugar otra ronda!'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
