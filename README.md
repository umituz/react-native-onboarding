# @umituz/react-native-onboarding

Generic onboarding flow for React Native apps with gradient backgrounds, animations, and customizable slides. Follows SOLID, DRY, KISS principles - fully reusable across hundreds of apps.

## Features

- ✅ **Generic & Reusable**: Works with any app, fully customizable via props
- ✅ **Gradient Backgrounds**: Beautiful gradient backgrounds for each slide
- ✅ **Animations**: Smooth transitions and animations
- ✅ **SOLID Principles**: Clean architecture, easy to extend
- ✅ **DRY**: No code duplication, generic components
- ✅ **KISS**: Simple API, easy to understand and use
- ✅ **Type-Safe**: Full TypeScript support
- ✅ **Customizable**: Icons, messages, gradients, buttons - all configurable
- ✅ **Storage Integration**: Uses @umituz/react-native-storage for persistence

## Installation

```bash
npm install @umituz/react-native-onboarding
```

## Usage

### Basic Example

```typescript
import { OnboardingScreen } from '@umituz/react-native-onboarding';

const slides = [
  {
    id: '1',
    title: 'Welcome',
    description: 'Welcome to the app',
    icon: '🎉',
    gradient: ['#3B82F6', '#8B5CF6'],
  },
  {
    id: '2',
    title: 'Features',
    description: 'Discover amazing features',
    icon: '✨',
    gradient: ['#60A5FA', '#A78BFA'],
  },
];

<OnboardingScreen
  slides={slides}
  onComplete={() => {
    // Navigate to main app
  }}
/>
```

### Advanced Example with Customization

```typescript
import { OnboardingScreen } from '@umituz/react-native-onboarding';

<OnboardingScreen
  slides={slides}
  onComplete={handleComplete}
  onSkip={handleSkip}
  skipButtonText="Skip"
  nextButtonText="Next"
  getStartedButtonText="Get Started"
  showSkipButton={true}
  showBackButton={true}
  showProgressBar={true}
  showDots={true}
  showProgressText={true}
  storageKey="@myapp_onboarding_completed"
  autoComplete={false}
/>
```

### With Features List

```typescript
const slides = [
  {
    id: '1',
    title: 'Powerful Features',
    description: 'Everything you need in one place',
    icon: '🚀',
    gradient: ['#3B82F6', '#8B5CF6'],
    features: [
      'Feature 1: Amazing capability',
      'Feature 2: Another great feature',
      'Feature 3: One more awesome thing',
    ],
  },
];
```

### Custom Components

```typescript
<OnboardingScreen
  slides={slides}
  renderHeader={({ isFirstSlide, onBack, onSkip }) => (
    <CustomHeader onBack={onBack} onSkip={onSkip} />
  )}
  renderFooter={({ currentIndex, totalSlides, isLastSlide, onNext }) => (
    <CustomFooter onNext={onNext} />
  )}
  renderSlide={(slide) => <CustomSlide slide={slide} />}
/>
```

## API Reference

### `OnboardingSlide`

```typescript
interface OnboardingSlide {
  id: string;
  title: string;
  description: string;
  icon: string; // Emoji or icon name
  gradient: string[]; // [startColor, endColor] or [color1, color2, color3]
  image?: string; // Optional image URL
  features?: string[]; // Optional features list
}
```

### `OnboardingOptions`

```typescript
interface OnboardingOptions {
  slides: OnboardingSlide[];
  onComplete?: () => void | Promise<void>;
  onSkip?: () => void | Promise<void>;
  skipButtonText?: string;
  nextButtonText?: string;
  getStartedButtonText?: string;
  showSkipButton?: boolean;
  showBackButton?: boolean;
  showProgressBar?: boolean;
  showDots?: boolean;
  showProgressText?: boolean;
  storageKey?: string;
  autoComplete?: boolean;
}
```

### `useOnboardingStore`

Hook for managing onboarding completion state.

```typescript
const { isOnboardingComplete, complete, skip, reset } = useOnboardingStore();
```

### `useOnboardingNavigation`

Hook for managing navigation state.

```typescript
const { currentIndex, goToNext, goToPrevious, isLastSlide, isFirstSlide } =
  useOnboardingNavigation(totalSlides, onComplete, onSkip);
```

## Architecture

- **Domain Layer**: Entities and interfaces (business logic)
- **Infrastructure Layer**: Storage and hooks (state management)
- **Presentation Layer**: Components and screens (UI)

No app-specific code, fully generic and reusable.

## License

MIT

