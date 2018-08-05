import {symbols} from 'Constants';
import {signals} from './transitions.graphml';

const symbolToSignal = {
  [symbols.D0]: signals.DIGIT,
  [symbols.D1]: signals.DIGIT,
  [symbols.D2]: signals.DIGIT,
  [symbols.D3]: signals.DIGIT,
  [symbols.D4]: signals.DIGIT,
  [symbols.D5]: signals.DIGIT,
  [symbols.D6]: signals.DIGIT,
  [symbols.D7]: signals.DIGIT,
  [symbols.D8]: signals.DIGIT,
  [symbols.D9]: signals.DIGIT,
  [symbols.PLUS]:  signals.OPERATOR,
  [symbols.MINUS]: signals.OPERATOR,
  [symbols.MUL]:   signals.OPERATOR,
  [symbols.DIV]:   signals.OPERATOR,
  [symbols.SIGN]:  signals.SIGN,
  [symbols.POINT]: signals.POINT,
  [symbols.BACK]:  signals.BACK,
  [symbols.EVAL]:  signals.EVAL,
  [symbols.RESET]: signals.RESET,
  [symbols.MEM_ADD]:     signals.MEM_ADD,
  [symbols.MEM_SUB]:     signals.MEM_SUB,
  [symbols.MEM_CLEAR]:   signals.MEM_CLEAR,
  [symbols.MEM_RESTORE]: signals.MEM_RESTORE,
};

const signal = key => symbolToSignal[key];

// digits count in string
const digitsCount = string => string.split(/[-.]/).join('').length;

export {signal, digitsCount};
