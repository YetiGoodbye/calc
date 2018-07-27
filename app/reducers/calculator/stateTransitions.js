import {SYMBOLS as symbol, MAX_DISPLAY_DIGITS as maxLen} from 'Constants';
import initialState from './initialState';
import shallowCopy from 'Utils/shallowCopy';

import {
  stateNames  as state,
  actionNames as action,
  keyTypes    as keyType
} from './constants';

const transitionRoutes = {
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
    [keyType.OPERATOR]: [action.EVAL, action.READ_OP, action.VALIDATE_RESULT, state.READ_OP], ///!!!!!!!!!!!!!!!!! VALIDATE_RESULT
    [keyType.EVAL]:     [action.EVAL, action.VALIDATE_RESULT,                 state.INIT],
    [keyType.RESET]:    [action.RESET_STATE,          state.INIT],
  },
};

const digitsCount = (string) => (string.split(/[-.]/).join('').length);

const transitionActions = {

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
      state.acc = state.arg = '0';
      state.display = '0[Err]';
    }
    if(isFinite(+state.acc)){
      if(digitsCount(state.acc) > maxLen){
        state.acc = state.arg = '0';
        state.display = '0[Err]';
      }
    } else {
      state.display = `0[${((+state.acc > 0)?'+':'-')}Inf]`;
      state.acc = state.arg = '0';
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

export const doStateTransition = (state, key) => {
console.group('----------------');
  let actions = transitionRoutes [state.name] [getKeyType(key)];
  let nextStateName = actions.pop();
  
  actions.forEach(
    function(actionName){
      console.log(actionName);
      transitionActions[actionName](state, key);
      console.log(state);
    }
  );

  actions.push(nextStateName);
console.groupEnd();
  state.name = nextStateName;
  return state;
};

export default doStateTransition;
