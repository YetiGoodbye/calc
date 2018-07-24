import React from 'react';

import classes from 'Config/namespace.scss';

import './index.scss';

const BUTTON_CLASS = classes.Button;

const Button = (props) => {
  return (
    <button className={`${BUTTON_CLASS}`}>{props.caption}</button>
  );
}

export default Button;
