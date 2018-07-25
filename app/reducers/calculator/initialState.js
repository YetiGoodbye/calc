// import {WAIT_ACC_START} from './states';
import states from './states';

console.log("1:", states);

const initialState = {
  denotation: states.WAIT_ACC_START,
  acc: '',
  arg: '',
  op: '+',
  display: '0',
};

console.log("2:", initialState);

export default initialState;
