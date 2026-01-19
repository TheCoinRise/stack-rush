# Stack Rush - Testing Checklist

## Smoke Tests

Run these tests before every release.

### App Launch
- [ ] App launches without crash
- [ ] Splash screen displays
- [ ] Home screen loads correctly
- [ ] High score displays (0 for new install)

### Navigation
- [ ] Tap PLAY navigates to game screen
- [ ] Tap THEMES opens shop modal
- [ ] Tap REMOVE ADS opens paywall modal (if not premium)
- [ ] Tap SETTINGS opens settings modal
- [ ] Back/close buttons work on all modals

### Gameplay
- [ ] Game starts when tapping PLAY button
- [ ] Block slides left-right continuously
- [ ] Tap drops the block
- [ ] Perfect alignment triggers combo
- [ ] Missed block ends game
- [ ] Score increases on successful drops
- [ ] Speed increases as tower grows
- [ ] Game over modal displays final score

### Scoring & Progression
- [ ] Score persists as high score (if higher)
- [ ] Coins earned based on score
- [ ] Coins add to total balance
- [ ] Games played counter increments

### Theme Shop
- [ ] All 13 themes display
- [ ] Unlocked themes show "OWNED" or "SELECTED"
- [ ] Locked themes show coin price
- [ ] Can purchase themes with coins
- [ ] Selected theme applies immediately
- [ ] Theme persists after restart

### Settings
- [ ] Sound toggle works
- [ ] Haptic toggle works
- [ ] Stats display correctly
- [ ] Reset progress works
- [ ] Premium status shows correctly

### RevenueCat (Sandbox)
- [ ] Paywall displays benefits
- [ ] Purchase button responds
- [ ] Restore purchases button responds
- [ ] Premium status updates after purchase
- [ ] All themes unlock with premium
- [ ] "PREMIUM" badge shows on home screen

### Haptics
- [ ] Light haptic on button press
- [ ] Medium haptic on game start
- [ ] Success haptic on perfect drop
- [ ] Error haptic on game over
- [ ] Haptics respect settings toggle

### Edge Cases
- [ ] Very long game (100+ blocks) performs well
- [ ] Rapid tapping doesn't break game
- [ ] Background/foreground doesn't crash
- [ ] Low memory doesn't crash
- [ ] Orientation lock works (portrait only)

## Platform-Specific Tests

### iOS
- [ ] Safe area insets work correctly
- [ ] Notch/Dynamic Island doesn't obscure UI
- [ ] Home indicator doesn't block buttons
- [ ] App Store review prompt (if implemented)

### Android
- [ ] Back button works correctly
- [ ] Different screen sizes display correctly
- [ ] Android 12+ splash screen works
- [ ] Navigation bar doesn't obscure content

## Performance Tests

- [ ] Game maintains 60fps during gameplay
- [ ] No memory leaks after multiple games
- [ ] App size is reasonable (< 50MB)
- [ ] Cold start time < 3 seconds

## Accessibility Tests

- [ ] VoiceOver/TalkBack can navigate menus
- [ ] Touch targets are minimum 44x44pt
- [ ] Color contrast is sufficient
- [ ] Text scales with system settings

## Pre-Release Checklist

- [ ] All smoke tests pass
- [ ] No TypeScript errors
- [ ] No console errors in production
- [ ] RevenueCat products configured
- [ ] App icons and splash screen set
- [ ] Bundle ID matches store listing
- [ ] Version number updated
- [ ] Privacy policy URL accessible
