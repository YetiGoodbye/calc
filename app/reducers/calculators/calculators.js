import {combineReducers} from 'redux';

import type from './type';
import history from './history';
import calculator from './calculator';

export default combineReducers({
  type,
  history,
  calculator,
});

