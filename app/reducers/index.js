import {combineReducers} from 'redux';
import calculator, * as calculatorSelectors from './calculator';

export default combineReducers({
  calculator,
});

// const getCalculatorState = (state) => (state.calculator);
const getCaclucatorDisplay = (state) => calculatorSelectors.getDisplay(state.calculator);

export {
  getCaclucatorDisplay,
};
