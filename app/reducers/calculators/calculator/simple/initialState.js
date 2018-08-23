import {states} from './transitions.graphml';

const initialState = {
  name: states.INIT,
  accumulator: '0',
  argument: '0',
  operation: 'add',
  answer: '0',
  question: '0',
  memory: 0,
  error: false,
};

export default initialState;
