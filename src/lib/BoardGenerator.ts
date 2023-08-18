export class BoardGenerator {
  public board: number[][];

  constructor () {
    this.board = new Array(9).fill([]);

    this.fillBoxes();

    for (let stage = 0; stage < 9; stage++) {
      this.#sortHorizontal(stage);
      this.#sortVertical(stage);
    }   
  }

  private fillBoxes(): void {
    this.board = this.board.map((_box, _index) => {
      let numbers = [1,2,3,4,5,6,7,8,9];
      const shuffledNumbers = [];

      while (shuffledNumbers.length < 9) {
        const random = Math.floor(Math.random() * numbers.length);
        shuffledNumbers.push(numbers[random])
        numbers = numbers.filter((_number, index) => index !== random);
      }

      return shuffledNumbers
    })
  }
  
  //  START SORTING  ==============================================
  #sortHorizontal(rowNumber: number): void {
    if ([2,5,8].includes(rowNumber)) return //rows sorted by consequence
    const [boxRowCord, celRowCord] = this.#getRowCord(rowNumber);

    let row = this.#mountRow(boxRowCord, celRowCord);
    this.#parallelHorizontalSorting(row, rowNumber, boxRowCord, celRowCord)
  }


  #parallelHorizontalSorting(row: number[], rowNumber: number, boxRowCord: number, celRowCord: number): void {
    let celOffset = 0;
    while (![1,2,3,4,5,6,7,8,9].every(num => row.includes(num))) {
      const box = this.#boxIndexBasedOnRows(boxRowCord, celOffset);

      let celBeingAnalysed = row[celOffset];
      let isolatedCels = row.filter((_cel, index) => celOffset !== index);

      if (isolatedCels.includes(celBeingAnalysed)) {
        this.#parallelSwap('row', box, celBeingAnalysed, rowNumber, isolatedCels);
        
        row = this.#mountRow(boxRowCord, celRowCord);

        celBeingAnalysed = row[celOffset];
        isolatedCels = row.filter((_cel, index) => celOffset !== index);
        
        if(isolatedCels.includes(celBeingAnalysed))
          celOffset = this.#findRepeatedNumberIndex(row, celOffset, celBeingAnalysed);
        else 
          celOffset++;

      }
      else
        celOffset++;
      
      if (![1,2,3,4,5,6,7,8,9].every(num => row.includes(num)) && celOffset === 9) 
        celOffset = 0;
    }
  }


  #sortVertical(columnNumber: number): void {
    if([2,5,8].includes(columnNumber)) return

    const [boxColCord, celColCord] = this.#getColCord(columnNumber);
    
    let column = this.#mountColumn(boxColCord, celColCord);
    this.#parallelVerticalSorting(column, columnNumber, boxColCord, celColCord);  
  }


  #parallelVerticalSorting(column: number[], columnNumber: number, boxColCord: number, celColCord: number): void {
    let celOffset = 0;
    while (![1,2,3,4,5,6,7,8,9].every(num => column.includes(num))) {
      const box = this.#boxIndexBasedOnColumns(boxColCord, celOffset);

      let celBeingAnalysed = column[celOffset];
      let isolatedNumbers = column.filter((_cel, index) => celOffset !== index);

      if (isolatedNumbers.includes(celBeingAnalysed)) {
        this.#parallelSwap('col', box, celBeingAnalysed, columnNumber, isolatedNumbers)

        column = this.#mountColumn(boxColCord, celColCord);
  
        celBeingAnalysed = column[celOffset];
        isolatedNumbers = column.filter((_cel, index) => celOffset !== index);

        if (isolatedNumbers.includes(celBeingAnalysed))
          celOffset = this.#findRepeatedNumberIndex(column, celOffset, celBeingAnalysed);
        else 
          celOffset++;
      }
      else
        celOffset++;
      
      if (![1,2,3,4,5,6,7,8,9].every(num => column.includes(num)) && celOffset === 9)
        celOffset = 0;
      
    }
  }
  
  #getRowCord(rowNumber: number): number[] {
    const result: number[] = [];

    if([0,1,2].includes(rowNumber))
      result.push(0);
    else if([3,4,5].includes(rowNumber))
      result.push(3);
    else if([6,7,8].includes(rowNumber))
      result.push(6);
    
    if([0,3,6].includes(rowNumber))
      result.push(0);
    else if([1,4,7].includes(rowNumber))
      result.push(3);
    else if([2,5,8].includes(rowNumber))
      result.push(6);

    return result;
  }

  #getColCord(columnNumber: number): number[] {
    const result: number[] = [];

    if ([0,1,2].includes(columnNumber))
      result.push(0)
    if ([3,4,5].includes(columnNumber))
      result.push(1)
    if ([6,7,8].includes(columnNumber))
      result.push(2)

    if ([0,3,6].includes(columnNumber))
      result.push(0)
    if ([1,4,7].includes(columnNumber))
      result.push(1)
    if ([2,5,8].includes(columnNumber))
      result.push(2)

    return result;
  }

  #mountRow(boxRowCord: number, celRowCord: number): number[] {
    return [
      ...this.board[boxRowCord].slice(celRowCord,celRowCord+3),
      ...this.board[boxRowCord+1].slice(celRowCord,celRowCord+3),
      ...this.board[boxRowCord+2].slice(celRowCord,celRowCord+3)
      ]
  }

  #mountColumn(boxColCord: number, celColCord: number): number[] {
    return [
      ...this.board[boxColCord].filter((_cel, index)=> [celColCord,celColCord+3,celColCord+6].includes(index)),
      ...this.board[boxColCord+3].filter((_cel, index)=> [celColCord,celColCord+3,celColCord+6].includes(index)),
      ...this.board[boxColCord+6].filter((_cel, index)=> [celColCord,celColCord+3,celColCord+6].includes(index))
    ]
  }

  #boxIndexBasedOnRows(boxRowCord: number, celOffset: number):number {
    let box = boxRowCord;
    if (celOffset>2) box = boxRowCord + 1;
    if (celOffset>5) box = boxRowCord + 2;

    return box;
  }

  #boxIndexBasedOnColumns(boxColCord: number, celOffset: number): number {
    let box = boxColCord;
    if (celOffset>2) box = boxColCord+3;
    if (celOffset>5) box = boxColCord+6;

    return box;
  }

  #findRepeatedNumberIndex(line: number[], targetIndex: number, targetValue: number):number {
    return line.findIndex((cel, index) => {
      if (index !== targetIndex && cel === targetValue)
        return true;
    })
  }

  //  SWAPS
  #parallelSwap(type: 'col'|'row', box: number, celBeingAnalysed: number, sortingStage: number, filteredLine: number[]): void {
    const celBeingAnalysedIndex = this.board[box].indexOf(celBeingAnalysed);
    let indexIncrement = 1;

    if (type === 'row')
      indexIncrement *= 3;

    const firstParallelCel = this.board[box][celBeingAnalysedIndex+indexIncrement];
    const secondParallelCel = this.board[box][celBeingAnalysedIndex+(indexIncrement*2)];

    if([0,3,6].includes(sortingStage) && filteredLine.includes(firstParallelCel))
      if (!filteredLine.includes(secondParallelCel))
        indexIncrement *= 2;
      else
        indexIncrement = Math.ceil(Math.random()*2) * indexIncrement

    const chosenNumber = this.board[box][celBeingAnalysedIndex+indexIncrement];
    this.#swapCelPosition(box, celBeingAnalysed, chosenNumber);
  }

  #swapCelPosition(box: number, originalNumber: number, tradeNumber: number): void {
    const originalNumberIndex = this.board[box].indexOf(originalNumber);
    const tradeNumberIndex = this.board[box].indexOf(tradeNumber);

    this.board[box][originalNumberIndex] = tradeNumber;
    this.board[box][tradeNumberIndex] = originalNumber;
  }
}