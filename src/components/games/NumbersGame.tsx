import React, { useState } from 'react';
import { AppLanguage, QuechuaDialect, NumberItem } from '../../types';
import { NUMBERS_DATA } from '../../data/gamesData';
import { audioService } from '../../services/audioService';
import confetti from 'canvas-confetti';
import { Volume2, ChevronLeft, ChevronRight, Sparkles, CheckCircle2, RotateCcw, Award } from 'lucide-react';
import {
  LlamaIllustration,
  PotatoIllustration,
  CornIllustration,
  SunIllustration,
  CuyIllustration,
} from '../icons/AppIllustrations';

interface NumbersGameProps {
  appLang: AppLanguage;
  dialect: QuechuaDialect;
  onBackToHub: () => void;
}

export const NumbersGame: React.FC<NumbersGameProps> = ({
  appLang,
  dialect,
  onBackToHub,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'learn' | 'quiz'>('learn');
  const [countedObjects, setCountedObjects] = useState<number[]>([]);

  // Quiz state
  const [quizQuestionIndex, setQuizQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [quizScore, setQuizScore] = useState(0);

  const currentNumber: NumberItem = NUMBERS_DATA[currentIndex];

  const playPronunciation = (num: NumberItem) => {
    const word =
      dialect === 'chanka' && num.chanka
        ? num.chanka
        : dialect === 'collao' && num.collao
        ? num.collao
        : num.quechua;
    audioService.speakQuechua(word, dialect);
  };

  const handleNextNumber = () => {
    audioService.playPop();
    const nextIdx = (currentIndex + 1) % NUMBERS_DATA.length;
    setCurrentIndex(nextIdx);
    setCountedObjects([]);
    playPronunciation(NUMBERS_DATA[nextIdx]);
  };

  const handlePrevNumber = () => {
    audioService.playPop();
    const prevIdx = (currentIndex - 1 + NUMBERS_DATA.length) % NUMBERS_DATA.length;
    setCurrentIndex(prevIdx);
    setCountedObjects([]);
    playPronunciation(NUMBERS_DATA[prevIdx]);
  };

  const handleTapObject = (idx: number) => {
    if (!countedObjects.includes(idx)) {
      const nextCount = countedObjects.length + 1;
      audioService.playCountNote(nextCount);
      const newCounted = [...countedObjects, idx];
      setCountedObjects(newCounted);

      if (newCounted.length === currentNumber.number) {
        audioService.playSuccessSound();
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.7 },
        });
      }
    }
  };

  // Render object illustration based on object type
  const renderObjectIcon = (idx: number) => {
    const isCounted = countedObjects.includes(idx);
    let IconComp: React.ReactNode = null;

    switch (currentNumber.objectType) {
      case 'vicuna':
        IconComp = <LlamaIllustration className="w-10 h-10" />;
        break;
      case 'cuy':
        IconComp = <CuyIllustration className="w-10 h-10" />;
        break;
      case 'potato':
        IconComp = <PotatoIllustration className="w-10 h-10" />;
        break;
      case 'corn':
        IconComp = <CornIllustration className="w-10 h-10" />;
        break;
      case 'star':
      case 'cantuta':
      default:
        IconComp = <SunIllustration className="w-10 h-10" />;
        break;
    }

    return (
      <button
        key={idx}
        onClick={() => handleTapObject(idx)}
        aria-label={`Objeto ${idx + 1}`}
        className={`relative p-2 rounded-2xl border-2 transition-all transform active:scale-90 ${
          isCounted
            ? 'bg-amber-100 dark:bg-amber-950/60 border-amber-500 scale-105 shadow-md'
            : 'bg-white dark:bg-slate-800 border-dashed border-slate-300 dark:border-slate-700 hover:border-amber-400'
        }`}
      >
        {IconComp}
        {isCounted && (
          <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-amber-500 text-white font-extrabold text-xs flex items-center justify-center shadow">
            {countedObjects.indexOf(idx) + 1}
          </span>
        )}
      </button>
    );
  };

  // Quiz evaluation
  const quizTarget = NUMBERS_DATA[quizQuestionIndex % NUMBERS_DATA.length];
  // Generate 3 random alternative options
  const quizOptions = React.useMemo(() => {
    const correctVal = quizTarget.number;
    const others = NUMBERS_DATA.filter(n => n.number !== correctVal)
      .sort(() => 0.5 - Math.random())
      .slice(0, 2)
      .map(n => n.number);
    return [correctVal, ...others].sort(() => 0.5 - Math.random());
  }, [quizQuestionIndex]);

  const handleSelectQuizOption = (val: number) => {
    setSelectedOption(val);
    const selectedItem = NUMBERS_DATA.find(n => n.number === val);
    if (selectedItem) {
      playPronunciation(selectedItem);
    }
    if (val === quizTarget.number) {
      audioService.playSuccessSound();
      setQuizFeedback('correct');
      setQuizScore(s => s + 1);
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
      });
    } else {
      audioService.playErrorSound();
      setQuizFeedback('wrong');
    }
  };

  const handleNextQuizQuestion = () => {
    audioService.playPop();
    setSelectedOption(null);
    setQuizFeedback(null);
    setQuizQuestionIndex(prev => prev + 1);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Header / Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
        <button
          onClick={onBackToHub}
          className="flex items-center gap-2 text-sm font-bold text-amber-700 dark:text-amber-400 hover:text-amber-800 transition"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>{appLang === 'quechua' ? 'Kutiy pukllaykunaman' : 'Volver a juegos'}</span>
        </button>

        {/* Tab switch */}
        <div className="flex items-center gap-1 p-1 bg-amber-50 dark:bg-slate-900 rounded-xl border border-amber-200 dark:border-slate-700">
          <button
            onClick={() => {
              audioService.playPop();
              setActiveTab('learn');
            }}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap ${
              activeTab === 'learn'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-amber-600'
            }`}
          >
            {appLang === 'quechua' ? '1. Yachakuy (Aprender)' : '1. Aprender y Contar'}
          </button>
          <button
            onClick={() => {
              audioService.playPop();
              setActiveTab('quiz');
            }}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap ${
              activeTab === 'quiz'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-amber-600'
            }`}
          >
            {appLang === 'quechua' ? '2. Pukllay (Desafío)' : '2. Desafío / Preguntas'}
          </button>
        </div>
      </div>

      {activeTab === 'learn' ? (
        /* MODE 1: LEARN & COUNT */
        <div className="space-y-6">
          <div className="bg-gradient-to-b from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-6 sm:p-8 shadow-sm border-2 border-amber-300 dark:border-amber-700 text-center">
            {/* Number Selector Header */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={handlePrevNumber}
                className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 text-amber-700 dark:text-amber-300 border-2 border-amber-200 dark:border-slate-700 shadow-sm flex items-center justify-center hover:bg-amber-100 active:scale-95 transition"
                aria-label="Número anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div className="flex flex-col items-center">
                <span className="text-7xl sm:text-8xl font-black text-amber-600 dark:text-amber-400 font-['Fredoka'] drop-shadow-sm">
                  {currentNumber.number}
                </span>
                <div className="flex items-center gap-3 mt-1">
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-white font-['Fredoka']">
                    {dialect === 'chanka' && currentNumber.chanka
                      ? currentNumber.chanka
                      : dialect === 'collao' && currentNumber.collao
                      ? currentNumber.collao
                      : currentNumber.quechua}
                  </h3>
                  <button
                    onClick={() => playPronunciation(currentNumber)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md active:scale-95 transition cursor-pointer"
                    title="Escuchar en quechua"
                    aria-label={`Escuchar ${currentNumber.quechua} en quechua`}
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Quechua</span>
                  </button>
                  <button
                    onClick={() => audioService.speakSpanish(currentNumber.spanish)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-700 hover:bg-slate-100 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 font-bold text-xs shadow-sm active:scale-95 transition cursor-pointer"
                    title="Escuchar en español"
                    aria-label={`Escuchar ${currentNumber.spanish} en español`}
                  >
                    <Volume2 className="w-4 h-4 text-amber-600" />
                    <span>Español</span>
                  </button>
                </div>
                <div className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-2">
                  Español: <strong className="text-slate-800 dark:text-slate-200">{currentNumber.spanish}</strong> · Fonética: <span className="font-mono text-amber-700 dark:text-amber-400">[{currentNumber.phonetic}]</span>
                </div>
              </div>

              <button
                onClick={handleNextNumber}
                className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 text-amber-700 dark:text-amber-300 border-2 border-amber-200 dark:border-slate-700 shadow-sm flex items-center justify-center hover:bg-amber-100 active:scale-95 transition"
                aria-label="Número siguiente"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Instruction badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-200/70 dark:bg-amber-950/70 text-amber-900 dark:text-amber-200 text-xs font-bold mb-6">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>
                {appLang === 'quechua'
                  ? 'Yupaykunata llachpay: Hukmanta yupasunchis!'
                  : '¡Toca cada objeto para contar en voz alta!'}
              </span>
            </div>

            {/* Objects to Count Grid */}
            <div className="flex flex-wrap items-center justify-center gap-3 max-w-lg mx-auto py-3">
              {Array.from({ length: currentNumber.number }).map((_, idx) =>
                renderObjectIcon(idx)
              )}
            </div>

            {/* Progress counter & reset */}
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <div className="text-sm font-bold text-amber-800 dark:text-amber-300">
                {countedObjects.length} / {currentNumber.number}{' '}
                {countedObjects.length === currentNumber.number && (
                  <span className="text-emerald-600 dark:text-emerald-400 font-extrabold ml-1">
                    ¡Allinmi! (¡Excelente!)
                  </span>
                )}
              </div>
              {countedObjects.length > 0 && (
                <button
                  onClick={() => {
                    audioService.playPop();
                    setCountedObjects([]);
                  }}
                  className="px-3 py-1 rounded-xl bg-amber-200/80 dark:bg-slate-700 text-amber-900 dark:text-amber-200 text-xs font-bold inline-flex items-center gap-1.5 hover:bg-amber-300 active:scale-95 transition cursor-pointer"
                  title="Volver a contar"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{appLang === 'quechua' ? 'Kutipay yupayta' : 'Volver a contar'}</span>
                </button>
              )}
            </div>

            {/* Fun Cultural Fact */}
            <div className="mt-6 p-4 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-amber-200 dark:border-slate-700 text-left max-w-md mx-auto">
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 block mb-1">
                Yachay fact (Dato curioso):
              </span>
              <p className="text-xs text-slate-700 dark:text-slate-300">
                {appLang === 'quechua'
                  ? currentNumber.funFact.quechua
                  : currentNumber.funFact.spanish}
              </p>
            </div>
          </div>

          {/* Quick Selector 1 al 10 (Hukmanta Chunkakama) */}
          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                {appLang === 'quechua'
                  ? 'Yupaykunata akllay (1 chunka kama):'
                  : 'Seleccionar número directo (del 1 al 10):'}
              </span>
              <span className="text-xs font-extrabold text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
                1 al 10 / Hukmanta Chunka
              </span>
            </div>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {NUMBERS_DATA.map((num, idx) => {
                const isSelected = currentIndex === idx;
                return (
                  <button
                    key={num.number}
                    onClick={() => {
                      audioService.playPop();
                      setCurrentIndex(idx);
                      setCountedObjects([]);
                      playPronunciation(num);
                    }}
                    className={`py-2 px-1 rounded-xl font-bold transition flex flex-col items-center justify-center cursor-pointer active:scale-95 ${
                      isSelected
                        ? 'bg-amber-500 text-white shadow-md ring-2 ring-amber-300 dark:ring-amber-600 scale-105'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-amber-100 dark:hover:bg-slate-600'
                    }`}
                    aria-label={`Número ${num.number}: ${num.quechua}`}
                  >
                    <span className="text-lg font-black font-['Fredoka'] leading-none">
                      {num.number}
                    </span>
                    <span className="text-[10px] font-semibold mt-0.5 truncate max-w-full">
                      {num.quechua}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* MODE 2: QUIZ CHALLENGE */
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-700 text-center space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-bold text-amber-600 dark:text-amber-400">
              <Award className="w-5 h-5" />
              <span>
                {appLang === 'quechua' ? `Puntos: ${quizScore}` : `Aciertos: ${quizScore}`}
              </span>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Pregunta #{quizQuestionIndex + 1}
            </span>
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800 dark:text-white font-['Fredoka']">
              {appLang === 'quechua'
                ? `Hayka uywakunataq kachkan? (¿Cuántos hay?)`
                : `¿Cuántos objetos hay en pantalla?`}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Cuenta con atención y selecciona el número correcto en quechua:
            </p>
          </div>

          {/* Visual representations to count */}
          <div className="flex flex-wrap items-center justify-center gap-3 p-6 bg-amber-50 dark:bg-slate-900 rounded-2xl border-2 border-dashed border-amber-200 dark:border-slate-700 min-h-[140px]">
            {Array.from({ length: quizTarget.number }).map((_, idx) => (
              <div key={idx} className="p-1 animate-pulse-subtle">
                {quizTarget.objectType === 'vicuna' ? (
                  <LlamaIllustration className="w-10 h-10" />
                ) : quizTarget.objectType === 'cuy' ? (
                  <CuyIllustration className="w-10 h-10" />
                ) : quizTarget.objectType === 'potato' ? (
                  <PotatoIllustration className="w-10 h-10" />
                ) : quizTarget.objectType === 'corn' ? (
                  <CornIllustration className="w-10 h-10" />
                ) : (
                  <SunIllustration className="w-10 h-10" />
                )}
              </div>
            ))}
          </div>

          {/* Answer Options */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-md mx-auto">
            {quizOptions.map(numVal => {
              const item = NUMBERS_DATA.find(n => n.number === numVal)!;
              const isSelected = selectedOption === numVal;
              const isCorrect = numVal === quizTarget.number;

              let btnStyle =
                'bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-100 hover:border-amber-400';
              if (isSelected) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-500 border-emerald-600 text-white shadow-md';
                } else {
                  btnStyle = 'bg-red-500 border-red-600 text-white shadow-md';
                }
              }

              return (
                <button
                  key={numVal}
                  disabled={quizFeedback !== null}
                  onClick={() => handleSelectQuizOption(numVal)}
                  className={`p-4 rounded-2xl border-2 font-bold flex flex-col items-center justify-center transition active:scale-95 ${btnStyle}`}
                >
                  <span className="text-3xl font-black font-['Fredoka']">{numVal}</span>
                  <span className="text-xs mt-1">
                    {dialect === 'chanka' && item.chanka
                      ? item.chanka
                      : dialect === 'collao' && item.collao
                      ? item.collao
                      : item.quechua}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quiz Feedback & Next */}
          {quizFeedback && (
            <div className="pt-2 animate-in fade-in space-y-3">
              {quizFeedback === 'correct' ? (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200 text-sm font-bold flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>
                    {appLang === 'quechua'
                      ? `¡Allillamanta! Chaymi: ${quizTarget.quechua} (${quizTarget.number})`
                      : `¡Excelente! La respuesta es ${quizTarget.quechua} (${quizTarget.number})`}
                  </span>
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-200 text-sm font-bold">
                  {appLang === 'quechua'
                    ? `Waqmanta yuyaykuy. Allin yupaymi: ${quizTarget.quechua} (${quizTarget.number})`
                    : `¡Sigue intentando! La respuesta correcta es ${quizTarget.quechua} (${quizTarget.number})`}
                </div>
              )}

              <button
                onClick={handleNextQuizQuestion}
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md active:scale-95 transition"
              >
                {appLang === 'quechua' ? 'Qatiqnin (Siguiente pregunta)' : 'Siguiente pregunta'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
