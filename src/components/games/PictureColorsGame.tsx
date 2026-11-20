import React, { useState } from 'react';
import { AppLanguage, QuechuaDialect } from '../../types';
import { audioService } from '../../services/audioService';
import { useUserProfile } from '../../context/UserProfileContext';
import confetti from 'canvas-confetti';
import {
  ChevronLeft,
  Volume2,
  CheckCircle2,
  Award,
  Sparkles,
  Palette,
  Check,
} from 'lucide-react';

interface PictureColorsGameProps {
  appLang: AppLanguage;
  dialect: QuechuaDialect;
  onBackToHub: () => void;
}

interface ColorChoice {
  id: string;
  hex: string;
  quechua: string;
  spanish: string;
  borderHex: string;
}

const PALETTE: Record<string, ColorChoice> = {
  red: { id: 'red', hex: '#ef4444', borderHex: '#b91c1c', quechua: 'Puka', spanish: 'Rojo' },
  blue: { id: 'blue', hex: '#0ea5e9', borderHex: '#0369a1', quechua: 'Anqas', spanish: 'Azul' },
  yellow: { id: 'yellow', hex: '#facc15', borderHex: '#ca8a04', quechua: 'Q\'ellu', spanish: 'Amarillo' },
  green: { id: 'green', hex: '#10b981', borderHex: '#047857', quechua: 'Q\'omer', spanish: 'Verde' },
  white: { id: 'white', hex: '#f8fafc', borderHex: '#94a3b8', quechua: 'Yuraq', spanish: 'Blanco' },
  black: { id: 'black', hex: '#1e293b', borderHex: '#0f172a', quechua: 'Yana', spanish: 'Negro' },
  brown: { id: 'brown', hex: '#92400e', borderHex: '#78350f', quechua: 'Ch\'umpi', spanish: 'Marrón' },
  purple: { id: 'purple', hex: '#a855f7', borderHex: '#7e22ce', quechua: 'Kulli', spanish: 'Morado' },
};

interface SceneChallenge {
  id: string;
  titleSpanish: string;
  titleQuechua: string;
  questionSpanish: string;
  questionQuechua: string;
  mode: 'multi' | 'single';
  correctColorIds: string[];
  optionIds: string[];
  renderScene: () => React.ReactNode;
}

const SCENES: SceneChallenge[] = [
  {
    id: 'scene-cantuta',
    titleSpanish: 'Flor de Cantuta',
    titleQuechua: 'Puka Cantuta T\'ika',
    questionSpanish: '¿Qué colores ves en esta flor con sus hojas? Marca todos los que ves.',
    questionQuechua: '¿Ima llimpikunataq kay t\'ikapi rikunki? Llapan rikunqaykita akllay.',
    mode: 'multi',
    correctColorIds: ['red', 'green'],
    optionIds: ['red', 'green', 'blue', 'purple'],
    renderScene: () => (
      <svg viewBox="0 0 220 150" className="w-full max-w-[260px] h-40 mx-auto">
        <rect width="220" height="150" rx="18" fill="#f8fafc" />
        {/* Green stem and leaves */}
        <path d="M 110 135 Q 110 100 110 72" stroke="#10b981" strokeWidth="8" strokeLinecap="round" fill="none" />
        <ellipse cx="82" cy="108" rx="22" ry="10" transform="rotate(-24 82 108)" fill="#10b981" stroke="#047857" strokeWidth="2.5" />
        <ellipse cx="138" cy="104" rx="22" ry="10" transform="rotate(24 138 104)" fill="#10b981" stroke="#047857" strokeWidth="2.5" />
        {/* Red petals */}
        <circle cx="110" cy="40" r="18" fill="#ef4444" stroke="#b91c1c" strokeWidth="2.5" />
        <circle cx="88" cy="56" r="18" fill="#ef4444" stroke="#b91c1c" strokeWidth="2.5" />
        <circle cx="132" cy="56" r="18" fill="#ef4444" stroke="#b91c1c" strokeWidth="2.5" />
        <circle cx="96" cy="78" r="17" fill="#ef4444" stroke="#b91c1c" strokeWidth="2.5" />
        <circle cx="124" cy="78" r="17" fill="#ef4444" stroke="#b91c1c" strokeWidth="2.5" />
        <circle cx="110" cy="60" r="10" fill="#fca5a5" stroke="#b91c1c" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: 'scene-sun-sky',
    titleSpanish: 'El Sol y el Cielo',
    titleQuechua: 'Intiwan Anqas Pacha',
    questionSpanish: '¿Qué dos colores ves en este dibujo del Sol y el cielo?',
    questionQuechua: '¿Mayqen iskay llimpikunataq kay dibujopi rikunki?',
    mode: 'multi',
    correctColorIds: ['yellow', 'blue'],
    optionIds: ['yellow', 'blue', 'red', 'black'],
    renderScene: () => (
      <svg viewBox="0 0 220 150" className="w-full max-w-[260px] h-40 mx-auto">
        <rect width="220" height="150" rx="18" fill="#0ea5e9" />
        {/* Bright yellow sun */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
          <line
            key={deg}
            x1="110"
            y1="75"
            x2={110 + 52 * Math.cos((deg * Math.PI) / 180)}
            y2={75 + 52 * Math.sin((deg * Math.PI) / 180)}
            stroke="#facc15"
            strokeWidth="7"
            strokeLinecap="round"
          />
        ))}
        <circle cx="110" cy="75" r="30" fill="#facc15" stroke="#ca8a04" strokeWidth="3" />
        <circle cx="101" cy="70" r="3.5" fill="#78350f" />
        <circle cx="119" cy="70" r="3.5" fill="#78350f" />
        <path d="M 101 82 Q 110 89 119 82" stroke="#78350f" strokeWidth="3" strokeLinecap="round" fill="none" />
      </svg>
    ),
  },
  {
    id: 'scene-mountain-snow',
    titleSpanish: 'Nevado Blanco y Cielo',
    titleQuechua: 'Yuraq Rit\'i Urqu',
    questionSpanish: '¿De qué color es la nieve en la cima de esta montaña?',
    questionQuechua: '¿Ima llimpitaq urqu patapi rit\'i?',
    mode: 'single',
    correctColorIds: ['white'],
    optionIds: ['white', 'purple', 'red', 'green'],
    renderScene: () => (
      <svg viewBox="0 0 220 150" className="w-full max-w-[260px] h-40 mx-auto">
        <rect width="220" height="150" rx="18" fill="#0ea5e9" />
        {/* Brown mountain base */}
        <polygon points="25,145 110,25 195,145" fill="#92400e" stroke="#78350f" strokeWidth="3" />
        {/* White snow cap */}
        <polygon points="110,25 74,76 92,68 110,82 128,68 146,76" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'scene-rainbow',
    titleSpanish: 'Arcoíris de Colores',
    titleQuechua: 'K\'uychi',
    questionSpanish: 'Mira el arcoíris: marca los 3 colores que aparecen en sus franjas.',
    questionQuechua: 'K\'uychita qhaway: kimsa llimpikunata akllay.',
    mode: 'multi',
    correctColorIds: ['red', 'yellow', 'blue'],
    optionIds: ['red', 'yellow', 'blue', 'black'],
    renderScene: () => (
      <svg viewBox="0 0 220 150" className="w-full max-w-[260px] h-40 mx-auto">
        <rect width="220" height="150" rx="18" fill="#e0f2fe" />
        <path d="M 30 128 A 80 80 0 0 1 190 128" stroke="#ef4444" strokeWidth="14" fill="none" strokeLinecap="round" />
        <path d="M 44 128 A 66 66 0 0 1 176 128" stroke="#facc15" strokeWidth="14" fill="none" strokeLinecap="round" />
        <path d="M 58 128 A 52 52 0 0 1 162 128" stroke="#0ea5e9" strokeWidth="14" fill="none" strokeLinecap="round" />
        {/* White clouds */}
        <circle cx="38" cy="126" r="14" fill="#ffffff" />
        <circle cx="54" cy="126" r="12" fill="#ffffff" />
        <circle cx="166" cy="126" r="12" fill="#ffffff" />
        <circle cx="182" cy="126" r="14" fill="#ffffff" />
      </svg>
    ),
  },
  {
    id: 'scene-corn',
    titleSpanish: 'Choclo en la Chacra',
    titleQuechua: 'Q\'ellu Sara',
    questionSpanish: '¿Qué colores ves en este choclo con sus hojas?',
    questionQuechua: '¿Ima llimpikunataq kay sarapi kachkan?',
    mode: 'multi',
    correctColorIds: ['yellow', 'green'],
    optionIds: ['yellow', 'green', 'purple', 'white'],
    renderScene: () => (
      <svg viewBox="0 0 220 150" className="w-full max-w-[260px] h-40 mx-auto">
        <rect width="220" height="150" rx="18" fill="#f8fafc" />
        <ellipse cx="110" cy="70" rx="26" ry="48" fill="#facc15" stroke="#ca8a04" strokeWidth="3" />
        <line x1="94" y1="54" x2="126" y2="54" stroke="#ca8a04" strokeWidth="2" />
        <line x1="90" y1="70" x2="130" y2="70" stroke="#ca8a04" strokeWidth="2" />
        <line x1="94" y1="86" x2="126" y2="86" stroke="#ca8a04" strokeWidth="2" />
        <path d="M 88 122 C 66 95 72 62 96 92 Z" fill="#10b981" stroke="#047857" strokeWidth="2.5" />
        <path d="M 132 122 C 154 95 148 62 124 92 Z" fill="#10b981" stroke="#047857" strokeWidth="2.5" />
      </svg>
    ),
  },
  {
    id: 'scene-purple-grapes',
    titleSpanish: 'Maíz Morado Andino',
    titleQuechua: 'Kulli Sara',
    questionSpanish: '¿De qué color es este maíz morado?',
    questionQuechua: '¿Ima llimpitaq kay kulli sara?',
    mode: 'single',
    correctColorIds: ['purple'],
    optionIds: ['purple', 'red', 'green', 'yellow'],
    renderScene: () => (
      <svg viewBox="0 0 220 150" className="w-full max-w-[260px] h-40 mx-auto">
        <rect width="220" height="150" rx="18" fill="#faf5ff" />
        <ellipse cx="110" cy="74" rx="30" ry="50" fill="#a855f7" stroke="#7e22ce" strokeWidth="3" />
        <circle cx="102" cy="54" r="6" fill="#d8b4fe" />
        <circle cx="118" cy="54" r="6" fill="#d8b4fe" />
        <circle cx="100" cy="74" r="6" fill="#d8b4fe" />
        <circle cx="120" cy="74" r="6" fill="#d8b4fe" />
        <circle cx="104" cy="94" r="6" fill="#d8b4fe" />
        <circle cx="116" cy="94" r="6" fill="#d8b4fe" />
      </svg>
    ),
  },
  {
    id: 'scene-night',
    titleSpanish: 'Noche con Estrellas',
    titleQuechua: 'Yana Tuta Quyllurkunawan',
    questionSpanish: '¿Qué dos colores ves en la noche con estrellas?',
    questionQuechua: '¿Ima iskay llimpikunataq tutapi rikunki?',
    mode: 'multi',
    correctColorIds: ['black', 'yellow'],
    optionIds: ['black', 'yellow', 'green', 'red'],
    renderScene: () => (
      <svg viewBox="0 0 220 150" className="w-full max-w-[260px] h-40 mx-auto">
        <rect width="220" height="150" rx="18" fill="#1e293b" />
        <polygon points="65,30 71,44 86,45 75,55 78,70 65,62 52,70 55,55 44,45 59,44" fill="#facc15" />
        <polygon points="152,50 158,64 173,65 162,75 165,90 152,82 139,90 142,75 131,65 146,64" fill="#facc15" />
        <polygon points="110,88 114,98 125,99 117,106 119,117 110,111 101,117 103,106 95,99 106,98" fill="#facc15" />
      </svg>
    ),
  },
];

export const PictureColorsGame: React.FC<PictureColorsGameProps> = ({
  appLang,
  dialect,
  onBackToHub,
}) => {
  const { profile, awardStar } = useUserProfile();
  const [sceneIdx, setSceneIdx] = useState(0);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [score, setScore] = useState(0);

  const scene = SCENES[sceneIdx % SCENES.length];

  const speakColor = (c: ColorChoice) => {
    if (appLang === 'quechua') {
      audioService.speakQuechua(c.quechua, dialect);
    } else {
      audioService.speakSpanish(c.spanish);
    }
  };

  const handleToggleOption = (colorId: string) => {
    if (feedback === 'correct') return;
    setFeedback(null);
    const col = PALETTE[colorId];
    if (col) speakColor(col);

    if (scene.mode === 'single') {
      setSelectedIds([colorId]);
      if (scene.correctColorIds.includes(colorId)) {
        setFeedback('correct');
        setScore(s => s + 1);
        audioService.playSuccessSound();
        awardStar(`pic-colors-${scene.id}`);
        confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
      } else {
        setFeedback('wrong');
        audioService.playErrorSound();
      }
      return;
    }

    // Multi-select mode
    setSelectedIds(prev =>
      prev.includes(colorId) ? prev.filter(id => id !== colorId) : [...prev, colorId]
    );
  };

  const handleVerifyMulti = () => {
    const sortedSel = [...selectedIds].sort().join(',');
    const sortedCor = [...scene.correctColorIds].sort().join(',');
    if (sortedSel === sortedCor) {
      setFeedback('correct');
      setScore(s => s + 1);
      audioService.playSuccessSound();
      awardStar(`pic-colors-${scene.id}`);
      confetti({ particleCount: 70, spread: 75, origin: { y: 0.6 } });
    } else {
      setFeedback('wrong');
      audioService.playErrorSound();
    }
  };

  const handleNext = () => {
    audioService.playPop();
    setSelectedIds([]);
    setFeedback(null);
    setSceneIdx(i => i + 1);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-800 p-3.5 sm:p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
        <button
          onClick={onBackToHub}
          className="flex items-center gap-2 min-h-[40px] text-sm font-bold text-amber-700 dark:text-amber-400 hover:text-amber-800 transition cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 shrink-0" />
          <span>{appLang === 'quechua' ? 'Kutiy pukllaykunaman' : 'Volver a juegos'}</span>
        </button>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
            <Award className="w-4 h-4" />
            <span>Aciertos: {score}</span>
          </div>
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
            Imagen {(sceneIdx % SCENES.length) + 1} / {SCENES.length}
          </span>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-4 sm:p-7 shadow-sm border border-slate-200 dark:border-slate-700 text-center space-y-5">
        <div className="flex flex-col items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-200 text-xs font-extrabold">
            <Palette className="w-3.5 h-3.5" />
            {appLang === 'quechua' ? scene.titleQuechua : scene.titleSpanish}
          </span>

          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-['Fredoka'] max-w-xl">
            {appLang === 'quechua' ? scene.questionQuechua : scene.questionSpanish}
          </h2>

          <button
            onClick={() =>
              appLang === 'quechua'
                ? audioService.speakQuechua(scene.questionQuechua, dialect)
                : audioService.speakSpanish(scene.questionSpanish)
            }
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 text-xs font-bold hover:bg-amber-200 transition cursor-pointer"
          >
            <Volume2 className="w-4 h-4" />
            <span>Escuchar pregunta</span>
          </button>
        </div>

        {/* Visual Illustration */}
        <div className="p-4 rounded-3xl bg-slate-100/80 dark:bg-slate-900/70 border-2 border-slate-200 dark:border-slate-700 inline-block w-full max-w-sm shadow-inner">
          {scene.renderScene()}
        </div>

        {/* Color Choice Options */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
          {scene.optionIds.map(colorId => {
            const col = PALETTE[colorId];
            const isSelected = selectedIds.includes(colorId);

            return (
              <button
                key={colorId}
                disabled={feedback === 'correct'}
                onClick={() => handleToggleOption(colorId)}
                className={`relative p-3.5 rounded-2xl border-2 transition-all active:scale-95 flex flex-col items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/50 ring-4 ring-amber-300/60 shadow-md scale-[1.03]'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 hover:border-amber-300'
                }`}
              >
                {isSelected && (
                  <span className="absolute top-2 right-2 w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center shadow">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </span>
                )}
                <div
                  className="w-14 h-14 rounded-2xl border-2 shadow-sm"
                  style={{ backgroundColor: col.hex, borderColor: col.borderHex }}
                />
                <div className="text-center">
                  <span className="block text-sm font-extrabold text-slate-900 dark:text-white font-['Fredoka']">
                    {col.quechua}
                  </span>
                  <span className="block text-xs font-semibold text-slate-500 dark:text-slate-400">
                    {col.spanish}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Check button for multi-color mode */}
        {scene.mode === 'multi' && feedback !== 'correct' && (
          <div>
            <button
              onClick={handleVerifyMulti}
              disabled={selectedIds.length === 0}
              className="px-7 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-extrabold text-sm shadow-md active:scale-95 transition cursor-pointer"
            >
              {appLang === 'quechua' ? '¡Tukurqani! (Comprobar)' : '¡Listo! Comprobar colores'}
            </button>
          </div>
        )}

        {/* Feedback */}
        {feedback && (
          <div className="space-y-3 animate-in fade-in">
            {feedback === 'correct' ? (
              <>
                <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200 text-sm font-bold inline-flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>
                    ¡Excelente, {profile.name}! Descubriste todos los colores de la imagen.
                  </span>
                </div>
                <div>
                  <button
                    onClick={handleNext}
                    className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md active:scale-95 transition inline-flex items-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Siguiente imagen</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-200 text-sm font-bold inline-block">
                {scene.mode === 'multi'
                  ? `Pista: observa con atención, hay ${scene.correctColorIds.length} colores principales en el dibujo.`
                  : 'Observa bien la parte del dibujo que pregunta y vuelve a intentarlo.'}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
