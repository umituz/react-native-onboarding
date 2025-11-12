/**
 * React Native Onboarding - Public API
 *
 * Generic onboarding flow for React Native apps with gradient backgrounds,
 * animations, and customizable slides. Follows SOLID, DRY, KISS principles.
 *
 * Architecture:
 * - Domain: Entities and interfaces (business logic)
 * - Infrastructure: Storage and hooks (state management)
 * - Presentation: Components and screens (UI)
 *
 * Usage:
 *   import { OnboardingScreen, OnboardingSlide } from '@umituz/react-native-onboarding';
 *
 *   <OnboardingScreen
 *     slides={[
 *       {
 *         id: '1',
 *         title: 'Welcome',
 *         description: 'Welcome to the app',
 *         icon: '🎉',
 *         gradient: ['#3B82F6', '#8B5CF6'],
 *       },
 *     ]}
 *     onComplete={() => console.log('Completed')}
 *   />
 */

// =============================================================================
// DOMAIN LAYER - Entities and Interfaces
// =============================================================================

export type { OnboardingSlide } from "./domain/entities/OnboardingSlide";
export type { OnboardingOptions } from "./domain/entities/OnboardingOptions";

// =============================================================================
// INFRASTRUCTURE LAYER - Storage and Hooks
// =============================================================================

export {
  useOnboardingStore,
  useOnboarding,
} from "./infrastructure/storage/OnboardingStore";
export {
  useOnboardingNavigation,
  type UseOnboardingNavigationReturn,
} from "./infrastructure/hooks/useOnboardingNavigation";

// =============================================================================
// PRESENTATION LAYER - Components and Screens
// =============================================================================

export { OnboardingScreen, type OnboardingScreenProps } from "./presentation/screens/OnboardingScreen";
export { OnboardingHeader, type OnboardingHeaderProps } from "./presentation/components/OnboardingHeader";
export { OnboardingFooter, type OnboardingFooterProps } from "./presentation/components/OnboardingFooter";

// Export OnboardingSlide component
// Note: TypeScript doesn't allow exporting both a type and a value with the same name
// The type is exported above as OnboardingSlide
// The component is exported here with a different name to avoid conflict
import { OnboardingSlide as OnboardingSlideComponent } from "./presentation/components/OnboardingSlide";
export { OnboardingSlideComponent };
export type { OnboardingSlideProps } from "./presentation/components/OnboardingSlide";

