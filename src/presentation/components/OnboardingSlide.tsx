/**
 * Onboarding Slide Component
 *
 * Displays a single onboarding slide with icon, title, and description
 */

import React, { useMemo } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import type { OnboardingSlide as OnboardingSlideType } from "../../domain/entities/OnboardingSlide";

export interface OnboardingSlideProps {
  slide: OnboardingSlideType;
}

export const OnboardingSlide: React.FC<OnboardingSlideProps> = ({ slide }) => {
  const styles = useMemo(() => getStyles(), []);

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
    >
      <View style={styles.slideContent}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>{slide.icon}</Text>
        </View>
        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.description}>{slide.description}</Text>
        {slide.features && slide.features.length > 0 && (
          <View style={styles.featuresContainer}>
            {slide.features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <Text style={styles.featureBullet}>•</Text>
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const getStyles = () =>
  StyleSheet.create({
    content: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 30,
    },
    slideContent: {
      alignItems: "center",
      maxWidth: 400,
    },
    iconContainer: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 40,
      borderWidth: 2,
      borderColor: "rgba(255, 255, 255, 0.3)",
    },
    icon: {
      fontSize: 60,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: "#FFFFFF",
      textAlign: "center",
      marginBottom: 16,
    },
    description: {
      fontSize: 16,
      color: "rgba(255, 255, 255, 0.95)",
      textAlign: "center",
      lineHeight: 24,
      marginBottom: 20,
    },
    featuresContainer: {
      width: "100%",
      marginTop: 10,
    },
    featureItem: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 12,
    },
    featureBullet: {
      color: "#FFFFFF",
      fontSize: 20,
      marginRight: 12,
      marginTop: 2,
    },
    featureText: {
      flex: 1,
      fontSize: 15,
      color: "rgba(255, 255, 255, 0.9)",
      lineHeight: 22,
    },
  });

