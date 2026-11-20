import React, { useState, useMemo } from 'react';
import { AppLanguage, QuechuaDialect } from '../../types';
import { NUMBERS_DATA } from '../../data/gamesData';
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
  Hand,
} from 'lucide-react';

interface CountingQuizGameProps {
  appLang: AppLanguage;
  dialect: QuechuaDialect;
  onBackToHub: () => void;
}

const COUNTABLE_OBJECTS = [
  { drawing: 'dog', labelEs: 'perritos', labelQu: 'allqokuna' },
  { drawing: 'cat', labelEs: 'gatitos', labelQu: 'misikuna' },
  { drawing: 'sun', labelEs: 'soles', labelQu: 'intikuna' },
  { drawing: 'star', labelEs: 'estrellitas', labelQu: 'quyllurkuna' },
  { drawing: 'corn', labelEs: 'choclos', labelQu: 'sarakuna' },
  { drawing: 'fruit', labelEs: 'lúcumas', labelQu: 'luqmakuna' },
  { drawing: 'book', labelEs: 'libros', labelQu: 'liwrukuna' },
  { drawing: 'llama', labelEs: 'llamitas', labelQu: 'llamakuna' },
  { drawing: 'potato', labelEs: 'papitas', labelQu: 'papakuna' },
  { drawing: 'pencil', labelEs: 'lápices', labelQu: 'qillqanakuna' },
];

export const CountingQuizGame: React.FC<CountingQuizGameProps> = ({
  appLang,
  dialect,
  onBackToHub,
}) => {
  const { profile, awardStar } = useUserProfile();
  const [maxCount, setMaxCount] = useState<5 | 10>(5);
  const [roundIdx, setRoundIdx] = useState(0);
  const [tappedIndices, setTappedIndices] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [score, setScore] = useState(0);

  const challenge = useMemo(() => {
    const targetCount = ((roundIdx * 2 + (roundIdx % 3)) % maxCount) + 1;
    const obj = COUNTABLE_OBJECTS[roundIdx % COUNTABLE_OBJECTS.length];

    const candidates = Array.from({ length: maxCount }, (_, i) => i + 1).filter(
      n => n !== targetCount
    );
    const distractors = candidates.sort(() => 0.5 - Math.random()).slice(0, 3);
    const options = [targetCount, ...distractors].sort((a, b) => a - b);

    return { targetCount, obj, options };
  }, [roundIdx, maxCount]);

  const speakNumber = (numVal: number) => {
    const item = NUMBERS_DATA.find(n => n.number === numVal);
    if (!item) return;
    if (appLang === 'quechua') {
      const word =
        dialect === 'chanka' && item.chanka
          ? item.chanka
          : dialect === 'collao' && item.collao
          ? item.collao
          : item.quechua;
      audioService.speakQuechua(word, dialect);
    } else {
      audioService.speakSpanish(item.spanish);
    }
  };

  const handleTapObject = (idx: number) => {
    if (!tappedIndices.includes(idx)) {
      const next = [...tappedIndices, idx];
      setTappedIndices(next);
      audioService.playCountNote(next.length);
    }
  };

  const handleChooseOption = (numVal: number) => {
    if (feedback === 'correct') return;
    setSelectedAnswer(numVal);
    speakNumber(numVal);

    if (numVal === challenge.targetCount) {
      setFeedback('correct');
      setScore(s => s + 1);
      audioService.playSuccessSound();
      awardStar(`counting-r${roundIdx}`);
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
      });
    } else {
      setFeedback('wrong');
      audioService.playErrorSound();
    }
  };

  const handleNextRound = () => {
    audioService.playPop();
    setTappedIndices([]);
    setSelectedAnswer(null);
    setFeedback(null);
    setRoundIdx(r => r + 1);
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
              setMaxCount(5);
              setTappedIndices([]);
              setSelectedAnswer(null);
              setFeedback(null);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              maxCount === 5
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Inicial (1 al 5)
          </button>
          <button
            onClick={() => {
              audioService.playPop();
              setMaxCount(10);
              setTappedIndices([]);
              setSelectedAnswer(null);
              setFeedback(null);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              maxCount === 10
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Reto (1 al 10)
          </button>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-4 sm:p-7 shadow-sm border border-slate-200 dark:border-slate-700 text-center space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
            <Award className="w-4 h-4" />
            <span>Aciertos: {score}</span>
          </div>

          <button
            onClick={() =>
              appLang === 'quechua'
                ? audioService.speakQuechua(`Hayka ${challenge.obj.labelQu} kachkan?`, dialect)
                : audioService.speakSpanish(`¿Cuántos ${challenge.obj.labelEs} hay aquí? Cuenta y marca la respuesta.`)
            }
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 text-xs font-bold hover:bg-amber-200 transition cursor-pointer"
          >
            <Volume2 className="w-4 h-4" />
            <span>Escuchar pregunta</span>
          </button>
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-['Fredoka']">
            {appLang === 'quechua'
              ? `¿Hayka ${challenge.obj.labelQu} kachkan?`
              : `¿Cuántos ${challenge.obj.labelEs} hay?`}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 inline-flex items-center gap-1.5">
            <Hand className="w-4 h-4 text-amber-500" />
            <span>Toca cada dibujo para contar y luego marca la opción correcta.</span>
          </p>
        </div>

        {/* Interactive Objects Arena */}
        <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-b from-amber-50 to-orange-50/70 dark:from-slate-900 dark:to-slate-900/60 border-2 border-dashed border-amber-300 dark:border-slate-700 flex flex-wrap items-center justify-center gap-3 sm:gap-4 min-h-[160px]">
          {Array.from({ length: challenge.targetCount }).map((_, idx) => {
            const countOrder = tappedIndices.indexOf(idx);
            const isCounted = countOrder !== -1;

            return (
              <button
                key={idx}
                onClick={() => handleTapObject(idx)}
                className={`relative p-2.5 sm:p-3 rounded-2xl border-2 transition-all transform active:scale-90 cursor-pointer ${
                  isCounted
                    ? 'bg-white dark:bg-slate-800 border-amber-500 shadow-md scale-105'
                    : 'bg-white/90 dark:bg-slate-800/90 border-amber-200 dark:border-slate-700 hover:border-amber-400 hover:scale-105'
                }`}
                aria-label={`Contar objeto ${idx + 1}`}
              >
                <PictogramDrawing
                  drawing={challenge.obj.drawing}
                  className="w-14 h-14 sm:w-16 sm:h-16"
                />
                {isCounted && (
                  <span className="absolute -top-2.5 -right-2.5 w-7 h-7 rounded-full bg-amber-500 text-white font-extrabold text-sm flex items-center justify-center shadow">
                    {countOrder + 1}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Big Option Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
          {challenge.options.map(numVal => {
            const numItem = NUMBERS_DATA.find(n => n.number === numVal)!;
            const isSelected = selectedAnswer === numVal;
            const isCorrect = numVal === challenge.targetCount;

            let cardStyle =
              'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-700 hover:border-amber-400 text-slate-900 dark:text-white';
            if (isSelected) {
              cardStyle = isCorrect
                ? 'bg-emerald-500 border-emerald-600 text-white shadow-lg scale-105'
                : 'bg-red-500 border-red-600 text-white shadow-md';
            } else if (feedback === 'correct' && isCorrect) {
              cardStyle = 'bg-emerald-500 border-emerald-600 text-white shadow-lg';
            }

            return (
              <button
                key={numVal}
                disabled={feedback === 'correct'}
                onClick={() => handleChooseOption(numVal)}
                className={`p-4 rounded-2xl border-2 transition-all active:scale-95 flex flex-col items-center justify-center gap-1 cursor-pointer ${cardStyle}`}
              >
                <span className="text-4xl font-black font-['Fredoka'] leading-none">
                  {numVal}
                </span>
                {/* Visual dots helper for preschool */}
                <div className="flex flex-wrap items-center justify-center gap-1 my-1 max-w-[84px]">
                  {Array.from({ length: numVal }).map((_, dIdx) => (
                    <span
                      key={dIdx}
                      className={`w-2 h-2 rounded-full ${
                        isSelected ? 'bg-white' : 'bg-amber-500'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-extrabold">
                  {numItem.quechua} · {numItem.spanish}
                </span>
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {feedback && (
          <div className="space-y-3 pt-1 animate-in fade-in">
            {feedback === 'correct' ? (
              <>
                <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200 text-sm font-bold inline-flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>
                    {appLang === 'quechua'
                      ? `¡Allinmi ${profile.name}! ${challenge.targetCount} ${challenge.obj.labelQu} kachkan.`
                      : `¡Muy bien, ${profile.name}! Hay ${challenge.targetCount} ${challenge.obj.labelEs}.`}
                  </span>
                </div>
                <div>
                  <button
                    onClick={handleNextRound}
                    className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md active:scale-95 transition inline-flex items-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{appLang === 'quechua' ? 'Qatiqnin (Siguiente)' : 'Siguiente desafío'}</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-200 text-sm font-bold inline-block">
                Intenta contar tocando cada dibujito con tu dedo. ¡Tú puedes!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
