import React from 'react';
import SoundButton from './SoundButton'

export default class BreakInput extends React.Component {
    render() {
      return (
        <div className="set-break-container">
          <SoundButton handleSound={this.props.handleSound}/>
          <div className="set-break">
            <h3>set your <span>Break</span> duration<span className='col'>:</span></h3>
              <input className='input-num' type="number" value={this.props.breakInterval} step="5" min="0" onChange={this.props.handleBreak} required />
          </div>
        </div>
      );
    }
  }