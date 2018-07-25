import initialState from './initialState';
import state from './states';
import signalType, {generalizedType, refinedType} from './signalTypes';

console.log("signalType: ", signalType);

const MAXLEN = 10;

const stateTransitions = {

  /********* R E S E T ************/
  [state.RESET]: {
    process: (state) => (initialState),
    next: state.WAIT_ACC_START,
  },

  /********* W A I T   A C C   S T A R T ************/
  [state.WAIT_ACC_START]: {
    [signalType.NUMERIC]:  { next: state.READ_ACC_START },
    [signalType.OPERATOR]: { next: state.READ_OP },
    [signalType.EVAL]:     { next: state.EVAL },
    [signalType.RESET]:    { next: state.RESET },
  },

  /********* R E A D   A C C   S T A R T ************/
  [state.READ_ACC_START]: {
    process: {
      [signalType.SIGN]:  (state, signal) => { state.acc = state.display = `${-(+(state.display))}`; },
      [signalType.POINT]: (state, signal) => { state.acc = state.display = '0.'; },
      [signalType.BACK]:  (state, signal) => { state.acc = state.display = '0'; },
      [signalType.DIGIT]: (state, signal) => { state.acc = state.display = signal; }
    },
    next: state.WAIT_ACC, 
  },

  /********* W A I T   A C C ************/
  [state.WAIT_ACC]: {
    [signalType.NUMERIC]:  { next: state.READ_ACC },
    [signalType.OPERATOR]: { next: state.READ_OP },
    [signalType.EVAL]:     { next: state.EVAL },
    [signalType.RESET]:    { next: state.RESET },
  },

  /********* R E A D   A C C ************/
  [state.READ_ACC]: {
    process: {
      [signalType.SIGN]: (state, signal) => {
        if( +state.acc !== 0 )
          state.display = state.acc = (state.acc[0] === '-') ? state.acc.slice(1) : `-${state.acc}`;
      },
      [signalType.POINT]: (state, signal) => {  
        if(!isNaN(+`${state.acc}.`))
          state.display = state.acc = `${state.acc}.`;
      },
      [signalType.BACK]: (state, signal) => {
        state.acc = state.acc.slice(0, -1);
        if(state.acc === '' || isNaN(+state.acc))
          state.acc = '0';
        state.display = state.acc;
      },
      [signalType.DIGIT]: (state, signal) => {
        if(state.acc === '0'){
          state.display = state.acc = signal;
        } else {
          let text = state.acc + signal;
          if(text.split(/[-.]/).join('').length <= MAXLEN)
            state.acc = state.display = text;
        }
      },
    },
    next: state.WAIT_ACC,
  },



  /********* R E A D   O P ************/
  [state.READ_OP]: {
    process: (state, signal) => {state.op = signal},
    next: state.WAIT_OP,
  },

  /********* W A I T   O P ************/
  [state.WAIT_OP]: {
    [signalType.NUMERIC]:  { next: state.READ_ARG_START },
    [signalType.OPERATOR]: { next: state.READ_OP },
    [signalType.EVAL]:     { next: state.EVAL_NOARG },
    [signalType.RESET]:    { next: state.RESET },
  },



  /********* R E A D   A R G   S T A R T ************/
  [state.READ_ARG_START]: {
    process: {
      [signalType.SIGN]:  (state, signal) => { state.arg = state.display = '0'; },
      [signalType.POINT]: (state, signal) => { state.arg = state.display = '0.'; },
      [signalType.BACK]:  (state, signal) => { state.arg = state.display = '0'; },
      [signalType.DIGIT]: (state, signal) => { state.arg = state.display = signal; }
    },
    next: state.WAIT_ARG,
  },

  /********* W A I T   A R G ************/
  [state.WAIT_ARG]: {
    [signalType.NUMERIC]:  { next: state.READ_ARG },
    [signalType.OPERATOR]: { next: state.EVAL_OP },
    [signalType.EVAL]:     { next: state.EVAL},
    [signalType.RESET]:    { next: state.RESET },
  },

  /********* R E A D   A R G ************/
  [state.READ_ARG]: {
    process: {
      [signalType.SIGN]: (state, signal) => {
        if( +state.arg !== 0 )
          state.display = state.arg = (state.arg[0] === '-') ? state.arg.slice(1) : `-${state.arg}`;
      },
      [signalType.POINT]: (state, signal) => {  
        if(!isNaN(+`${state.arg}.`))
          state.display = state.arg = `${state.arg}.`;
      },
      [signalType.BACK]: (state, signal) => {
        state.arg = state.arg.slice(0, -1);
        if(state.arg === '' || isNaN(+state.arg))
          state.arg = '0';
        state.display = state.arg;
      },
      [signalType.DIGIT]: (state, signal) => {
        if(state.arg === '0'){
          state.display = state.arg = signal;
        } else {
          let text = state.arg + signal;
          if(text.split(/[-.]/).join('').length <= MAXLEN)
            state.arg = state.display = text;
        }
      },
    },
    next: state.WAIT_ARG,
  },

  /********* E V A L ************/
  [state.EVAL]: {
    process: (state, signal) => {
        // console.log("signalType.SIGN:", signalType.SIGN);
        // debugger
      switch(refinedType(state.op)){
        case signalType.PLUS:  state.acc = `${+state.acc + +state.arg}`; break;
        case signalType.MINUS: state.acc = `${+state.acc - +state.arg}`; break;
        case signalType.MUL:   state.acc = `${+state.acc * +state.arg}`; break;
        case signalType.DIV:   state.acc = `${+state.acc / +state.arg}`; break;
      }
      state.display = state.acc;
    },
    next: state.WAIT_ACC,
  },

  /********* E V A L   O P ************/
  [state.EVAL_OP]: {
    process: (state, signal) => {
      switch(refinedType(state.op)){
        case signalType.PLUS:  state.acc = `${+state.acc + +state.arg}`; break;
        case signalType.MINUS: state.acc = `${+state.acc - +state.arg}`; break;
        case signalType.MUL:   state.acc = `${+state.acc * +state.arg}`; break;
        case signalType.DIV:   state.acc = `${+state.acc / +state.arg}`; break;
      }
      state.display = state.acc;
    },
    next: state.READ_OP,
  },

  /********* E V A L   O P ************/
  [state.EVAL_NOARG]: {
    process: (state, signal) => {state.arg = state.acc},
    next: state.EVAL,
  },
};



  // State change is a change of 'denotiation' property/
  // Transition is a finite state machine with two node types:
  // 1) Processing nodes. Make some changes and unconditionaly route to next state (state change).
  // 2) Routing nodes. Do not make changes except route to next state (state change).
  // Processing nodes can take care of sygnal type
  // If it make changes to the state, next always route to determined 
  // If processing is needed, it CAN (or can not) make sense of exact signal or not.
  // When processing is not performed, routing takes care of signal type to decide to witch state to switch
  // This must be refactored to eliminate shit such as refined type and generalized type.Just make more nodes in FSM/
export const doStateTransition = (state, signal) => {
  // console.log(state);
  // debugger
  while(true){
    let transition = stateTransitions[state.denotation];
    let process = transition.process;
    
    if(process){
      
      // if process is not function it dependens on signal type
      if(typeof(process) !== 'function'){
              let refType = refinedType(signal);
              let genType = generalizedType(signal);
              // debugger
              process = transition.process[refType] || transition.process[genType];
      }
      process(state, signal);

      // transit to next state
      state.denotation = transition.next;
    } else {

      // if transition doesn't process state (just routes it to next state) it makes sense of sygnal type in routing process
      state.denotation = (transition[refinedType(signal)] || transition[generalizedType(signal)]).next;
    }

    // terminate signal processing when got a routing node
    if(!stateTransitions[state.denotation].process)
      return state;
  }

};

export default doStateTransition;
