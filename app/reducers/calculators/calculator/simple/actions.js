import {actions} from './transitions.graphml';
import {captions, classNameSuffix} from 'Config/calculator/button';
import initialState from './initialState';

const maxLen = 16;
const digitsCount = string => string.split(/[-.]/).join('').length;

export default {

  [actions.READ_FIRST_DIGIT_TO_ACC]: (state, key) => { state.accumulator = captions[key]; },
  [actions.READ_FIRST_SIGN_TO_ACC]:  (state)      => { state.accumulator = `${-(+(state.accumulator))}`; },
  [actions.READ_FIRST_POINT_TO_ACC]: (state)      => { state.accumulator = '0.'; },
  [actions.READ_FIRST_BACK_TO_ACC]:  (state)      => { state.accumulator = '0'; },

  [actions.READ_FIRST_DIGIT_TO_ARG]: (state, key) => { state.argument = captions[key]; },
  [actions.READ_FIRST_SIGN_TO_ARG]:  (state)      => { state.argument = '0'; },
  [actions.READ_FIRST_POINT_TO_ARG]: (state)      => { state.argument = '0.'; },
  [actions.READ_FIRST_BACK_TO_ARG]:  (state)      => { state.argument = '0'; },
  
  [actions.READ_NEXT_DIGIT_TO_ACC]: (state, key) => {
    if(state.accumulator === '0'){
      state.accumulator = captions[key];
    } else {
      const newacc = state.accumulator + captions[key];
      if(digitsCount(newacc) > maxLen) return;
      state.accumulator = newacc;
    }
  },

  [actions.READ_NEXT_SIGN_TO_ACC]: (state) => {
    if( +state.accumulator !== 0 )
      state.accumulator = (state.accumulator[0] === '-') ? state.accumulator.slice(1) : `-${state.accumulator}`;
  },

  [actions.READ_NEXT_POINT_TO_ACC]: (state) => {  
    if( isNaN(+`${state.accumulator}.`) || digitsCount(state.accumulator) === maxLen ) return;
    state.accumulator = `${state.accumulator}.`;
  },

  [actions.READ_NEXT_BACK_TO_ACC]: (state) => {
    state.accumulator = state.accumulator.slice(0, -1);
    if(state.accumulator === '' || isNaN(+state.accumulator)) /*isNaN in case of '-'*/
      state.accumulator = '0';
  },

  [actions.READ_NEXT_DIGIT_TO_ARG]: (state, key) => {
    if(state.argument === '0'){
      state.answer = state.argument = captions[key];
    } else {
      const newarg = state.argument + captions[key];
      if(digitsCount(newarg) > maxLen) return;
      state.argument = state.answer = newarg;
    }
  },

  [actions.READ_NEXT_SIGN_TO_ARG]: (state) => {
    if( +state.argument !== 0 )
      state.answer = state.argument = (state.argument[0] === '-') ? state.argument.slice(1) : `-${state.argument}`;
  },

  [actions.READ_NEXT_POINT_TO_ARG]: (state) => {  
    if( isNaN(+`${state.argument}.`) || digitsCount(state.argument) === maxLen ) return;
    state.answer = state.argument = `${state.argument}.`;
  },

  [actions.READ_NEXT_BACK_TO_ARG]: (state) => {
    state.argument = state.argument.slice(0, -1);
    
    /*
    *  '1' + 'back' => ''
    *  '-1' + 'back' => '-': isNanN
    *  '1.23e+4' + 'back' => '1.23e+': isNanN
    */
    if(state.argument === '' || isNaN(+state.argument)) 
      state.argument = '0';
    state.answer = state.argument;
  },

  [actions.READ_OPERATOR]: (state, key) => {state.operation = key;},

  [actions.EVAL]: (state) => {
     switch(state.operation){
      case classNameSuffix.ADD: state.accumulator = `${+state.accumulator + +state.argument}`; break;
      case classNameSuffix.SUB: state.accumulator = `${+state.accumulator - +state.argument}`; break;
      case classNameSuffix.MUL: state.accumulator = `${+state.accumulator * +state.argument}`; break;
      case classNameSuffix.DIV: state.accumulator = `${+state.accumulator / +state.argument}`; break;
    }
    state.answer = state.accumulator;
  },

  [actions.SET_IMPLICIT_ARG_TO_ACC]: (state) => {state.argument = state.accumulator},

  [actions.VALIDATE_RESULT]: (state) => {
    
    if(isNaN(+state.accumulator)){ /* in case of 0/0 */
      state.answer = '0[Err]';
      state.error = true;
      return actions.VALIDATE_RESULT /* alternative route name */;
    }

    if(isFinite(+state.accumulator)){
      let intPart = Math.round(Math.abs(+state.accumulator));
      let intCount = digitsCount('' + intPart);
      /*if(intCount > maxLen){
        state.answer = '0[Err]';
        state.error = true;
        return actions.VALIDATE_RESULT;
      }
      let fracCount = maxLen - intCount;
      let factor = Math.pow(10, fracCount);
      state.accumulator = '' + Math.round(factor * (+state.accumulator))/factor;*/
      state.error = false;    
    } else {    
      state.answer = `Err[${((+state.accumulator > 0)?'+':'-')}Inf]`;
      state.error = true;
      return actions.VALIDATE_RESULT;
    }
  },

  [actions.RESET_STATE]: (state) => {
    state.accumulator = initialState.accumulator;
    state.argument    = initialState.argument;
    state.operation   = initialState.operation;
    state.answer      = initialState.answer;
    state.name        = initialState.name;
    state.question    = initialState.question;
  },

  [actions.MEM_ADD_ACC]:     (state) => {state.memory += +state.accumulator},
  [actions.MEM_ADD_ARG]:     (state) => {state.memory += +state.argument},
  [actions.MEM_SUB_ACC]:     (state) => {state.memory -= +state.accumulator},
  [actions.MEM_SUB_ARG]:     (state) => {state.memory -= +state.argument},
  [actions.MEM_RESTORE_ACC]: (state) => {state.accumulator = `${state.memory}`},
  [actions.MEM_RESTORE_ARG]: (state) => {state.answer = state.argument = `${state.memory}`},
  [actions.MEM_CLEAR]:       (state) => {state.memory = 0},

  [actions.NORMALIZE_ACC]: (state) => {state.accumulator = '' + +state.accumulator},

  [actions.SET_DISPLAY_RESULT_ACC]: (state) => {state.answer = state.accumulator},
  [actions.SET_DISPLAY_RESULT_ARG]: (state) => {state.answer = state.argument},
  
  [actions.SET_DISPLAY_OPERATIONS_ACC]:
    (state) => {state.question = '' + +state.accumulator},
  [actions.SET_DISPLAY_OPERATIONS_ACC_OP]:
    (state) => {state.question = '' + +state.accumulator + captions[state.operation]},
  [actions.SET_DISPLAY_OPERATIONS_ACC_OP_ARG]:
    (state) => {state.question = '' + +state.accumulator + captions[state.operation] + +state.argument},
};
