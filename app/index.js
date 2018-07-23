import React from 'react';
import ReactDOM from 'react-dom';

import './reset.scss';

import Application from './components/Application';

document.addEventListener("DOMContentLoaded", () => {

  const approot = document.createElement('div');
  approot.className='approot'

  document.body.appendChild(approot);

  ReactDOM.render(
    <Application/>,
    approot  
  );

  approot.focus();
});
