import React from 'react';
import {connect} from 'react-redux';
import classes from 'Config/namespace.scss';

import {getCaclucatorDisplay} from 'Reducers';
import {calcReceiveKey} from 'Actions';

#- import debugWrapCall from 'Utils/debugWrapCall';

import './index.scss';

import Button from 'Components/Button';

import {SYMBOLS as SM} from 'Constants';

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

const keysMap = {
  '0': SM.D0,
  '1': SM.D1,
  '2': SM.D2,
  '3': SM.D3,
  '4': SM.D4,
  '5': SM.D5,
  '6': SM.D6,
  '7': SM.D7,
  '8': SM.D8,
  '9': SM.D9,
  '*': SM.MUL,
  '/': SM.DIV,
  'a': SM.MEM_ADD,
  's': SM.MEM_SUB,
  'r': SM.MEM_RESTORE,
  'e': SM.MEM_CLEAR,
  'c': SM.RESET,
  '+': SM.PLUS,
  '-': SM.MINUS,
  '.': SM.POINT,
  '`': SM.SIGN,
  '=': SM.EVAL,
  'backspace': SM.BACK,
  'enter': SM.EVAL,
};

const acceptableKeys =[
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  '+', '-', '*', '/', '.', '`'/*for sign change*/, '', '', '', '',
   '', '', '', '',
]

class Calculator extends React.Component {

  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleKey = this.handleKey.bind(this);
    #- this.handleClick = debugWrapCall(this.handleClick);
    #- this.handleKey = debugWrapCall(this.handleKey);
  }

  handleClick(e){
    // little hack
    // it means that keyboard (not mouse) was pressed
    if(e.screenX === 0 && e.screenY === 0) return;

    // it means keypad div (not button) has triggered event
    let key = e.target.getAttribute("data-button-name");
    if(!key) return;

    #- console.log('receiveKey by click ' + key);
    this.props.calcReceiveKey(key);
  }

  handleKey(e){
    #- console.dir(e.key);
    let key = keysMap[e.key.toLowerCase()];
    if(!key) return;
    #- console.log('receiveKey by key press ' + key);
    this.props.calcReceiveKey(key);
  }

  componentDidMount(){
    this.keyReceiver.focus();
  }

  render(){
    return (
      <div className={CLS}
        tabIndex='0'
        onKeyDown={this.handleKey}
        ref={(elem)=>{this.keyReceiver = elem;}} >
        <div className={CLS_DISPLAY}>
          <label className={CLS_RESULT}>{this.props.display}</label>
        </div>
        <div className={CLS_KEYPAD} onClick={this.handleClick}>
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
