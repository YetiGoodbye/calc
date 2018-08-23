import {connect} from 'react-redux';

import {theme, historyRecords, currentCalculatorType} from 'Selectors';
import {removeRecord, loadRecord} from 'Actions';
import History from './History';


const mapStateToProps = (state) => {
  const calcType = currentCalculatorType(state);
  return ({
    theme: theme(state),
    records: historyRecords(state, calcType),
  });  
};

const mapDispatchToProps = (dispatch) => ({
  removeRecord: id => dispatch(removeRecord(id)),
  loadRecord: id => dispatch(loadRecord(id)),
}); 

export default connect(mapStateToProps, mapDispatchToProps)(History);
