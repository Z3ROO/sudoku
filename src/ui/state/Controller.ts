import { useRef, useState } from "react";
import { BoardCel, Sudoku } from "../../lib/Sudoku";
import { parsePartialConclusionCordinates } from "../util/animationCordsGenerator";
import { GameState } from "../util/interfaces";

type NewCelBody = {notes?: number, num?: number, state: string}

export function Controller() {
  const [gameState, setGameState] = useState<GameState>('init');  // Keeps track of the current state of the game
  const sudoku = useRef<Sudoku | null>();  // Keeps track of the current playable board of the game
  const [board, setBoard] = useState<BoardCel[][] | null>(null);  // Keeps track of the current board state
  const [focusedCel, setFocusedCel] = useState<number[]|null>(null);  // Keeps track of the cel clicked/focused
  const [notesMode, setNotesMode] = useState<boolean>(false);  // Keeps track if in notes mode or not
  const [animationCordinates, setAnimationCordinates] = useState<number[][] | null>(null);
  const [inGameTimer, setInGameTimer] = useState<number>(0);

  /*public*/function startGame(difficulty: number): void {
    sudoku.current = new Sudoku(difficulty);
    setGameState('in-game');
    setBoard(sudoku.current.board);
  }

  function updateTimer() {

    setInGameTimer(Date.now() - sudoku.current!.startTime || 0);
  }

  /*public*/function pauseGame(): void {
    if (gameState === 'paused') {
      setGameState('in-game');
      sudoku.current!.startTime += (Date.now() - sudoku.current!.startTime)-inGameTimer;
    }
    else
      setGameState('paused')
  }

  /*public*/function focusCel(cord: number[]): void {
    setFocusedCel(cord);
  }

  /*public*/function chooseNumber(number: number): void {
    updateBoardCel(number);
    mountCordsForPartialConclusionsAnimation();    
  }

  /*private*/function updateBoardCel(number: number): void {
    if (!board || !focusedCel || !sudoku.current) throw new Error("No board or not focused cel to fill");

    const [boxPos, celPos] = focusedCel;

    let newCelBody:NewCelBody = mountNewCelBody(number);
    sudoku.current.updateCelValue(boxPos-1, celPos-1, newCelBody);
    setBoard(sudoku.current.board);
  }
  
  /*private*/function mountNewCelBody(number: number): NewCelBody {
    if (notesMode)
      return {notes: number, state: 'notes'};
    
    return {num: number, state: 'guess'};
  }

  /*public*/function deleteNumber(): void {
    if (!board || !focusedCel || !sudoku.current) return;

    const [boxPos, celPos] = focusedCel;

    sudoku.current.updateCelValue(boxPos-1, celPos-1);

    setBoard(sudoku.current.board);
  }

  /*public*/function undo(): void {
    if (!sudoku.current) return

    sudoku.current.undo();
    
    setBoard(sudoku.current.board);
  }

  /*public*/function goBack(): void {
    if (!sudoku.current) return

    sudoku.current.redo();

    setBoard(sudoku.current.board);
  }
  
  /*private*/function mountCordsForPartialConclusionsAnimation(): void {
    if (!focusedCel || !sudoku.current) throw new Error("No board or not focused cel to fill");

    const [boxPos, celPos] = focusedCel;

    const partialConclusionCords = sudoku.current.conclusionChecking(boxPos-1, celPos-1).partialCompleted;

    if (partialConclusionCords.length > 0) {
      let parsedCordinates: number[][] = parsePartialConclusionCordinates(partialConclusionCords, boxPos, celPos);
      setAnimationCordinates(parsedCordinates);
    }
  }

  /*public*/function resetAnimationCords(): void {
    if (!sudoku.current || !focusedCel) return

    const [boxCord, celCord] = focusedCel;

    setAnimationCordinates(null);
    
    if (sudoku.current.conclusionChecking(boxCord, celCord).completed)
      finishGame()
  }

  /*private*/function finishGame():void {
    if (!sudoku.current) throw new Error('Sudoku object not found');

    setGameState('won');
  }

  /*public*/function quitGame():void {
    if (gameState === 'quit')
      setGameState('in-game')
    else
      setGameState('quit')
  }

  /*public*/function restartGame(): void {
    setGameState('init');
    setBoard(null);  // Keeps track of the current playable board of the game
    setFocusedCel(null);  // Keeps track of the cel clicked/focused
    setNotesMode(false);
    setInGameTimer(0);
  }

  return {
    //states
    gameState, 
    board,
    focusedCel,
    notesMode, 
    animationCordinates, 
    inGameTimer, 
    
    //methods
    startGame,
    pauseGame,
    focusCel, 
    chooseNumber, 
    deleteNumber, 
    undo, 
    goBack, 
    setNotesMode,
    quitGame,
    restartGame, 
    resetAnimationCords, 
    updateTimer
  }
}