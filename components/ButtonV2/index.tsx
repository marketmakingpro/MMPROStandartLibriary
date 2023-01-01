import React from "react";
import './index.css'
import styled, {css} from "styled-components";

type ButtonV2PropType = {
  isValid: boolean,
  onClick: () => void,
  children: React.ReactNode | string,
  outlined?: boolean,
  className?: string
}

const ButtonV2DefaultProps = {
  isLoading: false,
  isValid: false,
  outlined: false
}

const Button = styled.button<ButtonV2PropType>`
  
  ${({ outlined, isValid }) =>
          outlined &&
          css`
            background: none;
            border: ${isValid ? "1px solid #04C35C " : "1px solid rgba(24, 24, 51, .5)"};
            color: ${isValid ? "#04C35C" : "rgba(24, 24, 51, .5)"};
            transition: border 0.3s ease;
        `};

  ${({ outlined, isValid }) =>
          !outlined &&
          css`
            color: ${isValid ? "#fff" : "rgba(255, 255, 255, 0.6)"};
            background: ${isValid ? "#04C35C" : "rgba(0, 0, 0, 0.2)"};
            transition: background 0.3s ease;
        `};

  ${({ isValid }) =>
          !isValid &&
          css`
            pointer-events: none;
        `};
  
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 16px;
  outline: none;
  
  &:focus,
  &:active {
    outline: none;
  }
`;

const ButtonV2 = (props: ButtonV2PropType) => {
  const {isValid, onClick, children, outlined, className} = props;
  return (
    <Button
      type={"button"}
      onClick={onClick}
      isValid={isValid}
      outlined={outlined}
      className={className}
    >
      {children}
    </Button>
  )
};

ButtonV2.defaultProps = ButtonV2DefaultProps

export default ButtonV2