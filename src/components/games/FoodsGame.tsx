import React, { useState } from 'react';
import { AppLanguage, QuechuaDialect, FoodItem } from '../../types';
import { FOODS_DATA } from '../../data/gamesData';
import { audioService } from '../../services/audioService';
import { useUserProfile } from '../../context/UserProfileContext';
import confetti from 'canvas-confetti';
import { ChevronLeft, Volume2, CheckCircle2, RotateCcw, ShoppingBag, Sparkles } from 'lucide-react';
import {
  PotatoIllustration,
  CornIllustration,
} from '../icons/AppIllustrations';

interface FoodsGameProps {
  appLang: AppLanguage;
  dialect: QuechuaDialect;
  onBackToHub: () => void;
}

export const FoodsGame: React.FC<FoodsGameProps> = ({
  appLang,
  dialect,
  onBackToHub,
}) => {
  const { profile, awardStar } = useUserProfile();
  const { showPhonetics, showDialectNotes, cardScale } = profile.config;
  const [activeTab, setActiveTab] = useState<'learn' | 'basket'>('learn');
  const [selectedFood, setSelectedFood] = useState<FoodItem>(FOODS_DATA[0]);

  // Basket Game State: "Canasta Andina" - target food requested to find
  const [targetFoodIndex, setTargetFoodIndex] = useState(0);
  const [basketItems, setBasketItems] = useState<string[]>([]);
  const [basketFeedback, setBasketFeedback] = useState<string | null>(null);

  const targetFood = FOODS_DATA[targetFoodIndex % FOODS_DATA.length];

  const playFoodAudio = (food: FoodItem) => {
    const word =
      dialect === 'chanka' && food.name.dialectNotes?.chanka
        ? food.name.dialectNotes.chanka
        : dialect === 'collao' && food.name.dialectNotes?.collao
        ? food.name.dialectNotes.collao
        : food.name.quechua;
    audioService.speakQuechua(word, dialect);
  };

  const renderFoodIcon = (iconName: string, sizeClass = 'w-20 h-20') => {
    switch (iconName) {
      case 'potato':
        return <PotatoIllustration className={sizeClass} />;
      case 'corn':
        return <CornIllustration className={sizeClass} />;
      case 'wheat':
        return <span className="text-5xl">🌾</span>;
      case 'circle-dot':
        return <span className="text-5xl">🥔</span>;
      case 'sparkle':
        return <span className="text-5xl">🍠</span>;
      case 'apple':
      case 'fruit':
        return <span className="text-5xl">🍈</span>;
      case 'citrus':
        return <span className="text-5xl">🍐</span>;
      case 'nut':
      default:
        return <span className="text-5xl">🥑</span>;
    }
  };

  const handlePickFoodForBasket = (food: FoodItem) => {
    if (food.id === targetFood.id) {
      audioService.playSuccessSound();
      audioService.speakQuechua(`Allinmi! ${food.name.quechua}`, dialect);
      setBasketItems(b => [...b, food.name.quechua]);
      setBasketFeedback('correct');
      awardStar(`foods-${food.id}`);

      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
      });

      setTimeout(() => {
        setBasketFeedback(null);
        setTargetFoodIndex(prev => prev + 1);
      }, 1400);
    } else {
      audioService.playErrorSound();
      setBasketFeedback('wrong');
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

        {/* Tab switch */}
        <div className="flex items-center gap-1.5 p-1 bg-amber-50 dark:bg-slate-900 rounded-xl border border-amber-200 dark:border-slate-700">
          <button
            onClick={() => {
              audioService.playPop();
              setActiveTab('learn');
            }}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
              activeTab === 'learn'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-amber-600'
            }`}
          >
            {appLang === 'quechua' ? '1. Mikhunakuna (Aprender)' : '1. Conocer Alimentos'}
          </button>
          <button
            onClick={() => {
              audioService.playPop();
              setActiveTab('basket');
            }}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
              activeTab === 'basket'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-amber-600'
            }`}
          >
            {appLang === 'quechua' ? '2. Canastacha (Canasta)' : '2. Juego de la Canasta'}
          </button>
        </div>
      </div>

      {activeTab === 'learn' ? (
        /* EXPLORE MODE */
        <div className="space-y-6">
          {/* Spotlight Food */}
          <div className="bg-gradient-to-b from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-6 sm:p-8 shadow-sm border-2 border-amber-300 dark:border-amber-700 text-center">
            <div className="flex flex-col items-center">
              <div className="p-4 rounded-3xl bg-white dark:bg-slate-800 shadow-sm border border-amber-200 dark:border-slate-700 mb-4 animate-bounce-gentle">
                {renderFoodIcon(selectedFood.iconName, 'w-24 h-24')}
              </div>

              <div className="flex items-center gap-3">
                <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-['Fredoka']">
                  {dialect === 'chanka' && selectedFood.name.dialectNotes?.chanka
                    ? selectedFood.name.dialectNotes.chanka
                    : dialect === 'collao' && selectedFood.name.dialectNotes?.collao
                    ? selectedFood.name.dialectNotes.collao
                    : selectedFood.name.quechua}
                </h3>
                <button
                  onClick={() => playFoodAudio(selectedFood)}
                  className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white shadow-sm active:scale-95 transition"
                  title="Escuchar pronunciación"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mt-1">
                Español: {selectedFood.name.spanish}
                {showPhonetics && selectedFood.name.phonetic && (
                  <> · Fonética: [{selectedFood.name.phonetic}]</>
                )}
              </p>
              {showDialectNotes && selectedFood.name.dialectNotes && (
                <p className="text-xs font-medium text-amber-700 dark:text-amber-400 mt-1">
                  Chanka: <strong>{selectedFood.name.dialectNotes.chanka || selectedFood.name.quechua}</strong> · Collao:{' '}
                  <strong>{selectedFood.name.dialectNotes.collao || selectedFood.name.quechua}</strong>
                </p>
              )}

              {/* Cultural and Nutrition Notes */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg w-full text-left">
                <div className="p-3 rounded-2xl bg-white/90 dark:bg-slate-800/90 border border-amber-200 dark:border-slate-700">
                  <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 block mb-0.5">
                    {appLang === 'quechua' ? 'Imaynam mikhuna (Descripción):' : 'Descripción:'}
                  </span>
                  <span className="text-xs text-slate-700 dark:text-slate-200">
                    {appLang === 'quechua'
                      ? selectedFood.description.quechua
                      : selectedFood.description.spanish}
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-white/90 dark:bg-slate-800/90 border border-amber-200 dark:border-slate-700">
                  <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 block mb-0.5">
                    {appLang === 'quechua' ? 'Yachayninchis (Nota cultural):' : 'Tradición andina:'}
                  </span>
                  <span className="text-xs text-slate-700 dark:text-slate-200">
                    {appLang === 'quechua'
                      ? selectedFood.culturalNote.quechua
                      : selectedFood.culturalNote.spanish}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Grid selector */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-4">
              {appLang === 'quechua' ? 'Mikhunata akllay:' : 'Selecciona un alimento para conocerlo:'}
            </span>

            <div
              className={`grid gap-3 ${
                cardScale === 'large' ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-2 sm:grid-cols-4'
              }`}
            >
              {FOODS_DATA.map(food => {
                const isCur = food.id === selectedFood.id;
                return (
                  <button
                    key={food.id}
                    onClick={() => {
                      audioService.playPop();
                      setSelectedFood(food);
                      playFoodAudio(food);
                    }}
                    className={`p-3 rounded-2xl border-2 flex items-center gap-3 transition active:scale-95 ${
                      isCur
                        ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 shadow-sm'
                        : 'border-slate-200 dark:border-slate-700 hover:border-amber-300 bg-white dark:bg-slate-800'
                    }`}
                  >
                    <div className="w-10 h-10 flex items-center justify-center shrink-0">
                      {renderFoodIcon(food.iconName, 'w-8 h-8')}
                    </div>
                    <div className="text-left overflow-hidden">
                      <span className="block text-sm font-bold text-slate-900 dark:text-white font-['Fredoka'] truncate">
                        {food.name.quechua}
                      </span>
                      <span className="block text-[11px] text-slate-500 dark:text-slate-400 truncate">
                        {food.name.spanish}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* BASKET GAME MODE */
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-700 text-center space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-bold text-amber-600 dark:text-amber-400">
              <ShoppingBag className="w-5 h-5" />
              <span>
                {appLang === 'quechua'
                  ? `Canastapi: ${basketItems.length} mikhunakuna`
                  : `En la canasta: ${basketItems.length} alimentos`}
              </span>
            </div>
            <button
              onClick={() => {
                audioService.playPop();
                setBasketItems([]);
              }}
              className="text-xs text-slate-500 dark:text-slate-400 hover:text-amber-600"
            >
              Vaciar canasta
            </button>
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-white font-['Fredoka']">
              {appLang === 'quechua'
                ? `¡Churay canastaman: «${targetFood.name.quechua}»!`
                : `¡Coloca en la canasta: «${targetFood.name.quechua}» (${targetFood.name.spanish})!`}
            </h3>
            <button
              onClick={() => playFoodAudio(targetFood)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 text-xs font-bold hover:bg-amber-200 transition"
            >
              <Volume2 className="w-4 h-4 text-amber-600" />
              <span>Escuchar en quechua</span>
            </button>
          </div>

          {/* Food Grid Choices */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto py-3">
            {FOODS_DATA.map(food => (
              <button
                key={food.id}
                onClick={() => handlePickFoodForBasket(food)}
                className="p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-amber-400 bg-slate-50 dark:bg-slate-900 flex flex-col items-center justify-center transition active:scale-90 shadow-sm"
              >
                <div className="mb-2">{renderFoodIcon(food.iconName, 'w-14 h-14')}</div>
                <span className="text-sm font-extrabold text-slate-800 dark:text-white font-['Fredoka']">
                  {food.name.quechua}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {food.name.spanish}
                </span>
              </button>
            ))}
          </div>

          {/* Feedback */}
          {basketFeedback && (
            <div className="animate-in fade-in">
              {basketFeedback === 'correct' ? (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200 text-sm font-bold flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>
                    {appLang === 'quechua'
                      ? `¡Allillamanta! Canastaman churasqa: ${targetFood.name.quechua}`
                      : `¡Excelente! Has guardado ${targetFood.name.quechua} en la canasta.`}
                  </span>
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-200 text-sm font-bold">
                  {appLang === 'quechua'
                    ? `Waqmanta maskhay: ${targetFood.name.quechua}`
                    : `Intenta otra vez. Estamos buscando: ${targetFood.name.quechua} (${targetFood.name.spanish})`}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
