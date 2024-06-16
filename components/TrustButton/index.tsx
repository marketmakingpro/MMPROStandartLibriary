import React from 'react';
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
	isDisabled?: boolean
}

const TrustButtonDefaultProps = {
	isValid: false,
	rippleColor: 'rgba(255, 255, 255, 0.2)',
	isDisabled: false
}

const ButtonStyled = styled.button<{ isDisabled: boolean }>`
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
	
	${props => props.isDisabled && css`
		pointer-events: none;
		opacity: 0.3;
	`}
	 
  &:focus,
  &:active {
    outline: none;
  }
`;

const TrustButton = (props: TrustButtonProps) => {
	const {style, children, rippleColor, isValid, onClick, className, isDisabled = false} = props

	return (
		<ButtonStyled
			isDisabled={isDisabled}
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
