import React, { useState, useEffect, useRef } from 'react';
import { AdminVideoItem, AppLanguage, QuechuaDialect, SubtitleCue } from '../../types';
import { getMediaBlobUrl } from '../../services/mediaStorage';
import { getLocalizedSubtitleText } from '../../services/subtitleTranslatorService';
import { audioService } from '../../services/audioService';
import { Play, Pause, RotateCcw, Volume2, X, Subtitles } from 'lucide-react';
import { SunIllustration, LlamaIllustration, ChaskiBoyIllustration } from '../icons/AppIllustrations';

interface CustomVideoPlayerModalProps {
  video: AdminVideoItem;
  isOpen: boolean;
  onClose: () => void;
  appLang: AppLanguage;
  dialect: QuechuaDialect;
}

type SubtitleViewMode = 'auto' | 'both' | 'quechua' | 'spanish';

function getYouTubeEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes('youtube.com')) {
      const v = parsed.searchParams.get('v');
      if (v) return `https://www.youtube.com/embed/${v}?autoplay=1`;
    }
    if (parsed.hostname.includes('youtu.be')) {
      const id = parsed.pathname.replace('/', '');
      if (id) return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
  } catch {
    return null;
  }
  return null;
}

export const CustomVideoPlayerModal: React.FC<CustomVideoPlayerModalProps> = ({
  video,
  isOpen,
  onClose,
  appLang,
  dialect,
}) => {
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(video.durationSeconds || 25);
  const [subtitleMode, setSubtitleMode] = useState<SubtitleViewMode>('auto');
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const youtubeEmbed =
    video.sourceType === 'url' && video.mediaUrl
      ? getYouTubeEmbedUrl(video.mediaUrl)
      : null;

  useEffect(() => {
    let active = true;
    let objectUrl: string | null = null;

    if (video.sourceType === 'file' && video.mediaId) {
      getMediaBlobUrl(video.mediaId).then((url) => {
        if (active && url) {
          objectUrl = url;
          setMediaUrl(url);
        }
      });
    } else if (video.sourceType === 'url' && video.mediaUrl && !youtubeEmbed) {
      setMediaUrl(video.mediaUrl);
    } else {
      setMediaUrl(null);
    }

    return () => {
      active = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      if (timerRef.current) clearInterval(timerRef.current);
      audioService.stop();
    };
  }, [video.id, video.mediaId, video.mediaUrl, video.sourceType, youtubeEmbed]);

  // Timer for animated / YouTube cue sync
  useEffect(() => {
    if (!isOpen || !isPlaying) return;
    if (video.sourceType === 'file' || (video.sourceType === 'url' && !youtubeEmbed)) {
      return; // HTML5 <video> drives timeUpdate
    }

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev + 1 >= duration) {
          setIsPlaying(false);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen, isPlaying, duration, video.sourceType, youtubeEmbed]);

  if (!isOpen) return null;

  const activeCue: SubtitleCue | null =
    video.subtitles.find(
      (c) => currentTime >= c.startTime && currentTime <= c.endTime
    ) ||
    video.subtitles[0] ||
    null;

  const handleSpeakCurrentCue = () => {
    const text = activeCue
      ? getLocalizedSubtitleText(activeCue, appLang, dialect)
      : appLang === 'quechua'
      ? video.description.quechua || video.rawScript
      : video.description.spanish || video.rawScript;

    if (!text) return;
    if (appLang === 'quechua') {
      audioService.speakQuechua(text, dialect);
    } else {
      audioService.speakSpanish(text);
    }
  };

  const handleClose = () => {
    audioService.playPop();
    audioService.stop();
    if (videoRef.current) videoRef.current.pause();
    if (timerRef.current) clearInterval(timerRef.current);
    onClose();
  };

  const cycleSubtitleMode = () => {
    audioService.playPop();
    setSubtitleMode((prev) => {
      if (prev === 'auto') return 'both';
      if (prev === 'both') return 'quechua';
      if (prev === 'quechua') return 'spanish';
      return 'auto';
    });
  };

  const showQuechua =
    subtitleMode === 'both' ||
    subtitleMode === 'quechua' ||
    (subtitleMode === 'auto' && appLang === 'quechua');
  const showSpanish =
    subtitleMode === 'both' ||
    subtitleMode === 'spanish' ||
    (subtitleMode === 'auto' && appLang === 'spanish');

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-3xl bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-400 flex flex-col">
        {/* Header */}
        <div className="p-4 bg-slate-950 flex items-center justify-between text-white border-b border-slate-800">
          <div className="min-w-0 pr-3">
            <h3 className="text-base sm:text-lg font-bold font-['Fredoka'] truncate">
              {appLang === 'quechua' ? video.title.quechua : video.title.spanish}
            </h3>
            <p className="text-xs text-slate-400 truncate">
              {appLang === 'quechua' ? video.description.quechua : video.description.spanish}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition shrink-0 cursor-pointer"
            aria-label="Cerrar video"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Theater Stage */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
          {youtubeEmbed ? (
            <iframe
              src={youtubeEmbed}
              title={video.title.spanish}
              className="w-full h-full border-0"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          ) : mediaUrl ? (
            <video
              ref={videoRef}
              src={mediaUrl}
              controls
              autoPlay
              className="w-full h-full object-contain bg-black"
              onLoadedMetadata={(e) => {
                const d = e.currentTarget.duration;
                if (Number.isFinite(d) && d > 0) setDuration(Math.ceil(d));
              }}
              onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
          ) : (
            /* Animated Story Stage */
            <div className="relative w-full h-full bg-gradient-to-b from-sky-400 via-sky-200 to-emerald-500 flex items-end justify-around p-6">
              <div className="absolute top-4 left-6">
                <SunIllustration className="w-16 h-16" />
              </div>
              <LlamaIllustration className="w-28 h-28 animate-bounce-gentle" />
              <ChaskiBoyIllustration className="w-28 h-28" />
            </div>
          )}

          {/* Synchronized Auto-Translated Subtitles Overlay */}
          {activeCue && (
            <div className="pointer-events-none absolute bottom-12 sm:bottom-14 left-3 right-3 z-20">
              <div className="max-w-xl mx-auto p-3 rounded-2xl bg-black/80 backdrop-blur-md border border-white/20 text-center shadow-lg">
                {showQuechua && (
                  <p className="text-base sm:text-lg font-extrabold text-amber-300 font-['Fredoka']">
                    «{getLocalizedSubtitleText(activeCue, 'quechua', dialect)}»
                  </p>
                )}
                {showSpanish && (
                  <p className="text-xs sm:text-sm font-medium text-slate-100 mt-0.5">
                    {getLocalizedSubtitleText(activeCue, 'spanish', dialect)}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Controls */}
        <div className="p-4 bg-slate-950 text-white flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {video.sourceType === 'animated' && (
              <>
                <button
                  onClick={() => setIsPlaying((p) => !p)}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isPlaying ? 'Pausar' : 'Reproducir'}</span>
                </button>
                <button
                  onClick={() => {
                    setCurrentTime(0);
                    setIsPlaying(true);
                  }}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer"
                  title="Reiniciar"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </>
            )}

            <button
              onClick={handleSpeakCurrentCue}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold cursor-pointer"
              title="Leer subtítulo en voz alta"
            >
              <Volume2 className="w-4 h-4" />
              <span>Escuchar subtítulo</span>
            </button>
          </div>

          <button
            onClick={cycleSubtitleMode}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold cursor-pointer"
          >
            <Subtitles className="w-4 h-4 text-amber-400" />
            <span>
              {subtitleMode === 'auto'
                ? `Auto (${appLang === 'quechua' ? 'Quechua' : 'Español'})`
                : subtitleMode === 'both'
                ? 'Bilingüe'
                : subtitleMode === 'quechua'
                ? 'Quechua'
                : 'Español'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
