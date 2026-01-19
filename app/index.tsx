import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useUserStore } from '@/stores/userStore';
import { getThemeById } from '@/themes';
import { Button } from '@/components/Button';
import { colors } from '@/ui/colors';

export default function HomeScreen() {
  const router = useRouter();
  const { highScore, selectedTheme, isPremium } = useUserStore();
  const theme = getThemeById(selectedTheme);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { color: theme.colors.textPrimary }]}>
            STACK
          </Text>
          <Text style={[styles.titleAccent, { color: theme.colors.accent }]}>
            RUSH
          </Text>
        </View>

        {/* High Score */}
        <View style={styles.scoreContainer}>
          <Text style={[styles.scoreLabel, { color: theme.colors.textSecondary }]}>
            HIGH SCORE
          </Text>
          <Text style={[styles.scoreValue, { color: theme.colors.accent }]}>
            {highScore}
          </Text>
        </View>

        {/* Menu Buttons */}
        <View style={styles.menuContainer}>
          <Button
            title="PLAY"
            onPress={() => router.push('/game')}
            size="large"
            style={[styles.menuButton, { backgroundColor: theme.colors.accent }]}
            textStyle={{ color: theme.colors.background }}
          />

          <Button
            title="THEMES"
            onPress={() => router.push('/shop')}
            variant="outline"
            size="medium"
            style={[styles.menuButton, { borderColor: theme.colors.accent }]}
            textStyle={{ color: theme.colors.accent }}
          />

          {!isPremium && (
            <Button
              title="REMOVE ADS"
              onPress={() => router.push('/paywall')}
              variant="gold"
              size="medium"
              style={styles.menuButton}
            />
          )}

          <Button
            title="SETTINGS"
            onPress={() => router.push('/settings')}
            variant="outline"
            size="small"
            style={[styles.menuButton, { borderColor: theme.colors.textSecondary }]}
            textStyle={{ color: theme.colors.textSecondary }}
          />
        </View>

        {/* Premium Badge */}
        {isPremium && (
          <View style={styles.premiumBadge}>
            <Text style={styles.premiumText}>PREMIUM</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  titleContainer: {
    flexDirection: 'row',
    marginBottom: 40,
  },
  title: {
    fontSize: 48,
    fontWeight: '900',
    letterSpacing: 4,
  },
  titleAccent: {
    fontSize: 48,
    fontWeight: '900',
    letterSpacing: 4,
    marginLeft: 8,
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  scoreLabel: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 2,
    marginBottom: 4,
  },
  scoreValue: {
    fontSize: 56,
    fontWeight: '900',
  },
  menuContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 16,
  },
  menuButton: {
    width: 220,
  },
  premiumBadge: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: colors.gold,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  premiumText: {
    color: colors.background,
    fontSize: 12,
    fontWeight: '700',
  },
});
