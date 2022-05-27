import styled from "styled-components";
import * as colors from '../util/colors'

export const NumPadBtn = styled.button`
    width: 72px;
    height: 72px;
    border-top: 4px solid #${colors.black.two};
    border-left: 4px solid #${colors.black.two};
    border-right: 4px solid #${colors.black.three};
    border-bottom: 4px solid #${colors.black.three};
    box-shadow: inset -3px -3px #${colors.black.five};
    background-color: #${colors.black.four};
    font-size: 2rem;
    margin: .15em;
    font-family: 'Press Start 2P', cursive;
    color:#${colors.blue.four};

    :hover {
      background-color: #${colors.blue.three};
      border-top: 4px solid #${colors.blue.one};
      border-left: 4px solid #${colors.blue.one};
      border-right: 4px solid #${colors.blue.two};
      border-bottom: 4px solid #${colors.blue.two};
      box-shadow: inset -3px -3px #${colors.blue.four};
      color: #${colors.black.two};
      cursor: pointer;
    }

    :active {
      transform: scale(0.98);
    }
  `

const IconBtn_css = styled.button<{iconSize:number, icon: string, hover?: string, active?: boolean}>`
    border: 1px solid gray;
    background-color: ${({active}) => active ? `#${colors.blue.three}` : `#${colors.black.four}` };
    border: none;
    border-top: 4px solid ${({active}) => active ? `#${colors.blue.one}` : `#${colors.black.two}` };
    border-left: 4px solid ${({active}) => active ? `#${colors.blue.one}` : `#${colors.black.two}` };
    border-right: 4px solid ${({active}) => active ? `#${colors.blue.two}` : `#${colors.black.three}` };
    border-bottom: 4px solid ${({active}) => active ? `#${colors.blue.two}` : `#${colors.black.three}` };
    box-shadow: inset -3px -3px ${({active}) => active ? `#${colors.blue.four}` : `#${colors.black.five}` };
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 10px;

    :hover {
      background-color: #${colors.blue.three};
      border-top: 4px solid #${colors.blue.one};
      border-left: 4px solid #${colors.blue.one};
      border-right: 4px solid #${colors.blue.two};
      border-bottom: 4px solid #${colors.blue.two};
      box-shadow: inset -3px -3px #${colors.blue.four};
      cursor: pointer;
    }

    :active {
      transform: scale(0.98);
    }

    > div {
      background-image: url(${({icon}) => icon});
      background-size: contain;
      margin: ${({iconSize})=> iconSize > 100 ? '.'+99 : '.'+iconSize}em;
      width: ${({iconSize})=> iconSize}px;
      height: ${({iconSize})=> iconSize}px;

      ${({hover}) => hover ? ':hover { background-image: url("'+hover+'");}': ''}
    }
  `

type IconBtn = {icon: string, action: any, size: number, alt?: string, hover?: string, active?: boolean}

export function IconBtn(props: IconBtn) {
  const { icon, action, size, alt, hover, active} = props;

  return  <IconBtn_css onClick={action} iconSize={size} icon={icon} hover={hover} active={active}>
            <div/>
          </IconBtn_css>
}

