import React from 'react';
import {connect} from 'react-redux';
import classes from 'Config/namespace.scss';

import {getCaclucatorDisplay} from 'Reducers';
import {calcReceiveKey} from 'Actions';

import './index.scss';

import Button from 'Components/Button';

import {symbols as SM} from 'Constants';

const CLS = classes.Calculator;
const CLS_DISPLAY = `${CLS}--display`;
const CLS_OPERATIONS = `${CLS}--operations`;
const CLS_RESULT = `${CLS}--result`;
const CLS_KEYPAD = `${CLS}--keypad`;
const CLS_BUTTON = `${CLS}--button`;


const buttonClass = (geometry = {row: 0, col: 0, w: 1, h: 1}) => {
  let klass = `${CLS_BUTTON}`;
  if(geometry.row) klass += ` ${CLS_BUTTON}-r${geometry.row}`;
  if(geometry.col) klass += ` ${CLS_BUTTON}-c${geometry.col}`;
  if(geometry.w) klass += ` ${CLS_BUTTON}-w${geometry.w}`;
  if(geometry.h) klass += ` ${CLS_BUTTON}-h${geometry.h}`;
  return klass;
}

const buttonClasses = {
  [SM.MEM_ADD]:     buttonClass({row: 0}),
  [SM.MEM_SUB]:     buttonClass({row: 0, col: 1}),
  [SM.MEM_RESTORE]: buttonClass({row: 0, col: 2}),
  [SM.MEM_CLEAR]:   buttonClass({row: 0, col: 3}),
  [SM.RESET]:       buttonClass({row: 0, col: 4}),
  [SM.D7]:          buttonClass({row: 1}),
  [SM.D8]:          buttonClass({row: 1, col: 1}),
  [SM.D9]:          buttonClass({row: 1, col: 2}),
  [SM.BACK]:        buttonClass({row: 1, col: 3, w: 2}),
  [SM.D4]:          buttonClass({row: 2}),
  [SM.D5]:          buttonClass({row: 2, col: 1}),
  [SM.D6]:          buttonClass({row: 2, col: 2}),
  [SM.MUL]:         buttonClass({row: 2, col: 3}),
  [SM.DIV]:         buttonClass({row: 2, col: 4}),
  [SM.D1]:          buttonClass({row: 3}),
  [SM.D2]:          buttonClass({row: 3, col: 1}),
  [SM.D3]:          buttonClass({row: 3, col: 2}),
  [SM.PLUS]:        buttonClass({row: 3, col: 3, h: 2}),
  [SM.MINUS]:       buttonClass({row: 3, col: 4}),
  [SM.D0]:          buttonClass({row: 4}),
  [SM.POINT]:       buttonClass({row: 4, col: 1}),
  [SM.SIGN]:        buttonClass({row: 4, col: 2}),
  [SM.EVAL]:        buttonClass({row: 4, col: 4}),
}

class Calculator extends React.Component {

  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e){
    let key = e.target.getAttribute("data-button-name");
    if(!key) return;
    // console.log(this.props.calcReceiveKey);
    this.props.calcReceiveKey(key);
  }

  render(){
    // console.log("Calculator: ", this.props.display);
    return (
      <div className={CLS}>
        <div className={CLS_DISPLAY}>
          <label className={CLS_RESULT}>{this.props.display}</label>
        </div>
        <div  className={CLS_KEYPAD} onClick={this.handleClick} >
          {
            Object.keys(buttonClasses).map( (buttonName) => {
              let buttonClass = buttonClasses[buttonName];
              return (
                <div key={buttonName} className={buttonClass}>
                  <button data-button-name={buttonName}>
                    {buttonName}
                  </button>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  display: getCaclucatorDisplay(state),
});

const mapDispatchToProps = (dispatch) => ({
  calcReceiveKey: (key) => dispatch(calcReceiveKey(key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Calculator);
