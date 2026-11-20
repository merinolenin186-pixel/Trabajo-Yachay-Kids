import React, { useState, useMemo } from 'react';
import { AppLanguage, QuechuaDialect } from '../../types';
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
  Repeat,
} from 'lucide-react';

interface SeriesPatternGameProps {
  appLang: AppLanguage;
  dialect: QuechuaDialect;
  onBackToHub: () => void;
}

interface PatternStep {
  id: string;
  drawing: string;
  labelEs: string;
  labelQu: string;
}

interface PatternChallenge {
  id: string;
  sequence: PatternStep[];
  answer: PatternStep;
  distractors: PatternStep[];
}

const ITEMS: Record<string, PatternStep> = {
  sun: { id: 'sun', drawing: 'sun', labelEs: 'Sol', labelQu: 'Inti' },
  moon: { id: 'moon', drawing: 'moon', labelEs: 'Luna', labelQu: 'Killa' },
  dog: { id: 'dog', drawing: 'dog', labelEs: 'Perro', labelQu: 'Allqo' },
  cat: { id: 'cat', drawing: 'cat', labelEs: 'Gato', labelQu: 'Misi' },
  red: { id: 'red', drawing: 'color-red', labelEs: 'Rojo', labelQu: 'Puka' },
  blue: { id: 'blue', drawing: 'color-blue', labelEs: 'Azul', labelQu: 'Anqas' },
  yellow: { id: 'yellow', drawing: 'color-yellow', labelEs: 'Amarillo', labelQu: 'Q\'ellu' },
  corn: { id: 'corn', drawing: 'corn', labelEs: 'Choclo', labelQu: 'Sara' },
  potato: { id: 'potato', drawing: 'potato', labelEs: 'Papa', labelQu: 'Papa' },
  book: { id: 'book', drawing: 'book', labelEs: 'Libro', labelQu: 'Liwru' },
  pencil: { id: 'pencil', drawing: 'pencil', labelEs: 'Lápiz', labelQu: 'Qillqana' },
  star: { id: 'star', drawing: 'star', labelEs: 'Estrella', labelQu: 'Quyllur' },
};

const PATTERNS: PatternChallenge[] = [
  {
    id: 'pat-1',
    sequence: [ITEMS.sun, ITEMS.moon, ITEMS.sun],
    answer: ITEMS.moon,
    distractors: [ITEMS.sun, ITEMS.star],
  },
  {
    id: 'pat-2',
    sequence: [ITEMS.dog, ITEMS.cat, ITEMS.dog],
    answer: ITEMS.cat,
    distractors: [ITEMS.dog, ITEMS.corn],
  },
  {
    id: 'pat-3',
    sequence: [ITEMS.red, ITEMS.blue, ITEMS.red],
    answer: ITEMS.blue,
    distractors: [ITEMS.red, ITEMS.yellow],
  },
  {
    id: 'pat-4',
    sequence: [ITEMS.corn, ITEMS.potato, ITEMS.corn],
    answer: ITEMS.potato,
    distractors: [ITEMS.corn, ITEMS.book],
  },
  {
    id: 'pat-5',
    sequence: [ITEMS.book, ITEMS.pencil, ITEMS.book],
    answer: ITEMS.pencil,
    distractors: [ITEMS.book, ITEMS.sun],
  },
  {
    id: 'pat-6',
    sequence: [ITEMS.yellow, ITEMS.yellow, ITEMS.red, ITEMS.yellow, ITEMS.yellow],
    answer: ITEMS.red,
    distractors: [ITEMS.yellow, ITEMS.blue],
  },
];

export const SeriesPatternGame: React.FC<SeriesPatternGameProps> = ({
  appLang,
  dialect,
  onBackToHub,
}) => {
  const { profile, awardStar } = useUserProfile();
  const [roundIdx, setRoundIdx] = useState(0);
  const [pickedId, setPickedId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [score, setScore] = useState(0);

  const challenge = PATTERNS[roundIdx % PATTERNS.length];

  const options = useMemo(() => {
    return [challenge.answer, ...challenge.distractors].sort(
      () => 0.5 - Math.random()
    );
  }, [roundIdx]);

  const handleChoose = (opt: PatternStep) => {
    if (feedback === 'correct') return;
    setPickedId(opt.id);
    if (appLang === 'quechua') {
      audioService.speakQuechua(opt.labelQu, dialect);
    } else {
      audioService.speakSpanish(opt.labelEs);
    }

    if (opt.id === challenge.answer.id) {
      setFeedback('correct');
      setScore(s => s + 1);
      audioService.playSuccessSound();
      awardStar(`series-${challenge.id}`);
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
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

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
          <Award className="w-4 h-4" />
          <span>Aciertos: {score}</span>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-4 sm:p-7 shadow-sm border border-slate-200 dark:border-slate-700 text-center space-y-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-200 text-xs font-extrabold">
            <Repeat className="w-3.5 h-3.5" />
            Secuencia lógica · Inicial
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-['Fredoka'] mt-2">
            {appLang === 'quechua'
              ? '¿Mayqentaq qatiqnin churana?'
              : '¿Qué dibujo sigue en la serie?'}
          </h2>
          <button
            onClick={() =>
              audioService.speakSpanish('Observa el orden de los dibujos y completa el que falta.')
            }
            className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 text-xs font-bold cursor-pointer"
          >
            <Volume2 className="w-4 h-4" />
            <span>Escuchar indicación</span>
          </button>
        </div>

        {/* Pattern Train */}
        <div className="p-4 sm:p-6 rounded-3xl bg-amber-50/70 dark:bg-slate-900/70 border-2 border-dashed border-amber-300 dark:border-slate-700 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
          {challenge.sequence.map((step, idx) => (
            <div
              key={`${step.id}-${idx}`}
              className="p-2.5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-amber-200 dark:border-slate-700 shadow-sm flex flex-col items-center"
            >
              <PictogramDrawing
                drawing={step.drawing}
                className="w-12 h-12 sm:w-16 sm:h-16"
              />
            </div>
          ))}

          {/* Missing Slot */}
          <div
            className={`w-[72px] h-[72px] sm:w-[88px] sm:h-[88px] rounded-2xl border-3 border-dashed flex items-center justify-center transition-all ${
              feedback === 'correct'
                ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 scale-105'
                : 'bg-white dark:bg-slate-800 border-amber-500'
            }`}
          >
            {feedback === 'correct' ? (
              <PictogramDrawing
                drawing={challenge.answer.drawing}
                className="w-12 h-12 sm:w-16 sm:h-16"
              />
            ) : (
              <span className="text-3xl font-black text-amber-500 font-['Fredoka']">?</span>
            )}
          </div>
        </div>

        {/* Options */}
        <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto">
          {options.map(opt => {
            const isPicked = pickedId === opt.id;
            const isCorrect = opt.id === challenge.answer.id;

            return (
              <button
                key={opt.id}
                disabled={feedback === 'correct'}
                onClick={() => handleChoose(opt)}
                className={`p-3.5 rounded-2xl border-2 flex flex-col items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer ${
                  isPicked
                    ? isCorrect
                      ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 ring-4 ring-emerald-300 scale-105'
                      : 'bg-red-50 dark:bg-red-950/50 border-red-500'
                    : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-700 hover:border-amber-400'
                }`}
              >
                <PictogramDrawing
                  drawing={opt.drawing}
                  className="w-14 h-14 sm:w-16 sm:h-16"
                />
                <span className="text-xs font-extrabold text-slate-800 dark:text-slate-100">
                  {appLang === 'quechua' ? opt.labelQu : opt.labelEs}
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
                    ¡Genial, {profile.name}! Completaste la serie con {challenge.answer.labelEs}.
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
                    <span>Siguiente serie</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/50 border border-amber-300 text-amber-800 dark:text-amber-200 text-sm font-bold inline-block">
                Repite en voz alta el orden de los dibujos para descubrir cuál sigue.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
