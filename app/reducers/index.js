import {combineReducers} from 'redux';
import simpleCalc, * as simpleCalcSelectors from './simpleCalc';

export default combineReducers({
  simpleCalc,
});

// const getCalculatorState = (state) => (state.calculator);
const getSimpleCalcResult     = (state) => simpleCalcSelectors.getResult(state.simpleCalc);
const getSimpleCalcOperations = (state) => simpleCalcSelectors.getOperations(state.simpleCalc);

export {
  getSimpleCalcResult,
  getSimpleCalcOperations,
};
