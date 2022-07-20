import styled from "styled-components";
import { IconBtn, NumPadBtn } from "../components/Buttons";
import { DefaultProps } from "../util/interfaces";
import { mountTimer } from "../util/mountTimer";

const Controls_css = styled.div`
  `

const Timer_css = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    > span {
      margin-right: 5px
    }
  `

const ControlButtons_css = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;

    > button {
      margin: 0 5px;
    }
  `

const NumPad_css = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `

export function Controls(props: DefaultProps) {
  const { controller } = props;

  return  <Controls_css>
            <Timer controller={controller} />
            <div>
              <ControlButtons controller={controller}/>
              <NumPad controller={controller}/>
            </div>
          </Controls_css>
}

function Timer(props: DefaultProps) {
  const {controller} = props;

  return  <Timer_css>
              <span>Tempo: {mountTimer(controller.inGameTimer)}</span>
              <IconBtn icon='/img/pause.svg' action={()=> {controller.pauseGame()}} size={10} />
              <IconBtn icon='/img/x-symbol.svg' action={()=> {controller.quitGame()}} size={10} />
          </Timer_css>
}

function ControlButtons(props: DefaultProps) {
  const { controller } = props;

  return  <ControlButtons_css>
            <IconBtn icon='/img/undo.svg' action={()=> controller.undo()} size={40} />
            <IconBtn icon='/img/redo.svg' action={()=> controller.goBack()} size={40} />
            <IconBtn icon='/img/eraser.svg' action={()=> controller.deleteNumber()} size={40} />
            <IconBtn icon='/img/pencil.svg' action={()=> controller.setNotesMode(!controller.notesMode)} size={40} active={controller.notesMode}/>
            <IconBtn icon='/img/lightbulb-off.svg' hover='/img/lightbulb.svg' action={()=> console.log('testando')} size={40} />
          </ControlButtons_css>
}

function NumPad(props: DefaultProps) {
  const {controller} = props;

  return  <NumPad_css>
            <div>
              {[1,2,3].map(num => <NumPadBtn key={num} onClick={()=> controller.chooseNumber(num)}>{num}</NumPadBtn>)}
            </div>
            <div>
              {[4,5,6].map(num => <NumPadBtn key={num} onClick={()=> controller.chooseNumber(num)}>{num}</NumPadBtn>)}
            </div>
            <div>
              {[7,8,9].map(num => <NumPadBtn key={num} onClick={()=> controller.chooseNumber(num)}>{num}</NumPadBtn>)}
            </div>
          </NumPad_css>
}
