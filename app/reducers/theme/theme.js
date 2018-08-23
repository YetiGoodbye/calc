import actionType from 'Actions/types';

const theme = (state = 'dark', action) => {
  switch(action.type){

    case actionType.THEME_SWITCH:
      return action.theme;

    default:
      return state;
  }
}

export default theme;
