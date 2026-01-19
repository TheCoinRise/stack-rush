import * as Haptics from 'expo-haptics';
import { useUserStore } from '@/stores/userStore';

/**
 * Trigger light haptic feedback
 */
export function lightHaptic(): void {
  const { hapticEnabled } = useUserStore.getState();
  if (hapticEnabled) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }
}

/**
 * Trigger medium haptic feedback
 */
export function mediumHaptic(): void {
  const { hapticEnabled } = useUserStore.getState();
  if (hapticEnabled) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }
}

/**
 * Trigger heavy haptic feedback
 */
export function heavyHaptic(): void {
  const { hapticEnabled } = useUserStore.getState();
  if (hapticEnabled) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  }
}

/**
 * Trigger success notification haptic
 */
export function successHaptic(): void {
  const { hapticEnabled } = useUserStore.getState();
  if (hapticEnabled) {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }
}

/**
 * Trigger error notification haptic
 */
export function errorHaptic(): void {
  const { hapticEnabled } = useUserStore.getState();
  if (hapticEnabled) {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  }
}

/**
 * Trigger warning notification haptic
 */
export function warningHaptic(): void {
  const { hapticEnabled } = useUserStore.getState();
  if (hapticEnabled) {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
  }
}

/**
 * Trigger selection haptic (lightest)
 */
export function selectionHaptic(): void {
  const { hapticEnabled } = useUserStore.getState();
  if (hapticEnabled) {
    Haptics.selectionAsync();
  }
}
