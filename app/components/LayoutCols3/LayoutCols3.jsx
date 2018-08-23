import React from 'react';
import PropTypes from 'prop-types';

import ComponentWithClassesHelper from 'Components/ComponentWithClassesHelper';

class LayoutCols3 extends ComponentWithClassesHelper {

  render(){
    const {classes} = this;
    const {left, center, right} = this.props;

    return (
      <div {...classes()}>
        <div {...classes('left')}>{left}</div>
        <div {...classes('center')}>{center}</div>
        <div {...classes('right')}>{right}</div>
      </div>
    );
  }
}
LayoutCols3.propTypes = {
  left: PropTypes.node,
  center: PropTypes.node,
  right: PropTypes.node,
};

export default LayoutCols3;

  // constructor(props){
  //   this.state = {
  //     displayMenu: false,
  //     components,
  //     swype: false,
  //     touchStart: null,
  //     touchEnd: null,
  //   };
  // }

  // toggleMenu(){
  //   this.setState({
  //     displayMenu: !this.state.displayMenu,
  //   });
  // }

  // touchStart(e) {
  //   console.log(e.touches);
  //   if(e.touches.length !== 1) return;
  //   let point = {
  //     x: e.touches[0].clientX,
  //     y: e.touches[0].clientY,
  //   }
  //   this.setState({
  //     swype: true,
  //     touchStart: point,
  //   });
  // }

  // touchMove(e) {
  //   if(!this.state.swype) return;
  //   let point = {
  //     x: e.touches[0].clientX,
  //     y: e.touches[0].clientY,
  //   }
  //   console.log(e.touches);
  //   this.setState({
  //     touchEnd: point,
  //   });
  // }

  // touchEnd(e) {
  //   if(!this.state.swype) return;
  //   console.log(e.touches);
  //   let move = this.state.touchStart.y - this.state.touchEnd.y;
  //   console.log(move);
  //   if(move > 20) {
  //     this.toggleMenu();
  //   }
  //   this.setState({
  //     swype: false,
  //   });
  // }

  // click(e) {
  //   console.log("click");
  // }

  // tmove(e) {console.log('tmove');console.log(e.target)}
  // tcancel() {console.log('tcancel');}
