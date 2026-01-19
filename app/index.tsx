import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinkButton } from '@/components/LinkButton';
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
          <LinkButton
            href="/game"
            title="PLAY"
            style={{
              width: 220,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 12,
              paddingVertical: 18,
              paddingHorizontal: 24,
              minHeight: 56,
              backgroundColor: theme.colors.accent,
            }}
            textStyle={{
              fontWeight: '700',
              fontSize: 18,
              color: theme.colors.background,
            }}
          />

          <LinkButton
            href="/shop"
            title="THEMES"
            style={{
              width: 220,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 12,
              paddingVertical: 14,
              paddingHorizontal: 24,
              minHeight: 48,
              backgroundColor: 'transparent',
              borderWidth: 2,
              borderColor: theme.colors.accent,
              borderStyle: 'solid',
            }}
            textStyle={{
              fontWeight: '700',
              fontSize: 16,
              color: theme.colors.accent,
            }}
          />

          {!isPremium && (
            <LinkButton
              href="/paywall"
              title="REMOVE ADS"
              style={{
                width: 220,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 12,
                paddingVertical: 14,
                paddingHorizontal: 24,
                minHeight: 48,
                backgroundColor: colors.gold,
              }}
              textStyle={{
                fontWeight: '700',
                fontSize: 16,
                color: colors.background,
              }}
            />
          )}

          <LinkButton
            href="/settings"
            title="SETTINGS"
            style={{
              width: 220,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 12,
              paddingVertical: 8,
              paddingHorizontal: 24,
              minHeight: 36,
              backgroundColor: 'transparent',
              borderWidth: 2,
              borderColor: theme.colors.textSecondary,
              borderStyle: 'solid',
            }}
            textStyle={{
              fontWeight: '700',
              fontSize: 14,
              color: theme.colors.textSecondary,
            }}
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
