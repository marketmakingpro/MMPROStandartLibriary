import React from 'react';
import StepItem from "./StepItem";
import styled from "styled-components";
import {JustifyStartColumn} from "../../styles/GlobalStyledComponents";
import Text from '../Text';

type StepperProps = {
  children: React.ReactNode[]
}

const Stepper = (props: StepperProps) => {
  const {children} = props
  return <>{children}</>
};

export default Stepper;