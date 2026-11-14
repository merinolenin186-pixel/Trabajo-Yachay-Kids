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
import { CustomVideoPlayerModal } from '../videos/CustomVideoPlayerModal';
import { AudioPlayerModal } from '../videos/AudioPlayerModal';
import {
  SunIllustration,
  LlamaIllustration,
  CornIllustration,
  RainbowIllustration,
} from '../icons/AppIllustrations';
import { Sparkles, ArrowRight, Layers, Volume2, Play, Film, Music, X } from 'lucide-react';

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
  const [activeSection, setActiveSection] = useState<CustomSection | null>(null);
  const [activeCustomVideo, setActiveCustomVideo] = useState<AdminVideoItem | null>(null);
  const [activeCustomAudio, setActiveCustomAudio] = useState<AdminAudioItem | null>(null);

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

  const visibleGames = gamesList.filter(g => !hiddenOptions.games.includes(g.id));

  return (
    <div className="space-y-8">
      {/* Hero Welcome banner for Kids */}
      <div className="yachay-hero-banner relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white p-6 sm:p-8 shadow-md">
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-bold mb-3">
            <Sparkles className="w-4 h-4 text-amber-200" />
            <span>
              {customTexts.appName || 'Yachay Kids'} ·{' '}
              {appLang === 'quechua' ? 'Kusisqa Yachakusunchis' : 'Educación Intercultural'}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-['Fredoka'] drop-shadow-sm">
            {appLang === 'quechua'
              ? customTexts.heroTitle.quechua
              : customTexts.heroTitle.spanish}
          </h2>

          <p className="mt-2 text-sm sm:text-base text-white/90 font-medium">
            {appLang === 'quechua'
              ? customTexts.heroDescription.quechua
              : customTexts.heroDescription.spanish}
          </p>
        </div>

        {/* Floating illustrations on the right */}
        <div className="hidden sm:block absolute -right-4 -bottom-6 opacity-90 transform hover:scale-105 transition-transform">
          <LlamaIllustration className="w-36 h-36" />
        </div>
      </div>

      {/* Grid of Games */}
      {visibleGames.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {visibleGames.map(game => (
            <div
              key={game.id}
              onClick={() => {
                audioService.playPop();
                onSelectGame(game.id);
              }}
              className="yachay-card-surface group relative cursor-pointer bg-white dark:bg-slate-800 rounded-3xl p-6 border-2 border-slate-200 dark:border-slate-700 hover:border-amber-400 dark:hover:border-amber-500 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
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
