import actionType from 'Actions/types';

const calculators = (state = 'simple', action) => {
  if(action.type === actionType.CALC_SWITCH)
    return action.calcType;
  return state;
}

export default calculators;
