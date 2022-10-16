import React from 'react';
import styled, {css} from "styled-components";
import {JustifyStartColumn} from "Standard/styles/GlobalStyledComponents";
import CheckMark from "../../../../icons/CheckMark";

type StepperItemPops = {
  children: React.ReactNode[] | React.ReactNode,
  isLastStep?: boolean,
  status: 'ACTIVE' | 'WAIT' | 'READY'
}

const DefaultStepperItemProps = {
  isLastStep: false
}

const StepWrapper = styled.div`
  display: flex;
  position: relative;
  min-height: 30px;
  height: max-content;
  justify-content: flex-start;
  padding-left: 40px;
`

const Circle = styled.div<{status: 'ACTIVE' | 'WAIT' | 'READY'}>`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 10px;

  ${({ status }) => status === 'ACTIVE' && css`
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    border: 1px solid #33CC66;
  `};

  ${({ status }) => status === 'WAIT' && css`
    background: #fff;
    border: 1px solid #33CC66;
  `};

  ${({ status }) => status === 'READY' && css`
    display: flex;
    justify-content: center;
    align-items: center;
    background: #33CC66;
  `};
`

const ActiveStatus = styled.div`
  width: 11px;
  height: 11px;
  background: #33CC66;
  border-radius: 50%;
`

const Line = styled.div`
  position: absolute;
  top: 5px;
  left: 20px;
  height: 100% !important;
  width: 2px;
  transform: rotate(180deg);
  background: #33CC66;
`

const Step = (props: StepperItemPops) => {
  const {children,isLastStep, status} = props
  return (
    <StepWrapper>
      {(!isLastStep) && <Line />}
      <Circle status={status}>
        {status === 'ACTIVE' && <ActiveStatus />}
        {status === 'READY' && <CheckMark color={'#fff'} width={12} height={12} />}
      </Circle>
      <JustifyStartColumn>
        {children}
      </JustifyStartColumn>
    </StepWrapper>
  );
};

Step.defaultProps = DefaultStepperItemProps

export default Step;