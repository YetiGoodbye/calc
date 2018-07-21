import classes from '../../config/namespace.scss';

import React from 'react';
import './index.scss';

const MAIN              = classes.TopLayout;
const MAIN_TOGGLED      = `${MAIN}-toggled`;
const INTERFACE         = `${MAIN}--iface`;
const HSPACER           = `${MAIN}--hspacer`;
const MENU              = `${MAIN}--menu`;
const BUTTON            = `${MAIN}--button`;
const HEADER            = `${MAIN}--header`;
const LOGON             = `${MAIN}--logon`;
const VSPACER           = `${MAIN}--vspacer`;
const CONTENT           = `${MAIN}--content`;
const SHADOW_BOX_1      = `${MAIN}--shadowbox1`;
const SHADOW_BOX_2      = `${MAIN}--shadowbox2`;

class TopLayout extends React.Component {
  
  constructor(props){
    super(props);
    let components = props.children.reduce( (acc, val) => (acc[val.key] = val, acc), {});
    if( !(components.menu && components.header && components.logon && components.content)){
      throw new Error("Children components required");
    }
    this.state = {
      displayMenu: false,
      components,
      swype: false,
      touchStart: null,
      touchEnd: null,
    };
  }

  toggleMenu(){
    this.setState({
      displayMenu: !this.state.displayMenu,
    });
  }

  touchStart(e) {
    console.log(e.touches);
    if(e.touches.length !== 1) return;
    let point = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    }
    this.setState({
      swype: true,
      touchStart: point,
    });
  }

  touchMove(e) {
    if(!this.state.swype) return;
    let point = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    }
    console.log(e.touches);
    this.setState({
      touchEnd: point,
    });
  }

  touchEnd(e) {
    if(!this.state.swype) return;
    console.log(e.touches);
    let move = this.state.touchStart.y - this.state.touchEnd.y;
    console.log(move);
    if(move > 20) {
      this.toggleMenu();
    }
    this.setState({
      swype: false,
    });
  }

  click(e) {
    console.log("click");
  }

  tmove(e) {console.log('tmove');console.log(e.target)}
  tcancel() {console.log('tcancel');}

  render(){
    let {components, displayMenu} = this.state;
    return (
      <div className={MAIN}>
        <div className={CONTENT}>{components.content}</div>
      </div>
    );
  }
}

export default TopLayout;

