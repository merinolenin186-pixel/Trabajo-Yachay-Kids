import React, { useState } from 'react';
import {
  AppLanguage,
  GameSubTab,
  QuechuaDialect,
  CustomSection,
  AdminVideoItem,
  AdminAudioItem,
} from '../../types';
import { audioService } from '../../services/audioService';
import { useAdmin } from '../../context/AdminContext';
import { useUserProfile } from '../../context/UserProfileContext';
import { CustomVideoPlayerModal } from '../videos/CustomVideoPlayerModal';
import { AudioPlayerModal } from '../videos/AudioPlayerModal';
import {
  SunIllustration,
  LlamaIllustration,
  CornIllustration,
  RainbowIllustration,
} from '../icons/AppIllustrations';
import { PictogramDrawing } from '../icons/PictogramDrawing';
import { Sparkles, ArrowRight, Layers, Volume2, Play, Film, Music, X, Star } from 'lucide-react';

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
  const { customTexts, hiddenOptions, customSections, customVideos, customAudios } = useAdmin();
  const { profile } = useUserProfile();
  const [activeSection, setActiveSection] = useState<CustomSection | null>(null);
  const [activeCustomVideo, setActiveCustomVideo] = useState<AdminVideoItem | null>(null);
  const [activeCustomAudio, setActiveCustomAudio] = useState<AdminAudioItem | null>(null);

  const isLargeCards = profile.config.cardScale === 'large';
  const [gameFilter, setGameFilter] = useState<'all' | 'inicial' | 'vocab'>('all');

  const gamesList = [
    {
      id: 'match' as GameSubTab,
      group: 'inicial' as const,
      isNew: true,
      titleQuechua: '1. Rikchayta Sutinwan Tinkuchiy',
      titleSpanish: '1. Lleva la imagen con su nombre',
      descQuechua: 'Rikchaykunata sutinkunawan tinkuchiy pukllaspa.',
      descSpanish: 'Une o arrastra cada dibujo con su nombre en quechua y español.',
      icon: <PictogramDrawing drawing="dog" className="w-16 h-16" />,
      colorClass: 'from-amber-500 to-orange-500',
      badgeQuechua: 'Inicial · Tinkuchiy',
      badgeSpanish: 'Nuevo · Asociar',
    },
    {
      id: 'counting' as GameSubTab,
      group: 'inicial' as const,
      isNew: true,
      titleQuechua: '2. ¿Haykaqtaq Kachkan? (Yupay)',
      titleSpanish: '2. ¿Cuántos objetos hay?',
      descQuechua: 'Dibujokunata yupaspa allin yupayta akllay.',
      descSpanish: 'Toca los dibujos para contarlos y marca el número correcto.',
      icon: <PictogramDrawing drawing="num-5" className="w-16 h-16" />,
      colorClass: 'from-sky-500 to-indigo-500',
      badgeQuechua: 'Inicial · Yupay',
      badgeSpanish: 'Nuevo · Contar',
    },
    {
      id: 'pictureColors' as GameSubTab,
      group: 'inicial' as const,
      isNew: true,
      titleQuechua: '3. ¿Ima Llimpikunataq? (Dibujo)',
      titleSpanish: '3. ¿Qué colores ves en la imagen?',
      descQuechua: 'Sumaq dibujokunapi llimpikunata qhawaspa akllay.',
      descSpanish: 'Observa escenas coloridas y marca todos los colores que ves.',
      icon: <RainbowIllustration className="w-16 h-16" />,
      colorClass: 'from-purple-500 to-pink-500',
      badgeQuechua: 'Inicial · Llimpi',
      badgeSpanish: 'Nuevo · Colores',
    },
    {
      id: 'shapes' as GameSubTab,
      group: 'inicial' as const,
      isNew: true,
      titleQuechua: '4. Figuras Geométricas',
      titleSpanish: '4. Figuras geométricas para Inicial',
      descQuechua: 'Muyu, tawa k\'uchu, kimsa k\'uchu, sonqo, quyllur.',
      descSpanish: 'Aprende círculo, cuadrado, triángulo, estrella y corazón jugando.',
      icon: <PictogramDrawing drawing="star" className="w-16 h-16" />,
      colorClass: 'from-rose-500 to-amber-500',
      badgeQuechua: 'Inicial · Rikchay',
      badgeSpanish: 'Nuevo · Formas',
    },
    {
      id: 'shadows' as GameSubTab,
      group: 'inicial' as const,
      isNew: true,
      titleQuechua: '5. Llanthuta Tariy (Sombras)',
      titleSpanish: '5. Encuentra la sombra correcta',
      descQuechua: 'Yana llanthuta qhawaspa igualnin dibujota tariy.',
      descSpanish: 'Descubre a qué animal u objeto pertenece cada silueta oscura.',
      icon: <PictogramDrawing drawing="cat" className="w-16 h-16" />,
      colorClass: 'from-indigo-500 to-violet-600',
      badgeQuechua: 'Inicial · Llanthu',
      badgeSpanish: 'Nuevo · Sombras',
    },
    {
      id: 'sizes' as GameSubTab,
      group: 'inicial' as const,
      isNew: true,
      titleQuechua: '6. Hatunwan Huch\'uy (Tamaños)',
      titleSpanish: '6. Grande, pequeño y opuestos',
      descQuechua: 'Hatun, huch\'uy, askha, aslla, hanaq, uray, kusisqa.',
      descSpanish: 'Compara tamaños, cantidades (muchos/pocos), posiciones y emociones.',
      icon: <PictogramDrawing drawing="smile" className="w-16 h-16" />,
      colorClass: 'from-teal-500 to-emerald-500',
      badgeQuechua: 'Inicial · Tupuy',
      badgeSpanish: 'Nuevo · Comparar',
    },
    {
      id: 'series' as GameSubTab,
      group: 'inicial' as const,
      isNew: true,
      titleQuechua: '7. Completa la Serie',
      titleSpanish: '7. Completa la serie lógica',
      descQuechua: '¿Mayqen dibujotaq qatiqnin? Ordenniyta hunt\'apay.',
      descSpanish: 'Descubre qué dibujo continúa la secuencia divertida.',
      icon: <PictogramDrawing drawing="play" className="w-16 h-16" />,
      colorClass: 'from-fuchsia-500 to-rose-500',
      badgeQuechua: 'Inicial · Qatiq',
      badgeSpanish: 'Nuevo · Secuencias',
    },
    {
      id: 'numbers' as GameSubTab,
      group: 'vocab' as const,
      isNew: false,
      titleQuechua: '8. Yupaykuna (Números 1-10)',
      titleSpanish: '8. Aprendiendo los números del 1 al 10',
      descQuechua: 'Hukmanta chunka kama yupasunchis sumaq pukllaywan.',
      descSpanish: 'Aprende a contar del 1 al 10 con objetos andinos, voz y desafíos.',
      icon: <SunIllustration className="w-16 h-16 animate-bounce-gentle" />,
      colorClass: 'from-amber-500 to-orange-500',
      badgeQuechua: 'Yupaykuna 1-10',
      badgeSpanish: 'Números 1 al 10',
    },
    {
      id: 'memory' as GameSubTab,
      group: 'vocab' as const,
      isNew: false,
      titleQuechua: '9. Yuyay Pukllay (Memoria)',
      titleSpanish: '9. Juego de memoria bilingüe',
      descQuechua: 'Tarjetakunata qhawaspa iskay masintinta tarisunchis.',
      descSpanish: 'Descubre parejas ilustradas con pronunciación en quechua y español.',
      icon: <LlamaIllustration className="w-16 h-16" />,
      colorClass: 'from-pink-500 to-rose-500',
      badgeQuechua: 'Yuyaychakuq',
      badgeSpanish: 'Memoria & Tarjetas',
    },
    {
      id: 'colors' as GameSubTab,
      group: 'vocab' as const,
      isNew: false,
      titleQuechua: '10. Llimpikuna (Colores)',
      titleSpanish: '10. Aprendamos los colores',
      descQuechua: 'Puka, anqas, q\'omer, q\'ellu... k\'uychipa llimpinkuna.',
      descSpanish: 'Reconoce colores llamativos y asócialos con la naturaleza andina.',
      icon: <RainbowIllustration className="w-16 h-16" />,
      colorClass: 'from-emerald-500 to-teal-500',
      badgeQuechua: 'K\'uychipita',
      badgeSpanish: 'Arcoíris Andino',
    },
    {
      id: 'animals' as GameSubTab,
      group: 'vocab' as const,
      isNew: false,
      titleQuechua: '11. Uywakuna (Animales)',
      titleSpanish: '11. Conociendo los animales del Perú',
      descQuechua: 'Llama, kuntur, wikuña, quy, puma... sumaq uywakuna.',
      descSpanish: 'Animales domésticos y silvestres del Perú con sus nombres y sonidos.',
      icon: <LlamaIllustration className="w-16 h-16" />,
      colorClass: 'from-sky-500 to-blue-600',
      badgeQuechua: 'Perú Uywakuna',
      badgeSpanish: 'Fauna Peruana',
    },
    {
      id: 'foods' as GameSubTab,
      group: 'vocab' as const,
      isNew: false,
      titleQuechua: '12. Mikhunakuna (Alimentos)',
      titleSpanish: '12. Frutas y alimentos andinos',
      descQuechua: 'Papa, sara choclo, kinwa, chuñu... mikhunanchiskuna.',
      descSpanish: 'Descubre los superalimentos ancestrales y juega con la canasta andina.',
      icon: <CornIllustration className="w-16 h-16" />,
      colorClass: 'from-amber-600 to-yellow-600',
      badgeQuechua: 'Pachamama',
      badgeSpanish: 'Cosecha Ancestral',
    },
  ];

  const visibleGames = gamesList
    .filter(g => !hiddenOptions.games.includes(g.id))
    .filter(g => gameFilter === 'all' || g.group === gameFilter);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Hero Welcome banner for Kids */}
      <div className="yachay-hero-banner relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white p-5 sm:p-8 shadow-md">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
          <div className="max-w-xl min-w-0">
            <div className="flex items-center gap-2 text-xs font-bold text-white/90 mb-1.5 sm:mb-2">
              <Sparkles className="w-4 h-4 text-amber-200 shrink-0" />
              <span className="truncate">
                {customTexts.appName || 'Yachay Kids'} ·{' '}
                {appLang === 'quechua'
                  ? `Allinllanchu, ${profile.name}!`
                  : `¡Hola, ${profile.name}!`}
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-['Fredoka'] drop-shadow-sm text-balance leading-tight">
              {appLang === 'quechua'
                ? customTexts.heroTitle.quechua
                : customTexts.heroTitle.spanish}
            </h2>

            <p className="mt-2 text-xs sm:text-base text-white/95 font-medium">
              {appLang === 'quechua'
                ? customTexts.heroDescription.quechua
                : customTexts.heroDescription.spanish}
            </p>
          </div>

          {/* Interactive Child Avatar Card in Hero */}
          <button
            type="button"
            onClick={() => {
              audioService.playPop();
              if (appLang === 'quechua') {
                audioService.speakQuechua(
                  `Allinllanchu ${profile.name}! Kunanqa pukllaykunawan yachakusunchis.`,
                  dialect
                );
              } else {
                audioService.speakSpanish(
                  `¡Hola ${profile.name}! Vamos a aprender jugando juntos.`
                );
              }
            }}
            className="w-full sm:w-auto self-start md:self-auto flex items-center gap-3 p-2.5 sm:p-3 pr-4 rounded-2xl bg-black/20 hover:bg-black/30 border border-white/25 backdrop-blur-sm transition active:scale-95 cursor-pointer shrink-0"
            title="Toca tu foto para escuchar un saludo"
          >
            <img
              src={profile.avatarImage}
              alt={profile.name}
              referrerPolicy="no-referrer"
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border-2 border-white shadow shrink-0"
            />
            <div className="text-left min-w-0">
              <span className="text-base font-extrabold text-white block leading-tight truncate">
                {profile.name}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-amber-200 font-bold mt-0.5 tabular-nums">
                <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                <span>{profile.stars} estrellas</span>
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-white/85 mt-1 block">
                <Volume2 className="w-3.5 h-3.5 inline mr-1" />
                <span>Toca para saludar</span>
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Filter Tabs for Easy Browsing */}
      <div className="flex flex-wrap items-center gap-2">
        {[
          { id: 'all' as const, label: 'Todos los juegos (12)' },
          { id: 'inicial' as const, label: 'Juegos de Inicial (Nuevos)' },
          { id: 'vocab' as const, label: 'Vocabulario y Memoria' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              audioService.playPop();
              setGameFilter(tab.id);
            }}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition cursor-pointer ${
              gameFilter === tab.id
                ? 'bg-amber-500 text-white shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-amber-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid of Games */}
      {visibleGames.length > 0 ? (
        <div
          className={`grid gap-4 sm:gap-6 ${
            isLargeCards
              ? 'grid-cols-1 md:grid-cols-2'
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {visibleGames.map(game => (
            <div
              key={game.id}
              onClick={() => {
                audioService.playPop();
                onSelectGame(game.id);
              }}
              className={`yachay-card-surface group relative cursor-pointer bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 hover:border-amber-400 dark:hover:border-amber-500 shadow-sm hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 flex flex-col justify-between ${
                isLargeCards ? 'p-5 sm:p-8' : 'p-4 sm:p-6'
              }`}
              role="button"
              tabIndex={0}
            >
              <div>
                {/* Card Header with Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`rounded-2xl bg-amber-50 dark:bg-slate-700/80 group-hover:scale-110 transition-transform ${
                      isLargeCards ? 'p-4 scale-110 origin-left' : 'p-3'
                    }`}
                  >
                    {game.icon}
                  </div>
                  <span
                    className={`text-xs font-extrabold px-2.5 py-1 rounded-full ${
                      game.isNew
                        ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                        : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {appLang === 'quechua' ? game.badgeQuechua : game.badgeSpanish}
                  </span>
                </div>

                {/* Titles */}
                <h3
                  className={`font-extrabold text-slate-900 dark:text-white font-['Fredoka'] group-hover:text-amber-600 transition-colors ${
                    isLargeCards ? 'text-2xl' : 'text-xl'
                  }`}
                >
                  {appLang === 'quechua' ? game.titleQuechua : game.titleSpanish}
                </h3>

                <p
                  className={`text-slate-600 dark:text-slate-300 mt-2 ${
                    isLargeCards ? 'text-sm sm:text-base' : 'text-xs sm:text-sm line-clamp-2'
                  }`}
                >
                  {appLang === 'quechua' ? game.descQuechua : game.descSpanish}
                </p>
              </div>

              {/* Play Button CTA */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-amber-600 dark:text-amber-400 font-bold text-xs sm:text-sm">
                <span>
                  {appLang === 'quechua'
                    ? 'Pukllayta qallariy'
                    : isLargeCards
                    ? '¡Toca aquí para jugar!'
                    : '¡Comenzar a jugar!'}
                </span>
                <div className="w-9 h-9 rounded-full bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 text-center text-sm text-slate-500 dark:text-slate-400">
          Todos los juegos predeterminados están ocultos por el administrador. Puedes reactivarlos desde Ajustes → Panel Administrador.
        </div>
      )}

      {/* Custom Admin Sections */}
      {customSections.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <Layers className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white font-['Fredoka']">
              {appLang === 'quechua'
                ? 'Musuq Yachaykuna (Secciones agregadas)'
                : 'Nuevas Secciones Educativas'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {customSections.map(section => (
              <div
                key={section.id}
                onClick={() => {
                  audioService.playPop();
                  setActiveSection(section);
                }}
                role="button"
                tabIndex={0}
                className="yachay-card-surface group cursor-pointer bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 hover:border-amber-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className={`h-24 ${section.accentColor || 'bg-amber-500'} flex items-center justify-between px-6 text-white`}>
                    <span className="text-5xl drop-shadow">{section.icon || '📚'}</span>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-black/25 backdrop-blur-sm">
                      {section.items.length} {section.items.length === 1 ? 'recurso' : 'recursos'}
                    </span>
                  </div>
                  <div className="p-5">
                    <h4 className="text-lg font-extrabold text-slate-900 dark:text-white font-['Fredoka']">
                      {appLang === 'quechua' ? section.title.quechua : section.title.spanish}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 line-clamp-2">
                      {appLang === 'quechua' ? section.description.quechua : section.description.spanish}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-2 flex items-center justify-between text-amber-600 dark:text-amber-400 font-bold text-xs">
                  <span>{appLang === 'quechua' ? 'Kichariy' : 'Explorar sección'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Custom Section Detail Modal */}
      {activeSection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-hidden border-2 border-amber-400 shadow-2xl flex flex-col">
            <div className={`${activeSection.accentColor || 'bg-amber-500'} p-5 text-white flex items-center justify-between`}>
              <div className="flex items-center gap-3">
                <span className="text-4xl">{activeSection.icon}</span>
                <div>
                  <h3 className="text-xl font-extrabold font-['Fredoka']">
                    {appLang === 'quechua' ? activeSection.title.quechua : activeSection.title.spanish}
                  </h3>
                  <p className="text-xs text-white/90">
                    {appLang === 'quechua' ? activeSection.title.spanish : activeSection.title.quechua}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveSection(null)}
                className="p-2 rounded-full bg-black/20 hover:bg-black/30 transition cursor-pointer"
                aria-label="Cerrar sección"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4">
              <p className="text-sm text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700">
                {appLang === 'quechua' ? activeSection.description.quechua : activeSection.description.spanish}
              </p>

              {activeSection.items.length === 0 ? (
                <p className="text-center text-xs text-slate-500 py-8">
                  Esta sección aún no tiene elementos. Agrega contenidos desde el Panel Administrador.
                </p>
              ) : (
                <div className="space-y-3">
                  {activeSection.items.map(item => {
                    const linkedAudio = item.audioId
                      ? customAudios.find(a => a.id === item.audioId)
                      : undefined;
                    const linkedVideo = item.videoId
                      ? customVideos.find(v => v.id === item.videoId)
                      : undefined;

                    return (
                      <div
                        key={item.id}
                        className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-3xl shrink-0">{item.icon || '✨'}</span>
                          <div>
                            <h4 className="font-extrabold text-slate-900 dark:text-white text-base">
                              {appLang === 'quechua' ? item.title.quechua : item.title.spanish}
                            </h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              {appLang === 'quechua' ? item.title.spanish : item.title.quechua}
                            </p>
                            <p className="text-xs text-slate-700 dark:text-slate-300 mt-1">
                              {appLang === 'quechua' ? item.description.quechua : item.description.spanish}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 flex-wrap">
                          <button
                            onClick={() => {
                              if (appLang === 'quechua') {
                                audioService.speakQuechua(
                                  `${item.title.quechua}. ${item.description.quechua}`,
                                  dialect
                                );
                              } else {
                                audioService.speakSpanish(
                                  `${item.title.spanish}. ${item.description.spanish}`
                                );
                              }
                            }}
                            className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>Escuchar</span>
                          </button>

                          {linkedAudio && (
                            <button
                              onClick={() => setActiveCustomAudio(linkedAudio)}
                              className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                            >
                              <Music className="w-3.5 h-3.5" />
                              <span>Audio</span>
                            </button>
                          )}

                          {linkedVideo && (
                            <button
                              onClick={() => setActiveCustomVideo(linkedVideo)}
                              className="px-3 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                            >
                              <Film className="w-3.5 h-3.5" />
                              <Play className="w-3 h-3" />
                              <span>Video</span>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeCustomVideo && (
        <CustomVideoPlayerModal
          video={activeCustomVideo}
          isOpen={!!activeCustomVideo}
          onClose={() => setActiveCustomVideo(null)}
          appLang={appLang}
          dialect={dialect}
        />
      )}

      {activeCustomAudio && (
        <AudioPlayerModal
          audio={activeCustomAudio}
          isOpen={!!activeCustomAudio}
          onClose={() => setActiveCustomAudio(null)}
          appLang={appLang}
          dialect={dialect}
        />
      )}
    </div>
  );
};
