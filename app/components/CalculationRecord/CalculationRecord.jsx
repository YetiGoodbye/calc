import React from 'react';
import PropTypes from 'prop-types';

import ComponentWithClassesHelper from 'Components/ComponentWithClassesHelper';
import TextBox from 'Components/TextBox';

class CalculationRecord extends ComponentWithClassesHelper{
  render(){
    const {question, answer, theme} = this.props;
    const {classes} = this;
    const themeModifier =  theme ? 'theme-'+theme : null;
    return (
      <div {...classes(null, themeModifier)}>
        <div {...classes('wrapper', themeModifier)}>
          <div {...classes('question-wrapper')}>
            <TextBox
              klassName='question'
              text={question}
              fontSize='sm'
              />
          </div>
          <div {...classes('answer-wrapper')}>
            <TextBox
              klassName='answer'
              text={answer}
              fontSize='md'/>
          </div>
        </div>
      </div>
    );
  }
}

CalculationRecord.propTypes = {
  klassName: PropTypes.string.isRequired,
  theme: PropTypes.oneOf(['dark', 'light']),
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
};

export default CalculationRecord;
