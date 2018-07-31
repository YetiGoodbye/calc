import {combineReducers} from 'redux';
import calculator, * as calculatorSelectors from './calculator';

export default combineReducers({
  calculator,
});

// const getCalculatorState = (state) => (state.calculator);
const getCalculationResult     = (state) => calculatorSelectors.getResult(state.calculator);
const getDisplayOperations = (state) => calculatorSelectors.getOperations(state.calculator);

export {
  getCalculationResult,
  getDisplayOperations,
};
