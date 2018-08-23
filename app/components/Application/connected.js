import {connect} from 'react-redux';

import {theme} from 'Selectors';
import Application from './Application';

const mapStateToProps = (state) => ({
  theme: theme(state),
});

export default connect(mapStateToProps)(Application);
