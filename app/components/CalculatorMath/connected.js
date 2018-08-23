import {connect} from 'react-redux';

import {theme} from 'Selectors';
import CalculatorMath from './CalculatorMath';

const mapStateToProps = (state) => ({
  theme: theme(state),
});

export default connect(mapStateToProps)(CalculatorMath);
