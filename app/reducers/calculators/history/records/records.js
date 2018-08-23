import uniqid from 'uniqid';

import actionType from 'Actions/types';
import classNameSuffix from 'Config/calculator/button/classNameSuffix';

const records = (state = [], action) => {

  switch(action.type) {
    case actionType.HISTORY_NEW_RECORD:
      const {currentCalculatorState} = action;
      if(currentCalculatorState.error)
        return state;
      const {
        name,
        accumulator,
        argument,
        operation,
        answer,
        question
      } = currentCalculatorState;
      const id = uniqid();
      return [
        ...state,
        {
          id,
          name,
          accumulator,
          argument,
          operation,
          answer,
          question
        },
      ];

    case actionType.HISTORY_REMOVE_RECORD:
      const index = state.findIndex( record => record.id === action.id );
      return state.filter( (e,i) => i!==index );

    default:
      return state;
  }


}

export default records;
