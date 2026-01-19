import { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useUserStore } from '@/stores/userStore';
import { getThemeById } from '@/themes';
import { Button } from '@/components/Button';
import { colors } from '@/ui/colors';
import { purchasePremium, restorePurchases } from '@/services/purchases';

export default function PaywallScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { selectedTheme, hapticEnabled, isPremium, setPremium } = useUserStore();
  const theme = getThemeById(selectedTheme);

  const handlePurchase = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const success = await purchasePremium();
      if (success) {
        setPremium(true);
        if (hapticEnabled) {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }
        router.back();
      } else {
        setError('Purchase was cancelled');
      }
    } catch (err) {
      setError('Purchase failed. Please try again.');
      if (hapticEnabled) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestore = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const hasPremium = await restorePurchases();
      if (hasPremium) {
        setPremium(true);
        if (hapticEnabled) {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }
        router.back();
      } else {
        setError('No purchases found to restore');
      }
    } catch (err) {
      setError('Restore failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isPremium) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.content}>
          <Text style={[styles.alreadyPremium, { color: colors.gold }]}>
            You're already Premium!
          </Text>
          <Button title="Back" onPress={() => router.back()} variant="outline" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          style={styles.closeButton}
          accessibilityLabel="Close paywall"
          accessibilityRole="button"
        >
          <Text style={[styles.closeText, { color: theme.colors.textSecondary }]}>
            ✕
          </Text>
        </Pressable>
      </View>

      <View style={styles.content}>
        {/* Premium Badge */}
        <View style={styles.premiumIcon}>
          <Text style={styles.crownEmoji}>👑</Text>
        </View>

        <Text style={[styles.title, { color: colors.gold }]}>
          GO PREMIUM
        </Text>

        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          Unlock the full Stack Rush experience
        </Text>

        {/* Benefits */}
        <View style={styles.benefitsList}>
          <BenefitRow
            icon="🚫"
            text="Remove all ads forever"
            color={theme.colors.textPrimary}
          />
          <BenefitRow
            icon="🎨"
            text="Unlock all 13 themes instantly"
            color={theme.colors.textPrimary}
          />
          <BenefitRow
            icon="🪙"
            text="Earn 2x coins on every game"
            color={theme.colors.textPrimary}
          />
          <BenefitRow
            icon="✨"
            text="Exclusive Premium Gold theme"
            color={theme.colors.textPrimary}
          />
        </View>

        {/* Price */}
        <View style={styles.priceContainer}>
          <Text style={[styles.price, { color: theme.colors.textPrimary }]}>
            $2.99
          </Text>
          <Text style={[styles.priceNote, { color: theme.colors.textSecondary }]}>
            One-time purchase
          </Text>
        </View>

        {/* Error */}
        {error && (
          <Text style={styles.errorText}>{error}</Text>
        )}

        {/* Purchase Button */}
        <Button
          title={isLoading ? 'Processing...' : 'Upgrade Now'}
          onPress={handlePurchase}
          variant="gold"
          size="large"
          disabled={isLoading}
          style={styles.purchaseButton}
        />

        {isLoading && (
          <ActivityIndicator color={colors.gold} style={styles.loader} />
        )}

        {/* Restore */}
        <Pressable
          onPress={handleRestore}
          disabled={isLoading}
          style={styles.restoreButton}
          accessibilityLabel="Restore purchases"
          accessibilityRole="button"
        >
          <Text style={[styles.restoreText, { color: theme.colors.textSecondary }]}>
            Restore Purchases
          </Text>
        </Pressable>

        {/* Legal */}
        <Text style={[styles.legalText, { color: theme.colors.textSecondary }]}>
          Payment will be charged to your App Store account. Purchases are non-refundable.
        </Text>
      </View>
    </SafeAreaView>
  );
}

function BenefitRow({ icon, text, color }: { icon: string; text: string; color: string }) {
  return (
    <View style={styles.benefitRow}>
      <Text style={styles.benefitIcon}>{icon}</Text>
      <Text style={[styles.benefitText, { color }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  closeButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    fontSize: 24,
    fontWeight: '300',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  premiumIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  crownEmoji: {
    fontSize: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
    textAlign: 'center',
  },
  benefitsList: {
    width: '100%',
    marginBottom: 32,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  benefitIcon: {
    fontSize: 24,
    marginRight: 16,
    width: 32,
  },
  benefitText: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  priceContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  price: {
    fontSize: 48,
    fontWeight: '900',
  },
  priceNote: {
    fontSize: 14,
  },
  errorText: {
    color: colors.error,
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
  purchaseButton: {
    width: '100%',
    marginBottom: 16,
  },
  loader: {
    marginVertical: 8,
  },
  restoreButton: {
    paddingVertical: 12,
  },
  restoreText: {
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  legalText: {
    fontSize: 10,
    textAlign: 'center',
    marginTop: 24,
    paddingHorizontal: 20,
  },
  alreadyPremium: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 24,
  },
});
