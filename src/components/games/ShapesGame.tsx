import React, { useState, useMemo } from 'react';
import { AppLanguage, QuechuaDialect } from '../../types';
import { audioService } from '../../services/audioService';
import { useUserProfile } from '../../context/UserProfileContext';
import confetti from 'canvas-confetti';
import {
  ChevronLeft,
  Volume2,
  CheckCircle2,
  Award,
  Sparkles,
  Shapes,
} from 'lucide-react';

interface ShapesGameProps {
  appLang: AppLanguage;
  dialect: QuechuaDialect;
  onBackToHub: () => void;
}

interface ShapeItem {
  id: string;
  quechua: string;
  spanish: string;
  exampleEs: string;
  exampleQu: string;
  color: string;
  renderSvg: (size?: string) => React.ReactNode;
}

const SHAPES_LIST: ShapeItem[] = [
  {
    id: 'circle',
    quechua: 'Muyu',
    spanish: 'Círculo',
    exampleEs: 'Como el Sol redondo y la pelota',
    exampleQu: 'Inti hina muyu',
    color: '#ef4444',
    renderSvg: (size = 'w-24 h-24') => (
      <svg viewBox="0 0 100 100" className={size}>
        <circle cx="50" cy="50" r="38" fill="#ef4444" stroke="#991b1b" strokeWidth="4" />
        <circle cx="40" cy="43" r="4" fill="#ffffff" />
        <circle cx="60" cy="43" r="4" fill="#ffffff" />
        <path d="M 38 58 Q 50 68 62 58" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" fill="none" />
      </svg>
    ),
  },
  {
    id: 'square',
    quechua: 'Tawa k\'uchu',
    spanish: 'Cuadrado',
    exampleEs: 'Como una ventana o bloque de juego',
    exampleQu: 'Tawa pampa hina',
    color: '#0ea5e9',
    renderSvg: (size = 'w-24 h-24') => (
      <svg viewBox="0 0 100 100" className={size}>
        <rect x="14" y="14" width="72" height="72" rx="10" fill="#0ea5e9" stroke="#075985" strokeWidth="4" />
        <circle cx="38" cy="43" r="4" fill="#ffffff" />
        <circle cx="62" cy="43" r="4" fill="#ffffff" />
        <path d="M 38 59 Q 50 68 62 59" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" fill="none" />
      </svg>
    ),
  },
  {
    id: 'triangle',
    quechua: 'Kimsa k\'uchu',
    spanish: 'Triángulo',
    exampleEs: 'Como las montañas de los Andes',
    exampleQu: 'Urqu hina kimsa k\'uchu',
    color: '#f59e0b',
    renderSvg: (size = 'w-24 h-24') => (
      <svg viewBox="0 0 100 100" className={size}>
        <polygon points="50,12 88,84 12,84" fill="#f59e0b" stroke="#b45309" strokeWidth="4" strokeLinejoin="round" />
        <circle cx="42" cy="56" r="3.5" fill="#ffffff" />
        <circle cx="58" cy="56" r="3.5" fill="#ffffff" />
        <path d="M 41 68 Q 50 75 59 68" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      </svg>
    ),
  },
  {
    id: 'star',
    quechua: 'Quyllur',
    spanish: 'Estrella',
    exampleEs: 'Como las estrellas brillantes de la noche',
    exampleQu: 'Tuta k\'anchaq quyllur',
    color: '#eab308',
    renderSvg: (size = 'w-24 h-24') => (
      <svg viewBox="0 0 100 100" className={size}>
        <polygon
          points="50,10 61,36 90,38 68,57 75,86 50,70 25,86 32,57 10,38 39,36"
          fill="#facc15"
          stroke="#ca8a04"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <circle cx="43" cy="48" r="3" fill="#78350f" />
        <circle cx="57" cy="48" r="3" fill="#78350f" />
        <path d="M 43 58 Q 50 64 57 58" stroke="#78350f" strokeWidth="3" strokeLinecap="round" fill="none" />
      </svg>
    ),
  },
  {
    id: 'heart',
    quechua: 'Sonqo',
    spanish: 'Corazón',
    exampleEs: 'Símbolo de amor y cariño con la familia',
    exampleQu: 'Kuyay sonqocha',
    color: '#ec4899',
    renderSvg: (size = 'w-24 h-24') => (
      <svg viewBox="0 0 100 100" className={size}>
        <path
          d="M 50 84 C 50 84 14 60 14 35 C 14 21 25 14 36 14 C 44 14 48 20 50 25 C 52 20 56 14 64 14 C 75 14 86 21 86 35 C 86 60 50 84 50 84 Z"
          fill="#ec4899"
          stroke="#9d174d"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <circle cx="40" cy="40" r="3.5" fill="#ffffff" />
        <circle cx="60" cy="40" r="3.5" fill="#ffffff" />
        <path d="M 41 53 Q 50 60 59 53" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      </svg>
    ),
  },
  {
    id: 'rectangle',
    quechua: 'Suni tawa k\'uchu',
    spanish: 'Rectángulo',
    exampleEs: 'Como una puerta o un libro largo',
    exampleQu: 'Punku hina suni',
    color: '#10b981',
    renderSvg: (size = 'w-24 h-24') => (
      <svg viewBox="0 0 100 100" className={size}>
        <rect x="8" y="26" width="84" height="48" rx="8" fill="#10b981" stroke="#065f46" strokeWidth="4" />
        <circle cx="38" cy="46" r="3.8" fill="#ffffff" />
        <circle cx="62" cy="46" r="3.8" fill="#ffffff" />
        <path d="M 40 58 Q 50 65 60 58" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      </svg>
    ),
  },
];

export const ShapesGame: React.FC<ShapesGameProps> = ({
  appLang,
  dialect,
  onBackToHub,
}) => {
  const { profile, awardStar } = useUserProfile();
  const [mode, setMode] = useState<'learn' | 'quiz'>('learn');
  const [selectedShape, setSelectedShape] = useState<ShapeItem>(SHAPES_LIST[0]);

  const [quizIdx, setQuizIdx] = useState(0);
  const [pickedId, setPickedId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [score, setScore] = useState(0);

  const targetShape = SHAPES_LIST[quizIdx % SHAPES_LIST.length];

  const quizOptions = useMemo(() => {
    const others = SHAPES_LIST.filter(s => s.id !== targetShape.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    return [targetShape, ...others].sort(() => 0.5 - Math.random());
  }, [quizIdx]);

  const speakShape = (shape: ShapeItem) => {
    if (appLang === 'quechua') {
      audioService.speakQuechua(shape.quechua, dialect);
    } else {
      audioService.speakSpanish(shape.spanish);
    }
  };

  const handleAnswer = (shape: ShapeItem) => {
    if (feedback === 'correct') return;
    setPickedId(shape.id);
    speakShape(shape);
    if (shape.id === targetShape.id) {
      setFeedback('correct');
      setScore(s => s + 1);
      audioService.playSuccessSound();
      awardStar(`shapes-${targetShape.id}`);
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    } else {
      setFeedback('wrong');
      audioService.playErrorSound();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-800 p-3.5 sm:p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
        <button
          onClick={onBackToHub}
          className="flex items-center gap-2 min-h-[40px] text-sm font-bold text-amber-700 dark:text-amber-400 hover:text-amber-800 transition cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 shrink-0" />
          <span>{appLang === 'quechua' ? 'Kutiy pukllaykunaman' : 'Volver a juegos'}</span>
        </button>

        <div className="grid grid-cols-2 sm:flex items-center gap-1 p-1 bg-amber-50 dark:bg-slate-900 rounded-xl border border-amber-200 dark:border-slate-700">
          <button
            onClick={() => {
              audioService.playPop();
              setMode('learn');
            }}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
              mode === 'learn'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            1. Aprender Formas
          </button>
          <button
            onClick={() => {
              audioService.playPop();
              setMode('quiz');
            }}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
              mode === 'quiz'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            2. Encuentra la Figura
          </button>
        </div>
      </div>

      {mode === 'learn' ? (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-4 sm:p-7 shadow-sm border border-slate-200 dark:border-slate-700 text-center space-y-5">
          <div className="flex flex-col items-center">
            <div
              onClick={() => speakShape(selectedShape)}
              className="p-5 rounded-3xl bg-amber-50 dark:bg-slate-900 border-2 border-amber-200 dark:border-slate-700 cursor-pointer hover:scale-105 transition"
            >
              {selectedShape.renderSvg('w-32 h-32')}
            </div>

            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-['Fredoka'] mt-4">
              {selectedShape.spanish}
            </h3>
            <p className="text-base font-bold text-amber-600 dark:text-amber-400">
              Quechua: {selectedShape.quechua}
            </p>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
              {appLang === 'quechua' ? selectedShape.exampleQu : selectedShape.exampleEs}
            </p>

            <div className="flex items-center gap-2 mt-3">
              <button
                onClick={() => audioService.speakSpanish(selectedShape.spanish)}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
                <span>Español</span>
              </button>
              <button
                onClick={() => audioService.speakQuechua(selectedShape.quechua, dialect)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-100 text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Volume2 className="w-4 h-4 text-amber-600" />
                <span>Quechua</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            {SHAPES_LIST.map(s => {
              const isCur = s.id === selectedShape.id;
              return (
                <button
                  key={s.id}
                  onClick={() => {
                    audioService.playPop();
                    setSelectedShape(s);
                    speakShape(s);
                  }}
                  className={`p-3 rounded-2xl border-2 flex items-center gap-3 transition active:scale-95 cursor-pointer ${
                    isCur
                      ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 shadow-sm'
                      : 'border-slate-200 dark:border-slate-700 hover:border-amber-300'
                  }`}
                >
                  {s.renderSvg('w-12 h-12 shrink-0')}
                  <div className="text-left min-w-0">
                    <span className="block text-sm font-extrabold text-slate-900 dark:text-white truncate">
                      {s.spanish}
                    </span>
                    <span className="block text-xs text-slate-500 dark:text-slate-400 truncate">
                      {s.quechua}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-4 sm:p-7 shadow-sm border border-slate-200 dark:border-slate-700 text-center space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
              <Award className="w-4 h-4" />
              <span>Aciertos: {score}</span>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-500">
              <Shapes className="w-4 h-4 text-amber-500" />
              Desafío #{quizIdx + 1}
            </span>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-['Fredoka']">
              {appLang === 'quechua'
                ? `¿Mayqentaq «${targetShape.quechua}» (${targetShape.spanish})?`
                : `¿Cuál es el ${targetShape.spanish} (${targetShape.quechua})?`}
            </h2>
            <button
              onClick={() => speakShape(targetShape)}
              className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 text-xs font-bold cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>Escuchar figura</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto">
            {quizOptions.map(shape => {
              const isPicked = pickedId === shape.id;
              const isCorrect = shape.id === targetShape.id;
              return (
                <button
                  key={shape.id}
                  disabled={feedback === 'correct'}
                  onClick={() => handleAnswer(shape)}
                  className={`p-4 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition active:scale-95 cursor-pointer ${
                    isPicked
                      ? isCorrect
                        ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 ring-4 ring-emerald-300 scale-105'
                        : 'bg-red-50 dark:bg-red-950/50 border-red-500'
                      : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-700 hover:border-amber-400'
                  }`}
                >
                  {shape.renderSvg('w-20 h-20')}
                </button>
              );
            })}
          </div>

          {feedback && (
            <div className="space-y-3 animate-in fade-in">
              {feedback === 'correct' ? (
                <>
                  <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 text-emerald-800 dark:text-emerald-200 text-sm font-bold inline-flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>
                      ¡Bravísimo, {profile.name}! Ese es el {targetShape.spanish} ({targetShape.quechua}).
                    </span>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        audioService.playPop();
                        setPickedId(null);
                        setFeedback(null);
                        setQuizIdx(i => i + 1);
                      }}
                      className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md inline-flex items-center gap-2 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Siguiente figura</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/50 border border-amber-300 text-amber-800 dark:text-amber-200 text-sm font-bold inline-block">
                  ¡Casi! Mira sus lados y vuelve a elegir.
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
