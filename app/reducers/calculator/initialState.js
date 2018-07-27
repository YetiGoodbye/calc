import {stateNames} from './constants';

const initialState = {
  name: stateNames.INIT,
  acc: '0',
  arg: '0',
  op: '+',
  display: '0',
  mem: 0,
};

export default initialState;
