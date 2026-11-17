import React from 'react';

interface IllustrationProps {
  className?: string;
}

// ==========================================
// 1. ANIMALES (Perro, Gato, Puma)
// ==========================================

export const DogIllustration: React.FC<IllustrationProps> = ({ className = 'w-20 h-20' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    {/* Tail */}
    <path d="M 24 62 Q 12 46 20 38" stroke="#92400e" strokeWidth="6" strokeLinecap="round" />
    {/* Body */}
    <ellipse cx="46" cy="66" rx="22" ry="16" fill="#d97706" stroke="#78350f" strokeWidth="2.5" />
    {/* Belly patch */}
    <ellipse cx="52" cy="70" rx="12" ry="9" fill="#fef3c7" />
    {/* Red Collar */}
    <path d="M 50 48 Q 62 56 68 48" stroke="#ef4444" strokeWidth="5" strokeLinecap="round" />
    <circle cx="62" cy="54" r="3.5" fill="#fbbf24" stroke="#b45309" strokeWidth="1" />
    {/* Legs */}
    <line x1="34" y1="78" x2="34" y2="91" stroke="#78350f" strokeWidth="5" strokeLinecap="round" />
    <line x1="44" y1="80" x2="44" y2="91" stroke="#78350f" strokeWidth="5" strokeLinecap="round" />
    <line x1="56" y1="80" x2="56" y2="91" stroke="#78350f" strokeWidth="5" strokeLinecap="round" />
    <line x1="65" y1="77" x2="65" y2="91" stroke="#78350f" strokeWidth="5" strokeLinecap="round" />
    {/* Head */}
    <circle cx="64" cy="36" r="17" fill="#d97706" stroke="#78350f" strokeWidth="2.5" />
    {/* Floppy Ears */}
    <ellipse cx="48" cy="38" rx="6" ry="12" transform="rotate(14 48 38)" fill="#78350f" />
    <ellipse cx="79" cy="38" rx="6" ry="12" transform="rotate(-14 79 38)" fill="#78350f" />
    {/* Muzzle */}
    <ellipse cx="66" cy="42" rx="10" ry="7" fill="#fef3c7" />
    {/* Eyes */}
    <circle cx="58" cy="32" r="3" fill="#1e293b" />
    <circle cx="59" cy="31" r="1" fill="#ffffff" />
    <circle cx="71" cy="32" r="3" fill="#1e293b" />
    <circle cx="72" cy="31" r="1" fill="#ffffff" />
    {/* Nose & Happy Tongue */}
    <ellipse cx="66" cy="39" rx="4" ry="2.8" fill="#1e293b" />
    <path d="M 62 44 Q 66 48 70 44" stroke="#78350f" strokeWidth="2" strokeLinecap="round" />
    <path d="M 64 46 C 64 52 70 52 70 46 Z" fill="#f472b6" stroke="#db2777" strokeWidth="1" />
  </svg>
);

export const CatIllustration: React.FC<IllustrationProps> = ({ className = 'w-20 h-20' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    {/* Curled Tail */}
    <path d="M 28 70 C 12 68 10 46 22 44" stroke="#ea580c" strokeWidth="6" strokeLinecap="round" fill="none" />
    {/* Sitting Body */}
    <ellipse cx="48" cy="68" rx="20" ry="18" fill="#fb923c" stroke="#9a3412" strokeWidth="2.5" />
    <ellipse cx="50" cy="71" rx="11" ry="12" fill="#fff7ed" />
    {/* Pointy Ears */}
    <polygon points="36,34 38,14 50,28" fill="#fb923c" stroke="#9a3412" strokeWidth="2.5" strokeLinejoin="round" />
    <polygon points="39,30 40,19 47,27" fill="#fbcfe8" />
    <polygon points="68,34 66,14 54,28" fill="#fb923c" stroke="#9a3412" strokeWidth="2.5" strokeLinejoin="round" />
    <polygon points="65,30 64,19 57,27" fill="#fbcfe8" />
    {/* Head */}
    <circle cx="52" cy="40" r="18" fill="#fb923c" stroke="#9a3412" strokeWidth="2.5" />
    {/* Forehead Stripes */}
    <line x1="52" y1="23" x2="52" y2="29" stroke="#9a3412" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="46" y1="25" x2="48" y2="30" stroke="#9a3412" strokeWidth="2" strokeLinecap="round" />
    <line x1="58" y1="25" x2="56" y2="30" stroke="#9a3412" strokeWidth="2" strokeLinecap="round" />
    {/* Eyes */}
    <circle cx="44" cy="39" r="3.2" fill="#0f172a" />
    <circle cx="45" cy="38" r="1.2" fill="#ffffff" />
    <circle cx="60" cy="39" r="3.2" fill="#0f172a" />
    <circle cx="61" cy="38" r="1.2" fill="#ffffff" />
    {/* Pink Nose & Whiskers */}
    <polygon points="50,44 54,44 52,47" fill="#f472b6" />
    <path d="M 47 48 Q 52 52 57 48" stroke="#7c2d12" strokeWidth="2" strokeLinecap="round" />
    <line x1="30" y1="42" x2="41" y2="44" stroke="#7c2d12" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="30" y1="48" x2="41" y2="47" stroke="#7c2d12" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="74" y1="42" x2="63" y2="44" stroke="#7c2d12" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="74" y1="48" x2="63" y2="47" stroke="#7c2d12" strokeWidth="1.5" strokeLinecap="round" />
    {/* Paws */}
    <ellipse cx="42" cy="86" rx="6" ry="4" fill="#fff7ed" stroke="#9a3412" strokeWidth="2" />
    <ellipse cx="58" cy="86" rx="6" ry="4" fill="#fff7ed" stroke="#9a3412" strokeWidth="2" />
  </svg>
);

export const PumaIllustration: React.FC<IllustrationProps> = ({ className = 'w-20 h-20' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    {/* Long Puma Tail */}
    <path d="M 24 68 C 10 72 8 54 18 48" stroke="#b45309" strokeWidth="5.5" strokeLinecap="round" />
    <circle cx="18" cy="48" r="3" fill="#451a03" />
    {/* Body */}
    <ellipse cx="44" cy="65" rx="23" ry="14" fill="#eab308" stroke="#92400e" strokeWidth="2.5" />
    <ellipse cx="46" cy="70" rx="14" ry="7" fill="#fef08a" />
    {/* Strong Legs */}
    <line x1="30" y1="75" x2="30" y2="90" stroke="#92400e" strokeWidth="5" strokeLinecap="round" />
    <line x1="40" y1="77" x2="40" y2="90" stroke="#92400e" strokeWidth="5" strokeLinecap="round" />
    <line x1="54" y1="77" x2="54" y2="90" stroke="#92400e" strokeWidth="5" strokeLinecap="round" />
    <line x1="62" y1="74" x2="62" y2="90" stroke="#92400e" strokeWidth="5" strokeLinecap="round" />
    {/* Rounded Ears */}
    <circle cx="52" cy="24" r="7" fill="#eab308" stroke="#92400e" strokeWidth="2.5" />
    <circle cx="52" cy="24" r="3.5" fill="#78350f" />
    <circle cx="76" cy="24" r="7" fill="#eab308" stroke="#92400e" strokeWidth="2.5" />
    <circle cx="76" cy="24" r="3.5" fill="#78350f" />
    {/* Head */}
    <circle cx="64" cy="39" r="17" fill="#eab308" stroke="#92400e" strokeWidth="2.5" />
    {/* Muzzle */}
    <ellipse cx="64" cy="45" rx="9" ry="7" fill="#fef9c3" />
    {/* Golden Eyes */}
    <circle cx="57" cy="35" r="3" fill="#451a03" />
    <circle cx="58" cy="34" r="1" fill="#ffffff" />
    <circle cx="71" cy="35" r="3" fill="#451a03" />
    <circle cx="72" cy="34" r="1" fill="#ffffff" />
    {/* Nose & Whiskers */}
    <polygon points="61,42 67,42 64,46" fill="#be123c" />
    <path d="M 59 48 Q 64 51 69 48" stroke="#451a03" strokeWidth="2" strokeLinecap="round" />
    <line x1="44" y1="44" x2="55" y2="45" stroke="#78350f" strokeWidth="1.4" />
    <line x1="73" y1="45" x2="84" y2="44" stroke="#78350f" strokeWidth="1.4" />
  </svg>
);

// ==========================================
// 2. ALIMENTOS ANDINOS (Quinua, Chuño, Lúcuma, Olluco)
// ==========================================

export const QuinuaIllustration: React.FC<IllustrationProps> = ({ className = 'w-20 h-20' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    {/* Stalk & Leaves */}
    <path d="M 50 92 L 50 32" stroke="#15803d" strokeWidth="4.5" strokeLinecap="round" />
    <path d="M 50 74 Q 26 66 26 52 Q 40 58 50 68" fill="#22c55e" stroke="#15803d" strokeWidth="2" />
    <path d="M 50 70 Q 74 62 74 48 Q 60 54 50 64" fill="#22c55e" stroke="#15803d" strokeWidth="2" />
    {/* Quinua Grain Clusters (Golden & Magenta Andean variety) */}
    <circle cx="50" cy="22" r="9" fill="#f59e0b" stroke="#b45309" strokeWidth="2" />
    <circle cx="40" cy="32" r="8" fill="#fbbf24" stroke="#b45309" strokeWidth="2" />
    <circle cx="60" cy="32" r="8" fill="#f43f5e" stroke="#be123c" strokeWidth="2" />
    <circle cx="36" cy="44" r="7" fill="#f43f5e" stroke="#be123c" strokeWidth="2" />
    <circle cx="50" cy="39" r="9" fill="#facc15" stroke="#b45309" strokeWidth="2" />
    <circle cx="64" cy="44" r="7" fill="#fbbf24" stroke="#b45309" strokeWidth="2" />
    <circle cx="44" cy="52" r="7" fill="#f59e0b" stroke="#b45309" strokeWidth="2" />
    <circle cx="56" cy="52" r="7" fill="#f43f5e" stroke="#be123c" strokeWidth="2" />
    {/* Cute tiny grains */}
    <circle cx="49" cy="20" r="1.8" fill="#fffbeb" />
    <circle cx="52" cy="38" r="1.8" fill="#fffbeb" />
    <circle cx="39" cy="30" r="1.8" fill="#fffbeb" />
  </svg>
);

export const ChunoIllustration: React.FC<IllustrationProps> = ({ className = 'w-20 h-20' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    {/* Frost Sparkle */}
    <path d="M 22 24 L 22 34 M 17 29 L 27 29" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M 80 22 L 80 30 M 76 26 L 84 26" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
    {/* Black/Gray Freeze-dried Chuño Potato */}
    <path
      d="M 48 24 C 72 22 82 38 78 58 C 74 78 56 82 40 80 C 24 78 16 62 20 44 C 24 28 34 25 48 24 Z"
      fill="#475569"
      stroke="#1e293b"
      strokeWidth="3"
    />
    {/* Frosty white chuño texture */}
    <ellipse cx="38" cy="38" rx="8" ry="4" fill="#94a3b8" opacity="0.6" />
    <circle cx="62" cy="64" r="5" fill="#334155" />
    {/* White Chuño companion (Tunta) */}
    <ellipse cx="70" cy="70" rx="16" ry="12" fill="#e2e8f0" stroke="#64748b" strokeWidth="2.5" />
    {/* Cute Eyes on Main Chuño */}
    <circle cx="40" cy="50" r="3" fill="#f8fafc" />
    <circle cx="54" cy="50" r="3" fill="#f8fafc" />
    <path d="M 43 58 Q 47 62 51 58" stroke="#f8fafc" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

export const LucumaIllustration: React.FC<IllustrationProps> = ({ className = 'w-20 h-20' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    {/* Leaf & Stem */}
    <path d="M 48 24 L 50 14" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
    <path d="M 50 20 Q 70 8 76 22 Q 62 28 50 20 Z" fill="#16a34a" stroke="#14532d" strokeWidth="2" />
    {/* Whole Lúcuma Fruit (green-gold skin) */}
    <path
      d="M 46 24 C 66 24 74 42 72 60 C 70 76 58 84 46 86 C 34 84 20 74 20 56 C 20 38 28 24 46 24 Z"
      fill="#65a30d"
      stroke="#3f6212"
      strokeWidth="2.5"
    />
    {/* Cut Half Showing Golden-Orange Creamy Pulp & Seed */}
    <ellipse cx="66" cy="66" rx="18" ry="20" fill="#f59e0b" stroke="#65a30d" strokeWidth="4" />
    <ellipse cx="66" cy="68" rx="7" ry="9" fill="#78350f" />
    <ellipse cx="64" cy="65" rx="2" ry="3" fill="#a16207" />
  </svg>
);

export const OllucoIllustration: React.FC<IllustrationProps> = ({ className = 'w-20 h-20' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    {/* Tuber 1 (Yellow with magenta spots) */}
    <path
      d="M 22 46 C 24 24 54 18 68 30 C 74 36 68 48 56 50 C 44 52 38 66 26 62 C 20 58 20 52 22 46 Z"
      fill="#facc15"
      stroke="#ca8a04"
      strokeWidth="2.5"
    />
    <circle cx="40" cy="34" r="3.5" fill="#e11d48" />
    <circle cx="56" cy="36" r="2.8" fill="#e11d48" />
    <circle cx="30" cy="48" r="2.5" fill="#e11d48" />
    {/* Tuber 2 (Curved golden-orange olluco) */}
    <path
      d="M 38 72 C 42 54 68 50 80 62 C 86 70 76 84 58 84 C 44 84 34 80 38 72 Z"
      fill="#fb923c"
      stroke="#c2410c"
      strokeWidth="2.5"
    />
    <circle cx="54" cy="68" r="3" fill="#be123c" />
    <circle cx="68" cy="70" r="3.5" fill="#be123c" />
  </svg>
);

// ==========================================
// 3. COLORES Y NÚMEROS
// ==========================================

export const ColorSplashIllustration: React.FC<{ color: string; border?: string; className?: string }> = ({
  color,
  border = '#ffffff',
  className = 'w-20 h-20',
}) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <path
      d="M 50 12 C 66 12 72 24 80 26 C 88 28 90 42 84 52 C 88 64 80 78 68 80 C 60 88 42 90 32 82 C 18 82 12 68 18 54 C 10 42 18 26 32 24 C 36 16 42 12 50 12 Z"
      fill={color}
      stroke={border}
      strokeWidth="4"
    />
    <circle cx="38" cy="34" r="5" fill="#ffffff" opacity="0.35" />
    <circle cx="86" cy="20" r="5" fill={color} stroke={border} strokeWidth="2" />
    <circle cx="16" cy="78" r="4" fill={color} stroke={border} strokeWidth="2" />
  </svg>
);

export const NumberPictogramIllustration: React.FC<{ num: number; color: string; className?: string }> = ({
  num,
  color,
  className = 'w-20 h-20',
}) => {
  const dots = Math.min(num, 10);
  const cols = dots <= 3 ? dots : dots <= 6 ? 3 : 5;
  return (
    <div className={`${className} flex flex-col items-center justify-center gap-1`}>
      <span
        className="text-5xl sm:text-6xl font-black leading-none font-['Fredoka']"
        style={{ color }}
      >
        {num}
      </span>
      <div
        className="grid gap-1 mt-0.5"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: dots }).map((_, i) => (
          <span
            key={i}
            className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full inline-block"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
};

// ==========================================
// 4. FAMILIA (Mamá, Papá, Bebé, Abuelita, Abuelito)
// ==========================================

export const MotherIllustration: React.FC<IllustrationProps> = ({ className = 'w-20 h-20' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    {/* Heart accent */}
    <path d="M 78 24 C 78 20 84 20 84 24 C 84 28 78 32 78 32 C 78 32 72 28 72 24 C 72 20 78 20 78 24 Z" fill="#f43f5e" />
    {/* Lliclla Shawl & Skirt */}
    <path d="M 24 88 L 36 52 L 64 52 L 76 88 Z" fill="#ec4899" stroke="#be185d" strokeWidth="2.5" />
    <polygon points="50,48 28,64 72,64" fill="#8b5cf6" stroke="#6d28d9" strokeWidth="2" />
    {/* Hair Braids */}
    <path d="M 35 34 L 29 58" stroke="#1e293b" strokeWidth="5" strokeLinecap="round" />
    <path d="M 65 34 L 71 58" stroke="#1e293b" strokeWidth="5" strokeLinecap="round" />
    {/* Head */}
    <circle cx="50" cy="34" r="15" fill="#fde68a" stroke="#d97706" strokeWidth="2" />
    <path d="M 35 28 Q 50 18 65 28" fill="#1e293b" />
    {/* Traditional Hat */}
    <ellipse cx="50" cy="20" rx="18" ry="5" fill="#78350f" />
    <rect x="40" y="10" width="20" height="10" rx="4" fill="#92400e" />
    <line x1="40" y1="17" x2="60" y2="17" stroke="#ef4444" strokeWidth="3" />
    {/* Loving Eyes & Smile */}
    <circle cx="44" cy="35" r="2.4" fill="#451a03" />
    <circle cx="56" cy="35" r="2.4" fill="#451a03" />
    <circle cx="40" cy="40" r="3" fill="#fca5a5" />
    <circle cx="60" cy="40" r="3" fill="#fca5a5" />
    <path d="M 45 41 Q 50 46 55 41" stroke="#78350f" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const FatherIllustration: React.FC<IllustrationProps> = ({ className = 'w-20 h-20' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    {/* Poncho */}
    <polygon points="50,48 20,88 80,88" fill="#0284c7" stroke="#0369a1" strokeWidth="2.5" />
    <line x1="28" y1="74" x2="72" y2="74" stroke="#fbbf24" strokeWidth="3.5" />
    <line x1="33" y1="81" x2="67" y2="81" stroke="#ef4444" strokeWidth="3" />
    {/* Head */}
    <circle cx="50" cy="34" r="15" fill="#fde68a" stroke="#d97706" strokeWidth="2" />
    {/* Hat */}
    <ellipse cx="50" cy="20" rx="20" ry="5" fill="#475569" />
    <rect x="38" y="9" width="24" height="11" rx="4" fill="#334155" />
    {/* Eyes, Mustache & Smile */}
    <circle cx="44" cy="32" r="2.5" fill="#1e293b" />
    <circle cx="56" cy="32" r="2.5" fill="#1e293b" />
    <path d="M 42 39 Q 50 36 58 39" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
    <path d="M 46 43 Q 50 46 54 43" stroke="#78350f" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const BabyIllustration: React.FC<IllustrationProps> = ({ className = 'w-20 h-20' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    {/* Swaddle Blanket (Wawa) */}
    <ellipse cx="50" cy="68" rx="22" ry="20" fill="#bae6fd" stroke="#0284c7" strokeWidth="2.5" />
    <path d="M 32 64 Q 50 76 68 64" stroke="#ec4899" strokeWidth="3.5" fill="none" />
    <path d="M 34 74 Q 50 84 66 74" stroke="#fbbf24" strokeWidth="3" fill="none" />
    {/* Baby Head */}
    <circle cx="50" cy="38" r="18" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
    {/* Cute Curl */}
    <path d="M 50 20 C 46 12 56 12 53 20" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
    {/* Eyes, Rosy Cheeks, Pacifier/Smile */}
    <circle cx="43" cy="37" r="2.8" fill="#1e293b" />
    <circle cx="57" cy="37" r="2.8" fill="#1e293b" />
    <circle cx="38" cy="43" r="3.5" fill="#fda4af" />
    <circle cx="62" cy="43" r="3.5" fill="#fda4af" />
    <path d="M 46 45 Q 50 49 54 45" stroke="#92400e" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

export const GrandmotherIllustration: React.FC<IllustrationProps> = ({ className = 'w-20 h-20' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    {/* Shawl */}
    <path d="M 24 88 L 36 52 L 64 52 L 76 88 Z" fill="#8b5cf6" stroke="#5b21b6" strokeWidth="2.5" />
    <polygon points="50,50 30,66 70,66" fill="#c4b5fd" />
    {/* Silver Hair & Bun */}
    <circle cx="50" cy="14" r="8" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
    <circle cx="50" cy="36" r="16" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
    <path d="M 34 32 Q 50 18 66 32" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
    {/* Glasses */}
    <circle cx="43" cy="36" r="5" stroke="#475569" strokeWidth="2" fill="#ffffff" fillOpacity="0.4" />
    <circle cx="57" cy="36" r="5" stroke="#475569" strokeWidth="2" fill="#ffffff" fillOpacity="0.4" />
    <line x1="48" y1="36" x2="52" y2="36" stroke="#475569" strokeWidth="2" />
    {/* Eyes & Warm Smile */}
    <circle cx="43" cy="36" r="2" fill="#1e293b" />
    <circle cx="57" cy="36" r="2" fill="#1e293b" />
    <path d="M 45 45 Q 50 49 55 45" stroke="#78350f" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const GrandfatherIllustration: React.FC<IllustrationProps> = ({ className = 'w-20 h-20' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    {/* Poncho */}
    <polygon points="50,48 20,88 80,88" fill="#059669" stroke="#047857" strokeWidth="2.5" />
    <line x1="28" y1="76" x2="72" y2="76" stroke="#fbbf24" strokeWidth="3" />
    {/* Head & White Hair */}
    <circle cx="50" cy="35" r="16" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
    <path d="M 34 30 Q 50 16 66 30" fill="#e2e8f0" />
    {/* Hat */}
    <ellipse cx="50" cy="20" rx="19" ry="4.5" fill="#78350f" />
    <rect x="39" y="10" width="22" height="10" rx="3" fill="#92400e" />
    {/* Eyes & White Mustache */}
    <circle cx="43" cy="34" r="2.2" fill="#1e293b" />
    <circle cx="57" cy="34" r="2.2" fill="#1e293b" />
    <path d="M 40 41 Q 50 37 60 41" stroke="#f1f5f9" strokeWidth="4" strokeLinecap="round" />
    <path d="M 46 45 Q 50 48 54 45" stroke="#78350f" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// ==========================================
// 5. PARTES DEL CUERPO (Cabeza, Ojos, Oreja, Boca, Mano, Pie)
// ==========================================

export const HeadIllustration: React.FC<IllustrationProps> = ({ className = 'w-20 h-20' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    {/* Neck & Shoulders hint */}
    <rect x="42" y="72" width="16" height="12" rx="4" fill="#fde68a" />
    <path d="M 28 92 Q 50 80 72 92" fill="#f59e0b" />
    {/* Head */}
    <circle cx="50" cy="48" r="26" fill="#fde68a" stroke="#d97706" strokeWidth="2.5" />
    {/* Hair */}
    <path d="M 24 44 C 24 20 76 20 76 44 C 68 32 32 32 24 44 Z" fill="#451a03" />
    {/* Ears */}
    <circle cx="24" cy="50" r="5" fill="#fde68a" stroke="#d97706" strokeWidth="2" />
    <circle cx="76" cy="50" r="5" fill="#fde68a" stroke="#d97706" strokeWidth="2" />
    {/* Face */}
    <circle cx="41" cy="48" r="3" fill="#1e293b" />
    <circle cx="59" cy="48" r="3" fill="#1e293b" />
    <circle cx="36" cy="55" r="3.5" fill="#fca5a5" />
    <circle cx="64" cy="55" r="3.5" fill="#fca5a5" />
    <path d="M 44 59 Q 50 65 56 59" stroke="#92400e" strokeWidth="2.5" strokeLinecap="round" />
    {/* Arrow pointing to head */}
    <path d="M 50 6 L 50 16 M 45 12 L 50 17 L 55 12" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const EyeIllustration: React.FC<IllustrationProps> = ({ className = 'w-20 h-20' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    {/* Left Eye */}
    <path d="M 10 50 Q 29 28 46 50 Q 29 72 10 50 Z" fill="#ffffff" stroke="#1e293b" strokeWidth="3" />
    <circle cx="28" cy="50" r="10" fill="#0284c7" />
    <circle cx="28" cy="50" r="5" fill="#0f172a" />
    <circle cx="31" cy="47" r="2.5" fill="#ffffff" />
    {/* Right Eye */}
    <path d="M 54 50 Q 71 28 90 50 Q 71 72 54 50 Z" fill="#ffffff" stroke="#1e293b" strokeWidth="3" />
    <circle cx="72" cy="50" r="10" fill="#0284c7" />
    <circle cx="72" cy="50" r="5" fill="#0f172a" />
    <circle cx="75" cy="47" r="2.5" fill="#ffffff" />
    {/* Eyebrows */}
    <path d="M 16 32 Q 28 24 40 32" stroke="#451a03" strokeWidth="3" strokeLinecap="round" />
    <path d="M 60 32 Q 72 24 84 32" stroke="#451a03" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const EarIllustration: React.FC<IllustrationProps> = ({ className = 'w-20 h-20' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    {/* Outer Ear */}
    <path
      d="M 42 22 C 66 16 78 36 72 58 C 68 74 58 84 44 82 C 34 80 30 70 36 62 C 42 54 34 40 36 30 C 37 25 39 23 42 22 Z"
      fill="#fed7aa"
      stroke="#c2410c"
      strokeWidth="3"
    />
    {/* Inner Ear curve */}
    <path d="M 46 34 C 58 30 62 44 56 54 C 52 60 44 62 46 70" stroke="#c2410c" strokeWidth="3" strokeLinecap="round" fill="none" />
    {/* Sound Waves */}
    <path d="M 22 38 Q 14 50 22 62" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M 14 32 Q 4 50 14 68" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" fill="none" />
  </svg>
);

export const MouthIllustration: React.FC<IllustrationProps> = ({ className = 'w-20 h-20' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    {/* Outer Lips */}
    <path
      d="M 14 48 Q 34 32 50 40 Q 66 32 86 48 Q 70 74 50 74 Q 30 74 14 48 Z"
      fill="#ef4444"
      stroke="#991b1b"
      strokeWidth="2.5"
    />
    {/* Inside Mouth & Teeth & Tongue */}
    <path d="M 22 49 Q 50 44 78 49 Q 66 66 50 66 Q 34 66 22 49 Z" fill="#7f1d1d" />
    <path d="M 26 49 Q 50 46 74 49 L 70 55 Q 50 53 30 55 Z" fill="#ffffff" />
    <ellipse cx="50" cy="62" rx="14" ry="5" fill="#fb7185" />
  </svg>
);

export const HandIllustration: React.FC<IllustrationProps> = ({ className = 'w-20 h-20' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <path
      d="M 32 54 L 32 24 C 32 19 39 19 39 24 L 39 46 L 42 18 C 42 13 49 13 49 18 L 49 45 L 52 16 C 52 11 59 11 59 16 L 59 45 L 62 22 C 62 17 69 17 69 22 L 69 54 L 78 44 C 82 40 87 45 83 50 L 70 72 C 64 82 56 86 46 86 C 34 86 28 76 28 64 L 28 54 C 28 51 32 51 32 54 Z"
      fill="#fde68a"
      stroke="#d97706"
      strokeWidth="2.8"
      strokeLinejoin="round"
    />
    {/* Palm line */}
    <path d="M 38 62 Q 50 58 60 66" stroke="#d97706" strokeWidth="2" strokeLinecap="round" fill="none" />
  </svg>
);

export const FootIllustration: React.FC<IllustrationProps> = ({ className = 'w-20 h-20' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    {/* Footprint / Cute Foot */}
    <path
      d="M 38 38 C 52 34 66 44 62 60 C 59 70 62 84 48 86 C 36 88 32 76 34 64 C 35 56 26 42 38 38 Z"
      fill="#fde68a"
      stroke="#d97706"
      strokeWidth="2.8"
    />
    {/* 5 Toes */}
    <circle cx="34" cy="28" r="6" fill="#fde68a" stroke="#d97706" strokeWidth="2.2" />
    <circle cx="46" cy="24" r="4.8" fill="#fde68a" stroke="#d97706" strokeWidth="2.2" />
    <circle cx="56" cy="26" r="4.2" fill="#fde68a" stroke="#d97706" strokeWidth="2.2" />
    <circle cx="64" cy="31" r="3.6" fill="#fde68a" stroke="#d97706" strokeWidth="2.2" />
    <circle cx="70" cy="38" r="3" fill="#fde68a" stroke="#d97706" strokeWidth="2.2" />
  </svg>
);

// ==========================================
// 6. NATURALEZA (Luna, Estrella, Cerro, Río)
// ==========================================

export const MoonIllustration: React.FC<IllustrationProps> = ({ className = 'w-20 h-20' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <circle cx="50" cy="50" r="42" fill="#1e1b4b" />
    <path
      d="M 58 20 C 36 22 24 44 32 64 C 40 82 66 84 78 68 C 60 72 44 58 46 40 C 47 30 52 24 58 20 Z"
      fill="#fde047"
      stroke="#eab308"
      strokeWidth="2.5"
    />
    {/* Little Stars */}
    <circle cx="70" cy="32" r="2.5" fill="#fef08a" />
    <circle cx="78" cy="48" r="2" fill="#fef08a" />
    <circle cx="24" cy="28" r="2" fill="#fef08a" />
  </svg>
);

export const StarIllustration: React.FC<IllustrationProps> = ({ className = 'w-20 h-20' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <polygon
      points="50,10 61,35 88,38 68,57 73,85 50,71 27,85 32,57 12,38 39,35"
      fill="#fbbf24"
      stroke="#d97706"
      strokeWidth="3"
      strokeLinejoin="round"
    />
    {/* Smiling Star Face */}
    <circle cx="43" cy="48" r="3" fill="#78350f" />
    <circle cx="57" cy="48" r="3" fill="#78350f" />
    <path d="M 45 56 Q 50 61 55 56" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const MountainIllustration: React.FC<IllustrationProps> = ({ className = 'w-20 h-20' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    {/* Sky Circle Backdrop */}
    <circle cx="50" cy="50" r="42" fill="#bae6fd" />
    {/* Back & Front Andean Peaks */}
    <polygon points="10,80 38,32 66,80" fill="#64748b" stroke="#475569" strokeWidth="2" />
    <polygon points="38,32 47,48 39,45 30,48" fill="#ffffff" />
    <polygon points="34,82 64,24 92,82" fill="#475569" stroke="#334155" strokeWidth="2" />
    <polygon points="64,24 75,45 66,42 54,45" fill="#ffffff" />
    {/* Green Valley */}
    <path d="M 12 74 Q 50 68 88 74 A 42 42 0 0 1 12 74 Z" fill="#16a34a" />
  </svg>
);

export const RiverIllustration: React.FC<IllustrationProps> = ({ className = 'w-20 h-20' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <rect x="8" y="14" width="84" height="72" rx="18" fill="#86efac" stroke="#16a34a" strokeWidth="2.5" />
    {/* Winding Blue River */}
    <path
      d="M 44 14 C 24 32 76 48 48 64 C 34 72 34 80 40 86 L 68 86 C 58 78 60 72 72 64 C 92 48 46 32 62 14 Z"
      fill="#0ea5e9"
      stroke="#0284c7"
      strokeWidth="2"
    />
    {/* Water ripples */}
    <path d="M 44 32 Q 52 30 56 34" stroke="#e0f2fe" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M 48 56 Q 58 54 64 58" stroke="#e0f2fe" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M 46 76 Q 54 74 58 78" stroke="#e0f2fe" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// ==========================================
// 7. ESCUELA (Escuela, Lápiz, Libro, Silla, Mesa, Mochila)
// ==========================================

export const SchoolIllustration: React.FC<IllustrationProps> = ({ className = 'w-20 h-20' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    {/* Flagpole & Peruvian Flag */}
    <line x1="50" y1="8" x2="50" y2="26" stroke="#475569" strokeWidth="2.5" />
    <rect x="50" y="9" width="6" height="10" fill="#ef4444" />
    <rect x="56" y="9" width="6" height="10" fill="#ffffff" />
    <rect x="62" y="9" width="6" height="10" fill="#ef4444" />
    {/* Roof */}
    <polygon points="50,22 14,48 86,48" fill="#dc2626" stroke="#991b1b" strokeWidth="2.5" strokeLinejoin="round" />
    {/* Bell */}
    <circle cx="50" cy="36" r="5" fill="#fbbf24" stroke="#b45309" strokeWidth="1.5" />
    {/* Building Body */}
    <rect x="20" y="48" width="60" height="40" rx="3" fill="#fef3c7" stroke="#d97706" strokeWidth="2.5" />
    {/* Door */}
    <path d="M 42 88 L 42 64 C 42 60 58 60 58 64 L 58 88 Z" fill="#92400e" />
    {/* Windows */}
    <rect x="25" y="56" width="11" height="12" rx="2" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
    <rect x="64" y="56" width="11" height="12" rx="2" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
  </svg>
);

export const PencilIllustration: React.FC<IllustrationProps> = ({ className = 'w-20 h-20' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <g transform="rotate(-45 50 50)">
      {/* Eraser */}
      <rect x="40" y="10" width="20" height="12" rx="3" fill="#f472b6" stroke="#be185d" strokeWidth="2" />
      {/* Metal ferrule */}
      <rect x="40" y="21" width="20" height="7" fill="#cbd5e1" stroke="#64748b" strokeWidth="2" />
      {/* Yellow body */}
      <rect x="40" y="28" width="20" height="44" fill="#fbbf24" stroke="#b45309" strokeWidth="2" />
      <line x1="47" y1="28" x2="47" y2="72" stroke="#d97706" strokeWidth="1.8" />
      <line x1="53" y1="28" x2="53" y2="72" stroke="#d97706" strokeWidth="1.8" />
      {/* Wood Tip */}
      <polygon points="40,72 60,72 50,90" fill="#fde68a" stroke="#b45309" strokeWidth="2" strokeLinejoin="round" />
      {/* Graphite point */}
      <polygon points="47,84 53,84 50,90" fill="#1e293b" />
    </g>
  </svg>
);

export const BookIllustration: React.FC<IllustrationProps> = ({ className = 'w-20 h-20' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    {/* Cover */}
    <rect x="12" y="22" width="76" height="58" rx="6" fill="#059669" stroke="#065f46" strokeWidth="2.5" />
    {/* Left & Right Pages */}
    <path d="M 18 26 Q 34 22 50 28 L 50 74 Q 34 68 18 74 Z" fill="#fffbeb" stroke="#cbd5e1" strokeWidth="1.5" />
    <path d="M 82 26 Q 66 22 50 28 L 50 74 Q 66 68 82 74 Z" fill="#fef3c7" stroke="#cbd5e1" strokeWidth="1.5" />
    {/* Text Lines & Mini Sun */}
    <line x1="24" y1="38" x2="43" y2="38" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="24" y1="47" x2="43" y2="47" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="24" y1="56" x2="40" y2="56" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="66" cy="44" r="7" fill="#f59e0b" />
    <line x1="57" y1="58" x2="75" y2="58" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const ChairIllustration: React.FC<IllustrationProps> = ({ className = 'w-20 h-20' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    {/* Backrest */}
    <rect x="28" y="16" width="8" height="44" rx="3" fill="#b45309" stroke="#78350f" strokeWidth="2" />
    <rect x="64" y="16" width="8" height="44" rx="3" fill="#b45309" stroke="#78350f" strokeWidth="2" />
    <rect x="28" y="20" width="44" height="14" rx="4" fill="#d97706" stroke="#78350f" strokeWidth="2" />
    {/* Seat */}
    <rect x="24" y="54" width="52" height="10" rx="4" fill="#f59e0b" stroke="#78350f" strokeWidth="2.5" />
    {/* Legs */}
    <line x1="30" y1="64" x2="28" y2="88" stroke="#78350f" strokeWidth="5" strokeLinecap="round" />
    <line x1="70" y1="64" x2="72" y2="88" stroke="#78350f" strokeWidth="5" strokeLinecap="round" />
    <line x1="38" y1="64" x2="38" y2="84" stroke="#92400e" strokeWidth="4" strokeLinecap="round" />
    <line x1="62" y1="64" x2="62" y2="84" stroke="#92400e" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

export const TableIllustration: React.FC<IllustrationProps> = ({ className = 'w-20 h-20' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    {/* Tabletop */}
    <polygon points="16,42 84,42 92,54 8,54" fill="#f59e0b" stroke="#78350f" strokeWidth="2.5" strokeLinejoin="round" />
    <rect x="8" y="54" width="84" height="6" rx="2" fill="#b45309" stroke="#78350f" strokeWidth="2" />
    {/* Four Legs */}
    <line x1="16" y1="60" x2="16" y2="88" stroke="#78350f" strokeWidth="5.5" strokeLinecap="round" />
    <line x1="84" y1="60" x2="84" y2="88" stroke="#78350f" strokeWidth="5.5" strokeLinecap="round" />
    <line x1="28" y1="60" x2="28" y2="80" stroke="#92400e" strokeWidth="4.5" strokeLinecap="round" />
    <line x1="72" y1="60" x2="72" y2="80" stroke="#92400e" strokeWidth="4.5" strokeLinecap="round" />
  </svg>
);

export const BackpackIllustration: React.FC<IllustrationProps> = ({ className = 'w-20 h-20' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    {/* Top Handle */}
    <path d="M 40 22 C 40 12 60 12 60 22" stroke="#be185d" strokeWidth="5" strokeLinecap="round" fill="none" />
    {/* Side Pockets */}
    <rect x="16" y="50" width="10" height="28" rx="4" fill="#f472b6" stroke="#be185d" strokeWidth="2" />
    <rect x="74" y="50" width="10" height="28" rx="4" fill="#f472b6" stroke="#be185d" strokeWidth="2" />
    {/* Main Bag */}
    <rect x="24" y="22" width="52" height="64" rx="16" fill="#ec4899" stroke="#be185d" strokeWidth="2.8" />
    {/* Top Flap */}
    <path d="M 24 44 Q 50 52 76 44 L 76 34 C 76 26 66 22 50 22 C 34 22 24 26 24 34 Z" fill="#db2777" stroke="#9d174d" strokeWidth="2" />
    {/* Front Zip Pocket */}
    <rect x="33" y="56" width="34" height="22" rx="6" fill="#fbcfe8" stroke="#be185d" strokeWidth="2" />
    <line x1="38" y1="62" x2="62" y2="62" stroke="#9d174d" strokeWidth="2" strokeLinecap="round" />
    <circle cx="50" cy="46" r="3" fill="#fbbf24" />
  </svg>
);

// ==========================================
// 8. EMOCIONES (Feliz, Triste, Enojado, Asustado, Tranquilo)
// ==========================================

export const EmotionIllustration: React.FC<{
  mood: 'happy' | 'sad' | 'angry' | 'scared' | 'calm';
  className?: string;
}> = ({ mood, className = 'w-20 h-20' }) => {
  const faceColors: Record<typeof mood, { bg: string; stroke: string }> = {
    happy: { bg: '#fde047', stroke: '#ca8a04' },
    sad: { bg: '#93c5fd', stroke: '#1d4ed8' },
    angry: { bg: '#fca5a5', stroke: '#dc2626' },
    scared: { bg: '#ddd6fe', stroke: '#6d28d9' },
    calm: { bg: '#a5f3fc', stroke: '#0891b2' },
  };
  const c = faceColors[mood];

  return (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      <circle cx="50" cy="50" r="38" fill={c.bg} stroke={c.stroke} strokeWidth="3.5" />
      {mood === 'happy' && (
        <>
          <circle cx="37" cy="42" r="4.5" fill="#451a03" />
          <circle cx="63" cy="42" r="4.5" fill="#451a03" />
          <circle cx="30" cy="54" r="5" fill="#fb7185" opacity="0.5" />
          <circle cx="70" cy="54" r="5" fill="#fb7185" opacity="0.5" />
          <path d="M 33 56 Q 50 74 67 56" stroke="#451a03" strokeWidth="3.5" strokeLinecap="round" />
        </>
      )}
      {mood === 'sad' && (
        <>
          <circle cx="37" cy="42" r="4" fill="#1e3a8a" />
          <circle cx="63" cy="42" r="4" fill="#1e3a8a" />
          {/* Tear drop */}
          <path d="M 65 49 C 62 55 64 60 67 60 C 70 60 72 55 65 49 Z" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
          <path d="M 35 66 Q 50 54 65 66" stroke="#1e3a8a" strokeWidth="3.5" strokeLinecap="round" />
        </>
      )}
      {mood === 'angry' && (
        <>
          <line x1="28" y1="34" x2="43" y2="41" stroke="#7f1d1d" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="72" y1="34" x2="57" y2="41" stroke="#7f1d1d" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="37" cy="45" r="4" fill="#7f1d1d" />
          <circle cx="63" cy="45" r="4" fill="#7f1d1d" />
          <path d="M 35 67 Q 50 56 65 67" stroke="#7f1d1d" strokeWidth="3.5" strokeLinecap="round" />
        </>
      )}
      {mood === 'scared' && (
        <>
          <circle cx="37" cy="42" r="7" fill="#ffffff" stroke="#4c1d95" strokeWidth="2" />
          <circle cx="37" cy="42" r="3" fill="#4c1d95" />
          <circle cx="63" cy="42" r="7" fill="#ffffff" stroke="#4c1d95" strokeWidth="2" />
          <circle cx="63" cy="42" r="3" fill="#4c1d95" />
          <ellipse cx="50" cy="64" rx="7" ry="10" fill="#4c1d95" />
        </>
      )}
      {mood === 'calm' && (
        <>
          <path d="M 30 44 Q 37 50 44 44" stroke="#164e63" strokeWidth="3.2" strokeLinecap="round" />
          <path d="M 56 44 Q 63 50 70 44" stroke="#164e63" strokeWidth="3.2" strokeLinecap="round" />
          <circle cx="30" cy="55" r="4.5" fill="#f472b6" opacity="0.4" />
          <circle cx="70" cy="55" r="4.5" fill="#f472b6" opacity="0.4" />
          <path d="M 39 59 Q 50 67 61 59" stroke="#164e63" strokeWidth="3" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
};

// ==========================================
// 9. ACTIVIDADES (Dormir, Comer, Jugar, Estudiar, Bailar, Lavar manos)
// ==========================================

export const SleepIllustration: React.FC<IllustrationProps> = ({ className = 'w-20 h-20' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    {/* Bed Frame */}
    <rect x="12" y="38" width="8" height="44" rx="3" fill="#78350f" />
    <rect x="80" y="50" width="8" height="32" rx="3" fill="#78350f" />
    <rect x="16" y="64" width="68" height="12" rx="3" fill="#92400e" />
    {/* Mattress & Pillow */}
    <rect x="20" y="52" width="60" height="14" rx="4" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
    <ellipse cx="32" cy="50" rx="10" ry="6" fill="#e0e7ff" stroke="#818cf8" strokeWidth="2" />
    {/* Blanket */}
    <path d="M 40 52 L 80 52 L 80 66 L 40 66 Z" fill="#6366f1" stroke="#4338ca" strokeWidth="2" />
    {/* Zzz */}
    <text x="58" y="38" fill="#4f46e5" fontSize="14" fontWeight="bold">Z</text>
    <text x="70" y="28" fill="#6366f1" fontSize="11" fontWeight="bold">z</text>
    <text x="78" y="20" fill="#818cf8" fontSize="9" fontWeight="bold">z</text>
  </svg>
);

export const EatIllustration: React.FC<IllustrationProps> = ({ className = 'w-20 h-20' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    {/* Fork */}
    <line x1="18" y1="30" x2="18" y2="80" stroke="#64748b" strokeWidth="3.5" strokeLinecap="round" />
    <path d="M 13 24 L 13 36 Q 18 40 23 36 L 23 24 M 18 24 L 18 38" stroke="#64748b" strokeWidth="2.2" strokeLinecap="round" />
    {/* Spoon */}
    <line x1="82" y1="42" x2="82" y2="80" stroke="#64748b" strokeWidth="3.5" strokeLinecap="round" />
    <ellipse cx="82" cy="33" rx="6" ry="9" fill="#cbd5e1" stroke="#64748b" strokeWidth="2" />
    {/* Plate */}
    <circle cx="50" cy="54" r="24" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
    <circle cx="50" cy="54" r="17" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
    {/* Food inside plate */}
    <circle cx="44" cy="50" r="6" fill="#eab308" />
    <circle cx="57" cy="52" r="5.5" fill="#16a34a" />
    <circle cx="50" cy="61" r="5" fill="#ef4444" />
  </svg>
);

export const PlayIllustration: React.FC<IllustrationProps> = ({ className = 'w-20 h-20' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    {/* Colorful Toy Ball */}
    <circle cx="38" cy="58" r="22" fill="#facc15" stroke="#ca8a04" strokeWidth="2.5" />
    <path d="M 38 36 C 28 46 28 70 38 80" fill="#ef4444" />
    <path d="M 38 36 C 48 46 48 70 38 80" fill="#0284c7" />
    <circle cx="38" cy="58" r="22" stroke="#1e293b" strokeWidth="2" fill="none" />
    {/* Toy Blocks */}
    <rect x="60" y="56" width="22" height="22" rx="4" fill="#ec4899" stroke="#be185d" strokeWidth="2" />
    <rect x="65" y="34" width="20" height="20" rx="4" fill="#10b981" stroke="#047857" strokeWidth="2" />
    <text x="68" y="72" fill="#ffffff" fontSize="12" fontWeight="bold">A</text>
    <text x="72" y="48" fill="#ffffff" fontSize="11" fontWeight="bold">B</text>
  </svg>
);

export const StudyIllustration: React.FC<IllustrationProps> = ({ className = 'w-20 h-20' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    {/* Notebook */}
    <rect x="18" y="24" width="52" height="62" rx="6" fill="#10b981" stroke="#065f46" strokeWidth="2.5" />
    <rect x="26" y="30" width="38" height="50" rx="3" fill="#ffffff" />
    <line x1="32" y1="42" x2="58" y2="42" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="32" y1="52" x2="58" y2="52" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="32" y1="62" x2="50" y2="62" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
    {/* Pencil */}
    <g transform="rotate(24 76 54)">
      <rect x="72" y="28" width="9" height="44" rx="2" fill="#fbbf24" stroke="#b45309" strokeWidth="2" />
      <polygon points="72,72 81,72 76.5,82" fill="#1e293b" />
    </g>
    {/* Sparkle star */}
    <polygon points="80,12 83,18 90,19 85,23 86,30 80,26 74,30 75,23 70,19 77,18" fill="#fbbf24" />
  </svg>
);

export const DanceIllustration: React.FC<IllustrationProps> = ({ className = 'w-20 h-20' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    {/* Music Notes */}
    <path d="M 20 34 L 20 18 L 32 15 L 32 30" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="17" cy="35" r="4" fill="#7c3aed" />
    <circle cx="29" cy="31" r="4" fill="#7c3aed" />
    <path d="M 78 30 L 78 16" stroke="#ec4899" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="75" cy="31" r="4" fill="#ec4899" />
    {/* Dancing Figure in colorful Andean skirt/poncho */}
    <circle cx="50" cy="28" r="10" fill="#fde68a" stroke="#d97706" strokeWidth="2" />
    <circle cx="47" cy="27" r="1.5" fill="#1e293b" />
    <circle cx="53" cy="27" r="1.5" fill="#1e293b" />
    <path d="M 47 31 Q 50 34 53 31" stroke="#78350f" strokeWidth="1.5" strokeLinecap="round" />
    {/* Arms raised dancing */}
    <path d="M 42 44 Q 26 32 24 44" stroke="#d97706" strokeWidth="4" strokeLinecap="round" />
    <path d="M 58 44 Q 74 30 78 40" stroke="#d97706" strokeWidth="4" strokeLinecap="round" />
    {/* Twirling Dress/Poncho */}
    <polygon points="50,38 26,72 74,72" fill="#f59e0b" stroke="#b45309" strokeWidth="2" />
    <line x1="32" y1="64" x2="68" y2="64" stroke="#ec4899" strokeWidth="3" />
    {/* Dancing Legs */}
    <path d="M 42 72 L 36 88" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
    <path d="M 58 72 L 68 85" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

export const WashHandsIllustration: React.FC<IllustrationProps> = ({ className = 'w-20 h-20' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    {/* Water Drops */}
    <path d="M 38 14 C 32 24 34 30 38 30 C 42 30 44 24 38 14 Z" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.8" />
    <path d="M 60 12 C 54 22 56 28 60 28 C 64 28 66 22 60 12 Z" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.8" />
    <path d="M 50 22 C 44 32 46 38 50 38 C 54 38 56 32 50 22 Z" fill="#0ea5e9" stroke="#0369a1" strokeWidth="1.8" />
    {/* Two Clean Hands */}
    <ellipse cx="38" cy="66" rx="18" ry="12" transform="rotate(-15 38 66)" fill="#fde68a" stroke="#d97706" strokeWidth="2.5" />
    <ellipse cx="62" cy="66" rx="18" ry="12" transform="rotate(15 62 66)" fill="#fde68a" stroke="#d97706" strokeWidth="2.5" />
    {/* Soap Bubbles */}
    <circle cx="48" cy="54" r="7" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" />
    <circle cx="58" cy="48" r="5" fill="#ffffff" stroke="#38bdf8" strokeWidth="2" />
    <circle cx="38" cy="48" r="4" fill="#ffffff" stroke="#38bdf8" strokeWidth="2" />
    <circle cx="52" cy="66" r="5" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" />
  </svg>
);
