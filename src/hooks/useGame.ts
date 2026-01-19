import { useCallback, useRef, useEffect } from 'react';
import { useGameStore } from '@/stores/gameStore';
import { useUserStore } from '@/stores/userStore';
import { getThemeById } from '@/themes';
import * as Haptics from 'expo-haptics';

/**
 * Custom hook for managing game state and logic
 */
export function useGame() {
  const gameLoopRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const {
    blocks,
    currentBlock,
    score,
    combo,
    maxCombo,
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

  // Start the game loop
  const startGameLoop = useCallback(() => {
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
    }
    gameLoopRef.current = setInterval(() => {
      tick();
    }, 16); // ~60fps
  }, [tick]);

  // Stop the game loop
  const stopGameLoop = useCallback(() => {
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
      gameLoopRef.current = null;
    }
  }, []);

  // Initialize and start game
  const handleStartGame = useCallback(() => {
    startGame(theme.colors.blockColors);
    startGameLoop();
    if (hapticEnabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  }, [startGame, startGameLoop, theme.colors.blockColors, hapticEnabled]);

  // Handle tap to drop block
  const handleDrop = useCallback(() => {
    if (!isPlaying || isGameOver) return null;

    const result = dropBlock();
    if (result) {
      if (result.isPerfect && hapticEnabled) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } else if (hapticEnabled) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    }
    return result;
  }, [isPlaying, isGameOver, dropBlock, hapticEnabled]);

  // Handle game over
  const handleGameOver = useCallback(() => {
    stopGameLoop();
    setHighScore(score);
    addCoins(coinsEarned);
    incrementGamesPlayed();
    if (hapticEnabled) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  }, [stopGameLoop, setHighScore, addCoins, incrementGamesPlayed, score, coinsEarned, hapticEnabled]);

  // Reset game state
  const handleReset = useCallback(() => {
    stopGameLoop();
    reset();
  }, [stopGameLoop, reset]);

  // Auto-trigger game over handling
  useEffect(() => {
    if (isGameOver) {
      handleGameOver();
    }
  }, [isGameOver, handleGameOver]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopGameLoop();
    };
  }, [stopGameLoop]);

  return {
    // State
    blocks,
    currentBlock,
    score,
    combo,
    maxCombo,
    isPlaying,
    isGameOver,
    coinsEarned,
    highScore,
    theme,
    isPremium,

    // Actions
    startGame: handleStartGame,
    drop: handleDrop,
    reset: handleReset,

    // Derived
    isNewHighScore: score > highScore && highScore > 0,
    towerHeight: blocks.length,
  };
}
