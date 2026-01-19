# Stack Rush - Runbook

Copy-paste commands for common development tasks.

## Development

### First Time Setup
```bash
cd builds/stack-rush
npm install
```

### Start Development Server
```bash
npx expo start
```

### Start with Cache Clear
```bash
npx expo start --clear
```

### Run on iOS Simulator
```bash
npx expo start --ios
```

### Run on Android Emulator
```bash
npx expo start --android
```

### Run on Physical Device
1. Install Expo Go from App Store / Play Store
2. Run `npx expo start`
3. Scan QR code with camera (iOS) or Expo Go app (Android)

## Building

### Create Development Build
```bash
npx expo prebuild
```

### Build iOS (requires Mac)
```bash
npx expo run:ios
```

### Build Android
```bash
npx expo run:android
```

### EAS Build (Cloud)
```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android

# Build for both
eas build --platform all
```

## RevenueCat Configuration

### Set API Keys (Development)
```bash
# macOS/Linux
export REVENUECAT_IOS_KEY=appl_your_key_here
export REVENUECAT_ANDROID_KEY=goog_your_key_here

# Windows PowerShell
$env:REVENUECAT_IOS_KEY="appl_your_key_here"
$env:REVENUECAT_ANDROID_KEY="goog_your_key_here"
```

### Test Sandbox Purchases (iOS)
1. Create sandbox tester in App Store Connect
2. Sign out of App Store on device
3. Make purchase in app
4. Sign in with sandbox account when prompted

### Test Sandbox Purchases (Android)
1. Add license testers in Google Play Console
2. Upload signed APK to internal testing track
3. Install from Play Store
4. Purchases will be free for testers

## Troubleshooting

### Metro Bundler Issues
```bash
# Clear Metro cache
npx expo start --clear

# Reset watchman (macOS)
watchman watch-del-all
```

### Dependency Issues
```bash
# Clean install
rm -rf node_modules
rm package-lock.json
npm install

# Legacy peer deps (if needed)
npm install --legacy-peer-deps
```

### iOS Specific
```bash
# Clean iOS build
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..
```

### Android Specific
```bash
# Clean Android build
cd android
./gradlew clean
cd ..
```

### TypeScript Errors
```bash
# Check types
npm run typecheck

# Or directly
npx tsc --noEmit
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `REVENUECAT_IOS_KEY` | RevenueCat iOS API key | For production |
| `REVENUECAT_ANDROID_KEY` | RevenueCat Android API key | For production |

## Useful Commands

### Check Expo Version
```bash
npx expo --version
```

### Update Expo SDK
```bash
npx expo install expo@latest
```

### Check for Dependency Updates
```bash
npx expo-doctor
```

### Generate App Icons
```bash
# Requires icon.png at 1024x1024
npx expo-optimize
```
