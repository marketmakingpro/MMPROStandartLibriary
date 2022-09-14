import React from "react";
import './index.css'
import styled from "styled-components";

type ButtonV2PropType = {
  isValid: boolean,
  onClick: () => void,
  children: React.ReactNode | string
}

const ButtonV2DefaultProps = {
  isLoading: false,
  isValid: false,
}

const Button = styled.button<ButtonV2PropType>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 16px;
  color: ${p => p.isValid ? "#fff" : "rgba(255, 255, 255, 0.6)"};
  background: ${p => p.isValid ? "#04C35C" : "rgba(0, 0, 0, 0.2)"};
  outline: none;
  transition: background 0.3s ease;

  &:focus,
  &:active {
    outline: none;
  }
`;

const ButtonV2 = (props: ButtonV2PropType) => {
  const {isValid, onClick, children} = props;
  return (
    <Button
      type={"button"}
      onClick={onClick}
      isValid={isValid}
    >
      {children}
    </Button>
  )
};

ButtonV2.defaultProps = ButtonV2DefaultProps

export default ButtonV2