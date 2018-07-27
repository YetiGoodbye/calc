import createExportableConstants from 'Utils/createExportableConstants';

// ACC - accumulator
// ARG - argument
// OP  - operator
const stateNames = createExportableConstants([
  'INIT',
  'READ_ACC',
  'READ_OP',
  'READ_ARG',
  'ERROR',
]);

const actionNames = createExportableConstants([
  'INIT_READ_ACC_DIGIT', 'INIT_READ_ACC_POINT', 'INIT_READ_ACC_SIGN', 'INIT_READ_ACC_BACK',
  'INIT_READ_ARG_DIGIT', 'INIT_READ_ARG_POINT', 'INIT_READ_ARG_SIGN', 'INIT_READ_ARG_BACK',
  'READ_ACC_DIGIT', 'READ_ACC_POINT', 'READ_ACC_SIGN', 'READ_ACC_BACK',
  'READ_ARG_DIGIT', 'READ_ARG_POINT', 'READ_ARG_SIGN', 'READ_ARG_BACK',
  'READ_OP', 
  'EVAL', 'EVAL_WITHOUT_ARG', 'EVAL_BY_OPERATOR',
  'VALIDATE_RESULT',
  'RESET_STATE',
  'MEM_ADD_ACC', 'MEM_ADD_ARG','MEM_SUB_ACC', 'MEM_SUB_ARG', 'MEM_RESTORE_ACC', 'MEM_RESTORE_ARG', 'MEM_CLEAR',
]);

const keyTypes = createExportableConstants([
  'DIGIT', 'SIGN', 'POINT', 'BACK',
  'OPERATOR', 'EVAL', 'RESET',
  'MEM_ADD', 'MEM_SUB', 'MEM_CLEAR', 'MEM_RESTORE', 
]);

export { stateNames, actionNames, keyTypes };
  

