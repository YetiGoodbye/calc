import types from './types';
import * as selectors from 'Selectors';
import classNameSuffix from 'Config/calculator/button/classNameSuffix';

const calcReceiveKey = (key) => (dispatch, getState) => {

  let state = getState();
  const calcType = selectors.currentCalculatorType(state);

  dispatch({
    type: types.CALC_RECEIVE_KEY,
    calcType,
    key,
  });

  if(key === classNameSuffix.EVAL){
    state = getState();
    const currentCalculatorState = selectors.currentCalculatorState(state, calcType);
    dispatch({
      type: types.HISTORY_NEW_RECORD,
      calcType,
      currentCalculatorState,
    });
  }
};

const removeRecord = (id) => (dispatch, getState) => {
  const state = getState();
  const calcType = selectors.currentCalculatorType(state);

  dispatch({
    type: types.HISTORY_REMOVE_RECORD,
    calcType,
    id,
  });
}

const loadRecord = (id) => (dispatch, getState) => {
  const state = getState();
  const calcType = selectors.currentCalculatorType(state);
  const loadCalculatorState = selectors.historyRecord(state, calcType, id);
  dispatch({
    type: types.CALC_LOAD_STATE_FROM_HISTORY,
    calcType,
    loadCalculatorState,
  });
}

export {
  calcReceiveKey,
  removeRecord,
  loadRecord,
};
