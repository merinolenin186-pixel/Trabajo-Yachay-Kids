import React, { useState } from 'react';
import { VideoStory, AppLanguage, QuechuaDialect } from '../../types';
import { VIDEO_STORIES_DATA } from '../../data/videoStoriesData';
import { VideoPlayerModal } from './VideoPlayerModal';
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
} from 'lucide-react';

interface VideosModuleProps {
  appLang: AppLanguage;
  dialect: QuechuaDialect;
}

export const VideosModule: React.FC<VideosModuleProps> = ({
  appLang,
  dialect,
}) => {
  const [selectedStory, setSelectedStory] = useState<VideoStory | null>(null);
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

  const filteredStories = VIDEO_STORIES_DATA.filter(story => {
    if (activeCategory === 'todos') return true;
    return story.category === activeCategory;
  });

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
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-amber-600 text-white p-6 sm:p-8 rounded-3xl shadow-sm">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-bold mb-3">
          <Sparkles className="w-4 h-4 text-amber-200" />
          <span>Biblioteca Audiovisual Bilingüe · 100% Sin Internet</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-['Fredoka']">
          {appLang === 'quechua'
            ? 'Willakuykuna Videos Bilingües'
            : 'Videos y Cuentos Educativos'}
        </h2>
        <p className="mt-2 text-sm sm:text-base text-purple-100 max-w-xl">
          {appLang === 'quechua'
            ? 'Cuentos animados, leyendas y canciones en quechua con subtítulos en español incorporados en el dispositivo.'
            : 'Videos infantiles ilustrados y animados con narración original en quechua y subtítulos bilingües interactivos.'}
        </p>
      </div>

      {/* Categories Filter Strip */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {categories.map(cat => {
            const isCur = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  audioService.playPop();
                  setActiveCategory(cat.id);
                }}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold transition whitespace-nowrap shrink-0 active:scale-95 ${
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

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStories.map(story => (
          <div
            key={story.id}
            onClick={() => {
              audioService.playPop();
              setSelectedStory(story);
            }}
            className="group cursor-pointer bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 hover:border-purple-400 dark:hover:border-purple-500 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
            role="button"
            tabIndex={0}
          >
            {/* Video Thumbnail Box */}
            <div
              className="relative aspect-video w-full flex items-center justify-center p-6 text-white overflow-hidden"
              style={{ backgroundColor: story.thumbnailColor }}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />

              {/* Play Button Icon */}
              <div className="relative z-10 w-16 h-16 rounded-full bg-white/90 text-purple-700 shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-7 h-7 fill-purple-700 ml-1" />
              </div>

              {/* Duration badge */}
              <div className="absolute bottom-3 right-3 z-10 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-sm text-[11px] font-bold text-white flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{story.durationSeconds}s</span>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                  {story.category}
                </span>

                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white font-['Fredoka'] mt-1 group-hover:text-purple-600 transition-colors">
                  {story.title.quechua}
                </h3>

                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                  {story.title.spanish}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs font-bold text-purple-600 dark:text-purple-400">
                <span>{appLang === 'quechua' ? 'Qhaway (Reproducir)' : 'Ver video'}</span>
                <span className="px-2 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300">
                  Offline
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Player Modal */}
      {selectedStory && (
        <VideoPlayerModal
          story={selectedStory}
          isOpen={true}
          onClose={() => setSelectedStory(null)}
          appLang={appLang}
          dialect={dialect}
        />
      )}
    </div>
  );
};
