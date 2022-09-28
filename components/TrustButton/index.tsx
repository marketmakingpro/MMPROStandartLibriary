import React, {useEffect, useState} from 'react';
import styled, {css} from "styled-components";
import Ripple from "./Ripple";
import './index.scss';

type TrustButtonProps = {
  style: 'black' | 'red' | 'green'
  children: string,
  rippleColor: string,
  //onClick: (e: any) => void
}

const ButtonStyled = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 180px;
  height: 40px;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  outline: none;

  &:focus,
  &:active {
    outline: none;
  }
`;

const TrustButton = (props: TrustButtonProps) => {
  const {style, children, rippleColor} = props

  return (
    <ButtonStyled className={`
      ${style === 'red' ? 'red-button' : ''}
      ${style === 'black' ? 'black-button' : ''}
      ${style === 'green' ? 'green-button' : ''}
    `}>
      <Ripple color={rippleColor} duration={1200}/>
      {children}
    </ButtonStyled>
  );
};

export default TrustButton;