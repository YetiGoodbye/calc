import React from 'react';
import {bemHelper} from 'Utils';
import BodyClassName from 'react-body-classname';

import LayoutCols3 from 'Components/LayoutCols3';
import CalculatorMath from 'Components/CalculatorMath';


class Application extends React.Component{
  constructor(props){
    super(props);
    this.bodyClasses = bemHelper(props.bodyClass);
  }

  render(){
    const {theme} = this.props;
    const {bodyClasses} = this;
    return (
      <BodyClassName {...bodyClasses(null, `theme-${theme}`)}>
        <LayoutCols3 klassName='layout3'
          center={
            <CalculatorMath klassName='mathcalc'/>
          }
        />
      </BodyClassName>
    );
  }
}

export default Application;

