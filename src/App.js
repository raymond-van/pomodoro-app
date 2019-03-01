import React, { Component } from 'react';
// import './App.css/';

class TimerInput extends React.Component {
  render() {
    return (
      <div>
        <h3>Set your work interval:</h3>
        <input type="number" value={this.props.interval} step="5" onChange={this.props.handleChange} required />
      </div>
    );
  }
}

class Timer extends Component {
  render() {
    return (
      <div class='Timer'>
        <h1>{this.props.minutes}:{this.props.seconds}</h1>
      </div>
    );
  }
}

class StartButton extends React.Component {
  render() {
    return (
      <div>
        <button onClick={this.props.startCountdown}>{this.props.control}</button>
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: '00',
      minutes: '50',
      interval: '50',
      control: 'Start'
    };
    this.secondsRemaining = 0; 
    this.intervalHandle = null;
    this.handleChange = this.handleChange.bind(this);
    this.startCountdown = this.startCountdown.bind(this);
    this.tick = this.tick.bind(this);
  }

  handleChange(e) {
    this.setState({
        minutes: e.target.value,
        interval: e.target.value
    })
  }

  startCountdown() {
    if (this.state.control === 'Start') {
      this.intervalHandle = setInterval(this.tick, 1000);
      let time = this.state.minutes;
      this.secondsRemaining = time * 60 + parseInt(this.state.seconds);
      this.setState({
        control: 'Pause'
      });
    }
    if (this.state.control === 'Pause') {     
      clearInterval(this.intervalHandle); 
      var min = Math.floor(this.secondsRemaining / 60);
      var sec = this.secondsRemaining - (min * 60);
      this.setState({
        minutes: min,
        seconds: sec,
        control: 'Start'
      });
    }
  }

  tick() {
    this.secondsRemaining--
    var min = Math.floor(this.secondsRemaining / 60);
    var sec = this.secondsRemaining - (min * 60);
    this.setState({
      minutes: min,
      seconds: sec
    })
    if (sec < 10) {
      this.setState({
        seconds: "0" + this.state.seconds
      })
    }
    if (min < 10) {
    this.setState({
      minutes: "0" + min
     })
    }
    if (min === 0 & sec === 0) {
      clearInterval(this.intervalHandle);
    }
  }

  render() {
    return (
      <div>
        <TimerInput interval={this.state.interval} handleChange={this.handleChange}/>
        <Timer minutes={this.state.minutes} seconds={this.state.seconds}/>
        <StartButton startCountdown={this.startCountdown} control={this.state.control}/>
      </div>
    );
  }
}

export default App;
