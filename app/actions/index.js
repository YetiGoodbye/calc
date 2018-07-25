import types from './types';

const calcReceiveKey = (key) => ({
  type: types.CALC_RECEIVE_KEY,
  key,
});

export {
  calcReceiveKey,
};
