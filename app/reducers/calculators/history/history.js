import actionType from 'Actions/types';

import records from './records';

const history = (state = {}, action) => {
  switch(action.type) {
    case actionType.HISTORY_NEW_RECORD:
    case actionType.HISTORY_REMOVE_RECORD:
      const {calcType} = action;
      return Object.assign( {}, {
        ...state,
        [calcType]: records(state[calcType], action),
      });
    default:
      return Object.assign( {}, {
        ...state,
        simple: records(state.simple, action),
        advanced: records(state.advanced, action),
      });
  }


  // if(action.type === actionType.HISTORY_NEW_RECORD) {
  //   const {calcType} = action;
  //   return Object.assign( {}, {
  //     ...state,
  //     [calcType]: records(state[calcType], action),
  //   });
  // }

  // return Object.assign( {}, {
  //   ...state,
  //   simple: records(state.simple, action),
  //   advanced: records(state.simple, action),
  // });
}

export default history;
