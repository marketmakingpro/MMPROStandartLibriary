import React from "react";
import "./index.scss";

// CONSTANTS

// DEFAULT FUNCTIONS

// TODO: copy this components directory and add your content to make your page

interface SimpleLabelContainerPropType {
  // You should declare props like this, delete this if you don't need props
  displayAsLabel?: boolean
  id?: string
  label?: string
  children: string | React.ReactNode
  width?: string
}

const SimpleLabelContainerDefaultProps = {
  width: '100%'
}

const SimpleLabelContainer = (props: SimpleLabelContainerPropType) => {
  const {
    label,
    id,
    displayAsLabel,
    children,
    width
  } = props;


  return (
    <section
      className={`relative simple-input-form ${displayAsLabel ? 'display-as-label' : ''}`}
      style={{width: `${width}`}}
    >
      {label &&
        <label htmlFor={id} className={"simple-input-label"}>
          {label}
        </label>
      }
      {children}
    </section>
  );
};

SimpleLabelContainer.defaultProps = SimpleLabelContainerDefaultProps;

export default SimpleLabelContainer;