import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';

// import configureStore from './init/store';

import './reset.scss';

import Application from './components/Application';
// import Calculator from './components/Calculator';

document.addEventListener("DOMContentLoaded", () => {

  const approot = document.createElement('div');
  approot.className='approot'

  
  // approot.setAttribute('tabindex', 1);

  document.body.appendChild(approot);

  ReactDOM.render(
    <Application/>,
    approot  
  );

  approot.focus();
});
