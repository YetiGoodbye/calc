import {connect} from 'react-redux';

import {theme} from 'Selectors';

import Button from './Button';

const mapStateToProps = (state) => ({
  theme: theme(state),
});

export default connect(mapStateToProps)(Button);
