import React from "react";

import styled from "styled-components";

const BlueGreenGradientCircle = styled.div`
  position: absolute;
  width: 948px;
  height: 948px;
  background: linear-gradient(228.62deg, #5790FF 12.13%, #A5FDC3 94.47%);
  opacity: 0.6;
  left: -239px;
  top: 395px;
  z-index: 0;
  border-radius: 50%;
  filter: blur(162px);
`

const PurpleBlueGradientCircle = styled.div`
  position: absolute;
  width: 892px;
  height: 892px;
  right: -239px;
  top: 1000px;
  background: linear-gradient(133.46deg, #5790FF 14.79%, rgba(165, 36, 226, 0) 103.42%);
  opacity: 0.6;
  z-index: 0;
  border-radius: 50%;
  filter: blur(162px);
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