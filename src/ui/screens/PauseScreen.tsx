import styled from "styled-components";
import { DefaultProps } from "../util/interfaces";

const PauseScreen_css = styled.div`
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

export function PauseScreen(props: DefaultProps) {
  const { controller } = props;

  return  <PauseScreen_css>
            <h3>Paused</h3>
            <button onClick={() => controller.pauseGame()}>Back to the game</button>
          </PauseScreen_css>
}