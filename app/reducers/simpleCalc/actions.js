import {actions as actionNames} from './transitions.graphml';
import {symbols, MAX_DISPLAY_DIGITS as maxLen} from 'Constants';
import {digitsCount} from './helpers';
import initialState from './initialState';

const actions = {

  [actionNames.READ_FIRST_DIGIT_TO_ACC]: (state, key) => { state.acc = key; },
  [actionNames.READ_FIST_SIGN_TO_ACC]:  (state)      => { state.acc = `${-(+(state.acc))}`; },
  [actionNames.READ_FIST_POINT_TO_ACC]: (state)      => { state.acc = '0.'; },
  [actionNames.INIT_READ_NEXT_BACK_TO_ACC]:  (state)      => { state.acc = '0'; },

  [actionNames.READ_FIRST_DIGIT_TO_ARG]: (state, key) => { state.arg = key; },
  [actionNames.READ_FIRST_SIGN_TO_ARG]:  (state)      => { state.arg = '0'; },
  [actionNames.READ_FIRST_POINT_TO_ARG]: (state)      => { state.arg = '0.'; },
  [actionNames.READ_FIRST_BACK_TO_ARG]:  (state)      => { state.arg = '0'; },
  
  [actionNames.READ_NEXT_DIGIT_TO_ACC]: (state, key) => {
    if(state.acc === '0'){
      state.acc = key;
    } else {
      if(digitsCount(state.acc + key) > maxLen) return;
      state.acc = state.acc + key;
    }
  },

  [actionNames.READ_NEXT_SIGN_TO_ACC]: (state) => {
    if( +state.acc !== 0 )
      state.acc = (state.acc[0] === '-') ? state.acc.slice(1) : `-${state.acc}`;
  },

  [actionNames.READ_NEXT_POINT_TO_ACC]: (state) => {  
    if( isNaN(+`${state.acc}.`) || digitsCount(state.acc) === maxLen ) return;
    state.acc = `${state.acc}.`;
  },

  [actionNames.READ_NEXT_BACK_TO_ACC]: (state) => {
    state.acc = state.acc.slice(0, -1);
    if(state.acc === '' || isNaN(+state.acc)) /*isNaN in case of '-'*/
      state.acc = '0';
  },

  [actionNames.READ_NEXT_DIGIT_TO_ARG]: (state, key) => {
    if(state.arg === '0'){
      state.result = state.arg = key;
    } else {
      if(digitsCount(state.arg + key) > maxLen) return;
      state.arg = state.result = state.arg + key;
    }
  },

  [actionNames.READ_NEXT_SIGN_TO_ARG]: (state) => {
    if( +state.arg !== 0 )
      state.result = state.arg = (state.arg[0] === '-') ? state.arg.slice(1) : `-${state.arg}`;
  },

  [actionNames.READ_NEXT_POINT_TO_ARG]: (state) => {  
    if( isNaN(+`${state.arg}.`) || digitsCount(state.arg) === maxLen ) return;
    state.result = state.arg = `${state.arg}.`;
  },

  [actionNames.READ_NEXT_BACK_TO_ARG]: (state) => {
    state.arg = state.arg.slice(0, -1);
    if(state.arg === '' || isNaN(+state.arg)) /*isNaN in case of '-'*/
      state.arg = '0';
    state.result = state.arg;
  },

  [actionNames.READ_OPERATOR]: (state, key) => {state.op = key},

  [actionNames.EVAL]: (state) => {
     switch(state.op){
      case symbols.PLUS:  state.acc = `${+state.acc + +state.arg}`; break;
      case symbols.MINUS: state.acc = `${+state.acc - +state.arg}`; break;
      case symbols.MUL:   state.acc = `${+state.acc * +state.arg}`; break;
      case symbols.DIV:   state.acc = `${+state.acc / +state.arg}`; break;
    }
    state.result = state.acc;
  },

  [actionNames.SET_IMPLICIT_ARG_TO_ACC]: (state) => {state.arg = state.acc},

  [actionNames.VALIDATE_RESULT]: (state) => {
    if(isNaN(+state.acc)){ /* in case of 0/0 */
      // state.acc = state.arg = '0';
      state.result = '0[Err]';
      return ERROR_ROUTE;
    }
    if(isFinite(+state.acc)){
      let intPart = Math.round(Math.abs(+state.acc));
      #- console.log('********');
      #- console.log(intPart);
      let intCount = digitsCount('' + intPart);
      if(intCount > maxLen){
        state.result = '0[Err]';
        return ERROR_ROUTE;
      }
      let fracCount = maxLen - intCount;
      let factor = Math.pow(10, fracCount);
      state.acc = '' + Math.round(factor * (+state.acc))/factor;
      #- console.log(state.acc);
    } else {
      state.result = `0[${((+state.acc > 0)?'+':'-')}Inf]`;
      return ERROR_ROUTE;
    }
  },

  [actionNames.RESET_STATE]: (state) => {
    state.acc = initialState.acc;
    state.arg = initialState.acc;
    state.op = initialState.op;
    state.result = initialState.display;
    state.name = initialState.name;
    state.operations = '0';
  },

  [actionNames.MEM_ADD_ACC]:     (state) => {state.mem += +state.acc},
  [actionNames.MEM_ADD_ARG]:     (state) => {state.mem += +state.arg},
  [actionNames.MEM_SUB_ACC]:     (state) => {state.mem -= +state.acc},
  [actionNames.MEM_SUB_ARG]:     (state) => {state.mem -= +state.arg},
  [actionNames.MEM_RESTORE_ACC]: (state) => {state.acc = `${state.mem}`},
  [actionNames.MEM_RESTORE_ARG]: (state) => {state.result = state.arg = `${state.mem}`},
  [actionNames.MEM_CLEAR]:       (state) => {state.mem = 0},
  [actionNames.SET_DISPLAY_RESULT_ACC]: (state) => {state.result = state.acc},
  [actionNames.SET_DISPLAY_RESULT_ARG]: (state) => {state.result = state.arg},
  [actionNames.SET_DISPLAY_OPERATIONS_ACC]: (state) => {state.operations = '' + +state.acc},
  [actionNames.NORMALIZE_ACC]: (state) => {state.acc = '' + +state.acc},
  [actionNames.SET_DISPLAY_OPERATIONS_ACC_OP]: (state) => {state.operations = '' + +state.acc + state.op},
  [actionNames.SET_DISPLAY_OPERATIONS_ACC_OP_ARG]: (state) => {state.operations = '' + state.acc + state.op + +state.arg},
};

export default actions;
