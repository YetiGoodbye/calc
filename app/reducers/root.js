import {combineReducers} from 'redux';

import theme from './theme';
import calculators from './calculators';

export default combineReducers({
  theme,
  calculators,
});

