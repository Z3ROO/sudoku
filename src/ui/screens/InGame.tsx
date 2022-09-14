import styled from 'styled-components';
import { DefaultProps } from '../util/interfaces';
import { Board } from '../templates/Board';
import { Controls } from '../templates/Controls';
import { useEffect } from 'react';
import { useInterval } from '../util/hooks/useInterval';
import * as colors from '../util/colors';

const InGame_css = styled.div`
    font-family: 'Press Start 2P', cursive;
    
    > h2 {
      color: #${colors.blue.four}
    }
    
    > div {
      display: flex;
      padding: 2em;
      background-image: linear-gradient(#${colors.black.seven}, #${colors.black.six});
      border-top: 4px solid #${colors.black.four};
      border-left: 4px solid #${colors.black.four};
      border-right: 4px solid #${colors.black.five};
      border-bottom: 4px solid #${colors.black.five};
      box-shadow: inset -3px -3px #${colors.black.seven};
    }
  `

export function InGame(props:DefaultProps) {
  const { controller } = props;

  useInterval(() => {
    controller.updateTimer();
  }, 1000);

  return  <InGame_css>
            <h2>Sudoku.js</h2>
            {
              controller.board ? 
              <div>
                <Board controller={controller} />
                <Controls controller={controller} />
              </div>
              : null
            }
          </InGame_css>
}


export default InGame
