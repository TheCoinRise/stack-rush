import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';
import { useUserStore } from '@/stores/userStore';

// Haptics only work on native platforms
const isNative = Platform.OS !== 'web';

/**
 * Trigger light haptic feedback
 */
export function lightHaptic(): void {
  if (!isNative) return;
  const { hapticEnabled } = useUserStore.getState();
  if (hapticEnabled) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }
}

/**
 * Trigger medium haptic feedback
 */
export function mediumHaptic(): void {
  if (!isNative) return;
  const { hapticEnabled } = useUserStore.getState();
  if (hapticEnabled) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }
}

/**
 * Trigger heavy haptic feedback
 */
export function heavyHaptic(): void {
  if (!isNative) return;
  const { hapticEnabled } = useUserStore.getState();
  if (hapticEnabled) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  }
}

/**
 * Trigger success notification haptic
 */
export function successHaptic(): void {
  if (!isNative) return;
  const { hapticEnabled } = useUserStore.getState();
  if (hapticEnabled) {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }
}

/**
 * Trigger error notification haptic
 */
export function errorHaptic(): void {
  if (!isNative) return;
  const { hapticEnabled } = useUserStore.getState();
  if (hapticEnabled) {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  }
}

/**
 * Trigger warning notification haptic
 */
export function warningHaptic(): void {
  if (!isNative) return;
  const { hapticEnabled } = useUserStore.getState();
  if (hapticEnabled) {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
  }
}

/**
 * Trigger selection haptic (lightest)
 */
export function selectionHaptic(): void {
  if (!isNative) return;
  const { hapticEnabled } = useUserStore.getState();
  if (hapticEnabled) {
    Haptics.selectionAsync();
  }
}
