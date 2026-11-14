import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ThemeConfig,
  CustomTexts,
  HiddenOptions,
  AdminVideoItem,
  AdminAudioItem,
  CustomSection,
  CustomSectionItem,
} from '../types';
import { deleteMediaBlob } from '../services/mediaStorage';

export interface ThemePreset {
  id: ThemeConfig['presetId'];
  name: string;
  description: string;
  config: ThemeConfig;
}

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: 'inti',
    name: 'Sol Inti (Original)',
    description: 'Ámbar cálido y naranja andino clásico de Yachay Kids',
    config: {
      presetId: 'inti',
      primaryColor: '#f59e0b',
      secondaryColor: '#ea580c',
      backgroundColor: '#fffbeb',
      cardColor: '#ffffff',
      headerTextColor: '#ffffff',
      darkMode: false,
    },
  },
  {
    id: 'titicaca',
    name: 'Lago Titicaca',
    description: 'Azul cielo y turquesa sereno del altiplano',
    config: {
      presetId: 'titicaca',
      primaryColor: '#0284c7',
      secondaryColor: '#0d9488',
      backgroundColor: '#f0f9ff',
      cardColor: '#ffffff',
      headerTextColor: '#ffffff',
      darkMode: false,
    },
  },
  {
    id: 'pachamama',
    name: 'Verde Pachamama',
    description: 'Verde naturaleza de los valles y chacras andinas',
    config: {
      presetId: 'pachamama',
      primaryColor: '#059669',
      secondaryColor: '#16a34a',
      backgroundColor: '#ecfdf5',
      cardColor: '#ffffff',
      headerTextColor: '#ffffff',
      darkMode: false,
    },
  },
  {
    id: 'kantuta',
    name: 'Flor Kantuta',
    description: 'Rosa carmesí vibrante inspirado en la flor sagrada inca',
    config: {
      presetId: 'kantuta',
      primaryColor: '#e11d48',
      secondaryColor: '#f59e0b',
      backgroundColor: '#fff1f2',
      cardColor: '#ffffff',
      headerTextColor: '#ffffff',
      darkMode: false,
    },
  },
  {
    id: 'kuychi',
    name: 'K\'uychi (Arcoíris)',
    description: 'Violeta e índigo creativo para cuentos e imaginación',
    config: {
      presetId: 'kuychi',
      primaryColor: '#7c3aed',
      secondaryColor: '#ec4899',
      backgroundColor: '#f5f3ff',
      cardColor: '#ffffff',
      headerTextColor: '#ffffff',
      darkMode: false,
    },
  },
];

export const DEFAULT_CUSTOM_TEXTS: CustomTexts = {
  appName: 'Yachay Kids',
  heroTitle: {
    quechua: '¡Aprendamos jugando!',
    spanish: '¡Aprendamos jugando!',
  },
  heroDescription: {
    quechua: 'Pukllaspam yachakunchis runasimi rimayta. Akllay mayqen pukllaytataq munanki:',
    spanish: 'Juegos interactivos con audios, colores y tarjetas para aprender quechua y español sin conexión a internet.',
  },
  videosBannerTitle: {
    quechua: 'Willakuykuna · Videos y Audios Bilingües',
    spanish: 'Videos, Cuentos y Audios Educativos',
  },
  videosBannerDescription: {
    quechua: 'Cuentos animados, leyendas y audios en quechua con subtítulos traducidos automáticamente.',
    spanish: 'Videos infantiles y audios con narración y subtítulos traducidos automáticamente al idioma seleccionado.',
  },
  pictogramsDescription: {
    quechua: 'Siq\'ikunata ñit\'ispa uyariy quechua hinallataq castillanopi.',
    spanish: 'Toca cada pictograma para ver su ilustración y escuchar su pronunciación en quechua y español.',
  },
  translatorDescription: {
    quechua: 'Quechuamanta castillanoman, castillanoman quechuaman tijray.',
    spanish: 'Traduce palabras y frases cotidianas del español al quechua y viceversa sin conexión.',
  },
  footerText: 'Inclusión lingüística, visual y accesible para todos los niños',
};

export const DEFAULT_HIDDEN_OPTIONS: HiddenOptions = {
  mainTabs: [],
  games: [],
  videoIds: [],
  audioIds: [],
  pictogramIds: [],
  pictogramCategories: [],
  showOfflineBadge: true,
  showCaaButton: true,
  showAccessibilityBar: true,
};

interface AdminCredentials {
  username: string;
  password: string;
}

const DEFAULT_CREDENTIALS: AdminCredentials = {
  username: 'admin',
  password: 'yachay2025',
};

const STORAGE_KEYS = {
  AUTH: 'yachay_admin_authenticated',
  CREDENTIALS: 'yachay_admin_credentials',
  THEME: 'yachay_admin_theme',
  TEXTS: 'yachay_admin_texts',
  HIDDEN: 'yachay_admin_hidden',
  VIDEOS: 'yachay_admin_videos',
  AUDIOS: 'yachay_admin_audios',
  SECTIONS: 'yachay_admin_sections',
};

interface AdminContextType {
  isAuthenticated: boolean;
  adminUsername: string;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  changeCredentials: (newUsername: string, newPassword: string) => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;

  themeConfig: ThemeConfig;
  updateTheme: (partial: Partial<ThemeConfig>) => void;
  applyPreset: (presetId: ThemeConfig['presetId']) => void;
  resetTheme: () => void;

  customTexts: CustomTexts;
  updateCustomTexts: (partial: Partial<CustomTexts>) => void;
  resetCustomTexts: () => void;

  hiddenOptions: HiddenOptions;
  toggleHiddenItem: (
    group: 'mainTabs' | 'games' | 'videoIds' | 'audioIds' | 'pictogramIds' | 'pictogramCategories',
    id: string
  ) => void;
  setUiFlag: (flag: 'showOfflineBadge' | 'showCaaButton' | 'showAccessibilityBar', val: boolean) => void;
  restoreAllHiddenOptions: () => void;

  customVideos: AdminVideoItem[];
  addCustomVideo: (video: AdminVideoItem) => void;
  updateCustomVideo: (video: AdminVideoItem) => void;
  deleteCustomVideo: (id: string) => void;

  customAudios: AdminAudioItem[];
  addCustomAudio: (audio: AdminAudioItem) => void;
  updateCustomAudio: (audio: AdminAudioItem) => void;
  deleteCustomAudio: (id: string) => void;

  customSections: CustomSection[];
  addCustomSection: (section: CustomSection) => void;
  updateCustomSection: (section: CustomSection) => void;
  deleteCustomSection: (id: string) => void;
  addItemToSection: (sectionId: string, item: CustomSectionItem) => void;
  removeItemFromSection: (sectionId: string, itemId: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return { ...fallback, ...JSON.parse(raw) };
  } catch {
    return fallback;
  }
}

function readArrayStorage<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function adjustHexBrightness(hex: string, amount: number): string {
  const clean = hex.replace('#', '');
  if (clean.length !== 6) return hex;
  const num = parseInt(clean, 16);
  const r = Math.min(255, Math.max(0, ((num >> 16) & 0xff) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + amount));
  const b = Math.min(255, Math.max(0, (num & 0xff) + amount));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
    } catch {
      return false;
    }
  });

  const [credentials, setCredentials] = useState<AdminCredentials>(() =>
    readStorage<AdminCredentials>(STORAGE_KEYS.CREDENTIALS, DEFAULT_CREDENTIALS)
  );
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const [themeConfig, setThemeConfig] = useState<ThemeConfig>(() =>
    readStorage<ThemeConfig>(STORAGE_KEYS.THEME, THEME_PRESETS[0].config)
  );

  const [customTexts, setCustomTexts] = useState<CustomTexts>(() =>
    readStorage<CustomTexts>(STORAGE_KEYS.TEXTS, DEFAULT_CUSTOM_TEXTS)
  );

  const [hiddenOptions, setHiddenOptions] = useState<HiddenOptions>(() =>
    readStorage<HiddenOptions>(STORAGE_KEYS.HIDDEN, DEFAULT_HIDDEN_OPTIONS)
  );

  const [customVideos, setCustomVideos] = useState<AdminVideoItem[]>(() =>
    readArrayStorage<AdminVideoItem>(STORAGE_KEYS.VIDEOS)
  );

  const [customAudios, setCustomAudios] = useState<AdminAudioItem[]>(() =>
    readArrayStorage<AdminAudioItem>(STORAGE_KEYS.AUDIOS)
  );

  const [customSections, setCustomSections] = useState<CustomSection[]>(() =>
    readArrayStorage<CustomSection>(STORAGE_KEYS.SECTIONS)
  );

  // Apply dynamic theme CSS variables and dark mode to documentElement
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, JSON.stringify(themeConfig));
    } catch {}

    const root = document.documentElement;
    root.style.setProperty('--yachay-primary', themeConfig.primaryColor);
    root.style.setProperty('--yachay-primary-dark', adjustHexBrightness(themeConfig.primaryColor, -24));
    root.style.setProperty('--yachay-primary-soft', adjustHexBrightness(themeConfig.primaryColor, 130));
    root.style.setProperty('--yachay-secondary', themeConfig.secondaryColor);
    root.style.setProperty('--yachay-bg', themeConfig.backgroundColor);
    root.style.setProperty('--yachay-card', themeConfig.cardColor);
    root.style.setProperty('--yachay-header-text', themeConfig.headerTextColor);

    const isCustom = themeConfig.presetId !== 'inti' || themeConfig.primaryColor !== '#f59e0b' || themeConfig.backgroundColor !== '#fffbeb';
    if (isCustom) {
      root.setAttribute('data-custom-theme', 'true');
    } else {
      root.removeAttribute('data-custom-theme');
    }

    if (themeConfig.darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [themeConfig]);

  // Persist custom texts
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TEXTS, JSON.stringify(customTexts));
    } catch {}
  }, [customTexts]);

  // Persist hidden options
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.HIDDEN, JSON.stringify(hiddenOptions));
    } catch {}
  }, [hiddenOptions]);

  // Persist videos, audios, sections
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.VIDEOS, JSON.stringify(customVideos));
    } catch {}
  }, [customVideos]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.AUDIOS, JSON.stringify(customAudios));
    } catch {}
  }, [customAudios]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SECTIONS, JSON.stringify(customSections));
    } catch {}
  }, [customSections]);

  const login = (username: string, password: string): boolean => {
    if (
      username.trim().toLowerCase() === credentials.username.trim().toLowerCase() &&
      password === credentials.password
    ) {
      setIsAuthenticated(true);
      try {
        localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
      } catch {}
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    try {
      localStorage.setItem(STORAGE_KEYS.AUTH, 'false');
    } catch {}
  };

  const changeCredentials = (newUsername: string, newPassword: string) => {
    const updated: AdminCredentials = {
      username: newUsername.trim() || credentials.username,
      password: newPassword || credentials.password,
    };
    setCredentials(updated);
    try {
      localStorage.setItem(STORAGE_KEYS.CREDENTIALS, JSON.stringify(updated));
    } catch {}
  };

  const updateTheme = (partial: Partial<ThemeConfig>) => {
    setThemeConfig((prev) => ({ ...prev, ...partial }));
  };

  const applyPreset = (presetId: ThemeConfig['presetId']) => {
    const preset = THEME_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      setThemeConfig((prev) => ({ ...preset.config, darkMode: prev.darkMode }));
    }
  };

  const resetTheme = () => {
    setThemeConfig(THEME_PRESETS[0].config);
  };

  const updateCustomTexts = (partial: Partial<CustomTexts>) => {
    setCustomTexts((prev) => ({ ...prev, ...partial }));
  };

  const resetCustomTexts = () => {
    setCustomTexts(DEFAULT_CUSTOM_TEXTS);
  };

  const toggleHiddenItem = (
    group: 'mainTabs' | 'games' | 'videoIds' | 'audioIds' | 'pictogramIds' | 'pictogramCategories',
    id: string
  ) => {
    setHiddenOptions((prev) => {
      const current = prev[group];
      const exists = current.includes(id);
      return {
        ...prev,
        [group]: exists ? current.filter((item) => item !== id) : [...current, id],
      };
    });
  };

  const setUiFlag = (
    flag: 'showOfflineBadge' | 'showCaaButton' | 'showAccessibilityBar',
    val: boolean
  ) => {
    setHiddenOptions((prev) => ({ ...prev, [flag]: val }));
  };

  const restoreAllHiddenOptions = () => {
    setHiddenOptions(DEFAULT_HIDDEN_OPTIONS);
  };

  const addCustomVideo = (video: AdminVideoItem) => {
    setCustomVideos((prev) => [video, ...prev]);
  };

  const updateCustomVideo = (video: AdminVideoItem) => {
    setCustomVideos((prev) => prev.map((v) => (v.id === video.id ? video : v)));
  };

  const deleteCustomVideo = (id: string) => {
    const target = customVideos.find((v) => v.id === id);
    if (target?.mediaId) {
      deleteMediaBlob(target.mediaId);
    }
    setCustomVideos((prev) => prev.filter((v) => v.id !== id));
  };

  const addCustomAudio = (audio: AdminAudioItem) => {
    setCustomAudios((prev) => [audio, ...prev]);
  };

  const updateCustomAudio = (audio: AdminAudioItem) => {
    setCustomAudios((prev) => prev.map((a) => (a.id === audio.id ? audio : a)));
  };

  const deleteCustomAudio = (id: string) => {
    const target = customAudios.find((a) => a.id === id);
    if (target?.mediaId) {
      deleteMediaBlob(target.mediaId);
    }
    setCustomAudios((prev) => prev.filter((a) => a.id !== id));
  };

  const addCustomSection = (section: CustomSection) => {
    setCustomSections((prev) => [section, ...prev]);
  };

  const updateCustomSection = (section: CustomSection) => {
    setCustomSections((prev) => prev.map((s) => (s.id === section.id ? section : s)));
  };

  const deleteCustomSection = (id: string) => {
    setCustomSections((prev) => prev.filter((s) => s.id !== id));
  };

  const addItemToSection = (sectionId: string, item: CustomSectionItem) => {
    setCustomSections((prev) =>
      prev.map((sec) =>
        sec.id === sectionId ? { ...sec, items: [...sec.items, item] } : sec
      )
    );
  };

  const removeItemFromSection = (sectionId: string, itemId: string) => {
    setCustomSections((prev) =>
      prev.map((sec) =>
        sec.id === sectionId
          ? { ...sec, items: sec.items.filter((i) => i.id !== itemId) }
          : sec
      )
    );
  };

  return (
    <AdminContext.Provider
      value={{
        isAuthenticated,
        adminUsername: credentials.username,
        login,
        logout,
        changeCredentials,
        isLoginModalOpen,
        setIsLoginModalOpen,
        themeConfig,
        updateTheme,
        applyPreset,
        resetTheme,
        customTexts,
        updateCustomTexts,
        resetCustomTexts,
        hiddenOptions,
        toggleHiddenItem,
        setUiFlag,
        restoreAllHiddenOptions,
        customVideos,
        addCustomVideo,
        updateCustomVideo,
        deleteCustomVideo,
        customAudios,
        addCustomAudio,
        updateCustomAudio,
        deleteCustomAudio,
        customSections,
        addCustomSection,
        updateCustomSection,
        deleteCustomSection,
        addItemToSection,
        removeItemFromSection,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = (): AdminContextType => {
  const ctx = useContext(AdminContext);
  if (!ctx) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return ctx;
};
