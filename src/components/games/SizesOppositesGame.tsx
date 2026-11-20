import React, { useState } from 'react';
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
  Scale,
} from 'lucide-react';

interface SizesOppositesGameProps {
  appLang: AppLanguage;
  dialect: QuechuaDialect;
  onBackToHub: () => void;
}

interface ComparisonChallenge {
  id: string;
  badgeEs: string;
  badgeQu: string;
  questionEs: string;
  questionQu: string;
  correctSide: 'left' | 'right';
  leftLabelEs: string;
  leftLabelQu: string;
  rightLabelEs: string;
  rightLabelQu: string;
  renderLeft: () => React.ReactNode;
  renderRight: () => React.ReactNode;
}

const CHALLENGES: ComparisonChallenge[] = [
  {
    id: 'comp-llama-big',
    badgeEs: 'Grande vs. Pequeño',
    badgeQu: 'Hatun vs. Huch\'uy',
    questionEs: '¿Cuál llama es más GRANDE?',
    questionQu: '¿Mayqen llamaqa aswan HATUN?',
    correctSide: 'left',
    leftLabelEs: 'Grande',
    leftLabelQu: 'Hatun',
    rightLabelEs: 'Pequeña',
    rightLabelQu: 'Huch\'uy',
    renderLeft: () => <PictogramDrawing drawing="llama" className="w-32 h-32 sm:w-36 sm:h-36" />,
    renderRight: () => <PictogramDrawing drawing="llama" className="w-14 h-14 sm:w-16 sm:h-16" />,
  },
  {
    id: 'comp-dog-small',
    badgeEs: 'Grande vs. Pequeño',
    badgeQu: 'Hatun vs. Huch\'uy',
    questionEs: '¿Cuál perrito es más PEQUEÑO?',
    questionQu: '¿Mayqen allqochaqa HUCH\'UY?',
    correctSide: 'right',
    leftLabelEs: 'Grande',
    leftLabelQu: 'Hatun',
    rightLabelEs: 'Pequeño',
    rightLabelQu: 'Huch\'uy',
    renderLeft: () => <PictogramDrawing drawing="dog" className="w-32 h-32 sm:w-36 sm:h-36" />,
    renderRight: () => <PictogramDrawing drawing="dog" className="w-14 h-14 sm:w-16 sm:h-16" />,
  },
  {
    id: 'comp-many-stars',
    badgeEs: 'Muchos vs. Pocos',
    badgeQu: 'Askha vs. Aslla',
    questionEs: '¿Dónde hay MUCHAS estrellas?',
    questionQu: '¿Maypitaq ASKHA quyllurkuna kachkan?',
    correctSide: 'right',
    leftLabelEs: 'Pocas (1)',
    leftLabelQu: 'Aslla',
    rightLabelEs: 'Muchas (6)',
    rightLabelQu: 'Askha',
    renderLeft: () => <PictogramDrawing drawing="star" className="w-14 h-14" />,
    renderRight: () => (
      <div className="grid grid-cols-3 gap-1.5">
        {Array.from({ length: 6 }).map((_, i) => (
          <PictogramDrawing key={i} drawing="star" className="w-10 h-10 sm:w-11 sm:h-11" />
        ))}
      </div>
    ),
  },
  {
    id: 'comp-cat-up',
    badgeEs: 'Arriba vs. Abajo',
    badgeQu: 'Hanaq vs. Uray',
    questionEs: '¿Dónde está el gatito ARRIBA de la mesa?',
    questionQu: '¿Maypitaq misicha hamp\'ara PATAPI kachkan?',
    correctSide: 'left',
    leftLabelEs: 'Arriba',
    leftLabelQu: 'Hanaq / Patapi',
    rightLabelEs: 'Abajo',
    rightLabelQu: 'Uray / Ukupi',
    renderLeft: () => (
      <div className="flex flex-col items-center">
        <PictogramDrawing drawing="cat" className="w-14 h-14 -mb-3 relative z-10" />
        <PictogramDrawing drawing="table" className="w-24 h-24" />
      </div>
    ),
    renderRight: () => (
      <div className="flex flex-col items-center">
        <PictogramDrawing drawing="table" className="w-24 h-24" />
        <PictogramDrawing drawing="cat" className="w-14 h-14 -mt-8 relative z-10" />
      </div>
    ),
  },
  {
    id: 'comp-happy-face',
    badgeEs: 'Emociones Opuestas',
    badgeQu: 'Kusisqa vs. Llakisqa',
    questionEs: '¿Cuál carita está FELIZ?',
    questionQu: '¿Mayqentaq KUSISQA uya?',
    correctSide: 'right',
    leftLabelEs: 'Triste',
    leftLabelQu: 'Llakisqa',
    rightLabelEs: 'Feliz',
    rightLabelQu: 'Kusisqa',
    renderLeft: () => <PictogramDrawing drawing="frown" className="w-24 h-24 sm:w-28 sm:h-28" />,
    renderRight: () => <PictogramDrawing drawing="smile" className="w-24 h-24 sm:w-28 sm:h-28" />,
  },
  {
    id: 'comp-few-corn',
    badgeEs: 'Pocos vs. Muchos',
    badgeQu: 'Aslla vs. Askha',
    questionEs: '¿Dónde hay POCOS choclos?',
    questionQu: '¿Maypitaq ASLLA sarakuna kachkan?',
    correctSide: 'left',
    leftLabelEs: 'Pocos (1)',
    leftLabelQu: 'Aslla',
    rightLabelEs: 'Muchos (5)',
    rightLabelQu: 'Askha',
    renderLeft: () => <PictogramDrawing drawing="corn" className="w-16 h-16" />,
    renderRight: () => (
      <div className="flex flex-wrap items-center justify-center gap-1 max-w-[140px]">
        {Array.from({ length: 5 }).map((_, i) => (
          <PictogramDrawing key={i} drawing="corn" className="w-10 h-10" />
        ))}
      </div>
    ),
  },
];

export const SizesOppositesGame: React.FC<SizesOppositesGameProps> = ({
  appLang,
  dialect,
  onBackToHub,
}) => {
  const { profile, awardStar } = useUserProfile();
  const [idx, setIdx] = useState(0);
  const [pickedSide, setPickedSide] = useState<'left' | 'right' | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [score, setScore] = useState(0);

  const challenge = CHALLENGES[idx % CHALLENGES.length];

  const handlePick = (side: 'left' | 'right') => {
    if (feedback === 'correct') return;
    setPickedSide(side);
    if (side === challenge.correctSide) {
      setFeedback('correct');
      setScore(s => s + 1);
      audioService.playSuccessSound();
      awardStar(`sizes-${challenge.id}`);
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
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-200 text-xs font-extrabold">
            <Scale className="w-3.5 h-3.5" />
            {appLang === 'quechua' ? challenge.badgeQu : challenge.badgeEs}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-['Fredoka'] mt-2">
            {appLang === 'quechua' ? challenge.questionQu : challenge.questionEs}
          </h2>
          <button
            onClick={() =>
              appLang === 'quechua'
                ? audioService.speakQuechua(challenge.questionQu, dialect)
                : audioService.speakSpanish(challenge.questionEs)
            }
            className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 text-xs font-bold cursor-pointer"
          >
            <Volume2 className="w-4 h-4" />
            <span>Escuchar pregunta</span>
          </button>
        </div>

        {/* Two Side-by-Side Comparison Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {(['left', 'right'] as const).map(side => {
            const isPicked = pickedSide === side;
            const isCorrect = challenge.correctSide === side;
            const label =
              side === 'left'
                ? appLang === 'quechua'
                  ? challenge.leftLabelQu
                  : challenge.leftLabelEs
                : appLang === 'quechua'
                ? challenge.rightLabelQu
                : challenge.rightLabelEs;

            return (
              <button
                key={side}
                disabled={feedback === 'correct'}
                onClick={() => handlePick(side)}
                className={`p-5 rounded-3xl border-2 min-h-[200px] flex flex-col items-center justify-between gap-3 transition active:scale-95 cursor-pointer ${
                  isPicked
                    ? isCorrect
                      ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 ring-4 ring-emerald-300 scale-[1.02]'
                      : 'bg-red-50 dark:bg-red-950/50 border-red-500'
                    : 'bg-amber-50/50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-700 hover:border-amber-400'
                }`}
              >
                <div className="flex-1 flex items-center justify-center">
                  {side === 'left' ? challenge.renderLeft() : challenge.renderRight()}
                </div>
                {feedback === 'correct' && (
                  <span className="px-3 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-extrabold text-slate-700 dark:text-slate-200">
                    {label}
                  </span>
                )}
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
                  <span>¡Muy bien, {profile.name}! Comparaste correctamente.</span>
                </div>
                <div>
                  <button
                    onClick={() => {
                      audioService.playPop();
                      setPickedSide(null);
                      setFeedback(null);
                      setIdx(i => i + 1);
                    }}
                    className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md inline-flex items-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Siguiente comparación</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/50 border border-amber-300 text-amber-800 dark:text-amber-200 text-sm font-bold inline-block">
                Observa bien ambos recuadros y vuelve a intentarlo.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
