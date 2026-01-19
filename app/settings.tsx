import { View, Text, StyleSheet, Pressable, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useUserStore } from '@/stores/userStore';
import { getThemeById } from '@/themes';
import { Button } from '@/components/Button';
import { colors } from '@/ui/colors';

export default function SettingsScreen() {
  const router = useRouter();
  const {
    selectedTheme,
    soundEnabled,
    hapticEnabled,
    isPremium,
    gamesPlayed,
    highScore,
    totalCoins,
    toggleSound,
    toggleHaptic,
    reset,
  } = useUserStore();

  const theme = getThemeById(selectedTheme);

  const handleToggleSound = () => {
    if (hapticEnabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    toggleSound();
  };

  const handleToggleHaptic = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    toggleHaptic();
  };

  const handleReset = () => {
    if (hapticEnabled) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    }
    reset();
    router.back();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.textPrimary }]}>
          Settings
        </Text>
        <Pressable
          onPress={() => router.back()}
          style={styles.closeButton}
          accessibilityLabel="Close settings"
          accessibilityRole="button"
        >
          <Text style={[styles.closeText, { color: theme.colors.textSecondary }]}>
            ✕
          </Text>
        </Pressable>
      </View>

      <View style={styles.content}>
        {/* Toggle Settings */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.textSecondary }]}>
            PREFERENCES
          </Text>

          <View style={[styles.settingRow, { borderBottomColor: theme.colors.textSecondary }]}>
            <Text style={[styles.settingLabel, { color: theme.colors.textPrimary }]}>
              Sound Effects
            </Text>
            <Switch
              value={soundEnabled}
              onValueChange={handleToggleSound}
              trackColor={{ false: colors.textMuted, true: theme.colors.accent }}
              thumbColor={colors.textPrimary}
            />
          </View>

          <View style={[styles.settingRow, { borderBottomColor: theme.colors.textSecondary }]}>
            <Text style={[styles.settingLabel, { color: theme.colors.textPrimary }]}>
              Haptic Feedback
            </Text>
            <Switch
              value={hapticEnabled}
              onValueChange={handleToggleHaptic}
              trackColor={{ false: colors.textMuted, true: theme.colors.accent }}
              thumbColor={colors.textPrimary}
            />
          </View>
        </View>

        {/* Stats */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.textSecondary }]}>
            STATISTICS
          </Text>

          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: theme.colors.accent }]}>
                {highScore}
              </Text>
              <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
                High Score
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: theme.colors.accent }]}>
                {gamesPlayed}
              </Text>
              <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
                Games Played
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: theme.colors.accent }]}>
                {totalCoins}
              </Text>
              <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
                Total Coins
              </Text>
            </View>
          </View>
        </View>

        {/* Account Status */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.textSecondary }]}>
            ACCOUNT
          </Text>
          <View style={[styles.accountBadge, isPremium && styles.premiumAccountBadge]}>
            <Text style={[styles.accountText, isPremium && styles.premiumAccountText]}>
              {isPremium ? 'PREMIUM MEMBER' : 'FREE ACCOUNT'}
            </Text>
          </View>
          {!isPremium && (
            <Button
              title="Upgrade to Premium"
              onPress={() => {
                router.back();
                setTimeout(() => router.push('/paywall'), 100);
              }}
              variant="gold"
              size="medium"
              style={styles.upgradeButton}
            />
          )}
        </View>

        {/* Reset */}
        <View style={styles.section}>
          <Button
            title="Reset All Progress"
            onPress={handleReset}
            variant="secondary"
            size="small"
          />
          <Text style={[styles.resetWarning, { color: theme.colors.textSecondary }]}>
            This will erase all scores, coins, and unlocks
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  closeButton: {
    position: 'absolute',
    right: 20,
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
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 12,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  accountBadge: {
    backgroundColor: colors.surface,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  premiumAccountBadge: {
    backgroundColor: colors.gold,
  },
  accountText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  premiumAccountText: {
    color: colors.background,
  },
  upgradeButton: {
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  resetWarning: {
    fontSize: 12,
    marginTop: 8,
    textAlign: 'center',
  },
});
