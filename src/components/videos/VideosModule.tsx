import React, { useState } from 'react';
import { VideoStory, AdminVideoItem, AdminAudioItem, AppLanguage, QuechuaDialect } from '../../types';
import { VIDEO_STORIES_DATA } from '../../data/videoStoriesData';
import { VideoPlayerModal } from './VideoPlayerModal';
import { CustomVideoPlayerModal } from './CustomVideoPlayerModal';
import { AudioPlayerModal } from './AudioPlayerModal';
import { useAdmin } from '../../context/AdminContext';
import { audioService } from '../../services/audioService';
import {
  Play,
  Film,
  Sparkles,
  BookOpen,
  Calculator,
  PawPrint,
  Palette,
  Users,
  Sprout,
  Apple,
  Music,
  Clock,
  Volume2,
} from 'lucide-react';

interface VideosModuleProps {
  appLang: AppLanguage;
  dialect: QuechuaDialect;
}

export const VideosModule: React.FC<VideosModuleProps> = ({
  appLang,
  dialect,
}) => {
  const { customVideos, customAudios, editedBuiltinVideos, hiddenOptions, customTexts } = useAdmin();
  const [mediaView, setMediaView] = useState<'videos' | 'audios'>('videos');
  const [selectedStory, setSelectedStory] = useState<VideoStory | null>(null);
  const [selectedCustomVideo, setSelectedCustomVideo] = useState<AdminVideoItem | null>(null);
  const [selectedAudio, setSelectedAudio] = useState<AdminAudioItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('todos');

  const categories = [
    { id: 'todos', label: appLang === 'quechua' ? 'Llapan (Todos)' : 'Todos los videos' },
    { id: 'cuentos', label: appLang === 'quechua' ? 'Cuentos' : 'Cuentos infantiles' },
    { id: 'numeros', label: appLang === 'quechua' ? 'Yupaykuna' : 'Números' },
    { id: 'animales', label: appLang === 'quechua' ? 'Uywakuna' : 'Animales' },
    { id: 'colores', label: appLang === 'quechua' ? 'Llimpikuna' : 'Colores' },
    { id: 'alimentos', label: appLang === 'quechua' ? 'Mikhunakuna' : 'Alimentos' },
    { id: 'saludos', label: appLang === 'quechua' ? 'Napaykuna' : 'Saludos' },
    { id: 'familia', label: appLang === 'quechua' ? 'Ayllu' : 'Familia' },
    { id: 'naturaleza', label: appLang === 'quechua' ? 'Pachamama' : 'Naturaleza' },
    { id: 'cultura', label: appLang === 'quechua' ? 'Kawsayninchis' : 'Cultura' },
  ];

  const visibleBuiltinStories = VIDEO_STORIES_DATA.filter(
    (s) => !hiddenOptions.videoIds.includes(s.id)
  ).map((s) => editedBuiltinVideos[s.id] || s);

  const filteredBuiltin = visibleBuiltinStories.filter((story) =>
    activeCategory === 'todos' ? true : story.category === activeCategory
  );

  const filteredCustomVideos = customVideos.filter((v) =>
    activeCategory === 'todos' ? true : v.category === activeCategory
  );

  const visibleAudios = customAudios.filter(
    (a) => !hiddenOptions.audioIds.includes(a.id)
  );

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'cuentos':
        return <BookOpen className="w-4 h-4" />;
      case 'numeros':
        return <Calculator className="w-4 h-4" />;
      case 'animales':
        return <PawPrint className="w-4 h-4" />;
      case 'colores':
        return <Palette className="w-4 h-4" />;
      case 'alimentos':
        return <Apple className="w-4 h-4" />;
      case 'familia':
        return <Users className="w-4 h-4" />;
      case 'naturaleza':
        return <Sprout className="w-4 h-4" />;
      case 'cultura':
        return <Music className="w-4 h-4" />;
      default:
        return <Film className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="yachay-hero-banner bg-gradient-to-r from-purple-600 via-indigo-600 to-amber-600 text-white p-5 sm:p-8 rounded-3xl shadow-sm">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-[11px] sm:text-xs font-bold mb-2.5 sm:mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-200 shrink-0" />
          <span>Biblioteca Bilingüe · Subtítulos Automáticos</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-['Fredoka'] leading-tight">
          {appLang === 'quechua'
            ? customTexts.videosBannerTitle.quechua
            : customTexts.videosBannerTitle.spanish}
        </h2>
        <p className="mt-2 text-xs sm:text-base text-purple-100 max-w-xl">
          {appLang === 'quechua'
            ? customTexts.videosBannerDescription.quechua
            : customTexts.videosBannerDescription.spanish}
        </p>

        {/* Switch between Videos & Audios */}
        <div className="mt-4 sm:mt-5 grid grid-cols-2 sm:inline-flex items-center gap-1 p-1 bg-black/20 rounded-2xl w-full sm:w-auto">
          <button
            onClick={() => {
              audioService.playPop();
              setMediaView('videos');
            }}
            className={`px-3 sm:px-4 py-2.5 min-h-[42px] rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer truncate ${
              mediaView === 'videos'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-white/85 hover:text-white'
            }`}
          >
            <Film className="w-4 h-4 shrink-0" />
            <span className="truncate">
              {appLang === 'quechua' ? 'Videokuna' : 'Videos'} ({filteredBuiltin.length + filteredCustomVideos.length})
            </span>
          </button>
          <button
            onClick={() => {
              audioService.playPop();
              setMediaView('audios');
            }}
            className={`px-3 sm:px-4 py-2.5 min-h-[42px] rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer truncate ${
              mediaView === 'audios'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-white/85 hover:text-white'
            }`}
          >
            <Volume2 className="w-4 h-4 shrink-0" />
            <span className="truncate">
              {appLang === 'quechua' ? 'Uyarinapaq' : 'Audios'} ({visibleAudios.length})
            </span>
          </button>
        </div>
      </div>

      {mediaView === 'videos' ? (
        <>
          {/* Categories Filter Strip */}
          <div className="bg-white dark:bg-slate-800 p-4 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {categories.map((cat) => {
                const isCur = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      audioService.playPop();
                      setActiveCategory(cat.id);
                    }}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold transition whitespace-nowrap shrink-0 active:scale-95 cursor-pointer ${
                      isCur
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-purple-100'
                    }`}
                  >
                    {getCategoryIcon(cat.id)}
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Videos Grid (Admin Custom Videos first, then Built-in Stories) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCustomVideos.map((vid) => (
              <div
                key={vid.id}
                onClick={() => {
                  audioService.playPop();
                  setSelectedCustomVideo(vid);
                }}
                className="group cursor-pointer bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 hover:border-amber-400 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
                role="button"
                tabIndex={0}
              >
                <div
                  className="relative aspect-video w-full flex items-center justify-center p-6 text-white overflow-hidden"
                  style={{ backgroundColor: vid.thumbnailColor || '#7c3aed' }}
                >
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  <div className="relative z-10 w-16 h-16 rounded-full bg-white/90 text-amber-700 shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-7 h-7 fill-amber-700 ml-1" />
                  </div>
                  <div className="absolute bottom-3 right-3 z-10 px-2.5 py-1 rounded-lg bg-black/70 text-[11px] font-bold text-white flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{vid.durationSeconds}s</span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                      {vid.category} · Subtítulos Auto
                    </div>
                    <h3 className="text-lg font-extrabold text-slate-900 dark:text-white font-['Fredoka'] mt-1">
                      {appLang === 'quechua' ? vid.title.quechua : vid.title.spanish}
                    </h3>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                      {appLang === 'quechua' ? vid.description.quechua : vid.description.spanish}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs font-bold text-amber-600 dark:text-amber-400">
                    <span>{appLang === 'quechua' ? 'Qhaway (Reproducir)' : 'Ver video'}</span>
                    <span className="text-slate-500 font-normal">
                      {vid.subtitles.length} subtítulos
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {filteredBuiltin.map((story) => (
              <div
                key={story.id}
                onClick={() => {
                  audioService.playPop();
                  setSelectedStory(story);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    audioService.playPop();
                    setSelectedStory(story);
                  }
                }}
                className="group cursor-pointer bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 hover:border-purple-400 dark:hover:border-purple-500 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
                role="button"
                tabIndex={0}
              >
                <div
                  className="relative aspect-video w-full flex items-center justify-center p-6 text-white overflow-hidden"
                  style={{ backgroundColor: story.thumbnailColor }}
                >
                  {story.videoUrl && (
                    <video
                      src={`${story.videoUrl}#t=2`}
                      muted
                      playsInline
                      preload="metadata"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/25 group-hover:bg-black/15 transition-colors" />
                  <div className="relative z-10 w-16 h-16 rounded-full bg-white/90 text-purple-700 shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-7 h-7 fill-purple-700 ml-1" />
                  </div>
                  <div className="absolute bottom-3 right-3 z-10 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-sm text-[11px] font-bold text-white flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{story.durationSeconds}s</span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                      {story.category}{story.videoUrl ? ' · Subtítulos Auto' : ''}
                    </span>

                    <h3 className="text-lg font-extrabold text-slate-900 dark:text-white font-['Fredoka'] mt-1 group-hover:text-purple-600 transition-colors">
                      {story.title.quechua}
                    </h3>

                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                      {story.title.spanish}
                    </p>

                    {story.description && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2">
                        {appLang === 'quechua' ? story.description.quechua : story.description.spanish}
                      </p>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs font-bold text-purple-600 dark:text-purple-400">
                    <span>{appLang === 'quechua' ? 'Qhaway (Reproducir)' : 'Ver video'}</span>
                    <span className="text-slate-500 dark:text-slate-400 font-medium">
                      {story.videoUrl ? `${story.scenes.length} subtítulos` : 'Offline'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* AUDIOS EDUCATIVOS VIEW */
        <div className="space-y-4">
          {visibleAudios.length === 0 ? (
            <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 text-center space-y-2">
              <Volume2 className="w-10 h-10 text-amber-500 mx-auto" />
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white font-['Fredoka']">
                {appLang === 'quechua'
                  ? 'Manaraq kanchu uyarinakuna'
                  : 'Aún no hay audios educativos agregados'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                La administradora puede grabar o subir audios desde Configuración → Acceso Administrador y sus subtítulos se traducirán automáticamente.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {visibleAudios.map((aud) => (
                <div
                  key={aud.id}
                  onClick={() => {
                    audioService.playPop();
                    setSelectedAudio(aud);
                  }}
                  role="button"
                  tabIndex={0}
                  className="group cursor-pointer bg-white dark:bg-slate-800 rounded-3xl p-5 border-2 border-slate-200 dark:border-slate-700 hover:border-teal-400 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className="w-12 h-12 rounded-2xl text-white flex items-center justify-center shadow-sm"
                        style={{ backgroundColor: aud.accentColor || '#0d9488' }}
                      >
                        <Volume2 className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                        {aud.durationSeconds}s
                      </span>
                    </div>

                    <h3 className="text-lg font-extrabold text-slate-900 dark:text-white font-['Fredoka']">
                      {appLang === 'quechua' ? aud.title.quechua : aud.title.spanish}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                      {appLang === 'quechua' ? aud.description.quechua : aud.description.spanish}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs font-bold text-teal-600 dark:text-teal-400">
                    <span>{appLang === 'quechua' ? 'Uyariy (Escuchar)' : 'Escuchar audio'}</span>
                    <span className="text-slate-500 font-normal">
                      {aud.subtitles.length} subtítulos
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Built-in Animated Story Player Modal */}
      {selectedStory && (
        <VideoPlayerModal
          story={selectedStory}
          isOpen={true}
          onClose={() => setSelectedStory(null)}
          appLang={appLang}
          dialect={dialect}
        />
      )}

      {/* Admin Custom Video Player Modal */}
      {selectedCustomVideo && (
        <CustomVideoPlayerModal
          video={selectedCustomVideo}
          isOpen={true}
          onClose={() => setSelectedCustomVideo(null)}
          appLang={appLang}
          dialect={dialect}
        />
      )}

      {/* Admin Custom Audio Player Modal */}
      {selectedAudio && (
        <AudioPlayerModal
          audio={selectedAudio}
          isOpen={true}
          onClose={() => setSelectedAudio(null)}
          appLang={appLang}
          dialect={dialect}
        />
      )}
    </div>
  );
};

