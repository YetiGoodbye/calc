import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import ComponentWithClassesHelper from 'Components/ComponentWithClassesHelper';
import CalculationRecord from 'Components/CalculationRecord';

class History extends ComponentWithClassesHelper{
  constructor(props) {
    super(props);
    this.removeRecord = this.removeRecord.bind(this);
    this.loadRecord = this.loadRecord.bind(this);
  }

  componentDidMount(){
    this.scrollDown();
  }

  doScroll(e){
    ReactDOM.findDOMNode(this.refs.scroll).scrollTop += e.deltaY;
  }

  componentDidUpdate(){ 
    this.scrollDown();
  }

  scrollDown(){
    const scrollBottom = ReactDOM.findDOMNode(this.refs.last).offsetTop;
    ReactDOM.findDOMNode(this.refs.scroll).scrollTop = scrollBottom;    
  }

  removeRecord(e){
    const {removeRecord} = this.props;
    if(!removeRecord) return true;
    e.preventDefault();
    const id = e.currentTarget.getAttribute("data-id");
    this.props.removeRecord(id);
    return false;
  }

  loadRecord(e){
    const loadRecord = this.props;
    if(!loadRecord) return true;
    const id = e.currentTarget.getAttribute("data-id");
    this.props.loadRecord(id);
  }

  render(){
    const {records, theme} = this.props;
    const {classes} = this;
    return (
      <div {...classes(null, theme ? 'theme-'+theme : null)}>
        <div {...classes('history-wrapper')}
          ref='scroll'
          onWheel={this.doScroll.bind(this)}>
          <div {...classes('white-space')} />
          {records.map( ({id, question, answer}) => (
          <div {...classes('record-wrapper')}
            onContextMenu={this.removeRecord}
            onClick={this.loadRecord}
            data-id={id}
            key={id} >
            <CalculationRecord
              theme='dark'
              klassName='record'
              question={question}
              answer={answer}
              />
          </div>
          ))}
          <div ref="last"></div>
        </div>
      </div>
    );
  }
}

History.propTypes = {
  klassName: PropTypes.string.isRequired,
  theme: PropTypes.oneOf(['dark', 'light']),
  records: PropTypes.arrayOf( PropTypes.object ),
  removeRecord: PropTypes.func,
  loadRecord: PropTypes.func,
};

export default History;
