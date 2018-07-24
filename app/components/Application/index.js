import React from 'react';

// import ns from ;

import TopLayout  from 'Components/TopLayout';
import Menu       from 'Components/Menu';
import Header     from 'Components/Header';
import Logon      from 'Components/Logon';
import Calculator from 'Components/Calculator';

import './index.scss';

const CLS = require('Config/namespace.scss').Application;

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

