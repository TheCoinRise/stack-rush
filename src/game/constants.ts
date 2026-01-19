export const GAME_CONFIG = {
  // Block dimensions
  INITIAL_BLOCK_WIDTH: 200,
  BLOCK_HEIGHT: 30,

  // Movement
  INITIAL_SPEED: 4,
  SPEED_INCREMENT: 0.3,
  SPEED_INCREMENT_INTERVAL: 5, // Increase speed every N blocks
  MAX_SPEED: 12,

  // Scoring
  BASE_SCORE: 10,
  PERFECT_BONUS: 50,
  COMBO_MULTIPLIER: 1.5,

  // Perfect drop threshold (pixels)
  PERFECT_THRESHOLD: 4,

  // Coins
  COINS_PER_100_SCORE: 1,
  PREMIUM_COIN_MULTIPLIER: 2,

  // Game area
  GAME_WIDTH: 350,
  GAME_HEIGHT: 500,

  // Ads
  GAMES_BETWEEN_ADS: 3,
} as const;

export const ANIMATION_CONFIG = {
  DROP_DURATION: 200,
  FALL_DURATION: 400,
  COMBO_FLASH_DURATION: 300,
} as const;
