/**
 * Onboarding Footer Component
 *
 * Displays progress bar, dots, and next/get started button
 */

import React, { useMemo } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalization } from "@umituz/react-native-localization";
import { useAppDesignTokens } from "@umituz/react-native-design-system-theme";

export interface OnboardingFooterProps {
  currentIndex: number;
  totalSlides: number;
  isLastSlide: boolean;
  onNext: () => void;
  showProgressBar?: boolean;
  showDots?: boolean;
  showProgressText?: boolean;
  nextButtonText?: string;
  getStartedButtonText?: string;
}

export const OnboardingFooter: React.FC<OnboardingFooterProps> = ({
  currentIndex,
  totalSlides,
  isLastSlide,
  onNext,
  showProgressBar = true,
  showDots = true,
  showProgressText = true,
  nextButtonText,
  getStartedButtonText,
}) => {
  const insets = useSafeAreaInsets();
  const { t } = useLocalization();
  const tokens = useAppDesignTokens();
  const styles = useMemo(() => getStyles(insets, tokens), [insets, tokens]);

  const buttonText = isLastSlide
    ? getStartedButtonText || t("onboarding.getStarted", "Get Started")
    : nextButtonText || t("general.continue", "Continue");

  return (
    <View style={styles.footer}>
      {showProgressBar && (
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${((currentIndex + 1) / totalSlides) * 100}%` },
              ]}
            />
          </View>
        </View>
      )}

      {showDots && (
        <View style={styles.dots}>
          {Array.from({ length: totalSlides }).map((_, index) => (
            <View
              key={index}
              style={[styles.dot, index === currentIndex && styles.dotActive]}
            />
          ))}
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={onNext}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>

      {showProgressText && (
        <Text style={styles.progressText}>
          {currentIndex + 1} {t("general.of", "of")} {totalSlides}
        </Text>
      )}
    </View>
  );
};

const getStyles = (
  insets: { bottom: number },
  tokens: ReturnType<typeof useAppDesignTokens>,
) =>
  StyleSheet.create({
    footer: {
      paddingHorizontal: 30,
      paddingTop: 30,
      paddingBottom: insets.bottom + 20,
    },
    progressContainer: {
      marginBottom: 20,
    },
    progressBar: {
      height: 4,
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      borderRadius: 2,
      overflow: "hidden",
    },
    progressFill: {
      height: "100%",
      backgroundColor: "#FFFFFF",
      borderRadius: 2,
    },
    dots: {
      flexDirection: "row",
      justifyContent: "center",
      marginBottom: 30,
      gap: 8,
    },
    dot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: "rgba(255, 255, 255, 0.4)",
    },
    dotActive: {
      width: 8,
      backgroundColor: "#FFFFFF",
    },
    button: {
      backgroundColor: "#FFFFFF",
      paddingVertical: 16,
      borderRadius: 28,
      alignItems: "center",
      marginBottom: 12,
    },
    buttonText: {
      color: tokens.colors.primary,
      fontSize: 16,
      fontWeight: "bold",
    },
    progressText: {
      color: "rgba(255, 255, 255, 0.75)",
      fontSize: 12,
      textAlign: "center",
    },
  });

