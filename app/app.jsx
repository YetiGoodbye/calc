import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import createStore from 'Store';
import Application from 'Components/Application';

// import Main from 'Components/Main';

import './app.scss';

document.addEventListener("DOMContentLoaded", () => {

  const approot = document.createElement('div');
  document.body.appendChild(approot);

  ReactDOM.render(
    (
      <Provider store={createStore()}>
        <Application
          klassName='application'
          bodyClass='main' />
      </Provider>
    ),
    approot
  );

  approot.focus();
});
