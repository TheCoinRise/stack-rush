# Stack Rush (still in development)

A precision stacking game where you tap to drop blocks perfectly, build the tallest tower, and unlock stunning themes.

## Features

- **One-Tap Gameplay**: Simple, addictive mechanics - tap to drop the sliding block
- **Combo System**: Perfect drops trigger combo multipliers for higher scores
- **13 Unlockable Themes**: Earn coins to unlock new visual styles
- **Premium Upgrade**: Remove ads, unlock all themes, earn 2x coins
- **Haptic Feedback**: Satisfying vibrations on every action
- **Offline-First**: All data stored locally, no account required

## Tech Stack

- **Framework**: React Native + Expo SDK 54
- **Navigation**: Expo Router v4
- **Language**: TypeScript (strict mode)
- **State Management**: Zustand with persist middleware
- **Animations**: React Native Reanimated 3
- **Monetization**: RevenueCat
- **Storage**: AsyncStorage

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npx expo start

# Run on iOS simulator
npx expo start --ios

# Run on Android emulator
npx expo start --android
```

## Project Structure

```
stack-rush/
├── app/                    # Expo Router screens
│   ├── _layout.tsx         # Root layout
│   ├── index.tsx           # Home/menu screen
│   ├── game.tsx            # Game screen
│   ├── shop.tsx            # Theme shop
│   ├── paywall.tsx         # Premium upgrade
│   └── settings.tsx        # Settings
├── src/
│   ├── components/         # Reusable UI components
│   ├── game/               # Game logic and constants
│   ├── hooks/              # Custom React hooks
│   ├── services/           # External services (RevenueCat, storage)
│   ├── stores/             # Zustand state stores
│   ├── themes/             # Theme definitions
│   └── ui/                 # UI constants
├── assets/                 # App icons, splash screen
├── research/               # Market research documents
├── aso/                    # App Store Optimization materials
└── marketing/              # Marketing copy and materials
```

## RevenueCat Setup

1. Create account at [revenuecat.com](https://www.revenuecat.com)
2. Create a new project
3. Add iOS and Android apps
4. Create products:
   - Product ID: `stack_rush_premium`
   - Price: $2.99 (one-time)
   - Entitlement: `premium`
5. Copy API keys to environment:
   ```bash
   export REVENUECAT_IOS_KEY=appl_xxxxx
   export REVENUECAT_ANDROID_KEY=goog_xxxxx
   ```

## Game Mechanics

### Scoring
- Base points: 10 per block
- Perfect drop bonus: +50 points
- Combo multiplier: 1.5x per consecutive perfect drop (max 10x)

### Coin Economy
- Earn 1 coin per 100 score
- Premium users earn 2x coins
- Themes cost 100-300 coins

### Difficulty Progression
- Block speed increases every 5 blocks
- Initial speed: 4 units/frame
- Max speed: 12 units/frame

## Theme List

| Theme | Cost | Description |
|-------|------|-------------|
| Classic | Free | Default teal colors |
| Neon Nights | Free | Vibrant neon colors |
| Sunset | Free | Warm orange/red tones |
| Deep Ocean | 100 | Cool blue palette |
| Forest | 100 | Natural green shades |
| Candy Pop | 150 | Playful pastels |
| Midnight | 150 | Dark sophisticated tones |
| Cherry Blossom | 200 | Soft pink flowers |
| Arctic | 200 | Icy blues and whites |
| Volcanic | 250 | Hot reds and oranges |
| Galaxy | 300 | Deep purples and blues |
| Minimalist | 300 | Clean black and white |
| Premium Gold | Premium | Exclusive gold theme |

## License

Proprietary - All rights reserved
# stack-rush
