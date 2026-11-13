import React, { useState, useEffect } from 'react';
import { AppLanguage, QuechuaDialect, MemoryCard } from '../../types';
import { MEMORY_CARDS_MASTER } from '../../data/gamesData';
import { audioService } from '../../services/audioService';
import confetti from 'canvas-confetti';
import { ChevronLeft, RotateCcw, Volume2, Trophy, Star, Sparkles } from 'lucide-react';
import {
  LlamaIllustration,
  CondorIllustration,
  CuyIllustration,
  SunIllustration,
  PotatoIllustration,
  CornIllustration,
} from '../icons/AppIllustrations';

interface MemoryGameProps {
  appLang: AppLanguage;
  dialect: QuechuaDialect;
  onBackToHub: () => void;
}

type Difficulty = 'easy' | 'medium' | 'hard';

export const MemoryGame: React.FC<MemoryGameProps> = ({
  appLang,
  dialect,
  onBackToHub,
}) => {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [isVictory, setIsVictory] = useState(false);

  const pairsCount = difficulty === 'easy' ? 4 : difficulty === 'medium' ? 6 : 8;

  // Initialize or reset game
  const initGame = (diff: Difficulty = difficulty) => {
    const count = diff === 'easy' ? 4 : diff === 'medium' ? 6 : 8;
    const selectedMasters = [...MEMORY_CARDS_MASTER]
      .sort(() => 0.5 - Math.random())
      .slice(0, count);

    // Create 2 cards per master
    const deck: MemoryCard[] = [];
    selectedMasters.forEach((item, idx) => {
      deck.push({
        ...item,
        id: `${item.pairId}-a`,
      });
      deck.push({
        ...item,
        id: `${item.pairId}-b`,
      });
    });

    // Shuffle deck
    const shuffled = deck.sort(() => 0.5 - Math.random());
    setCards(shuffled);
    setFlippedIndices([]);
    setMatchedPairs([]);
    setMoves(0);
    setIsVictory(false);
  };

  useEffect(() => {
    initGame(difficulty);
  }, [difficulty]);

  const handleCardClick = (index: number) => {
    if (flippedIndices.length === 2) return;
    if (flippedIndices.includes(index)) return;
    const clickedCard = cards[index];
    if (matchedPairs.includes(clickedCard.pairId)) return;

    audioService.playCardFlip();
    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    // Speak Quechua word
    audioService.speakQuechua(clickedCard.title.quechua, dialect);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const firstCard = cards[newFlipped[0]];
      const secondCard = cards[newFlipped[1]];

      if (firstCard.pairId === secondCard.pairId) {
        // MATCH!
        setTimeout(() => {
          audioService.playSuccessSound();
          const newMatched = [...matchedPairs, firstCard.pairId];
          setMatchedPairs(newMatched);
          setFlippedIndices([]);

          // Pronounce celebratory bilingual match
          audioService.speakQuechua(`${firstCard.title.quechua}`, dialect);

          if (newMatched.length === pairsCount) {
            // ALL MATCHED - VICTORY!
            setTimeout(() => {
              setIsVictory(true);
              audioService.playFanfare();
              confetti({
                particleCount: 80,
                spread: 100,
                origin: { y: 0.5 },
              });
            }, 400);
          }
        }, 500);
      } else {
        // NO MATCH - flip back
        setTimeout(() => {
          setFlippedIndices([]);
        }, 1100);
      }
    }
  };

  const renderCardIllustration = (iconName: string) => {
    switch (iconName) {
      case 'llama':
        return <LlamaIllustration className="w-12 h-12" />;
      case 'condor':
        return <CondorIllustration className="w-12 h-12" />;
      case 'cuy':
        return <CuyIllustration className="w-12 h-12" />;
      case 'sun':
        return <SunIllustration className="w-12 h-12" />;
      case 'potato':
        return <PotatoIllustration className="w-12 h-12" />;
      case 'corn':
        return <CornIllustration className="w-12 h-12" />;
      case 'palette-red':
        return <span className="text-4xl">🔴</span>;
      case 'palette-blue':
        return <span className="text-4xl">🔵</span>;
      case 'moon':
        return <span className="text-4xl">🌙</span>;
      case 'dog':
      default:
        return <span className="text-4xl">🐕</span>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
        <button
          onClick={onBackToHub}
          className="flex items-center gap-2 text-sm font-bold text-amber-700 dark:text-amber-400 hover:text-amber-800 transition"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>{appLang === 'quechua' ? 'Kutiy pukllaykunaman' : 'Volver a juegos'}</span>
        </button>

        {/* Difficulty Selector */}
        <div className="flex items-center gap-1.5 p-1 bg-amber-50 dark:bg-slate-900 rounded-xl border border-amber-200 dark:border-slate-700">
          {(['easy', 'medium', 'hard'] as Difficulty[]).map(d => (
            <button
              key={d}
              onClick={() => {
                audioService.playPop();
                setDifficulty(d);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                difficulty === d
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-amber-600'
              }`}
            >
              {d === 'easy'
                ? appLang === 'quechua' ? 'Ch\'isi (Fácil - 4)' : 'Fácil (4)'
                : d === 'medium'
                ? appLang === 'quechua' ? 'Chawpi (Medio - 6)' : 'Medio (6)'
                : appLang === 'quechua' ? 'Sasachakuy (Difícil - 8)' : 'Difícil (8)'}
            </button>
          ))}
        </div>

        {/* Reset button */}
        <button
          onClick={() => {
            audioService.playPop();
            initGame();
          }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-200 transition"
        >
          <RotateCcw className="w-4 h-4" />
          <span>{appLang === 'quechua' ? 'Waqmanta' : 'Reiniciar'}</span>
        </button>
      </div>

      {/* Progress & Stat Header */}
      <div className="flex items-center justify-between px-2 text-xs font-bold text-slate-600 dark:text-slate-300">
        <div>
          {appLang === 'quechua'
            ? `Tarisqa: ${matchedPairs.length} / ${pairsCount}`
            : `Parejas encontradas: ${matchedPairs.length} / ${pairsCount}`}
        </div>
        <div>
          {appLang === 'quechua' ? `Pukllaykuna: ${moves}` : `Intentos: ${moves}`}
        </div>
      </div>

      {/* Cards Grid */}
      <div
        className={`grid gap-3 sm:gap-4 ${
          difficulty === 'easy'
            ? 'grid-cols-2 sm:grid-cols-4'
            : difficulty === 'medium'
            ? 'grid-cols-3 sm:grid-cols-4'
            : 'grid-cols-4'
        }`}
      >
        {cards.map((card, index) => {
          const isFlipped =
            flippedIndices.includes(index) || matchedPairs.includes(card.pairId);
          const isMatched = matchedPairs.includes(card.pairId);

          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(index)}
              className={`relative h-32 sm:h-36 rounded-2xl font-bold flex flex-col items-center justify-center p-3 transition-all duration-300 transform active:scale-95 shadow-sm ${
                isFlipped
                  ? isMatched
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 border-2 border-emerald-500 scale-95'
                    : 'bg-white dark:bg-slate-800 border-2 border-amber-400 rotate-0'
                  : 'bg-gradient-to-br from-amber-500 to-orange-500 text-white border-2 border-amber-600 hover:brightness-105'
              }`}
            >
              {isFlipped ? (
                <div className="flex flex-col items-center justify-center space-y-1">
                  {renderCardIllustration(card.iconName)}
                  <span className="text-sm font-extrabold text-slate-900 dark:text-white font-['Fredoka'] mt-1">
                    {card.title.quechua}
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    {card.title.spanish}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-1">
                  <span className="text-3xl">✨</span>
                  <span className="text-xs font-bold opacity-80 font-['Fredoka']">Yachay</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* VICTORY OVERLAY / MODAL */}
      {isVictory && (
        <div className="bg-gradient-to-b from-emerald-50 to-amber-50 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-8 border-4 border-emerald-400 text-center space-y-4 shadow-xl animate-in zoom-in-95">
          <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg">
            <Trophy className="w-8 h-8" />
          </div>

          <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white font-['Fredoka']">
            {appLang === 'quechua' ? '¡Allillamanta! ¡Llapan tarisqa!' : '¡Felicitaciones! ¡Ganaste!'}
          </h3>

          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-sm mx-auto">
            {appLang === 'quechua'
              ? `Tukuy lliw cartas parejas tarisqa ${moves} pukllaykunapi. ¡Sumaqta yachakunki!`
              : `Encontraste todas las parejas en ${moves} intentos. ¡Excelente memoria bilingüe!`}
          </p>

          <div className="flex items-center justify-center gap-2 text-amber-500">
            <Star className="w-6 h-6 fill-amber-400" />
            <Star className="w-8 h-8 fill-amber-400" />
            <Star className="w-6 h-6 fill-amber-400" />
          </div>

          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              onClick={() => {
                audioService.playPop();
                initGame();
              }}
              className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md active:scale-95 transition"
            >
              {appLang === 'quechua' ? 'Waqmanta pukllay' : 'Jugar otra vez'}
            </button>
            <button
              onClick={onBackToHub}
              className="px-6 py-3 rounded-2xl bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 font-bold text-sm hover:bg-slate-100 transition"
            >
              {appLang === 'quechua' ? 'Lluqsiy' : 'Ir al menú'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
