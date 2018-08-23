import actionType from 'Actions/types';

import simple from './simple';
import advanced from './advanced';

const reducers = {simple, advanced};

const calculators = (state = {}, action) => {
  const {calcType} = action;


  switch(action.type) {
    case actionType.CALC_RECEIVE_KEY:
      return Object.assign( {}, {
        ...state,
        [calcType]: reducers[calcType](state[calcType], action),
      });

    case actionType.CALC_LOAD_STATE_FROM_HISTORY:
      return Object.assign( {}, {
        ...state,
        [calcType]: reducers[calcType](state[calcType], action),
    });

    default:
      return Object.assign( {}, {
        ...state,
        simple: simple(state.simple, action),
        advanced: advanced(state.advanced, action),
      });
  }

}

export default calculators;
