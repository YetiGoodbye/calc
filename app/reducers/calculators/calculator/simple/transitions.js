import { signals, routes, conditionalRoutes } from './transitions.graphml';
import createRouteWalker from 'Loaders/graphml-loader/createRouteWalker';

import keys from 'Config/calculator/button/classNameSuffix';
import actions from './actions';

const keyToSignal = {
  [keys.D0]: signals.DIGIT,
  [keys.D1]: signals.DIGIT,
  [keys.D2]: signals.DIGIT,
  [keys.D3]: signals.DIGIT,
  [keys.D4]: signals.DIGIT,
  [keys.D5]: signals.DIGIT,
  [keys.D6]: signals.DIGIT,
  [keys.D7]: signals.DIGIT,
  [keys.D8]: signals.DIGIT,
  [keys.D9]: signals.DIGIT,
  [keys.ADD]: signals.OPERATOR,
  [keys.SUB]: signals.OPERATOR,
  [keys.MUL]:  signals.OPERATOR,
  [keys.DIV]:  signals.OPERATOR,
  [keys.SIGN]: signals.SIGN,
  [keys.POINT]: signals.POINT,
  [keys.BACK]:  signals.BACK,
  [keys.EVAL]:  signals.EVAL,
  [keys.RESET]: signals.RESET,
  [keys.MEM_ADD]:     signals.MEM_ADD,
  [keys.MEM_SUB]:     signals.MEM_SUB,
  [keys.MEM_CLEAR]:   signals.MEM_CLEAR,
  [keys.MEM_RESTORE]: signals.MEM_RESTORE,
};

// const mapKeyToGraphSignal = key => keyToSignal[key];
const mapKeyToGraphSignal = key => {;
  return keyToSignal[key];
}


export default createRouteWalker(routes, conditionalRoutes, actions, mapKeyToGraphSignal);
