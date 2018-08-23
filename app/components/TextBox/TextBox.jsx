import React from 'react';
import PropTypes from 'prop-types';

import ComponentWithClassesHelper from 'Components/ComponentWithClassesHelper';

class TextBox extends ComponentWithClassesHelper{
  render(){
    let {text, theme, align, fontSize} = this.props;
    theme = theme ? 'theme-'+theme : undefined;
    align = align ? 'align-'+align : undefined;
    fontSize = fontSize ? 'font-size-'+fontSize : undefined;
    const {classes} = this;
    return (
      <label
        {...classes(null, [theme, align, fontSize])}
        >
        {text}</label>);
  }
}

TextBox.propTypes = {
  theme: PropTypes.oneOf(['dark', 'light']),
  align: PropTypes.oneOf(['left', 'right']),
  fontSize: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  text: PropTypes.string.isRequired,
};

export default TextBox;
