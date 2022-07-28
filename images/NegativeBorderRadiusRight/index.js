import React from 'react';

// Import colors from constants or use currentColor
// If icon uses more than one adjustable color you can pass colors from props
// BUT you must always provide default values for color props

export default () => {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 19C10.9411 19 19 10.9411 19 1V0V18L19.5 19.5L18 19H0H1Z" fill="#606274"/>
      </svg>
    );
};
