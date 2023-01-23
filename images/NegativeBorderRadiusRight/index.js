import React from 'react';

// Import colors from constants or use currentColor
// If icon uses more than one adjustable color you can pass colors from props
// BUT you must always provide default values for color props

export default () => {
    return (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M31 0H32V32H0V31V31C17.1208 31 31 17.1208 31 0V0Z" fill="white"/>
        <path d="M0 31V31C16.9237 31 30.7189 17.4254 30.9919 0.503965L31 0H32V0C32 17.6731 17.6731 32 0 32V32V31Z" fill="#E8E8EB"/>
      </svg>
    );
};
