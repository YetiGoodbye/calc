import React from 'react';

// import ns from ;

import TopLayout from '../TopLayout';
import Menu from '../Menu';
import Header from '../Header';
import Logon from '../Logon';
import Calculator from '../Calculator';

import './index.scss';

const CLS = require('../../config/namespace.scss').Application;

const Application = () => {
  return (
    <TopLayout>
      <Header     key='header' />
      <Menu       key='menu' />
      <Logon      key='logon' />
      <Calculator key='content' />
    </TopLayout>
  );
}

export default Application;

