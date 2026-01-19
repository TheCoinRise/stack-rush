import { View, Text, StyleSheet, Share } from 'react-native';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import { Button } from './Button';
import { colors } from '@/ui/colors';
import type { Theme } from '@/game/types';

interface GameOverModalProps {
  score: number;
  highScore: number;
  coinsEarned: number;
  isPremium: boolean;
  isNewHighScore: boolean;
  theme: Theme;
  onPlayAgain: () => void;
  onMenu: () => void;
}

export function GameOverModal({
  score,
  highScore,
  coinsEarned,
  isPremium,
  isNewHighScore,
  theme,
  onPlayAgain,
  onMenu,
}: GameOverModalProps) {
  const handleShare = async () => {
    try {
      await Share.share({
        message: `I scored ${score} in Stack Rush! 🏗️ Can you beat my score?`,
      });
    } catch (error) {
      // User cancelled or error
    }
  };

  return (
    <Animated.View
      entering={FadeIn.duration(200)}
      style={styles.overlay}
    >
      <Animated.View
        entering={SlideInDown.duration(300).springify()}
        style={styles.modal}
      >
        <Text style={[styles.title, { color: theme.colors.textPrimary }]}>
          GAME OVER
        </Text>

        {isNewHighScore && (
          <View style={styles.newHighScoreBadge}>
            <Text style={styles.newHighScoreText}>NEW HIGH SCORE!</Text>
          </View>
        )}

        <View style={styles.scoreSection}>
          <Text style={[styles.scoreLabel, { color: theme.colors.textSecondary }]}>
            FINAL SCORE
          </Text>
          <Text style={[styles.scoreValue, { color: theme.colors.accent }]}>
            {score}
          </Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: theme.colors.textPrimary }]}>
              {highScore}
            </Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
              Best
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.gold }]}>
              +{coinsEarned}
            </Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
              Coins
            </Text>
          </View>
        </View>

        {isPremium && (
          <Text style={[styles.premiumBonus, { color: colors.gold }]}>
            2x Premium Bonus Applied
          </Text>
        )}

        <View style={styles.buttons}>
          <Button
            title="PLAY AGAIN"
            onPress={onPlayAgain}
            size="large"
            style={[styles.button, { backgroundColor: theme.colors.accent }]}
            textStyle={{ color: theme.colors.background }}
          />

          <View style={styles.buttonRow}>
            <Button
              title="SHARE"
              onPress={handleShare}
              variant="outline"
              size="medium"
              style={[styles.halfButton, { borderColor: theme.colors.accent }]}
              textStyle={{ color: theme.colors.accent }}
            />
            <Button
              title="MENU"
              onPress={onMenu}
              variant="outline"
              size="medium"
              style={[styles.halfButton, { borderColor: theme.colors.textSecondary }]}
              textStyle={{ color: theme.colors.textSecondary }}
            />
          </View>
        </View>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  modal: {
    width: '100%',
    maxWidth: 320,
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    marginBottom: 12,
  },
  newHighScoreBadge: {
    backgroundColor: colors.gold,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginBottom: 20,
  },
  newHighScoreText: {
    color: colors.background,
    fontSize: 14,
    fontWeight: '700',
  },
  scoreSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  scoreLabel: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
  },
  scoreValue: {
    fontSize: 64,
    fontWeight: '900',
    lineHeight: 72,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 12,
    marginTop: 2,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  premiumBonus: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 24,
  },
  buttons: {
    width: '100%',
    gap: 12,
  },
  button: {
    width: '100%',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  halfButton: {
    flex: 1,
  },
});
