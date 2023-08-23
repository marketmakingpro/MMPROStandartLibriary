import React, {useEffect, useState} from 'react';
import styled, {css} from "styled-components";
import Ripple from "./Ripple";
import './index.scss';

type TrustButtonProps = {
  style: 'black' | 'red' | 'green'
  children: React.ReactNode | string,
  rippleColor?: string,
  isValid?: boolean,
  onClick?: () => void,
  className?: string,
}

const TrustButtonDefaultProps = {
  isValid: false,
  rippleColor: 'rgba(255, 255, 255, 0.2)',
}

const ButtonStyled = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  outline: none;
  transition: all 0.3s ease;
  padding: 12px;
  
  &:focus,
  &:active {
    outline: none;
  }
`;

const TrustButton = (props: TrustButtonProps) => {
  const {style, children, rippleColor, isValid, onClick, className} = props

  return (
    <ButtonStyled
      onClick={onClick}
      className={`
        ${style === 'red' ? 'red-button' : ''}
        ${style === 'black' ? 'black-button' : ''}
        ${style === 'green' ? 'green-button' : ''}
        ${isValid ? '' : 'not-valid-button'}
        ${className ? `${className}` : ''}
      `}
    >
      <Ripple color={rippleColor} duration={1200}/>
      {children}
    </ButtonStyled>
  );
};

TrustButton.defaultProps = TrustButtonDefaultProps;

export default TrustButton;