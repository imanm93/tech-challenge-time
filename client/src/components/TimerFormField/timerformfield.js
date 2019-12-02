import React from 'react';
import Utils from '../../utils/utils';

class TimerFormField extends React.Component {

  render() {
    return (
      <div className="col-12">
        <h1 className="text-center">{Utils.formatTime(this.props.time)}</h1>
        <div className="row align-items-center">
          <div className="col-12 align-self-center text-center">
            <button className="btn btn-outline-secondary" onClick={this.props.startTimer}>Start</button>
            <button className="btn btn-outline-secondary" onClick={this.props.stopTimer}>Stop</button>
            <button className="btn btn-outline-secondary" onClick={this.props.resetTimer}>Reset</button>
          </div>
        </div>
      </div>
    )
  }

}

export default TimerFormField;
