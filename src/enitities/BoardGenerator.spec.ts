import { Board } from './BoardGenerator'

const boards: Board[] = Array(10).fill(undefined).map(arr => new Board());
console.log(boards[0].finalBoard)
describe('Board', () => {
  test('The Board has 9 Boxes completely filled with 9 positions', () => {
    const AllBoardsComply = boards.every( board => board.finalBoard.length === 9 && board.finalBoard.every( box => box.length === 9 ))
    expect(AllBoardsComply).toBe(true);
  })
})

describe('Boxes', () => {
  test('The 1st box has 9 unique cells', () => {
    const AllBoardsComply = boards.every( board => board.finalBoard[0].length === 9 && [1,2,3,4,5,6,7,8,9].every( num => board.finalBoard[0].includes(num)))
    expect(AllBoardsComply).toBe(true)
  })

  test('The 2nd box has 9 unique cells', () => {
    const AllBoardsComply = boards.every( board => board.finalBoard[1].length === 9 && [1,2,3,4,5,6,7,8,9].every( num => board.finalBoard[1].includes(num)))
    expect(AllBoardsComply).toBe(true)
  })

  test('The 3rd box has 9 unique cells', () => {
    const AllBoardsComply = boards.every( board => board.finalBoard[2].length === 9 && [1,2,3,4,5,6,7,8,9].every( num => board.finalBoard[2].includes(num)))
    expect(AllBoardsComply).toBe(true)
  })

  test('The 4th box has 9 unique cells', () => {
    const AllBoardsComply = boards.every( board => board.finalBoard[3].length === 9 && [1,2,3,4,5,6,7,8,9].every( num => board.finalBoard[3].includes(num)))
    expect(AllBoardsComply).toBe(true)
  })

  test('The 5th box has 9 unique cells', () => {
    const AllBoardsComply = boards.every( board => board.finalBoard[4].length === 9 && [1,2,3,4,5,6,7,8,9].every( num => board.finalBoard[4].includes(num)))
    expect(AllBoardsComply).toBe(true)
  })

  test('The 6th box has 9 unice cells', () => {
    const AllBoardsComply = boards.every( board => board.finalBoard[5].length === 9 && [1,2,3,4,5,6,7,8,9].every( num => board.finalBoard[5].includes(num)))
    expect(AllBoardsComply).toBe(true)
  })

  test('The 7th box has 9 unice cells', () => {
    const AllBoardsComply = boards.every( board => board.finalBoard[6].length === 9 && [1,2,3,4,5,6,7,8,9].every( num => board.finalBoard[6].includes(num)))
    expect(AllBoardsComply).toBe(true)
  })

  test('The 8th box has 9 unice cells', () => {
    const AllBoardsComply = boards.every( board => board.finalBoard[7].length === 9 && [1,2,3,4,5,6,7,8,9].every( num => board.finalBoard[7].includes(num)))
    expect(AllBoardsComply).toBe(true)
  })

  test('The 9th box has 9 unice cells', () => {
    const AllBoardsComply = boards.every( board => board.finalBoard[8].length === 9 && [1,2,3,4,5,6,7,8,9].every( num => board.finalBoard[8].includes(num)))
    expect(AllBoardsComply).toBe(true)
  })
})

describe('Rows', () =>{
  test('The 1st row has 9 unice cells', () => {
    const AllBoardsComply = boards.every( board => {
      const row = [...board.finalBoard[0].slice(0,3), ...board.finalBoard[1].slice(0,3), ...board.finalBoard[2].slice(0,3)];

      return [1,2,3,4,5,6,7,8,9].every( num => row.includes(num));

    })

    expect(AllBoardsComply).toBe(true)
  })

  test('The 2nd row has 9 unice cells', () => {
    const AllBoardsComply = boards.every( board => {
      const row = [...board.finalBoard[0].slice(3,6), ...board.finalBoard[1].slice(3,6), ...board.finalBoard[2].slice(3,6)];

      return [1,2,3,4,5,6,7,8,9].every( num => row.includes(num));

    })
    
    expect(AllBoardsComply).toBe(true)
  })

  test('The 3rd row has 9 unice cells', () => {
    const AllBoardsComply = boards.every( board => {
      const row = [...board.finalBoard[0].slice(6,9), ...board.finalBoard[1].slice(6,9), ...board.finalBoard[2].slice(6,9)];

      return [1,2,3,4,5,6,7,8,9].every( num => row.includes(num));

    })
    
    expect(AllBoardsComply).toBe(true)
  })

  test('The 4th row has 9 unice cells', () => {
    const AllBoardsComply = boards.every( board => {
      const row = [...board.finalBoard[3].slice(0,3), ...board.finalBoard[4].slice(0,3), ...board.finalBoard[5].slice(0,3)];

      return [1,2,3,4,5,6,7,8,9].every( num => row.includes(num));

    })
    
    expect(AllBoardsComply).toBe(true)
  })

  test('The 5th row has 9 unice cells', () => {
    const AllBoardsComply = boards.every( board => {
      const row = [...board.finalBoard[3].slice(3,6), ...board.finalBoard[4].slice(3,6), ...board.finalBoard[5].slice(3,6)];

      return [1,2,3,4,5,6,7,8,9].every( num => row.includes(num));

    })
    
    expect(AllBoardsComply).toBe(true)
  })

  test('The 6th row has 9 unice cells', () => {
    const AllBoardsComply = boards.every( board => {
      const row = [...board.finalBoard[3].slice(6,9), ...board.finalBoard[4].slice(6,9), ...board.finalBoard[5].slice(6,9)];

      return [1,2,3,4,5,6,7,8,9].every( num => row.includes(num));

    })
    
    expect(AllBoardsComply).toBe(true)
  })

  test('The 7th row has 9 unice cells', () => {
    const AllBoardsComply = boards.every( board => {
      const row = [...board.finalBoard[6].slice(0,3), ...board.finalBoard[7].slice(0,3), ...board.finalBoard[8].slice(0,3)];

      return [1,2,3,4,5,6,7,8,9].every( num => row.includes(num));

    })
    
    expect(AllBoardsComply).toBe(true)
  })

  test('The 8th row has 9 unice cells', () => {
    const AllBoardsComply = boards.every( board => {
      const row = [...board.finalBoard[6].slice(3,6), ...board.finalBoard[7].slice(3,6), ...board.finalBoard[8].slice(3,6)];

      return [1,2,3,4,5,6,7,8,9].every( num => row.includes(num));

    })
    
    expect(AllBoardsComply).toBe(true)
  })

  test('The 9th row has 9 unice cells', () => {
    const AllBoardsComply = boards.every( board => {
      const row = [...board.finalBoard[6].slice(6,9), ...board.finalBoard[7].slice(6,9), ...board.finalBoard[8].slice(6,9)];

      return [1,2,3,4,5,6,7,8,9].every( num => row.includes(num));

    })
    
    expect(AllBoardsComply).toBe(true)
  })
})

describe('Columns', () => {
  test('The 1st column has 9 unice cells', () => {
    const AllBoardsComply = boards.every( board => {
      const column = [
        ...board.finalBoard[0].filter((cel, index) => index === 0 || index === 3 || index === 6),
        ...board.finalBoard[3].filter((cel, index) => index === 0 || index === 3 || index === 6),
        ...board.finalBoard[6].filter((cel, index) => index === 0 || index === 3 || index === 6)
      ]

      return  [1,2,3,4,5,6,7,8,9].every( num => column.includes(num))
    })

    expect(AllBoardsComply).toBe(true)
  })
  test('The 2nd column has 9 unice cells', () => {
    const AllBoardsComply = boards.every( board => {
      const column = [
        ...board.finalBoard[0].filter((cel, index) => index === 1 || index === 4 || index === 7),
        ...board.finalBoard[3].filter((cel, index) => index === 1 || index === 4 || index === 7),
        ...board.finalBoard[6].filter((cel, index) => index === 1 || index === 4 || index === 7)
      ]

      return  [1,2,3,4,5,6,7,8,9].every( num => column.includes(num))
    })

    expect(AllBoardsComply).toBe(true)
  })
  test('The 3rd column has 9 unice cells', () => {
    const AllBoardsComply = boards.every( board => {
      const column = [
        ...board.finalBoard[0].filter((cel, index) => index === 2 || index === 5 || index === 8),
        ...board.finalBoard[3].filter((cel, index) => index === 2 || index === 5 || index === 8),
        ...board.finalBoard[6].filter((cel, index) => index === 2 || index === 5 || index === 8)
      ]

      return  [1,2,3,4,5,6,7,8,9].every( num => column.includes(num))
    })

    expect(AllBoardsComply).toBe(true)
  })
  test('The 4th column has 9 unice cells', () => {
    const AllBoardsComply = boards.every( board => {
      const column = [
        ...board.finalBoard[1].filter((cel, index) => index === 0 || index === 3 || index === 6),
        ...board.finalBoard[4].filter((cel, index) => index === 0 || index === 3 || index === 6),
        ...board.finalBoard[7].filter((cel, index) => index === 0 || index === 3 || index === 6)
      ]

      return  [1,2,3,4,5,6,7,8,9].every( num => column.includes(num))
    })

    expect(AllBoardsComply).toBe(true)
  })
  test('The 5th column has 9 unice cells', () => {
    const AllBoardsComply = boards.every( board => {
      const column = [
        ...board.finalBoard[1].filter((cel, index) => index === 1 || index === 4 || index === 7),
        ...board.finalBoard[4].filter((cel, index) => index === 1 || index === 4 || index === 7),
        ...board.finalBoard[7].filter((cel, index) => index === 1 || index === 4 || index === 7)
      ]

      return  [1,2,3,4,5,6,7,8,9].every( num => column.includes(num))
    })

    expect(AllBoardsComply).toBe(true)
  })
  test('The 6th column has 9 unice cells', () => {
    const AllBoardsComply = boards.every( board => {
      const column = [
        ...board.finalBoard[1].filter((cel, index) => index === 2 || index === 5 || index === 8),
        ...board.finalBoard[4].filter((cel, index) => index === 2 || index === 5 || index === 8),
        ...board.finalBoard[7].filter((cel, index) => index === 2 || index === 5 || index === 8)
      ]

      return  [1,2,3,4,5,6,7,8,9].every( num => column.includes(num))
    })

    expect(AllBoardsComply).toBe(true)
  })
  test('The 7th column has 9 unice cells', () => {
    const AllBoardsComply = boards.every( board => {
      const column = [
        ...board.finalBoard[2].filter((cel, index) => index === 0 || index === 3 || index === 6),
        ...board.finalBoard[5].filter((cel, index) => index === 0 || index === 3 || index === 6),
        ...board.finalBoard[8].filter((cel, index) => index === 0 || index === 3 || index === 6)
      ]

      return  [1,2,3,4,5,6,7,8,9].every( num => column.includes(num))
    })

    expect(AllBoardsComply).toBe(true)
  })
  test('The 8th column has 9 unice cells', () => {
    const AllBoardsComply = boards.every( board => {
      const column = [
        ...board.finalBoard[2].filter((cel, index) => index === 1 || index === 4 || index === 7),
        ...board.finalBoard[5].filter((cel, index) => index === 1 || index === 4 || index === 7),
        ...board.finalBoard[8].filter((cel, index) => index === 1 || index === 4 || index === 7)
      ]

      return  [1,2,3,4,5,6,7,8,9].every( num => column.includes(num))
    })

    expect(AllBoardsComply).toBe(true)
  })
  test('The 9th column has 9 unice cells', () => {
    const AllBoardsComply = boards.every( board => {
      const column = [
        ...board.finalBoard[2].filter((cel, index) => index === 2 || index === 5 || index === 8),
        ...board.finalBoard[5].filter((cel, index) => index === 2 || index === 5 || index === 8),
        ...board.finalBoard[8].filter((cel, index) => index === 2 || index === 5 || index === 8)
      ]

      return  [1,2,3,4,5,6,7,8,9].every( num => column.includes(num))
    })

    expect(AllBoardsComply).toBe(true)
  })
})