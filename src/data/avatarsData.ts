import { AvatarOption, LevelConfig, UserLevel } from '../types';

import intiLlamaImg from '../assets/images/inicial_inti_llama_1794785184428.jpg';
import killaOsitaImg from '../assets/images/inicial_killa_osita_1794785185005.jpg';
import amaruPumaImg from '../assets/images/inicial_amaru_puma_1794785185733.jpg';
import suyayCuyImg from '../assets/images/inicial_suyay_cuy_1794785186704.jpg';
import chaskiCondorImg from '../assets/images/inicial_chaski_condor_1794785186819.jpg';
import sumaqZorroImg from '../assets/images/inicial_sumaq_zorro_1794785186270.jpg';

export const AVATAR_OPTIONS: AvatarOption[] = [
  {
    id: 'inti',
    name: 'Inti',
    meaningQuechua: 'Llamita alegre',
    meaningSpanish: 'Llamita del Sol',
    greetingQuechua: 'Allinllanchu! Noqaqa Inti llamita kani. Kusisqa pukllasunchis!',
    greetingSpanish: '¡Hola! Soy Inti la llamita y quiero jugar contigo.',
    image: intiLlamaImg,
    accentColor: '#f59e0b',
    badgeText: 'Llamita del Sol',
  },
  {
    id: 'killa',
    name: 'Killa',
    meaningQuechua: 'Ukumari sisacha',
    meaningSpanish: 'Osita de Flores',
    greetingQuechua: 'Napaykullayki! Noqaqa Killa kani. Takisunchis!',
    greetingSpanish: '¡Hola! Soy Killa la osita y me encantan las flores.',
    image: killaOsitaImg,
    accentColor: '#ec4899',
    badgeText: 'Osita de Flores',
  },
  {
    id: 'amaru',
    name: 'Amaru',
    meaningQuechua: 'Pumacha masiy',
    meaningSpanish: 'Pumita Explorador',
    greetingQuechua: 'Allinllanchu masiy! Noqaqa Amaru kani.',
    greetingSpanish: '¡Hola amiguito! Soy Amaru el pumita juguetón.',
    image: amaruPumaImg,
    accentColor: '#10b981',
    badgeText: 'Pumita Juguetón',
  },
  {
    id: 'suyay',
    name: 'Suyay',
    meaningQuechua: 'Quwi inti t\'ika',
    meaningSpanish: 'Cuycito Girasol',
    greetingQuechua: 'Allin p\'unchaw! Noqaqa Suyay quwicha kani.',
    greetingSpanish: '¡Buenos días! Soy Suyay el cuycito feliz.',
    image: suyayCuyImg,
    accentColor: '#f97316',
    badgeText: 'Cuycito Feliz',
  },
  {
    id: 'chaski',
    name: 'Chaski',
    meaningQuechua: 'Kuntur k\'uychi',
    meaningSpanish: 'Condorcito Arcoíris',
    greetingQuechua: 'Sulpayki! Noqaqa Chaski kunturcha kani.',
    greetingSpanish: '¡Hola! Soy Chaski el condorcito y vuelo contigo.',
    image: chaskiCondorImg,
    accentColor: '#0284c7',
    badgeText: 'Condorcito Arcoíris',
  },
  {
    id: 'sumaq',
    name: 'Sumaq',
    meaningQuechua: 'Atuqcha kusisqa',
    meaningSpanish: 'Zorrito Saltarín',
    greetingQuechua: 'Allinllanchu! Noqaqa Sumaq atuqcha kani.',
    greetingSpanish: '¡Hola! Soy Sumaq el zorrito y me encanta contar.',
    image: sumaqZorroImg,
    accentColor: '#eab308',
    badgeText: 'Zorrito Saltarín',
  },
];

export const INITIAL_PRESCHOOL_CONFIG: LevelConfig = {
  autoSpeakOnTap: true,
  showPhonetics: true,
  showDialectNotes: false,
  showVisualHints: true,
  speechSpeed: 'slow',
  cardScale: 'large',
  defaultMemoryDifficulty: 'easy',
};

export const LEVEL_CONFIG_PRESETS: Record<UserLevel, LevelConfig> = {
  inicial: INITIAL_PRESCHOOL_CONFIG,
  explorador: INITIAL_PRESCHOOL_CONFIG,
  amauta: INITIAL_PRESCHOOL_CONFIG,
};
