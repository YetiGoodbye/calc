export const SYMBOL = {
  D0: '0', D1: '1', D2: '2', D3: '3', D4: '4',
  D5: '5', D6: '6', D7: '7', D8: '8', D9: '9',
  POINT: '.', SIGN: '\u00b1',
  PLUS: '+', MINUS: '-', MUL: '\u00D7', DIV: '\u00F7',
  EVAL: '=', BACK: '\u2192', RESET: 'C',
  MEM_ADD: 'M+', MEM_SUB: 'M-', MEM_CLEAR: 'MC', MEM_RESTORE: 'MR',  
};

export const STATE = {
  RESET: 'RESET',
  
  WAIT_ACC_START: 'WAIT_ACC_START',
  READ_ACC_START: 'READ_ACC_START',

  WAIT_ACC: 'WAIT_ACC',
  READ_ACC: 'READ_ACC',

  WAIT_OP: 'WAIT_OP',
  READ_OP: 'READ_OP',

  WAIT_ARG: 'WAIT_ARG',
  READ_ARG: 'READ_ARG',
  READ_ARG_START: 'READ_ARG_START',
  
  EVAL: 'EVAL',
  EVAL_OP: 'EVAL_OP',
  EVAL_NOARG: 'EVAL_NOARG',
};

export const SIGNAL = {
  DIGIT: 'DIGIT', 
  POINT: 'POINT', 
  SIGN: 'SIGN', 
  BACK: 'BACK', 
  NUMERIC: 'NUMERIC',
  OPERATOR: 'OPERATOR',
  PLUS: '+',
  MINUS: '-',
  MUL: '\u00D7',
  DIV: '\u00F7',
  EVAL: 'EVAL',
  RESET: 'RESET',
  // ANY: 'ANY',
};

