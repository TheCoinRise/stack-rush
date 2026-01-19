export interface Block {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

export interface GameState {
  blocks: Block[];
  currentBlock: Block | null;
  score: number;
  combo: number;
  maxCombo: number;
  isPlaying: boolean;
  isGameOver: boolean;
  currentSpeed: number;
  direction: 1 | -1;
  coinsEarned: number;
}

export interface Theme {
  id: string;
  name: string;
  price: number;
  isPremium: boolean;
  colors: {
    background: string;
    blockColors: string[];
    textPrimary: string;
    textSecondary: string;
    accent: string;
  };
}

export interface UserProgress {
  highScore: number;
  totalCoins: number;
  unlockedThemes: string[];
  selectedTheme: string;
  gamesPlayed: number;
  isPremium: boolean;
  soundEnabled: boolean;
  hapticEnabled: boolean;
  lastDailyChallenge: string | null;
}
