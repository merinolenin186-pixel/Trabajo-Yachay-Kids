import React, { createContext, useContext, useState, useEffect } from 'react';
import { audioService } from '../services/audioService';

export type FontSizeOption = 'normal' | 'large' | 'extralarge';

interface AccessibilityContextType {
  highContrast: boolean;
  setHighContrast: (val: boolean) => void;
  toggleHighContrast: () => void;
  fontSize: FontSizeOption;
  setFontSize: (size: FontSizeOption) => void;
  screenReaderVoice: boolean;
  setScreenReaderVoice: (val: boolean) => void;
  toggleScreenReaderVoice: () => void;
  speakAccessible: (text: string, lang?: 'quechua' | 'spanish') => void;
  triggerHaptic: () => void;
  isCaaModalOpen: boolean;
  setIsCaaModalOpen: (val: boolean) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState<FontSizeOption>('normal');
  const [screenReaderVoice, setScreenReaderVoice] = useState(false);
  const [isCaaModalOpen, setIsCaaModalOpen] = useState(false);

  // Load accessibility settings from local storage
  useEffect(() => {
    try {
      const hc = localStorage.getItem('yachay_hc') === 'true';
      const fs = (localStorage.getItem('yachay_fs') as FontSizeOption) || 'normal';
      const srv = localStorage.getItem('yachay_srv') === 'true';
      setHighContrast(hc);
      setFontSize(fs);
      setScreenReaderVoice(srv);
    } catch {}
  }, []);

  // Sync high contrast to document element
  useEffect(() => {
    try {
      localStorage.setItem('yachay_hc', highContrast.toString());
      if (highContrast) {
        document.documentElement.classList.add('high-contrast');
      } else {
        document.documentElement.classList.remove('high-contrast');
      }
    } catch {}
  }, [highContrast]);

  // Sync font size
  useEffect(() => {
    try {
      localStorage.setItem('yachay_fs', fontSize);
      document.documentElement.classList.remove('text-normal', 'text-large', 'text-extralarge');
      document.documentElement.classList.add(`text-${fontSize}`);
    } catch {}
  }, [fontSize]);

  const toggleHighContrast = () => {
    const next = !highContrast;
    setHighContrast(next);
    triggerHaptic();
    if (next) {
      audioService.speakSpanish('Modo alto contraste activado');
    } else {
      audioService.speakSpanish('Modo estándar activado');
    }
  };

  const toggleScreenReaderVoice = () => {
    const next = !screenReaderVoice;
    setScreenReaderVoice(next);
    triggerHaptic();
    try {
      localStorage.setItem('yachay_srv', next.toString());
    } catch {}
    if (next) {
      audioService.speakSpanish('Lector de voz accesible activado. Toca cualquier elemento para escucharlo.');
    } else {
      audioService.speakSpanish('Lector de voz desactivado.');
    }
  };

  const triggerHaptic = () => {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(35);
      } catch {}
    }
  };

  const speakAccessible = (text: string, lang: 'quechua' | 'spanish' = 'spanish') => {
    triggerHaptic();
    if (lang === 'quechua') {
      audioService.speakQuechua(text);
    } else {
      audioService.speakSpanish(text);
    }
  };

  return (
    <AccessibilityContext.Provider
      value={{
        highContrast,
        setHighContrast,
        toggleHighContrast,
        fontSize,
        setFontSize,
        screenReaderVoice,
        setScreenReaderVoice,
        toggleScreenReaderVoice,
        speakAccessible,
        triggerHaptic,
        isCaaModalOpen,
        setIsCaaModalOpen,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = (): AccessibilityContextType => {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return ctx;
};
