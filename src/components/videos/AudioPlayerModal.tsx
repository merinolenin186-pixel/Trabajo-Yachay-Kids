import React, { useState, useEffect, useRef } from 'react';
import { AdminAudioItem, AppLanguage, QuechuaDialect } from '../../types';
import { getMediaBlobUrl } from '../../services/mediaStorage';
import { getLocalizedSubtitleText } from '../../services/subtitleTranslatorService';
import { audioService } from '../../services/audioService';
import { Play, Pause, RotateCcw, Volume2, X, Subtitles } from 'lucide-react';

interface AudioPlayerModalProps {
  audio: AdminAudioItem;
  isOpen: boolean;
  onClose: () => void;
  appLang: AppLanguage;
  dialect: QuechuaDialect;
}

type SubtitleViewMode = 'auto' | 'both' | 'quechua' | 'spanish';

export const AudioPlayerModal: React.FC<AudioPlayerModalProps> = ({
  audio,
  isOpen,
  onClose,
  appLang,
  dialect,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(audio.durationSeconds || 15);
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);
  const [subtitleMode, setSubtitleMode] = useState<SubtitleViewMode>('auto');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let active = true;
    let objectUrl: string | null = null;

    if (audio.mediaId) {
      getMediaBlobUrl(audio.mediaId).then((url) => {
        if (active && url) {
          objectUrl = url;
          setMediaUrl(url);
        }
      });
    } else {
      setMediaUrl(null);
    }

    return () => {
      active = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      if (timerRef.current) clearInterval(timerRef.current);
      audioService.stop();
    };
  }, [audio.id, audio.mediaId]);

  if (!isOpen) return null;

  const activeCue =
    audio.subtitles.find(
      (c) => currentTime >= c.startTime && currentTime <= c.endTime
    ) ||
    audio.subtitles[0] ||
    null;

  const handleTogglePlay = () => {
    audioService.playPop();

    if (audio.sourceType === 'tts' || !mediaUrl) {
      if (isPlaying) {
        setIsPlaying(false);
        audioService.stop();
        if (timerRef.current) clearInterval(timerRef.current);
      } else {
        setIsPlaying(true);
        const textToSpeak = activeCue
          ? getLocalizedSubtitleText(activeCue, appLang, dialect)
          : appLang === 'quechua'
          ? audio.description.quechua || audio.rawScript
          : audio.description.spanish || audio.rawScript;

        if (appLang === 'quechua') {
          audioService.speakQuechua(textToSpeak, dialect, () => {
            setIsPlaying(false);
          });
        } else {
          audioService.speakSpanish(textToSpeak, () => {
            setIsPlaying(false);
          });
        }

        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
          setCurrentTime((prev) => {
            if (prev + 0.5 >= duration) {
              if (timerRef.current) clearInterval(timerRef.current);
              setIsPlaying(false);
              return 0;
            }
            return prev + 0.5;
          });
        }, 500);
      }
      return;
    }

    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      el.play().catch(() => {});
      setIsPlaying(true);
    } else {
      el.pause();
      setIsPlaying(false);
    }
  };

  const handleRestart = () => {
    audioService.playPop();
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleClose = () => {
    audioService.playPop();
    audioService.stop();
    if (audioRef.current) audioRef.current.pause();
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-400 text-slate-800 dark:text-slate-100">
        {/* Header */}
        <div
          className="p-5 text-white flex items-center justify-between"
          style={{ backgroundColor: audio.accentColor || '#0d9488' }}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
              <Volume2 className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <h3 className="text-lg font-extrabold font-['Fredoka'] truncate">
                {appLang === 'quechua' ? audio.title.quechua : audio.title.spanish}
              </h3>
              <p className="text-xs text-white/85 truncate">
                {appLang === 'quechua' ? audio.title.spanish : audio.title.quechua}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-full bg-black/20 hover:bg-black/35 text-white transition cursor-pointer shrink-0"
            aria-label="Cerrar reproductor"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hidden HTML5 Audio element for uploaded/recorded files */}
        {mediaUrl && (
          <audio
            ref={audioRef}
            src={mediaUrl}
            onLoadedMetadata={(e) => {
              const d = e.currentTarget.duration;
              if (Number.isFinite(d) && d > 0) setDuration(Math.ceil(d));
            }}
            onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
            onEnded={() => {
              setIsPlaying(false);
              setCurrentTime(0);
            }}
          />
        )}

        {/* Body & Synchronized Translated Subtitles */}
        <div className="p-6 space-y-5">
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            {appLang === 'quechua'
              ? audio.description.quechua || audio.description.spanish
              : audio.description.spanish || audio.description.quechua}
          </p>

          {/* Live Subtitles Stage */}
          <div className="p-5 rounded-2xl bg-slate-900 text-white text-center space-y-2 min-h-[120px] flex flex-col items-center justify-center border border-slate-700">
            {activeCue ? (
              <>
                {showQuechua && (
                  <p className="text-lg font-extrabold text-amber-300 font-['Fredoka'] leading-snug">
                    «{getLocalizedSubtitleText(activeCue, 'quechua', dialect)}»
                  </p>
                )}
                {showSpanish && (
                  <p className="text-sm font-medium text-slate-200 leading-snug">
                    {getLocalizedSubtitleText(activeCue, 'spanish', dialect)}
                  </p>
                )}
              </>
            ) : (
              <p className="text-sm text-slate-300">
                {audio.rawScript || 'Audio educativo listo para reproducir'}
              </p>
            )}
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5">
            <input
              type="range"
              min={0}
              max={duration || 10}
              step={0.5}
              value={Math.min(currentTime, duration || 10)}
              onChange={(e) => {
                const val = Number(e.target.value);
                setCurrentTime(val);
                if (audioRef.current) audioRef.current.currentTime = val;
              }}
              className="w-full accent-amber-500 cursor-pointer"
              aria-label="Progreso del audio"
            />
            <div className="flex justify-between text-[11px] font-mono tabular-nums text-slate-500 dark:text-slate-400">
              <span>{Math.floor(currentTime)}s</span>
              <span>{Math.floor(duration)}s</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <button
                onClick={handleTogglePlay}
                className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md active:scale-95 transition flex items-center gap-2 cursor-pointer"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isPlaying ? 'Pausar' : 'Reproducir'}</span>
              </button>

              <button
                onClick={handleRestart}
                className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition cursor-pointer"
                title="Reiniciar"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={cycleSubtitleMode}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 transition cursor-pointer"
              title="Cambiar idioma de subtítulos"
            >
              <Subtitles className="w-4 h-4 text-amber-600" />
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
    </div>
  );
};
