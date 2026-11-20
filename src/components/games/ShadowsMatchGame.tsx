import React, { useState, useMemo } from 'react';
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
  Award,
  Sparkles,
  Eye,
} from 'lucide-react';

interface ShadowsMatchGameProps {
  appLang: AppLanguage;
  dialect: QuechuaDialect;
  onBackToHub: () => void;
}

const SHADOW_POOL = PICTOGRAMS_DATA.filter(p =>
  ['animales', 'escuela', 'naturaleza', 'alimentos'].includes(p.category)
);

export const ShadowsMatchGame: React.FC<ShadowsMatchGameProps> = ({
  appLang,
  dialect,
  onBackToHub,
}) => {
  const { profile, awardStar } = useUserProfile();
  const [roundIdx, setRoundIdx] = useState(0);
  const [pickedId, setPickedId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [score, setScore] = useState(0);

  const { target, options } = useMemo(() => {
    const tgt = SHADOW_POOL[(roundIdx * 5) % SHADOW_POOL.length];
    const distractors = SHADOW_POOL.filter(p => p.id !== tgt.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    const opts = [tgt, ...distractors].sort(() => 0.5 - Math.random());
    return { target: tgt, options: opts };
  }, [roundIdx]);

  const speakItem = (item: PictogramItem) => {
    if (appLang === 'quechua') {
      audioService.speakQuechua(item.name.quechua, dialect);
    } else {
      audioService.speakSpanish(item.name.spanish);
    }
  };

  const handleSelect = (item: PictogramItem) => {
    if (feedback === 'correct') return;
    setPickedId(item.id);
    speakItem(item);

    if (item.id === target.id) {
      setFeedback('correct');
      setScore(s => s + 1);
      audioService.playSuccessSound();
      awardStar(`shadows-${target.id}`);
      confetti({ particleCount: 65, spread: 70, origin: { y: 0.6 } });
    } else {
      setFeedback('wrong');
      audioService.playErrorSound();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-800 p-3.5 sm:p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
        <button
          onClick={onBackToHub}
          className="flex items-center gap-2 min-h-[40px] text-sm font-bold text-amber-700 dark:text-amber-400 hover:text-amber-800 transition cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 shrink-0" />
          <span>{appLang === 'quechua' ? 'Kutiy pukllaykunaman' : 'Volver a juegos'}</span>
        </button>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
            <Award className="w-4 h-4" />
            <span>Aciertos: {score}</span>
          </div>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-4 sm:p-7 shadow-sm border border-slate-200 dark:border-slate-700 text-center space-y-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-200 text-xs font-extrabold">
            <Eye className="w-3.5 h-3.5" />
            Percepción visual · Inicial
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-['Fredoka'] mt-2">
            {appLang === 'quechua'
              ? '¿Mayqen rikchaypa llanthuntaq kay?'
              : '¿De quién es esta sombra?'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Observa la silueta oscura y toca el dibujo igualito.
          </p>
        </div>

        {/* Silhouette Stage */}
        <div className="flex justify-center">
          <div className="relative p-6 rounded-3xl bg-gradient-to-b from-amber-50 to-orange-50 dark:from-slate-900 dark:to-slate-900 border-2 border-dashed border-amber-300 dark:border-slate-700 shadow-inner">
            <div
              className={`transition-all duration-500 ${
                feedback === 'correct'
                  ? 'filter-none scale-110'
                  : 'brightness-0 opacity-85 dark:invert dark:opacity-90'
              }`}
            >
              <PictogramDrawing
                drawing={target.svgDrawing}
                className="w-32 h-32 sm:w-36 sm:h-36"
              />
            </div>
            {feedback === 'correct' && (
              <span className="mt-2 inline-block px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-extrabold shadow">
                ¡Es: {target.name.spanish} ({target.name.quechua})!
              </span>
            )}
          </div>
        </div>

        {/* Colorful Options */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto">
          {options.map(opt => {
            const isPicked = pickedId === opt.id;
            const isCorrect = opt.id === target.id;

            return (
              <button
                key={opt.id}
                disabled={feedback === 'correct'}
                onClick={() => handleSelect(opt)}
                className={`p-3.5 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition active:scale-95 cursor-pointer ${
                  isPicked
                    ? isCorrect
                      ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 ring-4 ring-emerald-300 scale-105'
                      : 'bg-red-50 dark:bg-red-950/50 border-red-500'
                    : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-700 hover:border-amber-400'
                }`}
              >
                <PictogramDrawing
                  drawing={opt.svgDrawing}
                  className="w-16 h-16 sm:w-20 sm:h-20"
                />
                <span className="text-xs font-extrabold text-slate-800 dark:text-slate-100">
                  {appLang === 'quechua' ? opt.name.quechua : opt.name.spanish}
                </span>
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {feedback && (
          <div className="space-y-3 animate-in fade-in">
            {feedback === 'correct' ? (
              <>
                <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 text-emerald-800 dark:text-emerald-200 text-sm font-bold inline-flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>
                    ¡Ojo de águila, {profile.name}! Era {target.name.spanish} ({target.name.quechua}).
                  </span>
                </div>
                <div>
                  <button
                    onClick={() => {
                      audioService.playPop();
                      setPickedId(null);
                      setFeedback(null);
                      setRoundIdx(r => r + 1);
                    }}
                    className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md inline-flex items-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Siguiente sombra</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/50 border border-amber-300 text-amber-800 dark:text-amber-200 text-sm font-bold inline-block">
                Mira bien la forma de la sombra e intenta con otro dibujito.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
