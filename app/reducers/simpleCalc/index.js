import shallowCopy from 'Utils/shallowCopy';
import actionType from 'Actions/types';

import initialState from './initialState';
import doStateTransition from './transitions';

const calculator = (state = initialState, action) => {
  switch(action.type){

    case actionType.CALC_RECEIVE_KEY:
      return doStateTransition(shallowCopy(state), action.key);

    default:
      return state;
  }
}

export default calculator;

// SELECTORS
const getResult = (state) => (state.result);
const getOperations = (state) => (state.operations);

export {getResult, getOperations};

