/**
 * Onboarding Header Component
 *
 * Displays back and skip buttons
 */

import React, { useMemo } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useLocalization } from "@umituz/react-native-localization";

export interface OnboardingHeaderProps {
  isFirstSlide: boolean;
  onBack: () => void;
  onSkip: () => void;
  showBackButton?: boolean;
  showSkipButton?: boolean;
  skipButtonText?: string;
}

export const OnboardingHeader: React.FC<OnboardingHeaderProps> = ({
  isFirstSlide,
  onBack,
  onSkip,
  showBackButton = true,
  showSkipButton = true,
  skipButtonText,
}) => {
  const { t } = useLocalization();
  const styles = useMemo(() => getStyles(), []);

  const skipText = skipButtonText || t("onboarding.skip", "Skip");

  return (
    <View style={styles.header}>
      {showBackButton ? (
        <TouchableOpacity
          onPress={onBack}
          disabled={isFirstSlide}
          style={[
            styles.headerButton,
            isFirstSlide && styles.headerButtonDisabled,
          ]}
        >
          <Text style={styles.headerButtonText}>←</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.headerButton} />
      )}
      {showSkipButton && (
        <TouchableOpacity onPress={onSkip}>
          <Text style={styles.skipText}>{skipText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const getStyles = () =>
  StyleSheet.create({
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingTop: 10,
      paddingBottom: 20,
    },
    headerButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: "rgba(255, 255, 255, 0.3)",
    },
    headerButtonDisabled: {
      opacity: 0.3,
    },
    headerButtonText: {
      color: "#FFFFFF",
      fontSize: 20,
      fontWeight: "bold",
    },
    skipText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "600",
    },
  });

