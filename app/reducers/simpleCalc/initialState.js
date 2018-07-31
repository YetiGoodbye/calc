import {stateNames} from './constants';

const initialState = {
  name: stateNames.INIT,
  acc: '0',
  arg: '0',
  op: '+',
  result: '0',
  operations: '0',
  mem: 0,
};

export default initialState;