import {SYMBOL as SM, STATE as ST, SIGNAL as SG} from './constants';

const MAXLEN = 16;

const INITIAL_STATE = {
  denotation: ST.WAIT_ACC_START,
  acc: '',
  arg: '',
  op: '+',
  display: '0',
};

export const initialState = () => Object.assign({}, INITIAL_STATE);


/* FINITE STATE MACHINE TABLE*/
const FSM = {

  /********* R E S E T ************/
  [ST.RESET]: {
    process: (state, s) => {Object.assign(state, INITIAL_STATE);},
    next: ST.WAIT_ACC_START,
  },



  /********* W A I T   A C C   S T A R T ************/
  [ST.WAIT_ACC_START]: {
    [SG.NUMERIC]:  { next: ST.READ_ACC_START },
    [SG.OPERATOR]: { next: ST.READ_OP },
    [SG.EVAL]:     { next: ST.EVAL },
    [SG.RESET]:    { next: ST.RESET },
  },

  /********* R E A D   A C C   S T A R T ************/
  [ST.READ_ACC_START]: {
    process: {
      [SG.SIGN]:  (state, signal) => { state.acc = state.display = `${-(+(state.display))}`; },
      [SG.POINT]: (state, signal) => { state.acc = state.display = '0.'; },
      [SG.BACK]:  (state, signal) => { state.acc = state.display = '0'; },
      [SG.DIGIT]: (state, signal) => { state.acc = state.display = signal; }
    },
    next: ST.WAIT_ACC, 
  },

  /********* W A I T   A C C ************/
  [ST.WAIT_ACC]: {
    [SG.NUMERIC]:  { next: ST.READ_ACC },
    [SG.OPERATOR]: { next: ST.READ_OP },
    [SG.EVAL]:     { next: ST.EVAL },
    [SG.RESET]:    { next: ST.RESET },
  },

  /********* R E A D   A C C ************/
  [ST.READ_ACC]: {
    process: {
      [SG.SIGN]: (state, signal) => {
        if( +state.acc !== 0 )
          state.display = state.acc = (state.acc[0] === '-') ? state.acc.slice(1) : `-${state.acc}`;
      },
      [SG.POINT]: (state, signal) => {  
        if(!isNaN(+`${state.acc}.`))
          state.display = state.acc = `${state.acc}.`;
      },
      [SG.BACK]: (state, signal) => {
        state.acc = state.acc.slice(0, -1);
        if(state.acc === '' || isNaN(+state.acc))
          state.acc = '0';
        state.display = state.acc;
      },
      [SG.DIGIT]: (state, signal) => {
        if(state.acc === '0'){
          state.display = state.acc = signal;
        } else {
          let text = state.acc + signal;
          if(text.split(/[-.]/).join('').length <= MAXLEN)
            state.acc = state.display = text;
        }
      },
    },
    next: ST.WAIT_ACC,
  },



  /********* R E A D   O P ************/
  [ST.READ_OP]: {
    process: (state, signal) => {state.op = signal},
    next: ST.WAIT_OP,
  },

  /********* W A I T   O P ************/
  [ST.WAIT_OP]: {
    [SG.NUMERIC]:  { next: ST.READ_ARG_START },
    [SG.OPERATOR]: { next: ST.READ_OP },
    [SG.EVAL]:     { next: ST.EVAL_NOARG },
    [SG.RESET]:    { next: ST.RESET },
  },



  /********* R E A D   A R G   S T A R T ************/
  [ST.READ_ARG_START]: {
    process: {
      [SG.SIGN]:  (state, signal) => { state.arg = state.display = '0'; },
      [SG.POINT]: (state, signal) => { state.arg = state.display = '0.'; },
      [SG.BACK]:  (state, signal) => { state.arg = state.display = '0'; },
      [SG.DIGIT]: (state, signal) => { state.arg = state.display = signal; }
    },
    next: ST.WAIT_ARG,
  },

  /********* W A I T   A R G ************/
  [ST.WAIT_ARG]: {
    [SG.NUMERIC]:  { next: ST.READ_ARG },
    [SG.OPERATOR]: { next: ST.EVAL_OP },
    [SG.EVAL]:     { next: ST.EVAL},
    [SG.RESET]:    { next: ST.RESET },
  },

  /********* R E A D   A R G ************/
  [ST.READ_ARG]: {
    process: {
      [SG.SIGN]: (state, signal) => {
        if( +state.arg !== 0 )
          state.display = state.arg = (state.arg[0] === '-') ? state.arg.slice(1) : `-${state.arg}`;
      },
      [SG.POINT]: (state, signal) => {  
        if(!isNaN(+`${state.arg}.`))
          state.display = state.arg = `${state.arg}.`;
      },
      [SG.BACK]: (state, signal) => {
        state.arg = state.arg.slice(0, -1);
        if(state.arg === '' || isNaN(+state.arg))
          state.arg = '0';
        state.display = state.arg;
      },
      [SG.DIGIT]: (state, signal) => {
        if(state.arg === '0'){
          state.display = state.arg = signal;
        } else {
          let text = state.arg + signal;
          if(text.split(/[-.]/).join('').length <= MAXLEN)
            state.arg = state.display = text;
        }
      },
    },
    next: ST.WAIT_ARG,
  },

  /********* E V A L ************/
  [ST.EVAL]: {
    process: (state, signal) => {
      switch(state.op){
        case SG.PLUS:  state.acc = `${+state.acc + +state.arg}`; break;
        case SG.MINUS: state.acc = `${+state.acc - +state.arg}`; break;
        case SG.MUL:   state.acc = `${+state.acc * +state.arg}`; break;
        case SG.DIV:   state.acc = `${+state.acc / +state.arg}`; break;
      }
      state.display = state.acc;
    },
    next: ST.WAIT_ACC,
  },


  /********* E V A L ************/
  [ST.EVAL]: {
    process: (state, signal) => {
      switch(state.op){
        case SG.PLUS:  state.acc = `${+state.acc + +state.arg}`; break;
        case SG.MINUS: state.acc = `${+state.acc - +state.arg}`; break;
        case SG.MUL:   state.acc = `${+state.acc * +state.arg}`; break;
        case SG.DIV:   state.acc = `${+state.acc / +state.arg}`; break;
      }
      state.display = state.acc;
    },
    next: ST.WAIT_ACC_START,
  },

  /********* E V A L   O P ************/
  [ST.EVAL_OP]: {
    process: (state, signal) => {
      switch(state.op){
        case SG.PLUS:  state.acc = `${+state.acc + +state.arg}`; break;
        case SG.MINUS: state.acc = `${+state.acc - +state.arg}`; break;
        case SG.MUL:   state.acc = `${+state.acc * +state.arg}`; break;
        case SG.DIV:   state.acc = `${+state.acc / +state.arg}`; break;
      }
      state.display = state.acc;
    },
    next: ST.READ_OP,
  },

  /********* E V A L   O P ************/
  [ST.EVAL_NOARG]: {
    process: (state, signal) => {state.arg = state.acc},
    next: ST.EVAL,
  },
};




const DIGITS = [SM.D0, SM.D1, SM.D2, SM.D3, SM.D4, SM.D5, SM.D6, SM.D7, SM.D8, SM.D9];
const REFINED_TYPES = {
  [SG.DIGIT]:  DIGITS,
  [SG.POINT]: [SM.POINT],
  [SG.SIGN]:  [SM.SIGN],
  [SG.BACK]:  [SM.BACK],
  [SG.PLUS]:  [SG.PLUS],
  [SG.MINUS]: [SG.MINUS],
  [SG.MUL]:   [SG.MUL],
  [SG.DIV]:   [SG.DIV],
};
const refinedType = (signal) => {
  for( let type in REFINED_TYPES ) {
    if (REFINED_TYPES[type].includes(signal))
      return type;
  }  
};

const GENERALIZED_TYPES = {
  [SG.NUMERIC]: [...DIGITS, SM.POINT, SM.SIGN, SM.BACK],
  [SG.OPERATOR]: [SM.PLUS, SM.MINUS, SM.MUL, SM.DIV],
  [SG.EVAL]: [SM.EVAL],
  [SG.RESET]: [SM.RESET],
};
const generalizedType = (signal) => {
  let type;
  for( type in GENERALIZED_TYPES ) {
    if (GENERALIZED_TYPES[type].includes(signal))
      return type;
  }
};


export const processState = (state, signal) => {
  
  while(true){
    let transition = FSM[state.denotation];
    let process = transition.process;
    
    if(process){
      if(typeof(process) !== 'function')
        process = transition.process[refinedType(signal)] || transition.process[generalizedType(signal)];
      process(state, signal);
      state.denotation = transition.next;
    } else {
      state.denotation = (transition[refinedType(signal)] || transition[generalizedType(signal)]).next;
    }

    // terminate signal processing when got a routing node
    if(!FSM[state.denotation].process)
      return state;
  }

};

