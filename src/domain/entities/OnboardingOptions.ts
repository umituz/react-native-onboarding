/**
 * Onboarding Options
 *
 * Configuration options for onboarding flow
 */

import type { OnboardingSlide } from "./OnboardingSlide";

/**
 * Onboarding Options
 * Customize the onboarding experience
 */
export interface OnboardingOptions {
  /**
   * Array of slides to display
   */
  slides: OnboardingSlide[];

  /**
   * Callback when onboarding is completed
   */
  onComplete?: () => void | Promise<void>;

  /**
   * Callback when onboarding is skipped
   */
  onSkip?: () => void | Promise<void>;

  /**
   * Custom skip button text (default: "Skip")
   */
  skipButtonText?: string;

  /**
   * Custom next button text (default: "Next")
   */
  nextButtonText?: string;

  /**
   * Custom get started button text (default: "Get Started")
   */
  getStartedButtonText?: string;

  /**
   * Show skip button (default: true)
   */
  showSkipButton?: boolean;

  /**
   * Show back button (default: true)
   */
  showBackButton?: boolean;

  /**
   * Show progress bar (default: true)
   */
  showProgressBar?: boolean;

  /**
   * Show dots indicator (default: true)
   */
  showDots?: boolean;

  /**
   * Show progress text (default: true)
   */
  showProgressText?: boolean;

  /**
   * Storage key for completion state (default: "@onboarding_completed")
   */
  storageKey?: string;

  /**
   * Auto-complete onboarding on last slide (default: false)
   */
  autoComplete?: boolean;
}

