import {shallowCopy} from 'Utils';
import actionType from 'Actions/types';

import initialState from './initialState';
import doStateTransition from './transitions';

const simple = (state = initialState, action) => {
  switch(action.type){

    case actionType.CALC_RECEIVE_KEY:
      return doStateTransition(shallowCopy(state), action.key);

    case actionType.CALC_LOAD_STATE_FROM_HISTORY:
      const {
        id,
        name,
        accumulator,
        argument,
        operation,
        answer,
        question
      } = action.loadCalculatorState;
      return {
        name,
        accumulator,
        argument,
        operation,
        answer,
        question,
        memory: state.memory,
        error: false,
      }

    default:
      return state;
  }
}

export default simple;

