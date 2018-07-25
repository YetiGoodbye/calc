import createExportableConstants from 'Utils/createExportableConstants';

const states = [
  'RESET',
  'WAIT_ACC_START',
  'READ_ACC_START',
  'WAIT_ACC',
  'READ_ACC',
  'WAIT_OP',
  'READ_OP',
  'WAIT_ARG',
  'READ_ARG',
  'READ_ARG_START',
  'EVAL',
  'EVAL_OP',
  'EVAL_NOARG',
];

export default createExportableConstants(states);
