import {createExportableConstants} from 'Utils';

const actionTypes = [
  'CALC_RECEIVE_KEY',
  'CALC_LOAD_STATE_FROM_HISTORY',
  'CALC_SWITCH',
  'THEME_SWITCH',
  'HISTORY_NEW_RECORD',
  'HISTORY_REMOVE_RECORD',
];

export default createExportableConstants(actionTypes);
