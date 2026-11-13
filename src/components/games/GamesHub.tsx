import React from 'react';
import { AppLanguage, GameSubTab, QuechuaDialect } from '../../types';
import { audioService } from '../../services/audioService';
import {
  SunIllustration,
  LlamaIllustration,
  PotatoIllustration,
  CornIllustration,
  RainbowIllustration,
} from '../icons/AppIllustrations';
import { Sparkles, ArrowRight, Star } from 'lucide-react';

interface GamesHubProps {
  appLang: AppLanguage;
  dialect: QuechuaDialect;
  onSelectGame: (game: GameSubTab) => void;
}

export const GamesHub: React.FC<GamesHubProps> = ({
  appLang,
  dialect,
  onSelectGame,
}) => {
  const gamesList = [
    {
      id: 'numbers' as GameSubTab,
      titleQuechua: '1. Yupaykuna (Números 1-10)',
      titleSpanish: '1. Aprendiendo los números en quechua',
      descQuechua: 'Hukmanta chunka kama yupasunchis sumaq pukllaywan.',
      descSpanish: 'Aprende a contar del 1 al 10 con objetos andinos, voz y desafíos.',
      icon: <SunIllustration className="w-16 h-16 animate-bounce-gentle" />,
      colorClass: 'from-amber-500 to-orange-500',
      badgeQuechua: 'Yupaykuna 1-10',
      badgeSpanish: 'Números 1 al 10',
    },
    {
      id: 'memory' as GameSubTab,
      titleQuechua: '2. Yuyay Pukllay (Memoria)',
      titleSpanish: '2. Juego de memoria bilingüe',
      descQuechua: 'Tarjetakunata qhawaspa iskay masintinta tarisunchis.',
      descSpanish: 'Descubre parejas ilustradas con pronunciación en quechua y español.',
      icon: <LlamaIllustration className="w-16 h-16" />,
      colorClass: 'from-pink-500 to-rose-500',
      badgeQuechua: 'Yuyaychakuq',
      badgeSpanish: 'Memoria & Tarjetas',
    },
    {
      id: 'colors' as GameSubTab,
      titleQuechua: '3. Llimpikuna (Colores)',
      titleSpanish: '3. Aprendamos los colores',
      descQuechua: 'Puka, anqas, q\'omer, q\'ellu... k\'uychipa llimpinkuna.',
      descSpanish: 'Reconoce colores llamativos y asócialos con la naturaleza andina.',
      icon: <RainbowIllustration className="w-16 h-16" />,
      colorClass: 'from-emerald-500 to-teal-500',
      badgeQuechua: 'K\'uychipita',
      badgeSpanish: 'Arcoíris Andino',
    },
    {
      id: 'animals' as GameSubTab,
      titleQuechua: '4. Uywakuna (Animales)',
      titleSpanish: '4. Conociendo los animales del Perú',
      descQuechua: 'Llama, kuntur, wikuña, quy, puma... sumaq uywakuna.',
      descSpanish: 'Animales domésticos y silvestres del Perú con sus nombres y sonidos.',
      icon: <LlamaIllustration className="w-16 h-16" />,
      colorClass: 'from-sky-500 to-blue-600',
      badgeQuechua: 'Perú Uywakuna',
      badgeSpanish: 'Fauna Peruana',
    },
    {
      id: 'foods' as GameSubTab,
      titleQuechua: '5. Mikhunakuna (Alimentos)',
      titleSpanish: '5. Frutas y alimentos andinos',
      descQuechua: 'Papa, sara choclo, kinwa, chuñu... mikhunanchiskuna.',
      descSpanish: 'Descubre los superalimentos ancestrales y juega con la canasta andina.',
      icon: <CornIllustration className="w-16 h-16" />,
      colorClass: 'from-amber-600 to-yellow-600',
      badgeQuechua: 'Pachamama',
      badgeSpanish: 'Cosecha Ancestral',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Hero Welcome banner for Kids */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white p-6 sm:p-8 shadow-md">
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-bold mb-3">
            <Sparkles className="w-4 h-4 text-amber-200" />
            <span>
              {appLang === 'quechua'
                ? 'Yachay Kids · Kusisqa Yachakusunchis'
                : 'Yachay Kids · Educación Intercultural'}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-['Fredoka'] drop-shadow-sm">
            {appLang === 'quechua' ? '¡Aprendamos jugando!' : '¡Aprendamos jugando!'}
          </h2>

          <p className="mt-2 text-sm sm:text-base text-amber-100 font-medium">
            {appLang === 'quechua'
              ? 'Pukllaspam yachakunchis runasimi rimayta. Akllay mayqen pukllaytataq munanki:'
              : 'Juegos interactivos con audios, colores y tarjetas para aprender quechua y español sin conexión a internet.'}
          </p>
        </div>

        {/* Floating illustrations on the right */}
        <div className="hidden sm:block absolute -right-4 -bottom-6 opacity-90 transform hover:scale-105 transition-transform">
          <LlamaIllustration className="w-36 h-36" />
        </div>
      </div>

      {/* Grid of 5 Games */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {gamesList.map(game => (
          <div
            key={game.id}
            onClick={() => {
              audioService.playPop();
              onSelectGame(game.id);
            }}
            className="group relative cursor-pointer bg-white dark:bg-slate-800 rounded-3xl p-6 border-2 border-slate-200 dark:border-slate-700 hover:border-amber-400 dark:hover:border-amber-500 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
            role="button"
            tabIndex={0}
          >
            <div>
              {/* Card Header with Icon and Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-amber-50 dark:bg-slate-700/80 group-hover:scale-110 transition-transform">
                  {game.icon}
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                  {appLang === 'quechua' ? game.badgeQuechua : game.badgeSpanish}
                </span>
              </div>

              {/* Titles */}
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white font-['Fredoka'] group-hover:text-amber-600 transition-colors">
                {appLang === 'quechua' ? game.titleQuechua : game.titleSpanish}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 line-clamp-2">
                {appLang === 'quechua' ? game.descQuechua : game.descSpanish}
              </p>
            </div>

            {/* Play Button CTA */}
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-amber-600 dark:text-amber-400 font-bold text-xs sm:text-sm">
              <span>{appLang === 'quechua' ? 'Pukllayta qallariy' : '¡Comenzar a jugar!'}</span>
              <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
