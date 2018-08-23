import React from 'react';
import PropTypes from 'prop-types';

import ComponentWithClassesHelper from 'Components/ComponentWithClassesHelper';
import TextBox from 'Components/TextBox';

class Display extends ComponentWithClassesHelper{
  render(){
    const {question, answer, theme} = this.props;
    const {classes} = this;
    const themeModifier =  theme ? 'theme-'+theme : null;
    return (
      <div {...classes(null, themeModifier)}>
        <div {...classes('wrapper', themeModifier)}>
          <div {...classes('question')}>
            <TextBox
              klassName='mathcalc-display-question'
              fontSize='md'
              text={question}
              />
          </div>
          <div {...classes('answer')}>
            <TextBox
              klassName='mathcalc-display-answer'
              fontSize='xl'
              text={answer}/>
          </div>
        </div>
      </div>
    );
  }
}

Display.propTypes = {
  klassName: PropTypes.string.isRequired,
  theme: PropTypes.oneOf(['dark', 'light']),
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
};

export default Display;
