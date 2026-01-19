# Stack Rush - Launch Checklist

## Pre-Launch (1 Week Before)

### App Store Connect (iOS)
- [ ] Create app listing
- [ ] Set bundle ID: `com.stackrush.app`
- [ ] Upload app icon (1024x1024, no alpha)
- [ ] Add screenshots (6.7", 6.5", 5.5" required)
- [ ] Write app description (from `aso/description.md`)
- [ ] Set keywords (from `aso/keywords.txt`)
- [ ] Set subtitle (from `aso/subtitle.txt`)
- [ ] Set category: Games > Casual
- [ ] Set age rating: 4+
- [ ] Add privacy policy URL
- [ ] Set price: Free
- [ ] Configure in-app purchases

### Google Play Console (Android)
- [ ] Create app listing
- [ ] Set package name: `com.stackrush.app`
- [ ] Upload app icon (512x512)
- [ ] Upload feature graphic (1024x500)
- [ ] Add screenshots (phone, 7" tablet, 10" tablet)
- [ ] Write app description
- [ ] Set short description (80 chars)
- [ ] Set category: Games > Casual
- [ ] Complete content rating questionnaire
- [ ] Add privacy policy URL
- [ ] Configure in-app products

### RevenueCat
- [ ] Create production app (iOS)
- [ ] Create production app (Android)
- [ ] Create entitlement: `premium`
- [ ] Create product: `stack_rush_premium`
- [ ] Connect to App Store Connect
- [ ] Connect to Google Play Console
- [ ] Test sandbox purchases

### Legal
- [ ] Privacy policy hosted and accessible
- [ ] Terms of service (if needed)
- [ ] COPPA compliance verified (no data collection)

## Build & Submit

### iOS
- [ ] Update version in `app.config.js`
- [ ] Run `eas build --platform ios --profile production`
- [ ] Download IPA from EAS
- [ ] Upload to App Store Connect via Transporter
- [ ] Submit for review

### Android
- [ ] Update version in `app.config.js`
- [ ] Run `eas build --platform android --profile production`
- [ ] Download AAB from EAS
- [ ] Upload to Google Play Console
- [ ] Submit for review (Internal > Closed > Open > Production)

## Post-Launch (Day 1)

- [ ] Verify app is live on App Store
- [ ] Verify app is live on Play Store
- [ ] Test production purchase flow
- [ ] Monitor RevenueCat dashboard
- [ ] Monitor crash reports (Firebase/Sentry)
- [ ] Post launch announcement (see `marketing/launch_thread.md`)

## Marketing Activities

### Launch Day
- [ ] Post Twitter/X thread
- [ ] Post to relevant subreddits
- [ ] Post to Product Hunt (optional)
- [ ] Email to personal network

### Week 1
- [ ] Respond to all reviews
- [ ] Monitor download stats
- [ ] Track conversion rate
- [ ] A/B test App Store screenshots (if traffic allows)

### Ongoing
- [ ] Weekly review monitoring
- [ ] Monthly performance review
- [ ] Update for new OS versions
- [ ] Plan v1.1 features based on feedback

## Key Metrics to Track

| Metric | Target | Tool |
|--------|--------|------|
| Downloads | 1000 (week 1) | App Store Connect / Play Console |
| Day 1 Retention | > 30% | Analytics |
| Day 7 Retention | > 10% | Analytics |
| Premium Conversion | > 2% | RevenueCat |
| Average Session | > 3 min | Analytics |
| Crash-Free Rate | > 99% | Firebase Crashlytics |

## Emergency Contacts

- RevenueCat Support: support@revenuecat.com
- Expo Support: https://expo.dev/support
- App Store Review: https://developer.apple.com/contact/
- Google Play Support: https://support.google.com/googleplay/android-developer/
