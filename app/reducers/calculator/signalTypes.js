import createExportableConstants from 'Utils/createExportableConstants';
import {symbols} from 'Constants';

const signalTypes = createExportableConstants([
  'DIGIT', 'POINT', 'SIGN', 'BACK', 'NUMERIC', 'OPERATOR',
  'PLUS', 'MINUS', 'MUL', 'DIV', 'EVAL', 'RESET',
]);

export default signalTypes;


const refinedTypes = {
  [signalTypes.DIGIT]:  [
    symbols.D0, symbols.D1, symbols.D2, symbols.D3, symbols.D4,
    symbols.D5, symbols.D6, symbols.D7, symbols.D8, symbols.D9,
  ],
  [signalTypes.POINT]: [symbols.POINT],
  [signalTypes.SIGN]:  [symbols.SIGN],
  [signalTypes.BACK]:  [symbols.BACK],
  [signalTypes.PLUS]:  [symbols.PLUS],
  [signalTypes.MINUS]: [symbols.MINUS],
  [signalTypes.MUL]:   [symbols.MUL],
  [signalTypes.DIV]:   [symbols.DIV],
};

const generalizedTypes = {
  [signalTypes.NUMERIC]: [
    symbols.D0, symbols.D1, symbols.D2, symbols.D3, symbols.D4,
    symbols.D5, symbols.D6, symbols.D7, symbols.D8, symbols.D9,
    symbols.POINT, symbols.SIGN, symbols.BACK,
  ],
  [signalTypes.OPERATOR]: [symbols.PLUS, symbols.MINUS, symbols.MUL, symbols.DIV],
  [signalTypes.EVAL]:     [symbols.EVAL],
  [signalTypes.RESET]:    [symbols.RESET],
};

const findMatchIn = (arrayOfTypes, signal) => {
  for( let type in arrayOfTypes ) {
    if (arrayOfTypes[type].includes(signal))
      return type;
  }  
}

export const refinedType = (signal) => findMatchIn(refinedTypes, signal);

export const generalizedType = (signal) => findMatchIn(generalizedTypes, signal);

