import React from 'react';
import PropTypes from 'prop-types';

import ComponentWithClassesHelper from 'Components/ComponentWithClassesHelper';
import {nop} from 'Utils';

class Button extends ComponentWithClassesHelper{
  render(){
    const {classes} = this;
    let {theme, htmlCaption, onClick, value} = this.props;
    theme = theme ? 'theme-'+theme : undefined;
    return (
      <div {...classes()}>
        <button {...classes('button', theme)}
          dangerouslySetInnerHTML={{__html: htmlCaption}}
          data-value={value}
          onClick={onClick || nop} />
      </div>
    );
  }
}

Button.propTypes = {
  theme: PropTypes.oneOf(['dark', 'light']),
  htmlCaption:  PropTypes.string.isRequired,
  onClick:   PropTypes.func,
  value:     PropTypes.string,
};

export default Button;
