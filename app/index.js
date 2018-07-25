import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import configureStore from 'Config/store';

import './reset.scss';

import Application from 'Components/Application';

const store = configureStore();

document.addEventListener("DOMContentLoaded", () => {

  const approot = document.createElement('div');
  approot.className='approot'

  document.body.appendChild(approot);

  ReactDOM.render(
    <Provider store={store}>
      <Application/>
    </Provider>,
    approot  
  );

  approot.focus();
});
