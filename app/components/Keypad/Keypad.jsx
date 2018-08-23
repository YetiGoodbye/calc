import React from 'react';
import PropTypes from 'prop-types';

import { captions, byCalculatorType, simpleCalcKeyBindings } from 'Config/calculator/button';

import ComponentWithClassesHelper from 'Components/ComponentWithClassesHelper';
import Button from 'Components/Button';


class Keypad extends ComponentWithClassesHelper{

  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleKey = this.handleKey.bind(this);
  }

  handleClick(e){
    // check if keyboard (not mouse) button was pressed
    if(e.screenX === 0 && e.screenY === 0) return;

    // only button with data-value allowed
    let key = e.target.getAttribute("data-value");
    if(!key) return;

    this.props.send(key);
  }

  handleKey(e){
    // console.log(e.keyCode);
    // console.log(typeof e.keyCode)
    // return;
    let key = simpleCalcKeyBindings[e.keyCode];
    if(!key) return;
    this.props.send(key);
    // let key = simpleCalcKeyBindings[e.key.toLowerCase()];
    // if(!key) return;
    // this.props.send(key);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKey);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKey);
  }

  render(){
    const {layout} = this.props;
    const buttonClassNameSuffixes = byCalculatorType[layout];
    const {classes} = this;

    return (
      <div {...classes()}
        onClick={this.handleClick}>
        <div {...classes('wrapper')}>
        {
          buttonClassNameSuffixes.map( buttonClassNameSuffix => {
            const caption = captions[buttonClassNameSuffix];
            return (
              <div
                {...classes('button', `layout-${layout}-${buttonClassNameSuffix}`)}
                key={buttonClassNameSuffix}>
                <Button
                  klassName='button'
                  htmlCaption={caption}
                  value={buttonClassNameSuffix}/>
              </div>
              );
          })
        }
        </div>
      </div>
    );    
  }
}

Keypad.propTypes = {
  layout: PropTypes.oneOf(['simple', 'advanced']).isRequired,
  send: PropTypes.func.isRequired,
};

export default Keypad;
