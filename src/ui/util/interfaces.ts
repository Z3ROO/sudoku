import { BoardCel, Sudoku } from "../../lib/Sudoku";

export type GameState = 'in-game' | 'paused' | 'quit' | 'won' | 'init'

export type Controller = {
  gameState: GameState;
  startGame(difficulty: number): void;
  board: BoardCel[][] | null;
  focusCel(cord: number[]): void;
  focusedCel: number[] | null;
  chooseNumber(number: number): void;
  deleteNumber(): void;
  undo(): void;
  goBack(): void;
  notesMode: boolean;
  setNotesMode: React.Dispatch<React.SetStateAction<boolean>>;
  animationCordinates: number[][] | null
  restartGame(): void;
  quitGame(): void;
  resetAnimationCords(): void;
  inGameTimer: number;
  updateTimer(): void;
  pauseGame(): void;
}

export interface DefaultProps {
  controller: Controller
}
