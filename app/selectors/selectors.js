import * as themeSelector from './theme';
import * as calculators from './calculators';

const theme = state => themeSelector.get(state.theme);

const currentCalculatorType = state => calculators.currentType(state.calculators);
const displayQuestion = (state, calcType) => calculators.displayQuestion(state.calculators, calcType);
const displayAnswer = (state, calcType) => calculators.displayAnswer(state.calculators, calcType);
const historyRecords = (state, calcType) => calculators.historyRecords(state.calculators, calcType);
const historyRecord = (state, calcType, id) => calculators.historyRecord(state.calculators, calcType, id);
const currentCalculatorState = (state, calcType) => calculators.currentCalculatorState(state.calculators, calcType);

export {
  theme,
  currentCalculatorType,
  displayQuestion,
  displayAnswer,
  historyRecords,
  historyRecord,
  currentCalculatorState,
};
