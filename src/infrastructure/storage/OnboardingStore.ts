/**
 * Onboarding Store
 *
 * Zustand store for managing onboarding completion state
 * Uses @umituz/react-native-storage for persistence
 */

import { create } from "zustand";
import {
  storageRepository,
  StorageKey,
  unwrap,
} from "@umituz/react-native-storage";

interface OnboardingStore {
  // State
  isOnboardingComplete: boolean;
  currentStep: number;
  loading: boolean;
  error: string | null;

  // Actions
  initialize: (storageKey?: string) => Promise<void>;
  complete: (storageKey?: string) => Promise<void>;
  skip: (storageKey?: string) => Promise<void>;
  setCurrentStep: (step: number) => void;
  reset: (storageKey?: string) => Promise<void>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const DEFAULT_STORAGE_KEY = StorageKey.ONBOARDING_COMPLETED;

export const useOnboardingStore = create<OnboardingStore>((set, get) => ({
  isOnboardingComplete: false,
  currentStep: 0,
  loading: true,
  error: null,

  initialize: async (storageKey = DEFAULT_STORAGE_KEY) => {
    set({ loading: true, error: null });

    const result = await storageRepository.getString(storageKey, "false");
    const data = unwrap(result, "false");

    set({
      isOnboardingComplete: data === "true",
      loading: false,
      error: result.success ? null : result.error?.message || null,
    });
  },

  complete: async (storageKey = DEFAULT_STORAGE_KEY) => {
    set({ loading: true, error: null });

    const result = await storageRepository.setString(storageKey, "true");

    set({
      isOnboardingComplete: result.success,
      loading: false,
      error: result.success ? null : result.error?.message || null,
    });
  },

  skip: async (storageKey = DEFAULT_STORAGE_KEY) => {
    set({ loading: true, error: null });

    const result = await storageRepository.setString(storageKey, "true");

    set({
      isOnboardingComplete: result.success,
      loading: false,
      error: result.success ? null : result.error?.message || null,
    });
  },

  setCurrentStep: (step) => set({ currentStep: step }),

  reset: async (storageKey = DEFAULT_STORAGE_KEY) => {
    set({ loading: true, error: null });

    const result = await storageRepository.removeItem(storageKey);

    set({
      isOnboardingComplete: false,
      currentStep: 0,
      loading: false,
      error: result.success ? null : result.error?.message || null,
    });
  },

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));

/**
 * Hook for accessing onboarding state
 */
export const useOnboarding = () => {
  const {
    isOnboardingComplete,
    currentStep,
    loading,
    error,
    initialize,
    complete,
    skip,
    setCurrentStep,
    reset,
    setLoading,
    setError,
  } = useOnboardingStore();

  return {
    isOnboardingComplete,
    currentStep,
    loading,
    error,
    initialize,
    complete,
    skip,
    setCurrentStep,
    reset,
    setLoading,
    setError,
  };
};

