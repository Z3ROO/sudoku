import styled from "styled-components";
import { DefaultProps } from "../util/interfaces";
import { mountTimer } from "../util/mountTimer";

const EndScreen_css = styled.div`
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

export function EndScreen(props: DefaultProps) {
  const { controller } = props;

  return  <EndScreen_css>
            <h3>Voce conseguiu!</h3>
            <h4>Tempo: {mountTimer(controller.inGameTimer)}</h4>
            <button onClick={() => controller.restartGame()}>Jogar novamente</button>
          </EndScreen_css>
}