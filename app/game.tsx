import { useEffect, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions, Animated, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useGameStore } from '@/stores/gameStore';
import { useUserStore } from '@/stores/userStore';
import { getThemeById } from '@/themes';
import { GAME_CONFIG } from '@/game/constants';
import { Button } from '@/components/Button';
import { colors } from '@/ui/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Safe haptics wrapper for web
const safeHaptics = {
  impact: async (style: Haptics.ImpactFeedbackStyle) => {
    if (Platform.OS !== 'web') {
      await Haptics.impactAsync(style);
    }
  },
  notification: async (type: Haptics.NotificationFeedbackType) => {
    if (Platform.OS !== 'web') {
      await Haptics.notificationAsync(type);
    }
  },
};
const GAME_AREA_WIDTH = Math.min(SCREEN_WIDTH - 40, GAME_CONFIG.GAME_WIDTH);
const SCALE = GAME_AREA_WIDTH / GAME_CONFIG.GAME_WIDTH;

export default function GameScreen() {
  const router = useRouter();
  const gameLoopRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Animation refs
  const comboScale = useRef(new Animated.Value(1)).current;
  const flashOpacity = useRef(new Animated.Value(0)).current;

  const {
    blocks,
    currentBlock,
    score,
    combo,
    isPlaying,
    isGameOver,
    coinsEarned,
    startGame,
    dropBlock,
    tick,
    reset,
  } = useGameStore();

  const {
    selectedTheme,
    highScore,
    hapticEnabled,
    isPremium,
    setHighScore,
    addCoins,
    incrementGamesPlayed,
  } = useUserStore();

  const theme = getThemeById(selectedTheme);

  // Start game loop
  const startGameLoop = useCallback(() => {
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
    }
    gameLoopRef.current = setInterval(() => {
      tick();
    }, 16);
  }, [tick]);

  // Stop game loop
  const stopGameLoop = useCallback(() => {
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
      gameLoopRef.current = null;
    }
  }, []);

  // Handle game start
  const handleStartGame = useCallback(() => {
    startGame(theme.colors.blockColors);
    startGameLoop();
    if (hapticEnabled) {
      safeHaptics.impact(Haptics.ImpactFeedbackStyle.Medium);
    }
  }, [startGame, startGameLoop, theme.colors.blockColors, hapticEnabled]);

  // Handle tap to drop
  const handleTap = useCallback(() => {
    if (!isPlaying || isGameOver) return;

    const result = dropBlock();
    if (result) {
      if (result.isPerfect) {
        if (hapticEnabled) {
          safeHaptics.notification(Haptics.NotificationFeedbackType.Success);
        }
        // Combo animation
        Animated.sequence([
          Animated.timing(comboScale, { toValue: 1.3, duration: 100, useNativeDriver: Platform.OS !== 'web' }),
          Animated.timing(comboScale, { toValue: 1, duration: 150, useNativeDriver: Platform.OS !== 'web' }),
        ]).start();
        // Flash animation
        Animated.sequence([
          Animated.timing(flashOpacity, { toValue: 0.5, duration: 50, useNativeDriver: Platform.OS !== 'web' }),
          Animated.timing(flashOpacity, { toValue: 0, duration: 200, useNativeDriver: Platform.OS !== 'web' }),
        ]).start();
      } else {
        if (hapticEnabled) {
          safeHaptics.impact(Haptics.ImpactFeedbackStyle.Light);
        }
      }
    }
  }, [isPlaying, isGameOver, dropBlock, hapticEnabled, comboScale, flashOpacity]);

  // Handle game over
  useEffect(() => {
    if (isGameOver) {
      stopGameLoop();
      setHighScore(score);
      addCoins(coinsEarned);
      incrementGamesPlayed();
      if (hapticEnabled) {
        safeHaptics.notification(Haptics.NotificationFeedbackType.Error);
      }
    }
  }, [isGameOver, stopGameLoop, setHighScore, addCoins, incrementGamesPlayed, score, coinsEarned, hapticEnabled]);

  // Keyboard support for web
  useEffect(() => {
    if (Platform.OS !== 'web') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        if (!isPlaying && !isGameOver) {
          handleStartGame();
        } else if (isPlaying && !isGameOver) {
          handleTap();
        } else if (isGameOver) {
          handleStartGame();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, isGameOver, handleStartGame, handleTap]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopGameLoop();
      reset();
    };
  }, [stopGameLoop, reset]);

  const isNewHighScore = score > highScore && highScore > 0;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          onPress={() => {
            stopGameLoop();
            reset();
            router.back();
          }}
          style={styles.backButton}
          accessibilityLabel="Back to menu"
          accessibilityRole="button"
        >
          <Text style={[styles.backText, { color: theme.colors.textSecondary }]}>
            ←
          </Text>
        </Pressable>

        <View style={styles.scoreHeader}>
          <Text style={[styles.scoreLabel, { color: theme.colors.textSecondary }]}>
            SCORE
          </Text>
          <Text style={[styles.scoreValue, { color: theme.colors.textPrimary }]}>
            {score}
          </Text>
        </View>

        <View style={styles.comboContainer}>
          {combo > 0 && (
            <Animated.View style={[styles.comboBadge, { transform: [{ scale: comboScale }] }]}>
              <Text style={[styles.comboText, { color: theme.colors.accent }]}>
                {combo}x COMBO
              </Text>
            </Animated.View>
          )}
        </View>
      </View>

      {/* Game Area */}
      <Pressable
        style={styles.gameAreaWrapper}
        onPress={handleTap}
        disabled={!isPlaying || isGameOver}
      >
        <View style={[styles.gameArea, { width: GAME_AREA_WIDTH }]}>
          {/* Perfect Flash Overlay */}
          <Animated.View
            style={[
              styles.perfectFlash,
              { backgroundColor: theme.colors.accent, opacity: flashOpacity },
            ]}
            pointerEvents="none"
          />

          {/* Stacked Blocks */}
          {blocks.map((block, index) => (
            <View
              key={block.id}
              style={[
                styles.block,
                {
                  left: block.x * SCALE,
                  bottom: index * GAME_CONFIG.BLOCK_HEIGHT * SCALE,
                  width: block.width * SCALE,
                  height: GAME_CONFIG.BLOCK_HEIGHT * SCALE - 2,
                  backgroundColor: theme.colors.blockColors[index % theme.colors.blockColors.length],
                },
              ]}
            />
          ))}

          {/* Current Moving Block */}
          {currentBlock && isPlaying && (
            <View
              style={[
                styles.block,
                styles.currentBlock,
                {
                  left: currentBlock.x * SCALE,
                  bottom: blocks.length * GAME_CONFIG.BLOCK_HEIGHT * SCALE,
                  width: currentBlock.width * SCALE,
                  height: GAME_CONFIG.BLOCK_HEIGHT * SCALE - 2,
                  backgroundColor: theme.colors.blockColors[blocks.length % theme.colors.blockColors.length],
                },
              ]}
            />
          )}

          {/* Start Prompt */}
          {!isPlaying && !isGameOver && (
            <View style={styles.startPrompt}>
              <Text style={[styles.promptTitle, { color: theme.colors.textPrimary }]}>
                TAP TO START
              </Text>
              <Pressable
                onPress={handleStartGame}
                style={[styles.startButton, { backgroundColor: theme.colors.accent }]}
                accessibilityLabel="Start game"
                accessibilityRole="button"
              >
                <Text style={[styles.startButtonText, { color: theme.colors.background }]}>
                  PLAY
                </Text>
              </Pressable>
            </View>
          )}

          {/* Game Over */}
          {isGameOver && (
            <View style={styles.gameOverContainer}>
              <Text style={[styles.gameOverTitle, { color: theme.colors.textPrimary }]}>
                GAME OVER
              </Text>

              {isNewHighScore && (
                <Text style={[styles.newHighScore, { color: theme.colors.accent }]}>
                  NEW HIGH SCORE!
                </Text>
              )}

              <View style={styles.finalScoreContainer}>
                <Text style={[styles.finalScoreLabel, { color: theme.colors.textSecondary }]}>
                  FINAL SCORE
                </Text>
                <Text style={[styles.finalScoreValue, { color: theme.colors.accent }]}>
                  {score}
                </Text>
              </View>

              <View style={styles.coinsEarnedContainer}>
                <Text style={[styles.coinsEarned, { color: colors.gold }]}>
                  +{coinsEarned}
                </Text>
                {isPremium && (
                  <Text style={[styles.premiumBonus, { color: colors.gold }]}>
                    (2x Premium)
                  </Text>
                )}
              </View>

              <View style={styles.gameOverButtons}>
                <Button
                  title="PLAY AGAIN"
                  onPress={handleStartGame}
                  size="large"
                  style={{ backgroundColor: theme.colors.accent, marginBottom: 12 }}
                  textStyle={{ color: theme.colors.background }}
                />
                <Button
                  title="MENU"
                  onPress={() => {
                    reset();
                    router.back();
                  }}
                  variant="outline"
                  size="medium"
                  style={{ borderColor: theme.colors.textSecondary }}
                  textStyle={{ color: theme.colors.textSecondary }}
                />
              </View>
            </View>
          )}
        </View>
      </Pressable>

      {/* Tap Instruction */}
      {isPlaying && !isGameOver && (
        <Text style={[styles.tapInstruction, { color: theme.colors.textSecondary }]}>
          {Platform.OS === 'web' ? 'PRESS SPACE OR CLICK TO DROP' : 'TAP TO DROP'}
        </Text>
      )}

      {/* High Score Display */}
      <View style={styles.highScoreContainer}>
        <Text style={[styles.highScoreLabel, { color: theme.colors.textSecondary }]}>
          BEST: {Math.max(highScore, score)}
        </Text>
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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: {
    fontSize: 28,
    fontWeight: '300',
  },
  scoreHeader: {
    alignItems: 'center',
  },
  scoreLabel: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1,
  },
  scoreValue: {
    fontSize: 32,
    fontWeight: '900',
  },
  comboContainer: {
    width: 80,
    alignItems: 'flex-end',
  },
  comboBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  comboText: {
    fontSize: 12,
    fontWeight: '700',
  },
  gameAreaWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameArea: {
    height: GAME_CONFIG.GAME_HEIGHT * SCALE,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  perfectFlash: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
  },
  block: {
    position: 'absolute',
    borderRadius: 4,
  },
  currentBlock: {
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  startPrompt: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  promptTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 24,
  },
  startButton: {
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 12,
  },
  startButtonText: {
    fontSize: 20,
    fontWeight: '700',
  },
  gameOverContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 20,
  },
  gameOverTitle: {
    fontSize: 36,
    fontWeight: '900',
    marginBottom: 8,
  },
  newHighScore: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  finalScoreContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  finalScoreLabel: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
  },
  finalScoreValue: {
    fontSize: 56,
    fontWeight: '900',
  },
  coinsEarnedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  coinsEarned: {
    fontSize: 20,
    fontWeight: '700',
  },
  premiumBonus: {
    fontSize: 14,
    marginLeft: 8,
  },
  gameOverButtons: {
    alignItems: 'center',
  },
  tapInstruction: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 2,
    marginTop: 16,
  },
  highScoreContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  highScoreLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
});
