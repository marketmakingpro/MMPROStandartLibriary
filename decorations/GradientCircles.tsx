import React from "react";
import PurpleCircle from '../../icons/PurleCircle.png'
import GreenCircle from '../../icons/GreenCircle.png'
import styled from "styled-components";

const BlueGreenGradientCircle = styled.img`
  position: absolute;
  width: 70%;
  padding-bottom: 55%;
  left: -20%;
  top: 5%;
  z-index: 0;
`

const PurpleBlueGradientCircle = styled.img`
  position: absolute;
  padding-bottom: 50%;
  width: 70%;
  right: -10%;
  top: 40%;
  z-index: 0;
`
const GradientCircles = () => {
  return (
    <>
      <BlueGreenGradientCircle src={PurpleCircle}/>
      <PurpleBlueGradientCircle src={GreenCircle} />
    </>
  );
};

export default GradientCircles;