import React, { useState, useEffect, useRef } from 'react';
import { VideoStory, AppLanguage, QuechuaDialect } from '../../types';
import { audioService } from '../../services/audioService';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  X,
  Maximize2,
  Subtitles,
  Gauge,
  Sparkles,
} from 'lucide-react';
import {
  SunIllustration,
  LlamaIllustration,
  CondorIllustration,
  FoxIllustration,
  CuyIllustration,
  ChaskiBoyIllustration,
  PachaGirlIllustration,
  RainbowIllustration,
} from '../icons/AppIllustrations';

interface VideoPlayerModalProps {
  story: VideoStory;
  isOpen: boolean;
  onClose: () => void;
  appLang: AppLanguage;
  dialect: QuechuaDialect;
}

type SubtitleMode = 'auto' | 'both' | 'quechua' | 'spanish' | 'off';

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  story,
  isOpen,
  onClose,
  appLang,
  dialect,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [subtitleMode, setSubtitleMode] = useState<SubtitleMode>('auto');
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const hasVideoFile = Boolean(story.videoUrl);
  const currentScene = story.scenes[currentSceneIdx] || story.scenes[0];

  // Sync playback rate for native MP4 videos
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed, isOpen, story.id]);

  // Reset scene index when opening a new story
  useEffect(() => {
    if (isOpen) {
      setCurrentSceneIdx(0);
      setIsPlaying(true);
    }
  }, [isOpen, story.id]);

  // Play TTS narration on scene change ONLY for animated SVG stories (no native MP4 audio)
  useEffect(() => {
    if (!isOpen || !isPlaying || hasVideoFile) return;

    if (appLang === 'quechua') {
      audioService.speakQuechua(currentScene.narrationQuechua, dialect);
    } else {
      audioService.speakSpanish(currentScene.narrationSpanish);
    }

    const durationMs = (currentScene.duration * 1000) / playbackSpeed;
    timerRef.current = setTimeout(() => {
      if (currentSceneIdx < story.scenes.length - 1) {
        setCurrentSceneIdx(prev => prev + 1);
      } else {
        setIsPlaying(false);
      }
    }, durationMs);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isOpen, hasVideoFile, currentSceneIdx, isPlaying, playbackSpeed, story, dialect, appLang, currentScene]);

  if (!isOpen) return null;

  const handleTogglePlay = () => {
    audioService.playPop();
    if (hasVideoFile && videoRef.current) {
      if (videoRef.current.paused || videoRef.current.ended) {
        if (videoRef.current.ended) {
          videoRef.current.currentTime = 0;
          setCurrentSceneIdx(0);
        }
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
      return;
    }

    if (isPlaying) {
      setIsPlaying(false);
      audioService.stop();
      if (timerRef.current) clearTimeout(timerRef.current);
    } else {
      if (currentSceneIdx >= story.scenes.length - 1) {
        setCurrentSceneIdx(0);
      }
      setIsPlaying(true);
    }
  };

  const handleRestart = () => {
    audioService.playPop();
    if (timerRef.current) clearTimeout(timerRef.current);
    setCurrentSceneIdx(0);
    setIsPlaying(true);
    if (hasVideoFile && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleJumpToScene = (idx: number) => {
    audioService.playPop();
    setCurrentSceneIdx(idx);
    if (hasVideoFile && videoRef.current && story.scenes[idx]) {
      videoRef.current.currentTime = story.scenes[idx].timestamp;
    }
  };

  const handleClose = () => {
    audioService.playPop();
    audioService.stop();
    if (videoRef.current) videoRef.current.pause();
    if (timerRef.current) clearTimeout(timerRef.current);
    onClose();
  };

  const toggleSubtitles = () => {
    audioService.playPop();
    setSubtitleMode(prev => {
      if (prev === 'auto') return 'both';
      if (prev === 'both') return 'quechua';
      if (prev === 'quechua') return 'spanish';
      if (prev === 'spanish') return 'off';
      return 'auto';
    });
  };

  const toggleSpeed = () => {
    audioService.playPop();
    setPlaybackSpeed(prev => (prev === 1 ? 0.8 : 1));
  };

  const handleVideoTimeUpdate = (t: number) => {
    const matchedIdx = story.scenes.findIndex((scene, idx) => {
      const next = story.scenes[idx + 1];
      return t >= scene.timestamp && (!next || t < next.timestamp);
    });
    if (matchedIdx !== -1 && matchedIdx !== currentSceneIdx) {
      setCurrentSceneIdx(matchedIdx);
    }
  };

  // Render animated background stage
  const renderBackground = () => {
    switch (currentScene.backgroundType) {
      case 'andina_night':
        return (
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-slate-900 to-indigo-900 overflow-hidden">
            <div className="absolute top-6 left-12 text-yellow-200 text-sm animate-pulse">✦</div>
            <div className="absolute top-12 left-1/3 text-yellow-100 text-base animate-pulse">★</div>
            <div className="absolute top-8 right-24 text-yellow-200 text-sm animate-pulse">✦</div>
            <div className="absolute top-16 right-1/4 text-yellow-100 text-xs animate-pulse">★</div>
            <div className="absolute top-6 right-8 text-3xl">🌙</div>
            <svg viewBox="0 0 500 200" className="absolute bottom-0 w-full h-32 preserve-3d" fill="none">
              <polygon points="0,200 80,60 180,200" fill="#1e1b4b" opacity="0.8" />
              <polygon points="120,200 260,30 380,200" fill="#1e1b4b" />
              <polygon points="300,200 420,50 500,200" fill="#1e1b4b" opacity="0.9" />
            </svg>
          </div>
        );
      case 'rainbow_sky':
        return (
          <div className="absolute inset-0 bg-gradient-to-b from-sky-400 via-sky-200 to-emerald-200 overflow-hidden">
            <div className="absolute top-4 left-1/2 -translate-x-1/2">
              <RainbowIllustration className="w-64 h-32 opacity-90" />
            </div>
            <div className="absolute bottom-0 w-full h-16 bg-emerald-500 rounded-t-[50%]" />
          </div>
        );
      case 'chakras':
        return (
          <div className="absolute inset-0 bg-gradient-to-b from-sky-300 to-amber-200 overflow-hidden">
            <div className="absolute top-4 left-6">
              <SunIllustration className="w-14 h-14" />
            </div>
            <div className="absolute bottom-16 w-full h-20 bg-emerald-600 -skew-y-2 opacity-90" />
            <div className="absolute bottom-8 w-full h-20 bg-amber-600 skew-y-1 opacity-90" />
            <div className="absolute bottom-0 w-full h-16 bg-emerald-700" />
          </div>
        );
      case 'village':
        return (
          <div className="absolute inset-0 bg-gradient-to-b from-sky-400 to-amber-100 overflow-hidden">
            <div className="absolute top-4 right-10">
              <SunIllustration className="w-14 h-14" />
            </div>
            <div className="absolute bottom-0 left-6 w-24 h-24 bg-amber-700 rounded-t-lg border-t-4 border-amber-900" />
            <div className="absolute bottom-0 left-36 w-28 h-28 bg-amber-800 rounded-t-lg border-t-4 border-red-900" />
            <div className="absolute bottom-0 right-10 w-24 h-20 bg-amber-700 rounded-t-lg" />
            <div className="absolute bottom-0 w-full h-8 bg-amber-300" />
          </div>
        );
      case 'lake_titicaca':
        return (
          <div className="absolute inset-0 bg-gradient-to-b from-sky-500 via-blue-400 to-cyan-600 overflow-hidden">
            <div className="absolute bottom-0 w-full h-28 bg-blue-600/80" />
            <div className="absolute bottom-0 w-full h-16 bg-blue-700/90" />
            <svg viewBox="0 0 500 150" className="absolute bottom-28 w-full h-24" fill="none">
              <polygon points="0,150 120,20 240,150" fill="#cbd5e1" />
              <polygon points="120,20 150,55 90,55" fill="#ffffff" />
              <polygon points="200,150 320,10 440,150" fill="#94a3b8" />
              <polygon points="320,10 350,45 290,45" fill="#ffffff" />
            </svg>
            <div className="text-3xl absolute bottom-12 left-1/3 animate-bounce-gentle">🛶</div>
          </div>
        );
      case 'andina_day':
      default:
        return (
          <div className="absolute inset-0 bg-gradient-to-b from-sky-400 via-sky-200 to-emerald-200 overflow-hidden">
            <div className="absolute top-4 left-6">
              <SunIllustration className="w-16 h-16" />
            </div>
            <div className="absolute top-8 right-16 w-24 h-10 bg-white/80 rounded-full animate-float-cloud" />
            <svg viewBox="0 0 500 200" className="absolute bottom-0 w-full h-36" fill="none">
              <polygon points="0,200 120,40 240,200" fill="#64748b" />
              <polygon points="120,40 140,80 100,80" fill="#ffffff" />
              <polygon points="180,200 320,20 460,200" fill="#475569" />
              <polygon points="320,20 345,65 295,65" fill="#ffffff" />
            </svg>
            <div className="absolute bottom-0 w-full h-14 bg-emerald-600 rounded-t-[30%]" />
          </div>
        );
    }
  };

  const renderCharacter = (char: VideoStory['scenes'][0]['characters'][0], idx: number) => {
    let animClass = 'transition-transform duration-500';
    if (char.animation === 'jump') animClass += ' animate-bounce';
    if (char.animation === 'wave') animClass += ' animate-bounce-gentle';

    let Comp: React.ReactNode = null;
    switch (char.type) {
      case 'fox':
        Comp = <FoxIllustration className="w-24 h-24" />;
        break;
      case 'condor':
        Comp = <CondorIllustration className="w-28 h-28" />;
        break;
      case 'llama':
        Comp = <LlamaIllustration className="w-24 h-24" />;
        break;
      case 'cuy':
        Comp = <CuyIllustration className="w-20 h-20" />;
        break;
      case 'chaski_boy':
        Comp = <ChaskiBoyIllustration className="w-24 h-24" />;
        break;
      case 'pacha_girl':
        Comp = <PachaGirlIllustration className="w-24 h-24" />;
        break;
      case 'sun':
      default:
        Comp = <SunIllustration className="w-24 h-24" />;
        break;
    }

    return (
      <div key={idx} className={`${animClass} transform hover:scale-110 drop-shadow-lg`}>
        {Comp}
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-3xl max-h-[94dvh] bg-slate-900 rounded-3xl overflow-y-auto shadow-2xl border-2 sm:border-4 border-amber-400 flex flex-col">
        {/* Top Header inside modal */}
        <div className="p-3 sm:p-4 bg-slate-950 flex items-center justify-between text-white border-b border-slate-800 gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <div className="min-w-0">
              <h3 className="text-sm sm:text-lg font-bold font-['Fredoka'] truncate">
                {story.title.quechua} · {story.title.spanish}
              </h3>
              {story.description && (
                <p className="text-[11px] text-slate-400 truncate hidden sm:block">
                  {appLang === 'quechua' ? story.description.quechua : story.description.spanish}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition shrink-0 cursor-pointer"
            aria-label="Cerrar video"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Theater Screen */}
        <div
          className={`relative w-full bg-black overflow-hidden flex ${
            hasVideoFile
              ? 'h-[45dvh] sm:h-auto sm:aspect-video items-center justify-center'
              : 'aspect-video items-end justify-center'
          }`}
        >
          {hasVideoFile ? (
            <video
              ref={videoRef}
              src={story.videoUrl}
              controls
              autoPlay
              playsInline
              preload="metadata"
              className="w-full h-full object-contain bg-black"
              onLoadedMetadata={(e) => {
                e.currentTarget.playbackRate = playbackSpeed;
              }}
              onTimeUpdate={(e) => handleVideoTimeUpdate(e.currentTarget.currentTime)}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
            />
          ) : (
            <>
              {renderBackground()}
              {/* Characters on stage */}
              <div className="relative z-10 w-full px-4 sm:px-8 pb-3 sm:pb-4 flex items-end justify-around scale-75 sm:scale-100 origin-bottom">
                {currentScene.characters.map((c, i) => renderCharacter(c, i))}
              </div>
            </>
          )}

          {/* Subtitles Overlay (positioned cleanly at top so native video bar at bottom is never blocked) */}
          {subtitleMode !== 'off' && (
            <div className="pointer-events-none absolute top-2 sm:top-3 left-2 sm:left-3 right-2 sm:right-3 z-20">
              <div className="max-w-xl mx-auto px-3 py-1.5 sm:p-3 rounded-2xl bg-black/75 backdrop-blur-md border border-white/20 text-center shadow-lg transition-all">
                {subtitleMode === 'auto' ? (
                  appLang === 'quechua' ? (
                    <>
                      <p className="text-xs sm:text-base font-extrabold text-amber-300 font-['Fredoka'] leading-snug">
                        «{currentScene.subtitlesQuechua}»
                      </p>
                      <p className="text-[10px] sm:text-xs text-slate-300 mt-0.5 leading-snug">
                        {currentScene.subtitlesSpanish}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-xs sm:text-base font-extrabold text-white font-['Fredoka'] leading-snug">
                        «{currentScene.subtitlesSpanish}»
                      </p>
                      <p className="text-[10px] sm:text-xs text-amber-300 mt-0.5 leading-snug">
                        {currentScene.subtitlesQuechua}
                      </p>
                    </>
                  )
                ) : (
                  <>
                    {(subtitleMode === 'both' || subtitleMode === 'quechua') && (
                      <p className="text-xs sm:text-base font-extrabold text-amber-300 font-['Fredoka'] leading-snug">
                        «{currentScene.subtitlesQuechua}»
                      </p>
                    )}
                    {(subtitleMode === 'both' || subtitleMode === 'spanish') && (
                      <p className="text-[11px] sm:text-sm font-medium text-slate-200 mt-0.5 leading-snug">
                        {currentScene.subtitlesSpanish}
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Video Controls Toolbar */}
        <div className="p-3 sm:p-4 bg-slate-950 text-white space-y-2.5 sm:space-y-3">
          {/* Timeline progress */}
          <div className="flex items-center gap-1.5 w-full">
            {story.scenes.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleJumpToScene(idx)}
                className={`h-2.5 rounded-full flex-1 transition-all cursor-pointer ${
                  idx === currentSceneIdx
                    ? 'bg-amber-400 scale-y-125'
                    : idx < currentSceneIdx
                    ? 'bg-amber-600'
                    : 'bg-slate-800'
                }`}
                title={`Escena ${idx + 1}`}
              />
            ))}
          </div>

          {/* Control Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <button
                onClick={handleTogglePlay}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 flex items-center justify-center font-bold shadow-md active:scale-95 transition cursor-pointer"
                aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-slate-950" /> : <Play className="w-5 h-5 fill-slate-950 ml-0.5" />}
              </button>

              <button
                onClick={handleRestart}
                className="w-10 h-10 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition cursor-pointer"
                title="Reiniciar cuento"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  if (hasVideoFile && videoRef.current && !videoRef.current.paused) {
                    videoRef.current.pause();
                  }
                  if (appLang === 'quechua') {
                    audioService.speakQuechua(currentScene.subtitlesQuechua, dialect);
                  } else {
                    audioService.speakSpanish(currentScene.subtitlesSpanish);
                  }
                }}
                className="w-10 h-10 rounded-2xl bg-slate-800 hover:bg-slate-700 text-amber-400 flex items-center justify-center transition cursor-pointer"
                title="Escuchar subtítulo en voz alta"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            {/* Subtitles & Speed toggle */}
            <div className="flex items-center gap-2 text-xs font-bold">
              <button
                onClick={toggleSubtitles}
                className="flex items-center gap-1.5 px-3 py-2 min-h-[40px] rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition cursor-pointer"
              >
                <Subtitles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  {subtitleMode === 'auto'
                    ? `Auto (${appLang === 'quechua' ? 'QU' : 'ES'})`
                    : subtitleMode === 'both'
                    ? 'Bilingüe'
                    : subtitleMode === 'quechua'
                    ? 'Quechua'
                    : subtitleMode === 'spanish'
                    ? 'Español'
                    : 'Sin subtítulos'}
                </span>
              </button>

              <button
                onClick={toggleSpeed}
                className="flex items-center gap-1 px-3 py-2 min-h-[40px] rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition cursor-pointer"
                title="Velocidad para niños"
              >
                <Gauge className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{playbackSpeed}x</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
