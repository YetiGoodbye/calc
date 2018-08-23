import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'Utils';

class CalculatorsBase extends React.Component {

  constructor(props){
    super(props);
    this.classNames = classNames(this.props.classPrefix);
    this.setRef = this.setRef.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKey = this.handleKey.bind(this);
    // #- this.handleClick = debugWrapCall(this.handleClick);
    // #- this.handleKeyDown = debugWrapCall(this.handleKey);
  }

  setRefKeyHandler(elem){
    this.keyHandler = elem;
  }

  handleClick(e){
    // check if mouse onClick (not real keyboard) has triggered event
    // Need checks because 'Enter' keydown triggers button.onClick event too
    if(e.screenX === 0 && e.screenY === 0) return;
    let key = e.target.getAttribute("data-button-name");

    // key is undefined means mouse was clicked not on the button
    // (other calculator area)
    if(!key) return;

    // #- console.log('SimpleCalc received key by click ' + key);
    this.props.receiveKey(key);
  }

  handleKeyDown(e){
    let key = this.props.keyboardMap[e.key.toLowerCase()];

    if(!key) return;

    // #- console.log('SimpleCalc received key by keyboard press ' + key);
    this.props.calcReceiveKey(key);
  }

  componentDidMount(){
    // focus on calculator
    this.keyHandler.focus();
  }

  render(){
    let {
      displayOperations,
      displayResult,
      buttons,
    } = this.props;

    let {
      classNames,
      handleClick,
      handleKeyDown,
      setRefKeyHandler,
    } = this;

    return (
      <div className={classNames(/*[]*/)};
        tabIndex='0'
        onKeyDown={handleKeyDown}
        ref={setRefKeyHandler}>
        
        <div className={this.classNames('__display')}>
          <label className={classNames('__operations')}>
            {displayOperations}
          </label>
          <label className={classNames('__result')}>
            {displayResult}
          </label>
        </div>

        <div className={classNames('__keypad')} onClick={handleClick}>
          {
            buttons.map( button => {
              let [symbol, suffix] = button;
              return (
                <div key={suffix} className={classNames('__' + suffix)}>
                  <button
                    data-key={symbol}
                    className={classNames('__button')}
                    dangerouslySetInnerHTML={{__html: symbol}} />
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

CalculatorsBase.propTypes = {
  className: PropTypes.string.isRequired,
  displayOperations: PropTypes.string.isRequired,
  displayResult: PropTypes.string.isRequired,
  keyboardMap: PropTypes.object.isRequired,
  receiveKey: PropTypes.func.isRequired,
  buttons: PropsTypes.array.isRequired,
};

export default CalculatorsBase;
