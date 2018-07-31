import shallowCopy from 'Utils/shallowCopy';
// import {SYMBOLS} from 'Constants';
import actionType from 'Actions/types';

// import states from './states';
import initialState from './initialState';
import doStateTransition from './stateTransitions';


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

