/**
 * Onboarding Screen
 *
 * Main onboarding screen component with gradient backgrounds
 * Generic and reusable across hundreds of apps
 */

import React, { useMemo } from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { OnboardingOptions } from "../../domain/entities/OnboardingOptions";
import { useOnboardingNavigation } from "../../infrastructure/hooks/useOnboardingNavigation";
import { useOnboardingStore } from "../../infrastructure/storage/OnboardingStore";
import { OnboardingHeader } from "../components/OnboardingHeader";
import { OnboardingSlide as OnboardingSlideComponent } from "../components/OnboardingSlide";
import { OnboardingFooter } from "../components/OnboardingFooter";

export interface OnboardingScreenProps extends OnboardingOptions {
  /**
   * Optional custom header component
   */
  renderHeader?: (props: {
    isFirstSlide: boolean;
    onBack: () => void;
    onSkip: () => void;
  }) => React.ReactNode;

  /**
   * Optional custom footer component
   */
  renderFooter?: (props: {
    currentIndex: number;
    totalSlides: number;
    isLastSlide: boolean;
    onNext: () => void;
  }) => React.ReactNode;

  /**
   * Optional custom slide component
   */
  renderSlide?: (slide: OnboardingOptions["slides"][0]) => React.ReactNode;
}

/**
 * Onboarding Screen Component
 *
 * Displays onboarding flow with gradient backgrounds, animations, and navigation
 */
export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  slides,
  onComplete,
  onSkip,
  skipButtonText,
  nextButtonText,
  getStartedButtonText,
  showSkipButton = true,
  showBackButton = true,
  showProgressBar = true,
  showDots = true,
  showProgressText = true,
  storageKey,
  autoComplete = false,
  renderHeader,
  renderFooter,
  renderSlide,
}) => {
  const insets = useSafeAreaInsets();
  const onboardingStore = useOnboardingStore();

  const handleComplete = async () => {
    await onboardingStore.complete(storageKey);
    if (onComplete) {
      await onComplete();
    }
  };

  const handleSkip = async () => {
    await onboardingStore.skip(storageKey);
    if (onSkip) {
      await onSkip();
    }
  };

  const {
    currentIndex,
    goToNext,
    goToPrevious,
    isLastSlide,
    isFirstSlide,
  } = useOnboardingNavigation(slides.length, handleComplete, handleSkip);

  const handleNext = () => {
    if (isLastSlide) {
      if (autoComplete) {
        handleComplete();
      } else {
        handleComplete();
      }
    } else {
      goToNext();
    }
  };

  const currentSlide = slides[currentIndex];
  const styles = useMemo(() => getStyles(insets), [insets]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={currentSlide.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      {renderHeader ? (
        renderHeader({
          isFirstSlide,
          onBack: goToPrevious,
          onSkip: handleSkip,
        })
      ) : (
        <OnboardingHeader
          isFirstSlide={isFirstSlide}
          onBack={goToPrevious}
          onSkip={handleSkip}
          showBackButton={showBackButton}
          showSkipButton={showSkipButton}
          skipButtonText={skipButtonText}
        />
      )}
      {renderSlide ? (
        renderSlide(currentSlide)
      ) : (
        <OnboardingSlide slide={currentSlide} />
      )}
      {renderFooter ? (
        renderFooter({
          currentIndex,
          totalSlides: slides.length,
          isLastSlide,
          onNext: handleNext,
        })
      ) : (
        <OnboardingFooter
          currentIndex={currentIndex}
          totalSlides={slides.length}
          isLastSlide={isLastSlide}
          onNext={handleNext}
          showProgressBar={showProgressBar}
          showDots={showDots}
          showProgressText={showProgressText}
          nextButtonText={nextButtonText}
          getStartedButtonText={getStartedButtonText}
        />
      )}
    </View>
  );
};

const getStyles = (insets: { top: number }) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: insets.top,
    },
  });

