import { create } from 'zustand';
import type { Block, GameState } from '../game/types';
import { GAME_CONFIG } from '../game/constants';

interface GameStore extends GameState {
  // Actions
  startGame: (themeColors: string[]) => void;
  dropBlock: () => { isPerfect: boolean; overhang: number } | null;
  gameOver: () => void;
  reset: () => void;
  updateBlockPosition: (x: number) => void;
  tick: () => void;
}

const generateBlockId = () => Math.random().toString(36).substring(2, 9);

const createInitialBlock = (colors: string[]): Block => ({
  id: generateBlockId(),
  x: 0,
  y: 0,
  width: GAME_CONFIG.INITIAL_BLOCK_WIDTH,
  height: GAME_CONFIG.BLOCK_HEIGHT,
  color: colors[0] || '#4ecdc4',
});

const initialState: GameState = {
  blocks: [],
  currentBlock: null,
  score: 0,
  combo: 0,
  maxCombo: 0,
  isPlaying: false,
  isGameOver: false,
  currentSpeed: GAME_CONFIG.INITIAL_SPEED,
  direction: 1,
  coinsEarned: 0,
};

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,

  startGame: (themeColors) => {
    const firstBlock = createInitialBlock(themeColors);
    firstBlock.x = (GAME_CONFIG.GAME_WIDTH - firstBlock.width) / 2;

    const secondBlock: Block = {
      id: generateBlockId(),
      x: 0,
      y: GAME_CONFIG.BLOCK_HEIGHT,
      width: GAME_CONFIG.INITIAL_BLOCK_WIDTH,
      height: GAME_CONFIG.BLOCK_HEIGHT,
      color: themeColors[1 % themeColors.length] || '#4ecdc4',
    };

    set({
      blocks: [firstBlock],
      currentBlock: secondBlock,
      score: 0,
      combo: 0,
      maxCombo: 0,
      isPlaying: true,
      isGameOver: false,
      currentSpeed: GAME_CONFIG.INITIAL_SPEED,
      direction: 1,
      coinsEarned: 0,
    });
  },

  dropBlock: () => {
    const state = get();
    if (!state.currentBlock || !state.isPlaying || state.blocks.length === 0) {
      return null;
    }

    const current = state.currentBlock;
    const lastBlock = state.blocks[state.blocks.length - 1];

    // Calculate overlap
    const currentLeft = current.x;
    const currentRight = current.x + current.width;
    const lastLeft = lastBlock.x;
    const lastRight = lastBlock.x + lastBlock.width;

    const overlapLeft = Math.max(currentLeft, lastLeft);
    const overlapRight = Math.min(currentRight, lastRight);
    const overlapWidth = overlapRight - overlapLeft;

    // Check if missed completely
    if (overlapWidth <= 0) {
      get().gameOver();
      return null;
    }

    // Calculate overhang
    const overhang = current.width - overlapWidth;
    const isPerfect = overhang <= GAME_CONFIG.PERFECT_THRESHOLD;

    // Create the new stacked block
    const newBlock: Block = {
      id: current.id,
      x: overlapLeft,
      y: 0,
      width: isPerfect ? current.width : overlapWidth,
      height: GAME_CONFIG.BLOCK_HEIGHT,
      color: current.color,
    };

    // Calculate score
    const newCombo = isPerfect ? state.combo + 1 : 0;
    const comboMultiplier = Math.pow(GAME_CONFIG.COMBO_MULTIPLIER, Math.min(newCombo, 10));
    const basePoints = isPerfect
      ? GAME_CONFIG.BASE_SCORE + GAME_CONFIG.PERFECT_BONUS
      : GAME_CONFIG.BASE_SCORE;
    const pointsEarned = Math.floor(basePoints * comboMultiplier);
    const newScore = state.score + pointsEarned;

    // Calculate new speed
    const blocksPlaced = state.blocks.length + 1;
    const speedIncreases = Math.floor(blocksPlaced / GAME_CONFIG.SPEED_INCREMENT_INTERVAL);
    const newSpeed = Math.min(
      GAME_CONFIG.INITIAL_SPEED + speedIncreases * GAME_CONFIG.SPEED_INCREMENT,
      GAME_CONFIG.MAX_SPEED
    );

    // Get theme colors for next block
    const colors = state.blocks.map(b => b.color);
    const nextColorIndex = (state.blocks.length + 1) % (colors.length || 1);

    // Create next block
    const nextBlock: Block = {
      id: generateBlockId(),
      x: 0,
      y: GAME_CONFIG.BLOCK_HEIGHT,
      width: newBlock.width,
      height: GAME_CONFIG.BLOCK_HEIGHT,
      color: current.color, // Will be updated by theme
    };

    set({
      blocks: [...state.blocks, newBlock],
      currentBlock: nextBlock,
      score: newScore,
      combo: newCombo,
      maxCombo: Math.max(state.maxCombo, newCombo),
      currentSpeed: newSpeed,
      direction: 1,
      coinsEarned: Math.floor(newScore / 100) * GAME_CONFIG.COINS_PER_100_SCORE,
    });

    return { isPerfect, overhang };
  },

  gameOver: () => {
    set({
      isPlaying: false,
      isGameOver: true,
    });
  },

  reset: () => {
    set(initialState);
  },

  updateBlockPosition: (x) => {
    const state = get();
    if (!state.currentBlock) return;

    set({
      currentBlock: { ...state.currentBlock, x },
    });
  },

  tick: () => {
    const state = get();
    if (!state.isPlaying || !state.currentBlock) return;

    const current = state.currentBlock;
    let newX = current.x + state.currentSpeed * state.direction;
    let newDirection = state.direction;

    // Bounce off walls
    const maxX = GAME_CONFIG.GAME_WIDTH - current.width;
    if (newX >= maxX) {
      newX = maxX;
      newDirection = -1;
    } else if (newX <= 0) {
      newX = 0;
      newDirection = 1;
    }

    set({
      currentBlock: { ...current, x: newX },
      direction: newDirection,
    });
  },
}));
