const records = state => state;
const record = (state, id) => state[state.findIndex( e => e.id === id )];

export  {records, record};
