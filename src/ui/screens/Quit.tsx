import { DefaultProps } from "../util/interfaces";
import styled from "styled-components";
import { Controller } from "../state/Controller";

const QuitScreen_css = styled.div`
    display: flex;
    flex-direction: column;
    background-color: snow;
    border-radius: 5px;
    padding: 2em 4em;

    > button {
      padding: .25em;
      background-color: aliceblue;
      border: 2px solid lightblue;
      border-radius: 3px;
      font-size: 1.5rem;
      margin: 25px;

      :hover {
        cursor: pointer;
        border: 2px solid blue;
        background-color: lightblue;
      }
    }
  `

export function QuitScreen({controller}: DefaultProps) {
  
  return  <QuitScreen_css>
            <h2>Quit game?</h2>
            <button onClick={controller.restartGame}>Yes</button>
            <button onClick={controller.quitGame}>No</button>
          </QuitScreen_css>
}