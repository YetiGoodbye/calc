import React from 'react';
import PropTypes from 'prop-types';

import ComponentWithClassesHelper from 'Components/ComponentWithClassesHelper';

import History from 'Components/History';
import Display from 'Components/Display';
import Keypad from 'Components/Keypad';

class CalculatorMath extends ComponentWithClassesHelper{
  render(){
    const {classes} = this;
    const {theme} = this.props;
    return (
      <div {...classes()}>
        <div {...classes('history')}>
          <History klassName='history' />
        </div>
        <div {...classes('calc', `theme-${theme}`)}>
          <div {...classes('display')}>
            <Display klassName='display' />
          </div>
          <div {...classes('keypad')}>
            <Keypad klassName='keypad'/>
          </div>
        </div>
      </div>
    );
  }
}

CalculatorMath.propTypes = {
  theme: PropTypes.string,
};

export default CalculatorMath;
