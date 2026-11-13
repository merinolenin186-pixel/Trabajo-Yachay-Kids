import React from 'react';

interface IllustrationProps {
  className?: string;
  size?: number;
}

export const SunIllustration: React.FC<IllustrationProps> = ({ className = 'w-16 h-16', size }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    fill="none"
  >
    {/* Solar Rays */}
    <g stroke="#f59e0b" strokeWidth="6" strokeLinecap="round">
      <line x1="50" y1="6" x2="50" y2="18" />
      <line x1="50" y1="82" x2="50" y2="94" />
      <line x1="6" y1="50" x2="18" y2="50" />
      <line x1="82" y1="50" x2="94" y2="50" />
      <line x1="18" y1="18" x2="28" y2="28" />
      <line x1="72" y1="72" x2="82" y2="82" />
      <line x1="18" y1="82" x2="28" y2="72" />
      <line x1="72" y1="28" x2="82" y2="18" />
    </g>
    {/* Sun Body */}
    <circle cx="50" cy="50" r="30" fill="#fbbf24" stroke="#d97706" strokeWidth="3" />
    {/* Rosy Cheeks */}
    <circle cx="36" cy="54" r="5" fill="#fca5a5" />
    <circle cx="64" cy="54" r="5" fill="#fca5a5" />
    {/* Cute Eyes */}
    <circle cx="38" cy="46" r="4" fill="#78350f" />
    <circle cx="39" cy="44" r="1.5" fill="#ffffff" />
    <circle cx="62" cy="46" r="4" fill="#78350f" />
    <circle cx="63" cy="44" r="1.5" fill="#ffffff" />
    {/* Joyful Smile */}
    <path d="M 40 56 Q 50 66 60 56" stroke="#78350f" strokeWidth="3" strokeLinecap="round" fill="none" />
  </svg>
);

export const LlamaIllustration: React.FC<IllustrationProps> = ({ className = 'w-16 h-16', size }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    fill="none"
  >
    {/* Body */}
    <ellipse cx="50" cy="62" rx="26" ry="18" fill="#fef3c7" stroke="#b45309" strokeWidth="2.5" />
    {/* Neck */}
    <path d="M 64 64 L 66 32 C 66 28 62 26 58 26 L 52 34 L 52 64 Z" fill="#fef3c7" stroke="#b45309" strokeWidth="2.5" />
    {/* Head & Snout */}
    <ellipse cx="64" cy="26" rx="12" ry="9" fill="#fef3c7" stroke="#b45309" strokeWidth="2.5" />
    {/* Cute Ears */}
    <path d="M 58 20 L 56 10 C 56 8 59 8 60 10 L 61 20" fill="#fef3c7" stroke="#b45309" strokeWidth="2" />
    <path d="M 64 20 L 65 11 C 65 9 68 9 68 11 L 67 20" fill="#fef3c7" stroke="#b45309" strokeWidth="2" />
    {/* Eye & Smile */}
    <circle cx="67" cy="24" r="2.5" fill="#78350f" />
    <path d="M 72 26 Q 74 29 70 30" stroke="#78350f" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    {/* Legs */}
    <line x1="34" y1="78" x2="34" y2="94" stroke="#b45309" strokeWidth="4" strokeLinecap="round" />
    <line x1="44" y1="78" x2="44" y2="94" stroke="#b45309" strokeWidth="4" strokeLinecap="round" />
    <line x1="56" y1="78" x2="56" y2="94" stroke="#b45309" strokeWidth="4" strokeLinecap="round" />
    <line x1="66" y1="78" x2="66" y2="94" stroke="#b45309" strokeWidth="4" strokeLinecap="round" />
    {/* Fluffy Tail */}
    <path d="M 24 58 Q 18 52 24 50" stroke="#b45309" strokeWidth="3" strokeLinecap="round" />
    {/* Andean Colorful Blanket (Ch'uspa/Lliclla) */}
    <rect x="40" y="52" width="20" height="15" rx="3" fill="#ec4899" stroke="#be185d" strokeWidth="1.5" />
    <rect x="42" y="56" width="16" height="3" fill="#0284c7" />
    <rect x="42" y="61" width="16" height="3" fill="#eab308" />
    {/* Ear Tassels (Red & Green Pompons) */}
    <circle cx="56" cy="11" r="2" fill="#ef4444" />
    <circle cx="67" cy="12" r="2" fill="#10b981" />
  </svg>
);

export const CondorIllustration: React.FC<IllustrationProps> = ({ className = 'w-16 h-16', size }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    fill="none"
  >
    {/* Body */}
    <ellipse cx="50" cy="54" rx="14" ry="22" fill="#1e293b" />
    {/* Huge Wings */}
    <path
      d="M 40 46 C 25 36 10 32 4 44 C 14 56 26 62 42 56 Z"
      fill="#334155"
      stroke="#0f172a"
      strokeWidth="2"
    />
    <path
      d="M 60 46 C 75 36 90 32 96 44 C 86 56 74 62 58 56 Z"
      fill="#334155"
      stroke="#0f172a"
      strokeWidth="2"
    />
    {/* White Wing Highlights */}
    <path d="M 12 44 Q 24 40 36 46" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
    <path d="M 88 44 Q 76 40 64 46" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
    {/* White Neck Ruff (Collar de plumas blancas) */}
    <ellipse cx="50" cy="34" rx="8" ry="4" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
    {/* Head & Beak */}
    <circle cx="50" cy="24" r="7" fill="#7f1d1d" />
    {/* Comb / Cresta */}
    <path d="M 49 17 C 51 14 53 14 54 18" stroke="#991b1b" strokeWidth="3" strokeLinecap="round" />
    {/* Beak */}
    <path d="M 55 24 L 62 26 L 55 28 Z" fill="#f59e0b" />
    <circle cx="49" cy="23" r="1.5" fill="#f8fafc" />
    {/* Tail Feathers */}
    <path d="M 44 74 L 50 86 L 56 74 Z" fill="#0f172a" />
  </svg>
);

export const CuyIllustration: React.FC<IllustrationProps> = ({ className = 'w-16 h-16', size }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    fill="none"
  >
    {/* Fluffy Guinea Pig Body */}
    <ellipse cx="50" cy="56" rx="28" ry="20" fill="#f97316" stroke="#c2410c" strokeWidth="2.5" />
    {/* White patch */}
    <ellipse cx="44" cy="58" rx="14" ry="15" fill="#fff7ed" />
    {/* Round Ears */}
    <circle cx="68" cy="40" r="6" fill="#fbcfe8" stroke="#c2410c" strokeWidth="2" />
    <circle cx="58" cy="38" r="6" fill="#fbcfe8" stroke="#c2410c" strokeWidth="2" />
    {/* Eye & Whiskers */}
    <circle cx="68" cy="50" r="3.5" fill="#431407" />
    <circle cx="69" cy="48" r="1" fill="#ffffff" />
    {/* Cute Pink Snout */}
    <ellipse cx="76" cy="56" rx="4" ry="3" fill="#f472b6" />
    {/* Whiskers */}
    <line x1="74" y1="53" x2="84" y2="49" stroke="#7c2d12" strokeWidth="1.5" />
    <line x1="74" y1="58" x2="85" y2="60" stroke="#7c2d12" strokeWidth="1.5" />
    {/* Tiny Feet */}
    <ellipse cx="36" cy="74" rx="5" ry="3" fill="#fbcfe8" stroke="#c2410c" strokeWidth="1.5" />
    <ellipse cx="60" cy="74" rx="5" ry="3" fill="#fbcfe8" stroke="#c2410c" strokeWidth="1.5" />
  </svg>
);

export const FoxIllustration: React.FC<IllustrationProps> = ({ className = 'w-16 h-16', size }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    fill="none"
  >
    {/* Body */}
    <ellipse cx="46" cy="62" rx="22" ry="16" fill="#ea580c" stroke="#9a3412" strokeWidth="2.5" />
    {/* Bushy Tail */}
    <path
      d="M 26 64 C 14 62 8 48 16 38 C 22 42 26 50 30 56 Z"
      fill="#ea580c"
      stroke="#9a3412"
      strokeWidth="2.5"
    />
    <path d="M 12 44 Q 15 39 18 41 Q 14 48 20 48 Z" fill="#ffffff" />
    {/* Head */}
    <polygon points="62,38 78,50 60,60" fill="#ea580c" stroke="#9a3412" strokeWidth="2.5" />
    {/* White Cheek */}
    <polygon points="65,48 78,50 63,58" fill="#ffffff" />
    {/* Pointy Ears */}
    <polygon points="56,38 60,20 68,36" fill="#ea580c" stroke="#9a3412" strokeWidth="2" />
    <polygon points="59,34 62,24 66,33" fill="#1e293b" />
    {/* Eye & Black Nose */}
    <circle cx="68" cy="46" r="2.5" fill="#1e293b" />
    <circle cx="78" cy="50" r="3" fill="#0f172a" />
    {/* Legs */}
    <line x1="38" y1="76" x2="38" y2="90" stroke="#9a3412" strokeWidth="3" strokeLinecap="round" />
    <line x1="54" y1="76" x2="54" y2="90" stroke="#9a3412" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const ChaskiBoyIllustration: React.FC<IllustrationProps> = ({ className = 'w-16 h-16', size }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    fill="none"
  >
    {/* Poncho Body */}
    <polygon points="50,46 22,82 78,82" fill="#dc2626" stroke="#991b1b" strokeWidth="2" />
    {/* Traditional Andean Pattern on Poncho */}
    <line x1="32" y1="68" x2="68" y2="68" stroke="#fbbf24" strokeWidth="3" />
    <line x1="36" y1="74" x2="64" y2="74" stroke="#0284c7" strokeWidth="2.5" />
    {/* Head */}
    <circle cx="50" cy="34" r="14" fill="#fcd34d" stroke="#d97706" strokeWidth="2" />
    {/* Eyes & Rosy Cheeks */}
    <circle cx="44" cy="34" r="2.5" fill="#78350f" />
    <circle cx="56" cy="34" r="2.5" fill="#78350f" />
    <circle cx="41" cy="39" r="3" fill="#fca5a5" />
    <circle cx="59" cy="39" r="3" fill="#fca5a5" />
    {/* Happy Smile */}
    <path d="M 46 41 Q 50 46 54 41" stroke="#78350f" strokeWidth="2" strokeLinecap="round" fill="none" />
    {/* Chullo (Andean Earflap Wool Cap) */}
    <path
      d="M 36 28 C 36 14 64 14 64 28 Z"
      fill="#0284c7"
      stroke="#0369a1"
      strokeWidth="2"
    />
    {/* Cap patterns */}
    <path d="M 40 24 L 50 16 L 60 24" stroke="#fbbf24" strokeWidth="2.5" fill="none" />
    {/* Earflaps */}
    <polygon points="36,28 32,38 38,36" fill="#0284c7" />
    <polygon points="64,28 68,38 62,36" fill="#0284c7" />
    {/* Cap Pompom */}
    <circle cx="50" cy="14" r="4" fill="#ef4444" />
    {/* Feet */}
    <ellipse cx="40" cy="85" rx="5" ry="3" fill="#78350f" />
    <ellipse cx="60" cy="85" rx="5" ry="3" fill="#78350f" />
  </svg>
);

export const PachaGirlIllustration: React.FC<IllustrationProps> = ({ className = 'w-16 h-16', size }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    fill="none"
  >
    {/* Pollera Dress (Skirt) */}
    <path d="M 36 56 L 20 84 L 80 84 L 64 56 Z" fill="#ec4899" stroke="#be185d" strokeWidth="2" />
    <line x1="24" y1="74" x2="76" y2="74" stroke="#facc15" strokeWidth="3" />
    <line x1="22" y1="80" x2="78" y2="80" stroke="#10b981" strokeWidth="2" />
    {/* Lliclla (Manta andina) */}
    <polygon points="50,46 32,58 68,58" fill="#8b5cf6" stroke="#6d28d9" strokeWidth="1.5" />
    {/* Head */}
    <circle cx="50" cy="34" r="14" fill="#fcd34d" stroke="#d97706" strokeWidth="2" />
    {/* Hair Braids with Tulle */}
    <path d="M 36 34 L 30 52" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
    <circle cx="30" cy="52" r="3" fill="#ef4444" />
    <path d="M 64 34 L 70 52" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
    <circle cx="70" cy="52" r="3" fill="#ef4444" />
    {/* Hair Band */}
    <path d="M 37 26 Q 50 18 63 26" fill="#1e293b" />
    {/* Eyes & Cheeks */}
    <circle cx="44" cy="34" r="2.5" fill="#78350f" />
    <circle cx="56" cy="34" r="2.5" fill="#78350f" />
    <circle cx="41" cy="39" r="3" fill="#fca5a5" />
    <circle cx="59" cy="39" r="3" fill="#fca5a5" />
    <path d="M 46 41 Q 50 46 54 41" stroke="#78350f" strokeWidth="2" strokeLinecap="round" fill="none" />
    {/* Andean Montera Hat */}
    <ellipse cx="50" cy="20" rx="16" ry="5" fill="#dc2626" stroke="#991b1b" strokeWidth="2" />
    <ellipse cx="50" cy="18" rx="8" ry="4" fill="#facc15" />
    {/* Feet */}
    <ellipse cx="40" cy="88" rx="5" ry="3" fill="#78350f" />
    <ellipse cx="60" cy="88" rx="5" ry="3" fill="#78350f" />
  </svg>
);

export const PotatoIllustration: React.FC<IllustrationProps> = ({ className = 'w-16 h-16', size }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    fill="none"
  >
    <path
      d="M 50 20 C 75 18 84 38 82 60 C 80 82 62 86 46 84 C 28 82 18 68 20 48 C 22 26 36 22 50 20 Z"
      fill="#d97706"
      stroke="#92400e"
      strokeWidth="3"
    />
    {/* Cute Eyes & Smile */}
    <circle cx="40" cy="50" r="3.5" fill="#451a03" />
    <circle cx="58" cy="50" r="3.5" fill="#451a03" />
    <circle cx="41" cy="48" r="1.2" fill="#ffffff" />
    <circle cx="59" cy="48" r="1.2" fill="#ffffff" />
    <path d="M 44 58 Q 49 64 54 58" stroke="#451a03" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <circle cx="34" cy="55" r="3" fill="#fca5a5" />
    <circle cx="64" cy="55" r="3" fill="#fca5a5" />
    {/* Potato Dimples */}
    <circle cx="34" cy="34" r="2" fill="#b45309" />
    <circle cx="68" cy="36" r="2.5" fill="#b45309" />
    <circle cx="64" cy="72" r="2" fill="#b45309" />
    <circle cx="30" cy="68" r="2.5" fill="#b45309" />
  </svg>
);

export const CornIllustration: React.FC<IllustrationProps> = ({ className = 'w-16 h-16', size }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    fill="none"
  >
    {/* Green Husk leaves */}
    <path d="M 32 82 C 18 64 22 36 34 26 C 30 46 34 70 46 84 Z" fill="#10b981" stroke="#047857" strokeWidth="2" />
    <path d="M 68 82 C 82 64 78 36 66 26 C 70 46 66 70 54 84 Z" fill="#10b981" stroke="#047857" strokeWidth="2" />
    {/* Corn Ear */}
    <ellipse cx="50" cy="48" rx="16" ry="30" fill="#facc15" stroke="#ca8a04" strokeWidth="2.5" />
    {/* Kernel Grid */}
    <line x1="50" y1="20" x2="50" y2="76" stroke="#ca8a04" strokeWidth="1.5" />
    <line x1="42" y1="26" x2="42" y2="72" stroke="#ca8a04" strokeWidth="1.5" />
    <line x1="58" y1="26" x2="58" y2="72" stroke="#ca8a04" strokeWidth="1.5" />
    <line x1="38" y1="34" x2="62" y2="34" stroke="#ca8a04" strokeWidth="1.5" />
    <line x1="36" y1="46" x2="64" y2="46" stroke="#ca8a04" strokeWidth="1.5" />
    <line x1="38" y1="58" x2="62" y2="58" stroke="#ca8a04" strokeWidth="1.5" />
    {/* Cute Eyes on Corn */}
    <circle cx="44" cy="44" r="2.5" fill="#713f12" />
    <circle cx="56" cy="44" r="2.5" fill="#713f12" />
    <path d="M 47 50 Q 50 54 53 50" stroke="#713f12" strokeWidth="2" strokeLinecap="round" fill="none" />
  </svg>
);

export const RainbowIllustration: React.FC<IllustrationProps> = ({ className = 'w-16 h-16', size }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    fill="none"
  >
    <path d="M 12 76 A 38 38 0 0 1 88 76" stroke="#ef4444" strokeWidth="5" fill="none" />
    <path d="M 17 76 A 33 33 0 0 1 83 76" stroke="#f97316" strokeWidth="5" fill="none" />
    <path d="M 22 76 A 28 28 0 0 1 78 76" stroke="#facc15" strokeWidth="5" fill="none" />
    <path d="M 27 76 A 23 23 0 0 1 73 76" stroke="#10b981" strokeWidth="5" fill="none" />
    <path d="M 32 76 A 18 18 0 0 1 68 76" stroke="#0284c7" strokeWidth="5" fill="none" />
    <path d="M 37 76 A 13 13 0 0 1 63 76" stroke="#8b5cf6" strokeWidth="5" fill="none" />
    {/* Puffy Clouds at base */}
    <circle cx="16" cy="76" r="10" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
    <circle cx="25" cy="74" r="8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
    <circle cx="84" cy="76" r="10" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
    <circle cx="75" cy="74" r="8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
  </svg>
);
