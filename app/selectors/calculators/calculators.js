import * as type from './type';
import * as calculator from './calculator';
import * as history from './history';

const currentType = state => type.current(state.type);
const displayQuestion = (state, calcType) => calculator.displayQuestion(state.calculator, calcType);
const displayAnswer = (state, calcType) => calculator.displayAnswer(state.calculator, calcType);
const currentCalculatorState = (state, calcType) => calculator.currentState(state.calculator, calcType);
const historyRecords = (state, calcType) => history.records(state.history, calcType);
const historyRecord = (state, calcType, id) => history.record(state.history, calcType, id);

export {
  currentType,
  displayQuestion,
  displayAnswer,
  historyRecords,
  historyRecord,
  currentCalculatorState,
};
