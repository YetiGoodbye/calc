const SYMBOLS = {
  D0: '0', D1: '1', D2: '2', D3: '3', D4: '4',
  D5: '5', D6: '6', D7: '7', D8: '8', D9: '9',
  POINT: '.', SIGN: '\u00b1',
  PLUS: '+', MINUS: '-', MUL: '\u00D7', DIV: '\u00F7',
  EVAL: '=', BACK: '\u2192', RESET: 'C',
  MEM_ADD: 'M+', MEM_SUB: 'M-', MEM_CLEAR: 'MC', MEM_RESTORE: 'MR',  
};

const MAX_DISPLAY_DIGITS = 10;

export {
  SYMBOLS,
  MAX_DISPLAY_DIGITS,
};
