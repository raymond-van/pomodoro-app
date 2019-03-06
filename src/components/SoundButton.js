import React from 'react';

export default class SoundButton extends React.Component { 
    render() {
      return (
        <input className='sound-button' type="checkbox" onClick={this.props.handleSound}></input>
      );
    }
  }