import React, { Component } from 'react';
// import './App.css/';

class TimerInput extends React.Component {
  render() {
    return (
      <div>
        <h3>Set your work interval:</h3>
        <input type="number" value={this.props.value} onChange={this.props.handleChange} required />
      </div>
    );
  }
}

class Timer extends Component {
  render() {
    return (
      <div class='Timer'>
        <h1>{this.props.value}:{this.props.seconds}</h1>
      </div>
    );
  }
}

class StartButton extends React.Component {
  render() {
    return (
      <div>
        <button onClick={this.props.startCountdown}>Start</button>
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: '00',
      value: ''
    };
    this.secondsRemaining = 0; 
    this.intervalHandle = null;
    this.handleChange = this.handleChange.bind(this);
    this.startCountdown = this.startCountdown.bind(this);
    this.tick = this.tick.bind(this);
  }

  handleChange(e) {
    this.setState({
        value: e.target.value
    })
  }

  startCountdown() {
    this.intervalHandle = setInterval(this.tick, 1000);
    let time = this.state.value;
    this.secondsRemaining = time * 60;
  }

  tick() {
    var min = Math.floor(this.secondsRemaining / 60);
    var sec = this.secondsRemaining - (min * 60);
    this.setState({
      value: min,
      seconds: sec
    })
    if (sec < 10) {
      this.setState({
        seconds: "0" + this.state.seconds
      })
    }
    if (min < 10) {
    this.setState({
      value: "0" + min
     })
    }
    if (min === 0 & sec === 0) {
      clearInterval(this.intervalHandle);
    }
    this.secondsRemaining--
  }

  render() {
    return (
      <div>
        <TimerInput value={this.state.value} handleChange={this.handleChange}/>
        <Timer value={this.state.value} seconds={this.state.seconds}/>
        <StartButton startCountdown={this.startCountdown}/>
      </div>
    );
  }
}

export default App;
