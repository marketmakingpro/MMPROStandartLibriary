import React from "react";

import styled from "styled-components";

const BlueGreenGradientCircle = styled.div`
  position: absolute;
  width: 55%;
  padding-bottom: 55%;
  background: linear-gradient(228.62deg, #5790FF 12.13%, #A5FDC3 94.47%);
  opacity: 0.6;
  left: -20%;
  top: 33%;
  z-index: 0;
  border-radius: 50%;
  filter: blur(50px);
`

const PurpleBlueGradientCircle = styled.div`
  position: absolute;
  width: 50%;
  padding-bottom: 50%;
  right: -15%;
  top: 60%;
  background: linear-gradient(133.46deg, #5790FF 14.79%, rgba(165, 36, 226, 0) 103.42%);
  opacity: 0.6;
  z-index: 0;
  border-radius: 50%;
  filter: blur(50px);
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


const GradientCircles = () => {
  return (
    <DecorationContainer>
      <BlueGreenGradientCircle/>
      <PurpleBlueGradientCircle/>
    </DecorationContainer>
  );
};

export default GradientCircles;