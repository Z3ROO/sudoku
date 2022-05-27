import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { DefaultProps } from '../util/interfaces';
import * as colors from '../util/colors';

const InitComponent_css = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #${colors.black.five};
    height: 100%;
    width: 100%;
    color: #${colors.blue.four};
    font-family: 'Press Start 2P', cursive;

    > .title {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      font-size: 1.5rem;
    }

    .curve {
      border-top-left-radius: 100%;
      border-top-right-radius: 100%;
      background-color: #${colors.black.three};
      width: 100%;
      height: 50%;
      right: 0;
      bottom: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .bottom-phrase {
      position: absolute;
      font-size: .9rem;
      color: #${colors.blue.two};
      bottom: 10px;
    }
  `

const Start_css = styled.div`
    font-size: 1.15rem;

    > h4:hover {
      color: #${colors.blue.five};
      cursor: pointer;
    }
  `
const Difficulty_css = styled.div<{buttonFocused: number}>`
  width: 55%;
  text-align: center;
  > h2 {
    margin-top: 0;
    margin-bottom: 40px;
  }
  > div {
    display: flex;
    justify-content: space-around;

    .pixel-btn:nth-child(${({buttonFocused}) => buttonFocused}) {
        box-shadow: inset -5px -5px rgba(0,0,0,0.4);
        cursor: pointer;
        background-color: #${colors.blue.three};
      }

    .pixel-btn {
      background-color: #${colors.blue.five};
      height: 45px;
      position: relative;
      border: none;
      border-top: 5px solid black;
      border-bottom: 5px solid black;
      box-shadow: inset -4px -4px rgba(0,0,0,0.4);
      font-family: 'Press Start 2P', monospace;
      margin-left: 10px;

      ::before {
        content: '';
        position: absolute;
        width: 100%;
        border-left: 5px solid black;
        border-right: 5px solid black;
        background: transparent;
        height: 100%;
        top: 0;
        left: -5px;
      }

      :hover {
        box-shadow: inset -5px -5px rgba(0,0,0,0.4);
        cursor: pointer;
        background-color: #${colors.blue.three};
      }

      :active {
        box-shadow: inset 4px 4px rgba(0,0,0,0.4);
      }
    }
  }
  `

function Start(props:{setScreen: React.Dispatch<React.SetStateAction<string>>}) {
  
  useEffect(() => {
    const anyKeyToStart = () => {
      props.setScreen('difficulty')
    }
    
    document.addEventListener('keydown', anyKeyToStart);

    return () => {
      document.removeEventListener('keydown', anyKeyToStart);
    }
  }, [])

  return  <Start_css>
            <h4 onClick={()=> props.setScreen('difficulty')}>Press any key to start</h4>
          </Start_css>
}

function Difficulty(props: DefaultProps) {
  const {controller} = props;
  const [buttonFocused, setButtonFocused] = useState(1);

  function start(diff:number){
    console.log(diff)
    controller.startGame(diff)
  }

  useEffect(() => {
    console.log('asdasdasdasdasd',controller.startGame)
    const navigateThroughDifficulties = (key: KeyboardEvent) => {
      if (key.code === 'ArrowRight'){
        setButtonFocused((buttonFocused) => buttonFocused === 4 ? 1 : buttonFocused+1);
      }
      else if (key.code === 'ArrowLeft'){
        setButtonFocused((buttonFocused) => buttonFocused === 1 ? 4 : buttonFocused-1);
      }
      else if (key.code === 'Enter'){
        start(buttonFocused)
      } 
    }
    
    document.addEventListener('keydown', navigateThroughDifficulties);
    
    return () => {
      document.removeEventListener('keydown', navigateThroughDifficulties);
    }
  }, [buttonFocused])

  return  <Difficulty_css buttonFocused={buttonFocused}>
            <h2>Escolha a dificuldade</h2>
            <div>
              <button className='pixel-btn' onClick={()=> controller.startGame(1)} onMouseOver={() => setButtonFocused(1)}>Facil</button>
              <button className='pixel-btn' onClick={()=> controller.startGame(2)} onMouseOver={() => setButtonFocused(2)}>Medio</button>
              <button className='pixel-btn' onClick={()=> controller.startGame(3)} onMouseOver={() => setButtonFocused(3)}>Dificil</button>
              <button className='pixel-btn' onClick={()=> controller.startGame(4)} onMouseOver={() => setButtonFocused(4)}>Especialista</button>
            </div>            
          </Difficulty_css>
}

export function InitComponent(props:DefaultProps): JSX.Element {
  const controller = props.controller;
  const [screen, setScreen] = useState<string>('start');
  
  return  <InitComponent_css>
            <div className='title'>
              <h1>Sudoku.js</h1>
            </div>          
            
            <div className='curve'>
              {screen === 'start' ? <Start setScreen={setScreen}/> :<Difficulty controller={controller} />}
            </div>
            <span className='bottom-phrase'>2022 - Z3ROO</span>
          </InitComponent_css>
}
