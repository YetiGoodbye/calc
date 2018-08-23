import * as fromRecords from './records';

const records = (state, calcType) => fromRecords.records(state[calcType]);
const record =(state, calcType, id) => fromRecords.record(state[calcType], id);

export {records, record};
