import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { useUserStore } from '@/stores/userStore';
import { getThemeById } from '@/themes';
import { colors } from '@/ui/colors';

function MenuButton({ href, title, style, textStyle }: {
  href: string;
  title: string;
  style?: any;
  textStyle?: any;
}) {
  return (
    <Link href={href as any} asChild>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          style,
          pressed && styles.buttonPressed,
        ]}
        accessibilityRole="button"
      >
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      </Pressable>
    </Link>
  );
}

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
          <MenuButton
            href="/game"
            title="PLAY"
            style={[styles.menuButton, styles.largeButton, { backgroundColor: theme.colors.accent }]}
            textStyle={[styles.largeText, { color: theme.colors.background }]}
          />

          <MenuButton
            href="/shop"
            title="THEMES"
            style={[styles.menuButton, styles.outlineButton, { borderColor: theme.colors.accent }]}
            textStyle={{ color: theme.colors.accent }}
          />

          {!isPremium && (
            <MenuButton
              href="/paywall"
              title="REMOVE ADS"
              style={[styles.menuButton, { backgroundColor: colors.gold }]}
              textStyle={{ color: colors.background }}
            />
          )}

          <MenuButton
            href="/settings"
            title="SETTINGS"
            style={[styles.menuButton, styles.outlineButton, styles.smallButton, { borderColor: theme.colors.textSecondary }]}
            textStyle={[styles.smallText, { color: theme.colors.textSecondary }]}
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
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    minHeight: 48,
    cursor: 'pointer' as any,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    fontWeight: '700',
    fontSize: 16,
  },
  menuButton: {
    width: 220,
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
