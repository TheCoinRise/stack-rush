/**
 * RevenueCat Purchases Service
 *
 * This is a mock implementation for Expo Go development.
 * For production, install react-native-purchases and create a development build:
 *
 * 1. npm install react-native-purchases
 * 2. npx expo prebuild
 * 3. npx expo run:ios (or run:android)
 *
 * Then uncomment the real implementation below.
 */

// Flag to indicate we're in mock mode
const IS_MOCK_MODE = true;

let isInitialized = false;

/**
 * Initialize RevenueCat SDK
 */
export async function initializePurchases(): Promise<void> {
  if (isInitialized) return;

  if (IS_MOCK_MODE) {
    console.log('[RevenueCat] Running in mock mode (Expo Go)');
    console.log('[RevenueCat] For real purchases, create a development build');
    isInitialized = true;
    return;
  }

  // Real implementation would go here
  isInitialized = true;
}

/**
 * Check if user has premium entitlement
 */
export async function checkPremiumStatus(): Promise<boolean> {
  if (IS_MOCK_MODE) {
    return false;
  }
  return false;
}

/**
 * Get available packages for purchase
 */
export async function getPackages(): Promise<any[]> {
  if (IS_MOCK_MODE) {
    // Return mock package for UI testing
    return [{
      identifier: 'premium',
      product: {
        identifier: 'stack_rush_premium',
        priceString: '$2.99',
        price: 2.99,
      },
    }];
  }
  return [];
}

/**
 * Purchase premium upgrade
 * In mock mode, simulates a successful purchase
 */
export async function purchasePremium(): Promise<boolean> {
  if (IS_MOCK_MODE) {
    console.log('[RevenueCat] Mock purchase - simulating success');
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return true;
  }
  return false;
}

/**
 * Restore previous purchases
 */
export async function restorePurchases(): Promise<boolean> {
  if (IS_MOCK_MODE) {
    console.log('[RevenueCat] Mock restore - no purchases found');
    await new Promise(resolve => setTimeout(resolve, 500));
    return false;
  }
  return false;
}

/**
 * Get customer info
 */
export async function getCustomerInfo(): Promise<any | null> {
  return null;
}

/*
 * ==============================================
 * REAL IMPLEMENTATION (for development builds)
 * ==============================================
 *
 * To enable real RevenueCat:
 *
 * 1. Install the package:
 *    npm install react-native-purchases
 *
 * 2. Create development build:
 *    npx expo prebuild
 *    npx expo run:ios
 *
 * 3. Replace this file with:
 *
 * import { Platform } from 'react-native';
 * import Purchases, { PurchasesPackage, CustomerInfo } from 'react-native-purchases';
 * import Constants from 'expo-constants';
 *
 * const API_KEY_IOS = Constants.expoConfig?.extra?.revenueCatApiKeyIos || '';
 * const API_KEY_ANDROID = Constants.expoConfig?.extra?.revenueCatApiKeyAndroid || '';
 * const PREMIUM_ENTITLEMENT = 'premium';
 *
 * export async function initializePurchases(): Promise<void> {
 *   const apiKey = Platform.OS === 'ios' ? API_KEY_IOS : API_KEY_ANDROID;
 *   if (!apiKey) return;
 *   await Purchases.configure({ apiKey });
 * }
 *
 * export async function checkPremiumStatus(): Promise<boolean> {
 *   const info = await Purchases.getCustomerInfo();
 *   return info.entitlements.active[PREMIUM_ENTITLEMENT] !== undefined;
 * }
 *
 * export async function purchasePremium(): Promise<boolean> {
 *   const offerings = await Purchases.getOfferings();
 *   const pkg = offerings.current?.availablePackages[0];
 *   if (!pkg) return false;
 *   const { customerInfo } = await Purchases.purchasePackage(pkg);
 *   return customerInfo.entitlements.active[PREMIUM_ENTITLEMENT] !== undefined;
 * }
 *
 * export async function restorePurchases(): Promise<boolean> {
 *   const info = await Purchases.restorePurchases();
 *   return info.entitlements.active[PREMIUM_ENTITLEMENT] !== undefined;
 * }
 */
