export type AppLanguage = 'quechua' | 'spanish';

export type QuechuaDialect = 'chanka' | 'collao';

export interface BilingualText {
  quechua: string;
  spanish: string;
  phonetic?: string;
  dialectNotes?: {
    chanka?: string;
    collao?: string;
  };
}

export interface NumberItem {
  number: number;
  quechua: string;
  spanish: string;
  phonetic: string;
  chanka?: string;
  collao?: string;
  objectType: 'vicuna' | 'potato' | 'corn' | 'star' | 'cantuta' | 'cuy';
  funFact: {
    quechua: string;
    spanish: string;
  };
}

export interface MemoryCard {
  id: string;
  pairId: string;
  title: BilingualText;
  category: 'animals' | 'fruits' | 'colors' | 'nature';
  iconName: string;
  color: string;
  svgPath?: string;
}

export interface ColorItem {
  id: string;
  colorHex: string;
  bgClass: string;
  borderClass: string;
  name: BilingualText;
  exampleObject: {
    name: BilingualText;
    icon: string;
  };
}

export interface AnimalItem {
  id: string;
  name: BilingualText;
  category: 'domestico' | 'silvestre';
  habitat: BilingualText;
  description: BilingualText;
  soundDescription: BilingualText;
  iconName: string;
  funQuestion: {
    question: BilingualText;
    options: BilingualText[];
    correctIndex: number;
  };
}

export interface FoodItem {
  id: string;
  name: BilingualText;
  category: 'tuberculo' | 'grano' | 'fruta' | 'tradicional';
  description: BilingualText;
  culturalNote: BilingualText;
  iconName: string;
  color: string;
}

export interface PictogramItem {
  id: string;
  category: PictogramCategory;
  name: BilingualText;
  syllables?: string;
  iconName: string;
  svgDrawing: string;
  accentColor: string;
}

export type PictogramCategory =
  | 'animales'
  | 'alimentos'
  | 'colores'
  | 'numeros'
  | 'familia'
  | 'cuerpo'
  | 'naturaleza'
  | 'escuela'
  | 'emociones'
  | 'actividades';

export interface DictionaryEntry {
  id: string;
  quechua: string;
  spanish: string;
  category: string;
  partOfSpeech: 'sustantivo' | 'verbo' | 'adjetivo' | 'saludo' | 'frase';
  phonetic: string;
  dialect: 'ambos' | 'chanka' | 'collao';
  chankaVariation?: string;
  collaoVariation?: string;
  exampleQuechua: string;
  exampleSpanish: string;
}

export interface TranslationHistoryItem {
  id: string;
  fromText: string;
  toText: string;
  fromLang: 'es' | 'qu';
  timestamp: number;
}

export interface VideoStory {
  id: string;
  title: BilingualText;
  description?: BilingualText;
  category:
    | 'numeros'
    | 'animales'
    | 'colores'
    | 'alimentos'
    | 'saludos'
    | 'familia'
    | 'naturaleza'
    | 'cultura'
    | 'cuentos';
  durationSeconds: number;
  thumbnailColor: string;
  icon: string;
  videoUrl?: string;
  scenes: VideoScene[];
}

export interface VideoScene {
  timestamp: number; // in seconds
  duration: number; // scene duration
  backgroundType: 'andina_day' | 'andina_night' | 'chakras' | 'lake_titicaca' | 'village' | 'rainbow_sky';
  characters: {
    type: 'chaski_boy' | 'llama' | 'condor' | 'fox' | 'cuy' | 'pacha_girl' | 'sun';
    position: 'left' | 'center' | 'right';
    animation: 'idle' | 'walk' | 'jump' | 'wave';
  }[];
  narrationQuechua: string;
  narrationSpanish: string;
  subtitlesQuechua: string;
  subtitlesSpanish: string;
}

export type MainTab = 'games' | 'translator' | 'pictograms' | 'videos' | 'settings' | 'admin';

export type GameSubTab =
  | 'hub'
  | 'numbers'
  | 'memory'
  | 'colors'
  | 'animals'
  | 'foods'
  | 'match'
  | 'counting'
  | 'pictureColors'
  | 'shapes'
  | 'shadows'
  | 'sizes'
  | 'series';

export interface ThemeConfig {
  presetId: 'inti' | 'titicaca' | 'pachamama' | 'kantuta' | 'kuychi' | 'custom';
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  cardColor: string;
  headerTextColor: string;
  darkMode: boolean;
}

export interface CustomTexts {
  appName: string;
  heroTitle: BilingualText;
  heroDescription: BilingualText;
  videosBannerTitle: BilingualText;
  videosBannerDescription: BilingualText;
  pictogramsDescription: BilingualText;
  translatorDescription: BilingualText;
  footerText: string;
}

export interface SubtitleCue {
  id: string;
  startTime: number;
  endTime: number;
  spanish: string;
  quechuaChanka: string;
  quechuaCollao: string;
}

export interface AdminVideoItem {
  id: string;
  title: BilingualText;
  description: BilingualText;
  category: VideoStory['category'];
  sourceType: 'file' | 'url' | 'animated';
  mediaId?: string; // IndexedDB key for local offline uploaded video
  mediaUrl?: string; // External URL or YouTube URL
  durationSeconds: number;
  thumbnailColor: string;
  icon: string;
  autoTranslate: boolean;
  sourceLang: 'spanish' | 'quechua';
  rawScript: string;
  subtitles: SubtitleCue[];
  scenes?: VideoScene[];
  createdAt: number;
}

export interface AdminAudioItem {
  id: string;
  title: BilingualText;
  description: BilingualText;
  category: string;
  sourceType: 'file' | 'recording' | 'tts';
  mediaId?: string; // IndexedDB key for local offline uploaded/recorded audio
  durationSeconds: number;
  accentColor: string;
  autoTranslate: boolean;
  sourceLang: 'spanish' | 'quechua';
  rawScript: string;
  subtitles: SubtitleCue[];
  createdAt: number;
}

export interface CustomSectionItem {
  id: string;
  title: BilingualText;
  description: BilingualText;
  icon: string;
  audioId?: string;
  videoId?: string;
}

export interface CustomSection {
  id: string;
  title: BilingualText;
  description: BilingualText;
  icon: string;
  accentColor: string;
  items: CustomSectionItem[];
  createdAt: number;
}

export interface HiddenOptions {
  mainTabs: string[];
  games: string[];
  videoIds: string[];
  audioIds: string[];
  pictogramIds: string[];
  pictogramCategories: string[];
  showOfflineBadge: boolean;
  showCaaButton: boolean;
  showAccessibilityBar: boolean;
}

export type UserLevel = 'inicial' | 'explorador' | 'amauta';

export interface AvatarOption {
  id: string;
  name: string;
  meaningQuechua: string;
  meaningSpanish: string;
  greetingQuechua: string;
  greetingSpanish: string;
  image: string;
  accentColor: string;
  badgeText: string;
}

export interface LevelConfig {
  autoSpeakOnTap: boolean;
  showPhonetics: boolean;
  showDialectNotes: boolean;
  showVisualHints: boolean;
  speechSpeed: 'slow' | 'normal';
  cardScale: 'large' | 'standard' | 'compact';
  defaultMemoryDifficulty: 'easy' | 'medium' | 'hard';
}

export interface ChildProfile {
  name: string;
  avatarId: string;
  avatarImage: string;
  level: UserLevel;
  stars: number;
  completedActivities: string[];
  onboarded: boolean;
  config: LevelConfig;
}


