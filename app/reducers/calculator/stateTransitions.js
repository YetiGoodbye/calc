import {SYMBOLS as symbol, MAX_DISPLAY_DIGITS as maxLen} from 'Constants';
import initialState from './initialState';
import shallowCopy from 'Utils/shallowCopy';

import {
  stateNames  as state,
  actionNames as action,
  keyTypes    as keyType
} from './constants';

const ERROR_ROUTE = 'ERROR_ROUTE';


// When receive a key each state perform some actions and switches itself to next state. That is called route
const normalRoutes = {
  [state.INIT]:{
    [keyType.DIGIT]:       [action.INIT_READ_ACC_DIGIT, state.READ_ACC],
    [keyType.SIGN]:        [action.INIT_READ_ACC_SIGN,  state.READ_ACC],
    [keyType.POINT]:       [action.INIT_READ_ACC_POINT, state.READ_ACC],
    [keyType.BACK]:        [action.INIT_READ_ACC_BACK,  state.READ_ACC],
    [keyType.OPERATOR]:    [action.READ_OP,             state.READ_OP],
    [keyType.EVAL]:        [action.EVAL, action.VALIDATE_RESULT,               state.INIT],
    [keyType.RESET]:       [action.RESET_STATE,         state.INIT],
  },

  [state.READ_ACC]: {
    [keyType.DIGIT]:       [action.READ_ACC_DIGIT, state.READ_ACC],
    [keyType.SIGN]:        [action.READ_ACC_SIGN,  state.READ_ACC],
    [keyType.POINT]:       [action.READ_ACC_POINT, state.READ_ACC],
    [keyType.BACK]:        [action.READ_ACC_BACK,  state.READ_ACC],
    [keyType.OPERATOR]:    [action.READ_OP,        state.READ_OP],
    [keyType.EVAL]:        [action.EVAL, action.VALIDATE_RESULT,           state.INIT],
    [keyType.RESET]:       [action.RESET_STATE,    state.INIT],
  },

  [state.READ_OP]: {
    [keyType.DIGIT]:    [action.INIT_READ_ARG_DIGIT,           state.READ_ARG],
    [keyType.SIGN]:     [action.INIT_READ_ARG_SIGN,            state.READ_ARG],
    [keyType.POINT]:    [action.INIT_READ_ARG_POINT,           state.READ_ARG],
    [keyType.BACK]:     [action.INIT_READ_ARG_BACK,            state.READ_ARG],
    [keyType.OPERATOR]: [action.READ_OP,                       state.READ_OP],
    [keyType.EVAL]:     [action.EVAL_WITHOUT_ARG, action.EVAL, action.VALIDATE_RESULT, state.READ_ACC],
    [keyType.RESET]:    [action.RESET_STATE,                   state.INIT],
  },

  [state.READ_ARG]: {
    [keyType.DIGIT]:    [action.READ_ARG_DIGIT,       state.READ_ARG],
    [keyType.SIGN]:     [action.READ_ARG_SIGN,        state.READ_ARG],
    [keyType.POINT]:    [action.READ_ARG_POINT,       state.READ_ARG],
    [keyType.BACK]:     [action.READ_ARG_BACK,        state.READ_ARG],
    [keyType.OPERATOR]: [action.EVAL, action.READ_OP, action.VALIDATE_RESULT, state.READ_OP],
    [keyType.EVAL]:     [action.EVAL, action.VALIDATE_RESULT,                 state.INIT],
    [keyType.RESET]:    [action.RESET_STATE,          state.INIT],
  },

  [state.ERROR]: {
    [keyType.DIGIT]:    [state.ERROR],
    [keyType.SIGN]:     [state.ERROR],
    [keyType.POINT]:    [state.ERROR],
    [keyType.BACK]:     [state.ERROR],
    [keyType.OPERATOR]: [state.ERROR],
    [keyType.EVAL]:     [state.ERROR],
    [keyType.RESET]:    [action.RESET_STATE, state.INIT],
  }
};

// Each action can alter normal route. In this case action returns alternative route name
const alternativeRoutes = {
  [ERROR_ROUTE]: [state.ERROR],
};

// Counts digits in string
const digitsCount = (string) => (string.split(/[-.]/).join('').length);


const actions = {

  [action.INIT_READ_ACC_DIGIT]: (state, key) => { state.acc = state.display = key; },
  [action.INIT_READ_ACC_SIGN]:  (state)      => { state.acc = state.display = `${-(+(state.acc))}`; },
  [action.INIT_READ_ACC_POINT]: (state)      => { state.acc = state.display = '0.'; },
  [action.INIT_READ_ACC_BACK]:  (state)      => { state.acc = state.display = '0'; },

  [action.INIT_READ_ARG_DIGIT]: (state, key) => { state.arg = state.display = key; },
  [action.INIT_READ_ARG_SIGN]:  (state)      => { state.arg = state.display = '0'; },
  [action.INIT_READ_ARG_POINT]: (state)      => { state.arg = state.display = '0.'; },
  [action.INIT_READ_ARG_BACK]:  (state)      => { state.arg = state.display = '0'; },
  
  [action.READ_ACC_DIGIT]: (state, key) => {
    if(state.acc === '0'){
      state.display = state.acc = key;
    } else {
      if(digitsCount(state.acc + key) > maxLen) return;
      state.acc = state.display = state.acc + key;
    }
  },

  [action.READ_ACC_SIGN]: (state) => {
    if( +state.acc !== 0 )
      state.display = state.acc = (state.acc[0] === '-') ? state.acc.slice(1) : `-${state.acc}`;
  },

  [action.READ_ACC_POINT]: (state) => {  
    if( isNaN(+`${state.acc}.`) || digitsCount(state.acc) === maxLen ) return;
    state.display = state.acc = `${state.acc}.`;
  },

  [action.READ_ACC_BACK]: (state) => {
    state.acc = state.acc.slice(0, -1);
    if(state.acc === '' || isNaN(+state.acc)) /*isNaN in case of '-'*/
      state.acc = '0';
    state.display = state.acc;
  },

  [action.READ_ARG_DIGIT]: (state, key) => {
    if(state.arg === '0'){
      state.display = state.arg = key;
    } else {
      if(digitsCount(state.arg + key) > maxLen) return;
      state.arg = state.display = state.arg + key;
    }
  },

  [action.READ_ARG_SIGN]: (state) => {
    if( +state.arg !== 0 )
      state.display = state.arg = (state.arg[0] === '-') ? state.arg.slice(1) : `-${state.arg}`;
  },

  [action.READ_ARG_POINT]: (state) => {  
    if( isNaN(+`${state.arg}.`) || digitsCount(state.arg) === maxLen ) return;
    state.display = state.arg = `${state.arg}.`;
  },

  [action.READ_ARG_BACK]: (state) => {
    state.arg = state.arg.slice(0, -1);
    if(state.arg === '' || isNaN(+state.arg)) /*isNaN in case of '-'*/
      state.arg = '0';
    state.display = state.arg;
  },

  [action.READ_OP]: (state, key) => {state.op = key},

  [action.EVAL]: (state) => {
     switch(state.op){
      case symbol.PLUS:  state.acc = `${+state.acc + +state.arg}`; break;
      case symbol.MINUS: state.acc = `${+state.acc - +state.arg}`; break;
      case symbol.MUL:   state.acc = `${+state.acc * +state.arg}`; break;
      case symbol.DIV:   state.acc = `${+state.acc / +state.arg}`; break;
    }
    state.display = state.acc;
  },

  [action.EVAL_WITHOUT_ARG]: (state) => {state.arg = state.acc},

  [action.VALIDATE_RESULT]: (state) => {
    if(isNaN(+state.acc)){ /* in case of 0/0 */
      // state.acc = state.arg = '0';
      state.display = '0[Err]';
      return ERROR_ROUTE;
    }
    if(isFinite(+state.acc)){
      if(digitsCount(state.acc) > maxLen){
        // state.acc = state.arg = '0';
        state.display = '0[Err]';
        return ERROR_ROUTE;
      }
    } else {
      state.display = `0[${((+state.acc > 0)?'+':'-')}Inf]`;
      // state.acc = state.arg = '0';
      return ERROR_ROUTE;
    }
  },

  [action.RESET_STATE]: (state) => {
    state.acc = initialState.acc;
    state.arg = initialState.acc;
    state.op = initialState.op;
    state.display = initialState.display;
    state.name = initialState.name;
  },
};

const digits = [
    symbol.D0, symbol.D1, symbol.D2, symbol.D3, symbol.D4,
    symbol.D5, symbol.D6, symbol.D7, symbol.D8, symbol.D9,
];
const operators = [symbol.PLUS, symbol.MINUS, symbol.MUL, symbol.DIV];

const getKeyType = (key) => {
  if(digits.includes(key)) return keyType.DIGIT;
  if(operators.includes(key)) return keyType.OPERATOR;
  switch(key){
    case symbol.SIGN:  return keyType.SIGN;
    case symbol.POINT: return keyType.POINT;
    case symbol.BACK:  return keyType.BACK;
    case symbol.EVAL:  return keyType.EVAL;
    case symbol.RESET: return keyType.RESET;
  }
}

// Walks through routing nodes (except last which is the next state name) and call actions.
// If action returns value, then recursively switches to that route.
// Finally return last node.
const walkThrough = (route, state, key) => {
  let i=0;
  let alternativeRouteName;
  while(i<route.length-1){
    if (alternativeRouteName = actions [route[i++]] (state, key)){
      return walkThrough(alternativeRoutes[alternativeRouteName], state, key);
    }
  }
  return route[i]; /*last node, next state name*/
};

export const doStateTransition = (state, key) => {
  let route = normalRoutes [state.name] [getKeyType(key)];
  state.name = walkThrough(route, state, key);
  return state;
};

export default doStateTransition;
