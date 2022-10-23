import styled from "styled-components";
import ifExists from "../utils/styledComponents";

const Decoration = styled.img<{right?: string, top?: string , bottom?: string , left?: string, maxDisplayWidth?: number, minDisplayWidth?: number}>`
  position: absolute;
  ${ifExists('all')}
  ${props => props.minDisplayWidth ? `display: none;`: ''}

  ${props => props.maxDisplayWidth ? `@media screen and (max-width: ${props.maxDisplayWidth}px) {\n  display: none;\n  }`: ''}
  ${props => props.minDisplayWidth ? `@media screen and (max-width: ${props.minDisplayWidth}px) {\n  display: block;\n  }`: ''}
`

export const DecorationDiv = styled.div<{right?: string , top?: string , bottom?: string , left?: string, maxDisplayWidth?: number, minDisplayWidth?: number}>`
  position: absolute;
  ${ifExists('all')}
  ${props => props.minDisplayWidth ? `display: none;`: ''}

  ${props => props.maxDisplayWidth ? `@media screen and (max-width: ${props.maxDisplayWidth}px) {\n  display: none;\n  }`: ''}
  ${props => props.minDisplayWidth ? `@media screen and (max-width: ${props.minDisplayWidth}px) {\n  display: block;\n  }`: ''}
`

export default Decoration