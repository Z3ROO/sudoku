import { parse } from 'path';
import { BoardGenerator } from './BoardGenerator'

export type BoardCel = {num:number|null, state: string, notes: number[]}
type UpdateCelBody = {num?:number|null, state?: string, notes?: number | number[]};

export class Sudoku {
  #originalBoard: BoardGenerator;
  board: BoardCel[][];
  difficulty: number;
  #history: BoardCel[][][];
  #forwardHistory: BoardCel[][][];
  timer: number;

  constructor (difficulty: number) {
    this.#originalBoard = new BoardGenerator();
    this.board = [];
    this.difficulty = difficulty;
    this.timer = 0;

    this.#history = [];
    this.#forwardHistory = [];

    this.#buildBoard(difficulty);
  }

  #buildBoard(difficulty: number): void {
    const board = this.#originalBoard.board.map(
      box => box.map(
        cel => {
          const percentage = Math.ceil(Math.random()*81) < 32 + difficulty*5
          //const percentage = Math.ceil(Math.random()*81) < 5

          return percentage ? { num: null, state: 'blank', notes: [] } : { num: cel, state: 'filled', notes: [] }
        })
    );

    this.board = board;
    this.#history = [board]
  }

  public updateCelValue(boxPos: number, celPos: number, celBody: UpdateCelBody = {}): void {
    if (this.board[boxPos][celPos].state === 'filled') return

    // map necessary for deep copy of array
    this.board = this.board.map((box, boxIndex)=> {
      if(boxIndex === boxPos) 
        return box.map((cel, celIndex) => {
          if (celIndex === celPos) 
            return this.#mountNewCelValue(celBody, cel);
          
          return cel
        })

      return box
    })

    this.#history.push(this.board);
  }

  #mountNewCelValue(newCel: UpdateCelBody, currentCel: BoardCel): BoardCel {
    let {num, state, notes} = newCel;

    const isWholeCelBodyUndefined = [num, state, notes].every(v => v === undefined);
    if (isWholeCelBodyUndefined)
      return {num: null, state: 'blank', notes: []} // function as delete
    
    if(newCel.num === currentCel.num)
      num = null;
    else
      num = num !== undefined ? num : currentCel.num

    if (typeof notes === 'number'){
      notes = currentCel.notes.includes(notes) ? currentCel.notes.filter(note => note !== notes) : currentCel.notes.concat(notes).sort();
      num = null;
    }
    else
      notes = []

    state = state !== undefined ? state : currentCel.state

    return {num, state, notes}
  }

  public undo(): void {
    console.log(this.#history)
    if (this.#history.length < 2) return

    this.board = this.#history[this.#history.length - 2];
    this.#forwardHistory.push(this.#history[this.#history.length - 1]);
    this.#history.pop();
  }

  public redo(): void {
    if (this.#forwardHistory.length < 1) return

    this.board = this.#forwardHistory[this.#forwardHistory.length - 1];
    this.#history.push(this.#forwardHistory[this.#forwardHistory.length - 1]);
    this.#forwardHistory.pop();
  }
  
  public conclusionChecking(boxPos: number, celPos: number): {completed: boolean, partialCompleted: (number|string)[][]} {
    const parsedBoard = this.board.map( box => box.map(cel => cel.num));
    const result:{completed: boolean, partialCompleted: (number|string)[][]} = {
      completed: true,
      partialCompleted: []
    }

    //horizontal
    for (let x = 0; x < 9; x+=3){ // boxCord
      for (let y = 0; y < 9; y+=3){ // celCord
        if (this.#isHorizontalLineCompleted(parsedBoard, x, y)) {
          if (this.#isNewHorizontalLineCompletion(boxPos, celPos, x, y))
            result.partialCompleted.push(['horizontal-line', x, y])
        }
        else
          result.completed = false;
      }
    }
    
    //vertical    
    for (let x = 0; x < 3; x++){
      for (let y = 0; y < 3; y++){
        if (this.#isVerticalLineCompleted(parsedBoard, x, y)) {
          if (this.#isNewVerticalLineCompletion(boxPos, celPos, x, y))
            result.partialCompleted.push(['vertical-line', x, y])
        }
        else
          result.completed = false
      }
    }

    //box
    parsedBoard.forEach( (box, boxIndex) => {
      if ([1,2,3,4,5,6,7,8,9].every( num => box.includes(num))) {
        if (boxIndex === boxPos)
          result.partialCompleted.push(['whole-box', boxPos])
        
        return
      }

      result.completed = false
    })
    
    return result;
  }

  
  #isHorizontalLineCompleted(parsedBoard: (number|null)[][], boxCord: number, celCord: number) {
    return [1,2,3,4,5,6,7,8,9].every(num => this.#mountHorizontalLine(parsedBoard, boxCord, celCord).includes(num))
  }
  #mountHorizontalLine(parsedBoard: (number|null)[][], boxCord: number, celCord: number) {
    return [
      ...parsedBoard[0+boxCord].slice(0+celCord,3+celCord), 
      ...parsedBoard[1+boxCord].slice(0+celCord,3+celCord), 
      ...parsedBoard[2+boxCord].slice(0+celCord,3+celCord)
    ];
  }
  #isNewHorizontalLineCompletion(boxPos: number, celPos: number, boxCord: number, celCord: number) {
    return [0+boxCord, 1+boxCord, 2+boxCord].includes(boxPos) && [0+celCord, 1+celCord, 2+celCord].includes(celPos)
  }

  #isVerticalLineCompleted(parsedBoard: (number|null)[][], boxCord: number, celCord: number) {
    return [1,2,3,4,5,6,7,8,9].every(num => this.#mountVerticalLine(parsedBoard, boxCord, celCord).includes(num));
  }

  #mountVerticalLine(parsedBoard: (number|null)[][], boxCord: number, celCord: number) {
    return [
      ...parsedBoard[0+boxCord].filter( (cel, celIndex) => [0+celCord,3+celCord,6+celCord].includes(celIndex)), 
      ...parsedBoard[3+boxCord].filter( (cel, celIndex) => [0+celCord,3+celCord,6+celCord].includes(celIndex)), 
      ...parsedBoard[6+boxCord].filter( (cel, celIndex) => [0+celCord,3+celCord,6+celCord].includes(celIndex))
    ]
  }

  #isNewVerticalLineCompletion(boxPos: number, celPos: number, boxCord: number, celCord: number) {
    return [0+boxCord, 3+boxCord, 6+boxCord].includes(boxPos) && [0+celCord, 3+celCord, 6+celCord].includes(celPos)
  }

}
