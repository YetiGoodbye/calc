import {Component} from 'react';
import PropTypes from 'prop-types';

import {bemHelper} from 'Utils';

class ComponentWithClassesHelper extends Component{
  constructor(props){
    super(props);
    this.classes = bemHelper(props.klassName);
  }
}

ComponentWithClassesHelper.propTypes = {
  klassName: PropTypes.string.isRequired,
};

export default ComponentWithClassesHelper;
