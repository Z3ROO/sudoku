export class Board {
  private board: number[][];
  public finalBoard: number[][] = [];

  constructor () {
    this.board = new Array(9).fill([]);

    this.createBoard()
    this.finalBoard = this.board
  }

  private createBoard(): void {
    this.fillBoardCels();

    for (let i = 0; i < 9; i++) {
      this.#sortHorizontal(i)
      this.#sortVertical(i)
    }    
  }

  private fillBoardCels(): void {
    this.board = this.board.map((box, index) => {
      let numbers = [1,2,3,4,5,6,7,8,9];
      const shuffledNumbers = [];

      while (shuffledNumbers.length < 9) {
        const random = Math.floor(Math.random() * numbers.length);
        shuffledNumbers.push(numbers[random])
        numbers = numbers.filter((number, index) => index !== random);
      }

      return shuffledNumbers
    })
  }
  
  //  START SORTING  ==============================================
  #sortHorizontal(rowNumber: number): void {
    if ([2,5,8].includes(rowNumber)) return //rows sorted by consequence
    const [boxRowCord, celRowCord] = this.#getRowCord(rowNumber);
    
    for (let celOffset = rowNumber; celOffset < 9; celOffset++) {
      this.#basicHorizontalSorting(rowNumber, boxRowCord, celRowCord, celOffset);      
    }

    let row = this.#mountRow(boxRowCord, celRowCord);
    this.#parallelHorizontalSorting(row, rowNumber, boxRowCord, celRowCord)
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

  #mountRow(boxRowCord: number, celRowCord: number): number[] {
    return [
      ...this.board[boxRowCord].slice(celRowCord,celRowCord+3),
      ...this.board[boxRowCord+1].slice(celRowCord,celRowCord+3),
      ...this.board[boxRowCord+2].slice(celRowCord,celRowCord+3)
      ]
  }

  #basicHorizontalSorting(rowNumber: number,boxRowCord: number, celRowCord: number, celOffset: number):void {
    const row = this.#mountRow(boxRowCord, celRowCord);
    const celBeingAnalysed = row[celOffset];
    const isolatedCels = row.slice(0, celOffset);

    if (isolatedCels.includes(celBeingAnalysed)) {
      const box = this.#rowBasedBox(boxRowCord, celOffset)

      let tradeNumber = this.#chooseTradeNumberForBasicHorizontalSorting(rowNumber, celOffset, isolatedCels, box);
          
      if(tradeNumber === undefined)
        this.#backwardsBasicHorizontalSorting(row, boxRowCord, rowNumber, celBeingAnalysed);
      else
        this.#swapCelPosition(box, celBeingAnalysed, tradeNumber);
    }
  }

  #rowBasedBox(boxRowCord: number, celOffset: number):number {
    let box = boxRowCord;
    if (celOffset>2) box = boxRowCord + 1;
    if (celOffset>5) box = boxRowCord + 2;

    return box;
  }

  #backwardsBasicHorizontalSorting(row: number[], boxRowCord: number, rowNumber: number, celBeingAnalysed: number):void {
    const celBeingAnalysedFirstAppearanceIndex = row.indexOf(celBeingAnalysed);
    if (celBeingAnalysedFirstAppearanceIndex >= rowNumber){
      const isolatedCels = row.slice(celBeingAnalysedFirstAppearanceIndex+1, 9);
      
      const box = this.#rowBasedBox(boxRowCord, celBeingAnalysedFirstAppearanceIndex);

      const tradeNumber = this.#chooseTradeNumberForBasicHorizontalSorting(rowNumber, celBeingAnalysedFirstAppearanceIndex, isolatedCels, box)
      if(tradeNumber === undefined)
        return
      else
        this.#swapCelPosition(box, celBeingAnalysed, tradeNumber);
    }
  }

  #chooseTradeNumberForBasicHorizontalSorting(rowNumber: number, celOffset: number, isolatedCels:number[], box: number): number|undefined {
    let tradeNumber: number | undefined;

    if ([0,3,6].includes(rowNumber)) // all first rows
      tradeNumber = this.board[box].slice(3,9).find( number => !isolatedCels.includes(number))
    if ([1,4,7].includes(rowNumber)) // all second rows
      if (celOffset === rowNumber || celOffset === rowNumber+1)
        tradeNumber = this.board[box].slice(7,9).find( number => !isolatedCels.includes(number))
      else
        tradeNumber = this.board[box].slice(6,9).find( number => !isolatedCels.includes(number))
    // all third rows are sorted by consequence
    return tradeNumber
  }

  #parallelHorizontalSorting(row: number[], rowNumber: number, boxRowCord: number, celRowCord: number): void {
    let celOffset = 0;
    while (![1,2,3,4,5,6,7,8,9].every(num => row.includes(num))) {
      const box = this.#rowBasedBox(boxRowCord, celOffset);

      let celBeingAnalysed = row[celOffset];
      let isolatedCels = row.filter((cel, index) => celOffset !== index);

      if (isolatedCels.includes(celBeingAnalysed)) {
        this.#swapHorizontalCelPosition(box, celBeingAnalysed, rowNumber, isolatedCels);
        
        row = this.#mountRow(boxRowCord, celRowCord);

        celBeingAnalysed = row[celOffset];
        isolatedCels = row.filter((cel, index) => celOffset !== index);
        
        if(isolatedCels.includes(celBeingAnalysed))
          celOffset = this.#repetitionOfTradedNumberIndex(row, celOffset, celBeingAnalysed);
        else 
          celOffset++

      }
      else
        celOffset++
      
      if (![1,2,3,4,5,6,7,8,9].every(num => row.includes(num)) && celOffset === 9) 
        celOffset = 0;
    }
  }

  #repetitionOfTradedNumberIndex(line: number[], celOffset: number, celBeingAnalysed: number):number {
    return line.findIndex((cel, index) => {
      if (index !== celOffset && cel === celBeingAnalysed) {
        return true
      }
    })
  }

  #sortVertical(columnNumber: number): void {
    if([2,5,8].includes(columnNumber)) return

    const [boxColCord, celColCord] = this.#getColCord(columnNumber);

    for(let celOffset = columnNumber; celOffset < 9; celOffset++){
      this.#basicVerticalSorting(columnNumber, boxColCord, celColCord, celOffset);
    }
    
    let column = this.#mountColumn(boxColCord, celColCord);
    this.#parallelVerticalSorting(column, columnNumber, boxColCord, celColCord);  
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

  #mountColumn(boxColCord: number, celColCord: number): number[]{
    return [
      ...this.board[boxColCord].filter((cel, index)=> [celColCord,celColCord+3,celColCord+6].includes(index)),
      ...this.board[boxColCord+3].filter((cel, index)=> [celColCord,celColCord+3,celColCord+6].includes(index)),
      ...this.board[boxColCord+6].filter((cel, index)=> [celColCord,celColCord+3,celColCord+6].includes(index))
    ]
  }

  #basicVerticalSorting(columnNumber: number, boxColCord: number, celColCord: number, celOffset: number):void {
    const column = this.#mountColumn(boxColCord, celColCord);
  
    const celBeingAnalysed = column[celOffset];
    let isolatedCels = column.slice(0,celOffset);

    if (isolatedCels.includes(celBeingAnalysed)) {
      const box = this.#colBasedBox(boxColCord, celOffset);
      
      let tradeNumber: number|undefined = this.#chooseTradeNumberForBasicVerticalSorting(columnNumber, celOffset, isolatedCels, box);

      if(tradeNumber === undefined)
        this.#backwardBasicVerticalSorting(column, boxColCord, columnNumber, celBeingAnalysed);
      else
        this.#swapCelPosition(box, celBeingAnalysed, tradeNumber)        
    }
  }

  #colBasedBox(boxColCord: number, celBeingAnalysed: number): number{
    let box = boxColCord;
    if (celBeingAnalysed>2) box = boxColCord+3;
    if (celBeingAnalysed>5) box = boxColCord+6;

    return box
  }

  #chooseTradeNumberForBasicVerticalSorting(columnNumber: number, celOffset: number, isolatedNumbers: number[], box: number): number|undefined {
    let tradeNumber: number|undefined;
    if ([0,3,6].includes(columnNumber))
      if (celOffset === columnNumber) 
        tradeNumber = this.board[box].filter((cel,index) => [1,2].includes(index)).find( cel => !isolatedNumbers.includes(cel));
      else if (celOffset !== columnNumber && [0,4,8].includes(box)) 
        tradeNumber = this.board[box].filter((cel,index) => [4,5,7,8].includes(index)).find( cel => !isolatedNumbers.includes(cel));
      else 
        tradeNumber = this.board[box].filter((cel, index) => ![0,3,6].includes(index)).find( cel => !isolatedNumbers.includes(cel));
    
    if ([1,4,7].includes(columnNumber))
      if(celOffset !== columnNumber && [0,4,8].includes(box))
        tradeNumber = this.board[box].filter((cel,index) => [8].includes(index)).find( cel => !isolatedNumbers.includes(cel));
      else if (celOffset === columnNumber)
        tradeNumber = this.board[box].filter((cel,index) => [5].includes(index)).find( cel => !isolatedNumbers.includes(cel));
      else
        tradeNumber = this.board[box].filter((cel,index) => [2,5,8].includes(index)).find( cel => !isolatedNumbers.includes(cel));
    
    return tradeNumber;
  }

  #backwardBasicVerticalSorting(column: number[], boxColCord: number, columnNumber: number, celBeingAnalysed: number):void {
    const celBeingAnalysedFirstAppearanceIndex = column.indexOf(celBeingAnalysed)

    if (celBeingAnalysedFirstAppearanceIndex >= columnNumber){
      const box = this.#colBasedBox(boxColCord, celBeingAnalysedFirstAppearanceIndex);

      const isolatedCels = column.slice(celBeingAnalysedFirstAppearanceIndex+1, 9);  
      const tradeNumber = this.#chooseTradeNumberForBasicVerticalSorting(columnNumber, celBeingAnalysedFirstAppearanceIndex, isolatedCels, box);

      if(tradeNumber === undefined)
        return
      else
        this.#swapCelPosition(box, celBeingAnalysed, tradeNumber)
    }
  }

  #parallelVerticalSorting(column: number[], columnNumber: number, boxColCord: number, celColCord: number): void {
    let celOffset = 0;
    while (![1,2,3,4,5,6,7,8,9].every(num => column.includes(num))) {
      const box = this.#colBasedBox(boxColCord, celOffset);

      let celBeingAnalysed = column[celOffset];
      let isolatedNumbers = column.filter((cel, index) => celOffset !== index);

      if (isolatedNumbers.includes(celBeingAnalysed)) {
        this.#swapVerticalCelPosition(box, celBeingAnalysed, columnNumber, isolatedNumbers)

        column = this.#mountColumn(boxColCord, celColCord);
  
        celBeingAnalysed = column[celOffset];
        isolatedNumbers = column.filter((cel, index) => celOffset !== index);

        if (isolatedNumbers.includes(celBeingAnalysed))
          celOffset = this.#repetitionOfTradedNumberIndex(column, celOffset, celBeingAnalysed);
        else 
          celOffset++;
      }
      else
        celOffset++;
      
      if (![1,2,3,4,5,6,7,8,9].every(num => column.includes(num)) && celOffset === 9)
        celOffset = 0;
      
    }
  }

  //  SWAPS
  #swapVerticalCelPosition(box: number, celBeingAnalysed: number, columnNumber: number, filteredColumn: number[]): void {
    const celBeingAnalysedIndex = this.board[box].indexOf(celBeingAnalysed);
    let indexIncrement = 1;

    if([0,3,6].includes(columnNumber) && filteredColumn.includes(this.board[box][celBeingAnalysedIndex+1]))
      if (!filteredColumn.includes(this.board[box][celBeingAnalysedIndex+2]))
        indexIncrement = 2
      else
        indexIncrement = Math.ceil(Math.random()*2)

    this.board[box] = this.board[box].map((cel, index) => {
      if (cel === celBeingAnalysed) return this.board[box][celBeingAnalysedIndex+indexIncrement]
      if (index === celBeingAnalysedIndex+indexIncrement) return celBeingAnalysed;
      return cel;
    })
  }

  #swapHorizontalCelPosition(box: number, celBeingAnalysed: number, rowNumber: number, filteredRow: number[]): void {
    const celBeingAnalysedIndex = this.board[box].indexOf(celBeingAnalysed);
    let indexIncrement = 3;

    if([0,3,6].includes(rowNumber) && filteredRow.includes(this.board[box][celBeingAnalysedIndex+3]))
      if (!filteredRow.includes(this.board[box][celBeingAnalysedIndex+6]))
        indexIncrement = 6
      else
        indexIncrement = Math.ceil(Math.random()*2)*3

    this.board[box] = this.board[box].map((cel, index) => {
      if (cel === celBeingAnalysed) return this.board[box][celBeingAnalysedIndex+indexIncrement]
      if (index === celBeingAnalysedIndex+indexIncrement) return celBeingAnalysed;
      return cel;
    })
  }

  #swapCelPosition(box: number, originalNumber: number, tradeNumber: number): void {
    this.board[box] = this.board[box].map((cel, index) => {
      if (this.board[box].indexOf(originalNumber) === index) return tradeNumber;
      if (this.board[box].indexOf(tradeNumber) === index) return originalNumber;

      return cel;
    })
  }
}