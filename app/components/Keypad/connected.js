import {connect} from 'react-redux';

import {currentCalculatorType} from 'Selectors';
import {calcReceiveKey} from 'Actions';

import Keypad from './Keypad';

const mapStateToProps = (state) => ({
  layout: currentCalculatorType(state),
});

const mapDispatchToProps = (dispatch) => ({
  send: (key) => dispatch(calcReceiveKey(key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Keypad);
