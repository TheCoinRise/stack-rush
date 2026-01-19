import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { useUserStore } from '@/stores/userStore';
import { getThemeById } from '@/themes';
import { colors } from '@/ui/colors';

export default function HomeScreen() {
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
          <Link href="/game" asChild>
            <Pressable style={[styles.button, styles.largeButton, { backgroundColor: theme.colors.accent }]}>
              <Text style={[styles.buttonText, styles.largeText, { color: theme.colors.background }]}>PLAY</Text>
            </Pressable>
          </Link>

          <Link href="/shop" asChild>
            <Pressable style={[styles.button, styles.outlineButton, { borderColor: theme.colors.accent }]}>
              <Text style={[styles.buttonText, { color: theme.colors.accent }]}>THEMES</Text>
            </Pressable>
          </Link>

          {!isPremium && (
            <Link href="/paywall" asChild>
              <Pressable style={[styles.button, { backgroundColor: colors.gold }]}>
                <Text style={[styles.buttonText, { color: colors.background }]}>REMOVE ADS</Text>
              </Pressable>
            </Link>
          )}

          <Link href="/settings" asChild>
            <Pressable style={[styles.button, styles.outlineButton, styles.smallButton, { borderColor: theme.colors.textSecondary }]}>
              <Text style={[styles.buttonText, styles.smallText, { color: theme.colors.textSecondary }]}>SETTINGS</Text>
            </Pressable>
          </Link>
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
  button: {
    width: 220,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    minHeight: 48,
  },
  buttonText: {
    fontWeight: '700',
    fontSize: 16,
  },
  largeButton: {
    paddingVertical: 18,
    minHeight: 56,
  },
  largeText: {
    fontSize: 18,
  },
  smallButton: {
    paddingVertical: 8,
    minHeight: 36,
  },
  smallText: {
    fontSize: 14,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
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
