import * as simple from './simple';
import * as advanced from './advanced';

const selectors = {simple, advanced};

const displayQuestion = (state, calcType) => selectors[calcType].displayQuestion(state[calcType]);
const displayAnswer = (state, calcType) => selectors[calcType].displayAnswer(state[calcType]);
const currentState = (state, calcType) => state[calcType];

export {
  displayQuestion,
  displayAnswer,
  currentState
};
