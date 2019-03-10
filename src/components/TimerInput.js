import React from 'react';

export default class TimerInput extends React.Component {
    render() {
      return (
        <div className="set-work-container">
          <div className="set-work">
            <h3>set your <span>Work</span> duration<span className='col'>:</span></h3>
            {this.props.initiated === true ? (
              <input className='input-num' type="number" value={this.props.interval} step="5" min="0" required />
            ) : (
              <input className='input-num' type="number" value={this.props.interval} step="5" min="0" onChange={this.props.handleChange} required />
            )}
          </div>
        </div>
      );
    }
  }