import React, { useState } from 'react';
import { AppLanguage, QuechuaDialect, AnimalItem } from '../../types';
import { ANIMALS_DATA } from '../../data/gamesData';
import { audioService } from '../../services/audioService';
import { useUserProfile } from '../../context/UserProfileContext';
import confetti from 'canvas-confetti';
import { ChevronLeft, Volume2, CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';
import {
  LlamaIllustration,
  CondorIllustration,
  CuyIllustration,
  FoxIllustration,
} from '../icons/AppIllustrations';

interface AnimalsGameProps {
  appLang: AppLanguage;
  dialect: QuechuaDialect;
  onBackToHub: () => void;
}

export const AnimalsGame: React.FC<AnimalsGameProps> = ({
  appLang,
  dialect,
  onBackToHub,
}) => {
  const { profile, awardStar } = useUserProfile();
  const { showPhonetics, showDialectNotes, cardScale } = profile.config;
  const [activeTab, setActiveTab] = useState<'cards' | 'trivia'>('cards');
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalItem>(ANIMALS_DATA[0]);

  // Trivia state
  const [triviaIndex, setTriviaIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [triviaFeedback, setTriviaFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [triviaScore, setTriviaScore] = useState(0);

  const currentTrivia = ANIMALS_DATA[triviaIndex % ANIMALS_DATA.length];

  const playAnimalAudio = (animal: AnimalItem) => {
    const word =
      dialect === 'chanka' && animal.name.dialectNotes?.chanka
        ? animal.name.dialectNotes.chanka
        : dialect === 'collao' && animal.name.dialectNotes?.collao
        ? animal.name.dialectNotes.collao
        : animal.name.quechua;
    audioService.speakQuechua(word, dialect);
  };

  const renderAnimalIllustration = (name: string, sizeClass = 'w-24 h-24') => {
    switch (name) {
      case 'llama':
      case 'vicuna':
        return <LlamaIllustration className={sizeClass} />;
      case 'condor':
        return <CondorIllustration className={sizeClass} />;
      case 'cuy':
        return <CuyIllustration className={sizeClass} />;
      case 'fox':
      case 'puma':
      default:
        return <FoxIllustration className={sizeClass} />;
    }
  };

  const handleSelectAnswer = (index: number) => {
    setSelectedAnswer(index);
    if (index === currentTrivia.funQuestion.correctIndex) {
      audioService.playSuccessSound();
      setTriviaFeedback('correct');
      setTriviaScore(s => s + 1);
      awardStar(`animals-${currentTrivia.id}`);
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
      });
    } else {
      audioService.playErrorSound();
      setTriviaFeedback('wrong');
    }
  };

  const handleNextTrivia = () => {
    audioService.playPop();
    setSelectedAnswer(null);
    setTriviaFeedback(null);
    setTriviaIndex(prev => prev + 1);
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

        {/* Tab switch */}
        <div className="grid grid-cols-2 sm:flex items-center gap-1 p-1 bg-amber-50 dark:bg-slate-900 rounded-xl border border-amber-200 dark:border-slate-700 w-full sm:w-auto">
          <button
            onClick={() => {
              audioService.playPop();
              setActiveTab('cards');
            }}
            className={`px-3 sm:px-4 py-2 min-h-[40px] rounded-lg text-xs font-bold transition whitespace-nowrap cursor-pointer ${
              activeTab === 'cards'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-amber-600'
            }`}
          >
            {appLang === 'quechua' ? '1. Uywakuna' : '1. Aprender Animales'}
          </button>
          <button
            onClick={() => {
              audioService.playPop();
              setActiveTab('trivia');
            }}
            className={`px-3 sm:px-4 py-2 min-h-[40px] rounded-lg text-xs font-bold transition whitespace-nowrap cursor-pointer ${
              activeTab === 'trivia'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-amber-600'
            }`}
          >
            {appLang === 'quechua' ? '2. Tapukuy' : '2. Preguntas y Trivia'}
          </button>
        </div>
      </div>

      {activeTab === 'cards' ? (
        /* EXPLORE MODE */
        <div className="space-y-5 sm:space-y-6">
          {/* Spotlight Animal */}
          <div className="bg-gradient-to-b from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-4 sm:p-8 shadow-sm border-2 border-amber-300 dark:border-amber-700 text-center">
            <div className="flex flex-col items-center">
              <div className="p-4 rounded-3xl bg-white dark:bg-slate-800 shadow-sm border border-amber-200 dark:border-slate-700 mb-4 animate-bounce-gentle">
                {renderAnimalIllustration(selectedAnimal.iconName, 'w-24 h-24 sm:w-28 sm:h-28')}
              </div>

              <div className="flex items-center gap-3">
                <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-['Fredoka']">
                  {dialect === 'chanka' && selectedAnimal.name.dialectNotes?.chanka
                    ? selectedAnimal.name.dialectNotes.chanka
                    : dialect === 'collao' && selectedAnimal.name.dialectNotes?.collao
                    ? selectedAnimal.name.dialectNotes.collao
                    : selectedAnimal.name.quechua}
                </h3>
                <button
                  onClick={() => playAnimalAudio(selectedAnimal)}
                  className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white shadow-sm active:scale-95 transition"
                  title="Escuchar pronunciación"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mt-1">
                Español: {selectedAnimal.name.spanish}
                {showPhonetics && selectedAnimal.name.phonetic && (
                  <> · Fonética: [{selectedAnimal.name.phonetic}]</>
                )}
              </p>
              {showDialectNotes && selectedAnimal.name.dialectNotes && (
                <p className="text-xs font-medium text-amber-700 dark:text-amber-400 mt-1">
                  Chanka: <strong>{selectedAnimal.name.dialectNotes.chanka || selectedAnimal.name.quechua}</strong> · Collao:{' '}
                  <strong>{selectedAnimal.name.dialectNotes.collao || selectedAnimal.name.quechua}</strong>
                </p>
              )}

              {/* Badges for habitat & sound */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg w-full text-left">
                <div className="p-3 rounded-2xl bg-white/90 dark:bg-slate-800/90 border border-amber-200 dark:border-slate-700">
                  <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 block mb-0.5">
                    {appLang === 'quechua' ? 'Maypim kawsan (Hábitat):' : 'Hábitat:'}
                  </span>
                  <span className="text-xs text-slate-700 dark:text-slate-200">
                    {appLang === 'quechua'
                      ? selectedAnimal.habitat.quechua
                      : selectedAnimal.habitat.spanish}
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-white/90 dark:bg-slate-800/90 border border-amber-200 dark:border-slate-700">
                  <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 block mb-0.5">
                    {appLang === 'quechua' ? 'Waqaynin (Sonido):' : 'Sonido:'}
                  </span>
                  <span className="text-xs text-slate-700 dark:text-slate-200">
                    {appLang === 'quechua'
                      ? selectedAnimal.soundDescription.quechua
                      : selectedAnimal.soundDescription.spanish}
                  </span>
                </div>
              </div>

              <p className="mt-4 text-xs text-slate-600 dark:text-slate-400 max-w-md">
                {appLang === 'quechua'
                  ? selectedAnimal.description.quechua
                  : selectedAnimal.description.spanish}
              </p>
            </div>
          </div>

          {/* Animal Selector Grid */}
          <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-700">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-3 sm:mb-4">
              {appLang === 'quechua' ? 'Uywakunata akllay:' : 'Selecciona un animal para conocerlo:'}
            </span>

            <div
              className={`grid gap-2.5 sm:gap-3 grid-cols-2 ${
                cardScale === 'large' ? 'sm:grid-cols-2' : 'sm:grid-cols-3'
              }`}
            >
              {ANIMALS_DATA.map(ani => {
                const isCur = ani.id === selectedAnimal.id;
                return (
                  <button
                    key={ani.id}
                    onClick={() => {
                      audioService.playPop();
                      setSelectedAnimal(ani);
                      playAnimalAudio(ani);
                    }}
                    className={`p-2.5 sm:p-3 rounded-2xl border-2 flex items-center gap-2.5 sm:gap-3 min-h-[56px] transition active:scale-95 cursor-pointer ${
                      isCur
                        ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 shadow-sm'
                        : 'border-slate-200 dark:border-slate-700 hover:border-amber-300 bg-white dark:bg-slate-800'
                    }`}
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shrink-0">
                      {renderAnimalIllustration(ani.iconName, 'w-9 h-9 sm:w-10 sm:h-10')}
                    </div>
                    <div className="text-left overflow-hidden min-w-0">
                      <span className="block text-sm font-bold text-slate-900 dark:text-white font-['Fredoka'] truncate">
                        {ani.name.quechua}
                      </span>
                      <span className="block text-[11px] text-slate-500 dark:text-slate-400 truncate">
                        {ani.name.spanish}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* TRIVIA MODE */
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-4 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-700 text-center space-y-5 sm:space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-amber-600 dark:text-amber-400">
              {appLang === 'quechua' ? `Puntos: ${triviaScore}` : `Aciertos: ${triviaScore}`}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Pregunta #{triviaIndex + 1}
            </span>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-3xl bg-amber-50 dark:bg-slate-900 inline-block border border-amber-200 dark:border-slate-700">
              {renderAnimalIllustration(currentTrivia.iconName, 'w-24 h-24')}
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800 dark:text-white font-['Fredoka']">
              {appLang === 'quechua'
                ? currentTrivia.funQuestion.question.quechua
                : currentTrivia.funQuestion.question.spanish}
            </h3>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 gap-3 max-w-md mx-auto">
            {currentTrivia.funQuestion.options.map((opt, idx) => {
              const isSelected = selectedAnswer === idx;
              const isCorrect = idx === currentTrivia.funQuestion.correctIndex;

              let style =
                'bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-100 hover:border-amber-400';
              if (isSelected) {
                if (isCorrect) {
                  style = 'bg-emerald-500 border-emerald-600 text-white shadow-md';
                } else {
                  style = 'bg-red-500 border-red-600 text-white shadow-md';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={triviaFeedback !== null}
                  onClick={() => handleSelectAnswer(idx)}
                  className={`p-4 rounded-2xl border-2 font-bold text-sm flex items-center justify-between transition active:scale-95 ${style}`}
                >
                  <span>
                    {appLang === 'quechua' ? opt.quechua : opt.spanish}
                  </span>
                  {isSelected && (
                    <span className="font-extrabold">{isCorrect ? '✓' : '✗'}</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback & Next */}
          {triviaFeedback && (
            <div className="pt-2 animate-in fade-in space-y-3">
              {triviaFeedback === 'correct' ? (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200 text-sm font-bold flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>
                    {appLang === 'quechua'
                      ? '¡Allillamanta! Sumaqta yachaykunki.'
                      : '¡Muy bien! Has respondido correctamente.'}
                  </span>
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-200 text-sm font-bold">
                  {appLang === 'quechua'
                    ? 'Waqmanta yuyaykuy. Allin kutichiyqa kachkanmi.'
                    : '¡Ánimo! Puedes aprender con calma y seguir jugando.'}
                </div>
              )}

              <button
                onClick={handleNextTrivia}
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md active:scale-95 transition"
              >
                {appLang === 'quechua' ? 'Qatiqnin tapukuy' : 'Siguiente pregunta'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
