/**
 * Onboarding Slide Entity
 *
 * Domain entity representing a single onboarding slide
 */

/**
 * Onboarding Slide
 * Each slide represents one step in the onboarding flow
 */
export interface OnboardingSlide {
  /**
   * Unique identifier for the slide
   */
  id: string;

  /**
   * Slide title
   */
  title: string;

  /**
   * Slide description/body text
   */
  description: string;

  /**
   * Icon to display (emoji or icon name)
   */
  icon: string;

  /**
   * Gradient colors for the slide background
   * [startColor, endColor] or [color1, color2, color3] for multi-stop gradients
   */
  gradient: string[];

  /**
   * Optional image URL (alternative to icon)
   */
  image?: string;

  /**
   * Optional features list to display
   */
  features?: string[];
}

