import React from "react";

import styled from "styled-components";
import Decoration from "./decoration";

const Circle = styled(Decoration)<{diameter: string, background: string, opacity: number}>`
  width: ${props => `${props.diameter}`};
  padding-bottom: ${props => `${props.diameter}`};
  background: ${props => `${props.background}`};
  opacity: ${props => `${props.opacity}`};
  z-index: 0;
  border-radius: 50%;
`

const DecorationContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  right: 0px;
  bottom: 0px;
  z-index: 0;
`

const DecoarationBlur = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  right: 0px;
  bottom: 0px;
  z-index: 1;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(81px);
`

const linearGradientBlue = 'linear-gradient(228.62deg, #5790FF 12.13%, #A5FDC3 94.47%)'
const linearGradientGreen = 'linear-gradient(133.46deg, #ADE6C0 14.79%, #A5FDC3 103.42%)'


const GradientCirclesLabs = () => {
  return (
    <DecorationContainer>
      <DecoarationBlur/>
      <Circle background={linearGradientBlue} diameter={'36%'} left={'12%'} top={'2%'} opacity={0.4}/>

      <Circle background={linearGradientGreen} diameter={'33%'} left={'67%'} top={'23%'} opacity={0.4}/>

      <Circle background={linearGradientBlue} diameter={'26%'} left={'3%'} top={'29%'} opacity={0.3}/>
      <Circle background={linearGradientBlue} diameter={'21%'} left={'10%'} top={'39%'} opacity={0.6}/>

      <Circle background={linearGradientGreen} diameter={'21%'} left={'60%'} top={'49%'} opacity={0.6}/>
      <Circle background={linearGradientBlue} diameter={'44%'} left={'62%'} top={'58%'} opacity={0.6}/>


      <Circle background={linearGradientGreen} diameter={'48%'} left={'8%'} bottom={'2%'} opacity={0.3}/>

      <Circle background={linearGradientBlue} diameter={'55%'} left={'38%'} bottom={'-15%'} opacity={0.6}/>
    </DecorationContainer>
  );
};

export default GradientCirclesLabs;