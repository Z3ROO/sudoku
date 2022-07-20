import styled from "styled-components"
import { Controller, DefaultProps } from "../util/interfaces"
import * as colors from '../util/colors';

const Cel_css = styled.div<{id: string, isCelFocused: number, celCurrentState: string, animationOrder: number}>`
    width: 36px;
    height: 36px;
    border: 1px solid gray;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({celCurrentState}) => celCurrentState !== 'filled' ? '#'+colors.blue.three : '#'+colors.blue.five};
    background-color: ${({isCelFocused}) => {
      if (isCelFocused === 1) return '#'+colors.black.six
      else if (isCelFocused === 2) return '#'+colors.black.five
      else return ''
      }};


    ${({animationOrder}) => animationOrder ? `
      @keyframes kf {
        0% {
          transform: scale(1.1);
          background-color: #${colors.black.one};
        }
        100% {
          transform: scale(1);
        }
      }
      animation: .6s ease-out 0s 1 kf;
      animation-delay: ${animationOrder*6}0ms;
    ` : ''}


    :hover {
      background-color: #${colors.blue.five};
      color: #${colors.black.three};
      cursor: pointer;
    }

    :active {
      transform: scale(0.98);
    }

    > span {
      font-size: 1.25rem;
      font-weight: bold;
    }
  `
const Box_css = styled.div<{id: string}>`
    display: flex;
    flex-direction: column;
    border: 1px solid lightgray;

    > div {
      display: flex;
    }
  `
const Grid_css = styled.div`
    display: flex;
    flex-direction: column;
    border: 2px solid black;
    border-radius: 5px;
    padding: .5em;
    margin-right: 2em;
    background-color: #${colors.black.two};

    > div {
      display: flex;
    }
  `

const CelNotes_css = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 2px;
    font-size: 9px;
  `
const Board_css = styled.div`
  `

interface CelProps extends DefaultProps{
  id :number;
  boxId :number;
}

export function Cel(props: CelProps) {
  const {controller, boxId, id} = props;
  const celNumber = controller.board![boxId-1][id-1];
  
  if (celNumber === undefined) throw new Error();

  return  <Cel_css 
            id={'cel-'+id}
            key={`${boxId}${id}`}
            onClick={() => controller.focusCel([boxId, id])} 
            isCelFocused={isCelFocused(boxId, id, controller.focusedCel)}
            animationOrder={celAnimationOrder(boxId, id, controller.animationCordinates!)}
            onAnimationEnd={()=> isAnimationFinished(boxId, id, controller.animationCordinates!) && controller.resetAnimationCords()}
            celCurrentState={celNumber.state}
            onKeyDown={({key}) => {
              if ([1,2,3,4,5,6,7,8,9].includes(Number(key))) 
                controller.chooseNumber(Number(key))
              if (key === 'Delete')
                controller.deleteNumber()
            }}
            tabIndex={0}
            >
            {celNumber.notes.length > 0  ? <CelNotes notes={celNumber.notes} /> : <span>{celNumber !== null && celNumber.num}</span>}
          </Cel_css>
}

function isCelFocused(currentBoxPos: number, currentCelPos: number, focusedCel: number[] | null): number {
  if (focusedCel === null) return 0

  const [boxPos, celPos] = focusedCel;

  if (boxPos === currentBoxPos)
    if (celPos === currentCelPos)
      return 2 //main focus
    else
      return 1 //side focus for all celPoss in the boxPos

  if (boxPos === 1 && [2,3,4,7].includes(currentBoxPos) && isPartOfCelAxisToHighlight(currentBoxPos, currentCelPos, focusedCel))
    return 1
  else if (boxPos === 2 && [1,3,5,8].includes(currentBoxPos) && isPartOfCelAxisToHighlight(currentBoxPos, currentCelPos, focusedCel))
    return 1
  else if (boxPos === 3 && [1,2,6,9].includes(currentBoxPos) && isPartOfCelAxisToHighlight(currentBoxPos, currentCelPos, focusedCel))
    return 1
  else if (boxPos === 4 && [1,5,6,7].includes(currentBoxPos) && isPartOfCelAxisToHighlight(currentBoxPos, currentCelPos, focusedCel))
    return 1
  else if (boxPos === 5 && [2,4,6,8].includes(currentBoxPos) && isPartOfCelAxisToHighlight(currentBoxPos, currentCelPos, focusedCel))
    return 1
  else if (boxPos === 6 && [3,4,5,9].includes(currentBoxPos) && isPartOfCelAxisToHighlight(currentBoxPos, currentCelPos, focusedCel))
    return 1
  else if (boxPos === 7 && [1,4,8,9].includes(currentBoxPos) && isPartOfCelAxisToHighlight(currentBoxPos, currentCelPos, focusedCel))
    return 1
  else if (boxPos === 8 && [2,5,7,9].includes(currentBoxPos) && isPartOfCelAxisToHighlight(currentBoxPos, currentCelPos, focusedCel))
    return 1
  else if (boxPos === 9 && [3,6,7,8].includes(currentBoxPos) && isPartOfCelAxisToHighlight(currentBoxPos, currentCelPos, focusedCel))
    return 1

  return 0 //no focus
}
function isPartOfCelAxisToHighlight(currentBoxPos: number, currentCelPos: number, focusedCel: number[]): boolean {
  const [boxPos, celPos] = focusedCel;
  let [celRow, celCol] = [[1,2,3],[1,4,7]];

  if ([4,5,6].includes(celPos))
    celRow = [4,5,6]
  else if ([7,8,9].includes(celPos))
    celRow = [7,8,9]

  if ([2,5,8].includes(celPos))
    celCol = [2,5,8]
  else if ([3,6,9].includes(celPos))
    celCol = [3,6,9]

  if(currentBoxPos - 1 === boxPos || currentBoxPos + 1 === boxPos || currentBoxPos - 2 === boxPos || currentBoxPos + 2 === boxPos)
    if(celRow.includes(currentCelPos))
      return true

  if(currentBoxPos - 3 === boxPos || currentBoxPos + 3 === boxPos || currentBoxPos - 6 === boxPos || currentBoxPos + 6 === boxPos)
    if(celCol.includes(currentCelPos))
      return true
  
  return false
}
function celAnimationOrder(currentBoxPos:number, currentCelPos: number, animationCordinates: number[][]): number {
  if (animationCordinates === null) return 0
  const celToAnimate = animationCordinates.find(([boxPos, celPos]) => boxPos === currentBoxPos-1 && celPos === currentCelPos-1)
  if (celToAnimate)
    return celToAnimate[2]
  
  return 0
}
function isAnimationFinished(currentBoxPos: number, currentCelPos: number, animationCordinates: number[][]) {
  const lastAnimation = animationCordinates.reduce((acc, val) => acc[2] < val[2] ? val : acc);

  if (animationCordinates[animationCordinates.length - 1][0] === currentBoxPos-1 && animationCordinates[animationCordinates.length - 1][1] === currentCelPos-1) console.log(animationCordinates)
  return lastAnimation[0] === currentBoxPos-1 && lastAnimation[1] === currentCelPos-1
}


function CelNotes(props:{notes:number[]}) {
  const {notes} = props;
  
  return <CelNotes_css>{notes.map(note => <div>{note}</div>)}</CelNotes_css>
}

interface BoxProps extends DefaultProps{
  id :number;
}

export function Box(props: BoxProps) {
  const {controller, id} = props;

  return  <Box_css id={'box-'+id}>
            {
              [0,3,6].map((row, rowIndex) => <div key={rowIndex}>{
                  [1,2,3].map((column,  columnIndex) => <Cel id={row+column} key={rowIndex+columnIndex} boxId={id} controller={controller} />)
                }</div>
                )
            }         
          </Box_css>
}

export function Grid(props: DefaultProps) {
  const { controller } = props;

  return  <Grid_css>
            {
              [0,3,6].map((row, rowIndex) => <div key={rowIndex}>{
                  [1,2,3].map((column,  columnIndex) => <Box id={row+column}  key={rowIndex+columnIndex} controller={controller} />)
                }</div>
                )
            }         
          </Grid_css>
}

export function Board(props: DefaultProps) {
  const { controller } = props;

  return  <Board_css>
            <Grid controller={controller} />
          </Board_css>
}