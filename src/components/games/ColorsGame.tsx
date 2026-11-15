import React, { useState } from 'react';
import { AppLanguage, QuechuaDialect, ColorItem } from '../../types';
import { COLORS_DATA } from '../../data/gamesData';
import { audioService } from '../../services/audioService';
import { useUserProfile } from '../../context/UserProfileContext';
import confetti from 'canvas-confetti';
import { ChevronLeft, Volume2, CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';

interface ColorsGameProps {
  appLang: AppLanguage;
  dialect: QuechuaDialect;
  onBackToHub: () => void;
}

export const ColorsGame: React.FC<ColorsGameProps> = ({
  appLang,
  dialect,
  onBackToHub,
}) => {
  const { profile, awardStar } = useUserProfile();
  const { showPhonetics, showDialectNotes, cardScale } = profile.config;
  const [activeTab, setActiveTab] = useState<'explore' | 'quiz'>('explore');
  const [selectedColor, setSelectedColor] = useState<ColorItem>(COLORS_DATA[0]);

  // Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [quizScore, setQuizScore] = useState(0);

  const targetColor = COLORS_DATA[quizIndex % COLORS_DATA.length];

  // Options for quiz: target + 3 random alternatives
  const quizOptions = React.useMemo(() => {
    const others = COLORS_DATA.filter(c => c.id !== targetColor.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    return [targetColor, ...others].sort(() => 0.5 - Math.random());
  }, [quizIndex]);

  const playColorPronunciation = (color: ColorItem) => {
    const name =
      dialect === 'chanka' && color.name.dialectNotes?.chanka
        ? color.name.dialectNotes.chanka
        : dialect === 'collao' && color.name.dialectNotes?.collao
        ? color.name.dialectNotes.collao
        : color.name.quechua;
    audioService.speakQuechua(name, dialect);
  };

  const handleSelectQuiz = (choiceId: string) => {
    setSelectedChoice(choiceId);
    if (choiceId === targetColor.id) {
      audioService.playSuccessSound();
      setFeedback('correct');
      setQuizScore(s => s + 1);
      awardStar(`colors-${targetColor.id}`);
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
      });
    } else {
      audioService.playErrorSound();
      setFeedback('wrong');
    }
  };

  const handleNextQuiz = () => {
    audioService.playPop();
    setSelectedChoice(null);
    setFeedback(null);
    setQuizIndex(prev => prev + 1);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-5 sm:space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 bg-white dark:bg-slate-800 p-3.5 sm:p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
        <button
          onClick={onBackToHub}
          className="flex items-center gap-2 min-h-[40px] text-sm font-bold text-amber-700 dark:text-amber-400 hover:text-amber-800 transition cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 shrink-0" />
          <span>{appLang === 'quechua' ? 'Kutiy pukllaykunaman' : 'Volver a juegos'}</span>
        </button>

        {/* Mode switch */}
        <div className="grid grid-cols-2 sm:flex items-center gap-1 p-1 bg-amber-50 dark:bg-slate-900 rounded-xl border border-amber-200 dark:border-slate-700 w-full sm:w-auto">
          <button
            onClick={() => {
              audioService.playPop();
              setActiveTab('explore');
            }}
            className={`px-3 sm:px-4 py-2 min-h-[40px] rounded-lg text-xs font-bold transition whitespace-nowrap cursor-pointer ${
              activeTab === 'explore'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-amber-600'
            }`}
          >
            {appLang === 'quechua' ? '1. Llimpikuna' : '1. Aprender Colores'}
          </button>
          <button
            onClick={() => {
              audioService.playPop();
              setActiveTab('quiz');
            }}
            className={`px-3 sm:px-4 py-2 min-h-[40px] rounded-lg text-xs font-bold transition whitespace-nowrap cursor-pointer ${
              activeTab === 'quiz'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-amber-600'
            }`}
          >
            {appLang === 'quechua' ? '2. Taripay' : '2. Adivina el Color'}
          </button>
        </div>
      </div>

      {activeTab === 'explore' ? (
        /* EXPLORE MODE */
        <div className="space-y-5 sm:space-y-6">
          {/* Main Selected Color Showcase */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-4 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-700 text-center space-y-5 sm:space-y-6">
            <div className="flex flex-col items-center">
              {/* Giant Color Circle */}
              <div
                className="w-36 h-36 rounded-full shadow-lg border-4 border-white dark:border-slate-700 transition-transform hover:scale-105 flex items-center justify-center cursor-pointer"
                style={{ backgroundColor: selectedColor.colorHex }}
                onClick={() => playColorPronunciation(selectedColor)}
              >
                <button
                  className="w-12 h-12 rounded-full bg-white/90 text-slate-800 shadow-md flex items-center justify-center hover:scale-110 transition active:scale-95"
                  title="Escuchar pronunciación"
                >
                  <Volume2 className="w-6 h-6 text-amber-600" />
                </button>
              </div>

              {/* Names */}
              <div className="mt-4 space-y-1">
                <div className="flex items-center justify-center gap-3">
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-['Fredoka']">
                    {dialect === 'chanka' && selectedColor.name.dialectNotes?.chanka
                      ? selectedColor.name.dialectNotes.chanka
                      : dialect === 'collao' && selectedColor.name.dialectNotes?.collao
                      ? selectedColor.name.dialectNotes.collao
                      : selectedColor.name.quechua}
                  </h3>
                </div>
                <p className="text-base font-bold text-slate-600 dark:text-slate-300">
                  Español: {selectedColor.name.spanish}
                  {showPhonetics && selectedColor.name.phonetic && (
                    <> · Fonética: [{selectedColor.name.phonetic}]</>
                  )}
                </p>
                {showDialectNotes && selectedColor.name.dialectNotes && (
                  <p className="text-xs font-medium text-amber-700 dark:text-amber-400">
                    Chanka: <strong>{selectedColor.name.dialectNotes.chanka || selectedColor.name.quechua}</strong> · Collao:{' '}
                    <strong>{selectedColor.name.dialectNotes.collao || selectedColor.name.quechua}</strong>
                  </p>
                )}
              </div>

              {/* Real World Andean Association */}
              <div className="mt-4 p-4 rounded-2xl bg-amber-50 dark:bg-slate-900 border border-amber-200 dark:border-slate-700 max-w-sm w-full">
                <span className="text-xs font-bold text-amber-700 dark:text-amber-400 block mb-1">
                  {appLang === 'quechua' ? 'Kaypi rikunki (Ejemplo):' : 'Ejemplo en la naturaleza andina:'}
                </span>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {appLang === 'quechua'
                    ? selectedColor.exampleObject.name.quechua
                    : selectedColor.exampleObject.name.spanish}
                </p>
              </div>
            </div>

            {/* Color Palette Grid to select */}
            <div>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-3 text-left">
                {appLang === 'quechua' ? 'Llimpita akllay:' : 'Toca un color para aprender:'}
              </span>
              <div
                className={`grid gap-2.5 sm:gap-3 grid-cols-2 ${
                  cardScale === 'large' ? 'sm:grid-cols-3' : 'sm:grid-cols-4'
                }`}
              >
                {COLORS_DATA.map(col => {
                  const isCur = col.id === selectedColor.id;
                  return (
                    <button
                      key={col.id}
                      onClick={() => {
                        audioService.playPop();
                        setSelectedColor(col);
                        playColorPronunciation(col);
                      }}
                      className={`p-3 rounded-2xl border-2 flex items-center gap-2.5 sm:gap-3 min-h-[54px] transition active:scale-95 cursor-pointer ${
                        isCur
                          ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 shadow-sm'
                          : 'border-slate-200 dark:border-slate-700 hover:border-amber-300 bg-white dark:bg-slate-800'
                      }`}
                    >
                      <div
                        className="w-8 h-8 rounded-full border border-slate-300 shadow-sm shrink-0"
                        style={{ backgroundColor: col.colorHex }}
                      />
                      <div className="text-left overflow-hidden min-w-0">
                        <span className="block text-sm font-bold text-slate-800 dark:text-slate-100 font-['Fredoka'] truncate">
                          {col.name.quechua}
                        </span>
                        <span className="block text-[11px] text-slate-500 dark:text-slate-400 truncate">
                          {col.name.spanish}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* QUIZ MODE */
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-4 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-700 text-center space-y-5 sm:space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-amber-600 dark:text-amber-400">
              {appLang === 'quechua' ? `Puntos: ${quizScore}` : `Aciertos: ${quizScore}`}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Desafío #{quizIndex + 1}
            </span>
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800 dark:text-white font-['Fredoka']">
              {appLang === 'quechua'
                ? `Mayqentaq «${targetColor.name.quechua}» llimpi?`
                : `¿Cuál de estos es el color «${targetColor.name.quechua}» (${targetColor.name.spanish})?`}
            </h3>
            <button
              onClick={() => playColorPronunciation(targetColor)}
              className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 text-xs font-bold hover:bg-amber-200 transition"
            >
              <Volume2 className="w-4 h-4 text-amber-600" />
              <span>Escuchar color en quechua</span>
            </button>
          </div>

          {/* Color Choices */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-lg mx-auto py-4">
            {quizOptions.map(col => {
              const isSelected = selectedChoice === col.id;
              const isCorrect = col.id === targetColor.id;

              return (
                <button
                  key={col.id}
                  disabled={feedback !== null}
                  onClick={() => handleSelectQuiz(col.id)}
                  className={`relative h-28 rounded-2xl border-4 transition transform active:scale-95 shadow-md flex items-center justify-center ${
                    isSelected
                      ? isCorrect
                        ? 'border-emerald-500 ring-4 ring-emerald-300 scale-105'
                        : 'border-red-500 ring-4 ring-red-300 scale-95'
                      : 'border-white dark:border-slate-700 hover:scale-105'
                  }`}
                  style={{ backgroundColor: col.colorHex }}
                >
                  {isSelected && (
                    <span className="w-10 h-10 rounded-full bg-white text-slate-900 flex items-center justify-center font-bold text-lg shadow">
                      {isCorrect ? '✓' : '✗'}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback & Next */}
          {feedback && (
            <div className="pt-2 animate-in fade-in space-y-3">
              {feedback === 'correct' ? (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200 text-sm font-bold flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>
                    {appLang === 'quechua'
                      ? `¡Allillamanta! Chaymi ${targetColor.name.quechua} (${targetColor.name.spanish})`
                      : `¡Muy bien! El color es ${targetColor.name.quechua} (${targetColor.name.spanish})`}
                  </span>
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-200 text-sm font-bold">
                  {appLang === 'quechua'
                    ? `Waqmanta yuyaykuy. Allin llimpim: ${targetColor.name.quechua}`
                    : `Sigue aprendiendo. La respuesta correcta era ${targetColor.name.quechua} (${targetColor.name.spanish})`}
                </div>
              )}

              <button
                onClick={handleNextQuiz}
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md active:scale-95 transition"
              >
                {appLang === 'quechua' ? 'Qatiqnin (Siguiente)' : 'Siguiente color'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
