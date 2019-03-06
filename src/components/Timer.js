import React from 'react';

export default class Timer extends React.Component {
    render() {
      return (
        <div className='timer'>
          {this.props.break === true ? (
            document.title = this.props.breakMinutes + ':' + this.props.breakSeconds + ' | Pomodoro',
            <h1>{this.props.breakMinutes}:{this.props.breakSeconds}</h1>
          ) : (
            document.title = this.props.minutes + ':' + this.props.seconds + ' | Pomodoro',
            <h1>{this.props.minutes}:{this.props.seconds}</h1>
          )}
        </div>
      );
    }
  }