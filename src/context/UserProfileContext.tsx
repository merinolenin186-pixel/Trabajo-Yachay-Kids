import React, { createContext, useContext, useState, useEffect } from 'react';
import { ChildProfile, LevelConfig, UserLevel } from '../types';
import { AVATAR_OPTIONS, INITIAL_PRESCHOOL_CONFIG } from '../data/avatarsData';
import { audioService } from '../services/audioService';

const PROFILE_STORAGE_KEY = 'yachay_kids_child_profile_v2';

const DEFAULT_PROFILE: ChildProfile = {
  name: AVATAR_OPTIONS[0].name,
  avatarId: AVATAR_OPTIONS[0].id,
  avatarImage: AVATAR_OPTIONS[0].image,
  level: 'inicial',
  stars: 0,
  completedActivities: [],
  onboarded: false,
  config: INITIAL_PRESCHOOL_CONFIG,
};

interface UserProfileContextType {
  profile: ChildProfile;
  isOnboardingOpen: boolean;
  setIsOnboardingOpen: (open: boolean) => void;
  completeOnboarding: (payload: {
    name: string;
    avatarId: string;
    avatarImage: string;
    level?: UserLevel;
  }) => void;
  updateProfile: (partial: Partial<ChildProfile>) => void;
  updateLevelConfig: (partial: Partial<LevelConfig>) => void;
  awardStar: (activityKey: string) => void;
  resetOnboardingForPresentation: () => void;
}

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

export const UserProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<ChildProfile>(() => {
    try {
      const saved = localStorage.getItem(PROFILE_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<ChildProfile>;
        const matchedAvatar = AVATAR_OPTIONS.find(a => a.id === parsed.avatarId);
        return {
          ...DEFAULT_PROFILE,
          ...parsed,
          level: 'inicial',
          avatarImage:
            parsed.avatarId === 'custom' && parsed.avatarImage
              ? parsed.avatarImage
              : matchedAvatar?.image || AVATAR_OPTIONS[0].image,
          config: {
            ...INITIAL_PRESCHOOL_CONFIG,
            ...(parsed.config || {}),
          },
        };
      }
    } catch {
      // Fallback to default profile
    }
    return DEFAULT_PROFILE;
  });

  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(() => !profile.onboarded);

  useEffect(() => {
    audioService.setSpeechRate(profile.config.speechSpeed === 'slow' ? 0.75 : 0.95);
    try {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
    } catch {
      // Ignore storage quota errors
    }
  }, [profile]);

  const completeOnboarding = (payload: {
    name: string;
    avatarId: string;
    avatarImage: string;
  }) => {
    const cleanName = payload.name.trim() || AVATAR_OPTIONS[0].name;
    setProfile(prev => ({
      ...prev,
      name: cleanName,
      avatarId: payload.avatarId,
      avatarImage: payload.avatarImage,
      level: 'inicial',
      onboarded: true,
      config: { ...INITIAL_PRESCHOOL_CONFIG },
    }));
    setIsOnboardingOpen(false);
  };

  const updateProfile = (partial: Partial<ChildProfile>) => {
    setProfile(prev => ({ ...prev, ...partial, level: 'inicial' }));
  };

  const updateLevelConfig = (partial: Partial<LevelConfig>) => {
    setProfile(prev => ({
      ...prev,
      config: {
        ...prev.config,
        ...partial,
      },
    }));
  };

  const awardStar = (activityKey: string) => {
    setProfile(prev => {
      const alreadyDone = prev.completedActivities.includes(activityKey);
      return {
        ...prev,
        stars: prev.stars + 1,
        completedActivities: alreadyDone
          ? prev.completedActivities
          : [...prev.completedActivities, activityKey],
      };
    });
  };

  const resetOnboardingForPresentation = () => {
    setIsOnboardingOpen(true);
  };

  return (
    <UserProfileContext.Provider
      value={{
        profile,
        isOnboardingOpen,
        setIsOnboardingOpen,
        completeOnboarding,
        updateProfile,
        updateLevelConfig,
        awardStar,
        resetOnboardingForPresentation,
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = (): UserProfileContextType => {
  const ctx = useContext(UserProfileContext);
  if (!ctx) {
    throw new Error('useUserProfile debe usarse dentro de UserProfileProvider');
  }
  return ctx;
};
