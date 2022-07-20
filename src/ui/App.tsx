import styled from 'styled-components';
import { StartScreen } from './screens/Start';
import { InGame } from './screens/InGame'
import { GameState } from './util/interfaces';
import { EndScreen } from './screens/End';
import { PauseScreen } from './screens/PauseScreen';
import * as colors from './util/colors';
import { Controller } from './state/Controller';
import { QuitScreen } from './screens/Quit';

const MainContainer_css = styled.div`
    background-color: #${colors.black.three};
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  `

function App(): JSX.Element {
  const controller = Controller();
  const {gameState} = controller;

  function content(gameState: GameState) {
    switch(gameState) {
      case 'init':
        return <StartScreen controller={controller}/>
      case 'in-game':
        return <InGame controller={controller}/>
      case 'paused':
        return <PauseScreen controller={controller}/>
      case 'won':
        return <EndScreen controller={controller}/>
      case 'quit':
        return <QuitScreen controller={controller}/>
      default:
        throw new Error('Invalid gameState')
    }
  }

  return  <MainContainer_css>
            { content(gameState) }
          </MainContainer_css>
}

export default App;