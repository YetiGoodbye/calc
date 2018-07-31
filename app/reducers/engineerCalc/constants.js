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
  'READ_FIRST_DIGIT_TO_ACC', 'READ_FIST_POINT_TO_ACC', 'READ_FIST_SIGN_TO_ACC', 'READ_FIST_BACK_TO_ACC',
  'READ_NEXT_DIGIT_TO_ACC', 'READ_NEXT_POINT_TO_ACC', 'READ_NEXT_SIGN_TO_ACC', 'READ_ACC_BACK',
  'READ_FIRST_DIGIT_TO_ARG', 'READ_FIRST_POINT_TO_ARG', 'READ_FIRST_SIGN_TO_ARG', 'READ_FIRST_BACK_TO_ARG',
  'READ_NEXT_DIGIT_TO_ARG', 'READ_NEXT_POINT_TO_ARG', 'READ_NEXT_SIGN_TO_ARG', 'READ_NEXT_BACK_TO_ARG',
  'READ_OPERATOR',
  'EVAL', 'VALIDATE_RESULT',
  'SET_DISPLAY_RESULT_ACC', 'SET_DISPLAY_RESULT_ARG',
  'SET_DISPLAY_OPERATIONS_ACC', 'SET_DISPLAY_OPERATIONS_ACC_OP', 'SET_DISPLAY_OPERATIONS_ACC_OP_ARG',
  'MEM_ADD_ACC', 'MEM_ADD_ARG','MEM_SUB_ACC', 'MEM_SUB_ARG', 'MEM_RESTORE_ACC', 'MEM_RESTORE_ARG', 'MEM_CLEAR',
  'RESET_STATE',
  'NORMALIZE_ACC', 'SET_IMPLICIT_ARG_TO_ACC',
]);

const keyTypes = createExportableConstants([
  'DIGIT', 'SIGN', 'POINT', 'BACK',
  'OPERATOR', 'EVAL', 'RESET',
  'MEM_ADD', 'MEM_SUB', 'MEM_CLEAR', 'MEM_RESTORE', 
]);

export { stateNames, actionNames, keyTypes };
  

