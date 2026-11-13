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

export type MainTab = 'games' | 'translator' | 'pictograms' | 'videos' | 'settings';

export type GameSubTab = 'hub' | 'numbers' | 'memory' | 'colors' | 'animals' | 'foods';
