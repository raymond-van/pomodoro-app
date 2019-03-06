import React from 'react';

export default class CtrlButton extends React.Component {
    render() {
      return (
        <div className='ctrl-button-container'>
          <button className='ctrl-button' onClick={this.props.startCountdown}>{this.props.control}</button>
        </div>
      );
    }
  }
  