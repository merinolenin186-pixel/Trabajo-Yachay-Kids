import React from 'react';
import {
  LlamaIllustration,
  CondorIllustration,
  CuyIllustration,
  SunIllustration,
  PotatoIllustration,
  CornIllustration,
  RainbowIllustration,
  PachaGirlIllustration,
} from './AppIllustrations';
import {
  DogIllustration,
  CatIllustration,
  PumaIllustration,
  QuinuaIllustration,
  ChunoIllustration,
  LucumaIllustration,
  OllucoIllustration,
  ColorSplashIllustration,
  NumberPictogramIllustration,
  MotherIllustration,
  FatherIllustration,
  BabyIllustration,
  GrandmotherIllustration,
  GrandfatherIllustration,
  HeadIllustration,
  EyeIllustration,
  EarIllustration,
  MouthIllustration,
  HandIllustration,
  FootIllustration,
  MoonIllustration,
  StarIllustration,
  MountainIllustration,
  RiverIllustration,
  SchoolIllustration,
  PencilIllustration,
  BookIllustration,
  ChairIllustration,
  TableIllustration,
  BackpackIllustration,
  EmotionIllustration,
  SleepIllustration,
  EatIllustration,
  PlayIllustration,
  StudyIllustration,
  DanceIllustration,
  WashHandsIllustration,
} from './PictogramIllustrations';

interface PictogramDrawingProps {
  drawing: string;
  className?: string;
}

export const PictogramDrawing: React.FC<PictogramDrawingProps> = ({
  drawing,
  className = 'w-20 h-20',
}) => {
  switch (drawing) {
    // Animales
    case 'llama':
      return <LlamaIllustration className={className} />;
    case 'condor':
      return <CondorIllustration className={className} />;
    case 'dog':
      return <DogIllustration className={className} />;
    case 'cat':
      return <CatIllustration className={className} />;
    case 'cuy':
      return <CuyIllustration className={className} />;
    case 'puma':
      return <PumaIllustration className={className} />;

    // Alimentos
    case 'potato':
      return <PotatoIllustration className={className} />;
    case 'potato-dark':
      return <ChunoIllustration className={className} />;
    case 'corn':
      return <CornIllustration className={className} />;
    case 'wheat':
      return <QuinuaIllustration className={className} />;
    case 'fruit':
      return <LucumaIllustration className={className} />;
    case 'olluco':
      return <OllucoIllustration className={className} />;

    // Colores
    case 'color-red':
      return <ColorSplashIllustration color="#ef4444" border="#b91c1c" className={className} />;
    case 'color-green':
      return <ColorSplashIllustration color="#10b981" border="#047857" className={className} />;
    case 'color-blue':
      return <ColorSplashIllustration color="#0284c7" border="#0369a1" className={className} />;
    case 'color-yellow':
      return <ColorSplashIllustration color="#facc15" border="#ca8a04" className={className} />;
    case 'color-white':
      return <ColorSplashIllustration color="#f8fafc" border="#94a3b8" className={className} />;
    case 'color-black':
      return <ColorSplashIllustration color="#1e293b" border="#020617" className={className} />;

    // Números
    case 'num-1':
      return <NumberPictogramIllustration num={1} color="#0284c7" className={className} />;
    case 'num-2':
      return <NumberPictogramIllustration num={2} color="#10b981" className={className} />;
    case 'num-3':
      return <NumberPictogramIllustration num={3} color="#f59e0b" className={className} />;
    case 'num-4':
      return <NumberPictogramIllustration num={4} color="#ec4899" className={className} />;
    case 'num-5':
      return <NumberPictogramIllustration num={5} color="#8b5cf6" className={className} />;
    case 'num-10':
      return <NumberPictogramIllustration num={10} color="#d97706" className={className} />;

    // Familia
    case 'mother':
      return <MotherIllustration className={className} />;
    case 'father':
      return <FatherIllustration className={className} />;
    case 'baby':
      return <BabyIllustration className={className} />;
    case 'grandmother':
      return <GrandmotherIllustration className={className} />;
    case 'grandfather':
      return <GrandfatherIllustration className={className} />;
    case 'sister':
      return <PachaGirlIllustration className={className} />;

    // Partes del cuerpo
    case 'head':
      return <HeadIllustration className={className} />;
    case 'eye':
      return <EyeIllustration className={className} />;
    case 'ear':
      return <EarIllustration className={className} />;
    case 'mouth':
      return <MouthIllustration className={className} />;
    case 'hand':
      return <HandIllustration className={className} />;
    case 'foot':
      return <FootIllustration className={className} />;

    // Naturaleza
    case 'sun':
      return <SunIllustration className={className} />;
    case 'moon':
      return <MoonIllustration className={className} />;
    case 'star':
      return <StarIllustration className={className} />;
    case 'mountain':
      return <MountainIllustration className={className} />;
    case 'river':
      return <RiverIllustration className={className} />;
    case 'rainbow':
      return <RainbowIllustration className={className} />;

    // Escuela
    case 'school':
      return <SchoolIllustration className={className} />;
    case 'pencil':
      return <PencilIllustration className={className} />;
    case 'book':
      return <BookIllustration className={className} />;
    case 'chair':
      return <ChairIllustration className={className} />;
    case 'table':
      return <TableIllustration className={className} />;
    case 'backpack':
      return <BackpackIllustration className={className} />;

    // Emociones
    case 'smile':
      return <EmotionIllustration mood="happy" className={className} />;
    case 'frown':
      return <EmotionIllustration mood="sad" className={className} />;
    case 'angry':
      return <EmotionIllustration mood="angry" className={className} />;
    case 'surprise':
      return <EmotionIllustration mood="scared" className={className} />;
    case 'calm':
      return <EmotionIllustration mood="calm" className={className} />;

    // Actividades
    case 'bed':
      return <SleepIllustration className={className} />;
    case 'utensils':
      return <EatIllustration className={className} />;
    case 'play':
      return <PlayIllustration className={className} />;
    case 'study':
      return <StudyIllustration className={className} />;
    case 'dance':
      return <DanceIllustration className={className} />;
    case 'wash':
      return <WashHandsIllustration className={className} />;

    default:
      return <StarIllustration className={className} />;
  }
};
