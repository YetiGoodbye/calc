import {connect} from 'react-redux';

import {theme, displayQuestion, displayAnswer, currentCalculatorType} from 'Selectors';
import Display from './Display';


const mapStateToProps = (state) => {
  const calcType = currentCalculatorType(state);
  return ({
    theme: theme(state),
    question: displayQuestion(state, calcType),
    answer: displayAnswer(state, calcType),
  });  
};


export default connect(mapStateToProps)(Display);
