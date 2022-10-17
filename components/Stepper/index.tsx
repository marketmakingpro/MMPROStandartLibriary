import React from 'react';

type StepperProps = {
  children: React.ReactNode[] | React.ReactNode
}

const Stepper = (props: StepperProps) => {
  const {children} = props
  return <>{children}</>
};

export default Stepper;