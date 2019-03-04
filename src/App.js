import React, { Component } from 'react';
import './App.css';

class TimerInput extends React.Component {
  render() {
    return (
      <div>
        <h3>Set your work interval:</h3>
        {this.props.initiated === true ? (
          <input className='fixed-input' type="number" value={this.props.interval} step="5" required /> 
        ) : (
          <input type="number" value={this.props.interval} step="5" onChange={this.props.handleChange} required />
        )}
      </div>
    );
  }
}

class BreakInput extends React.Component {
  render() {
    return (
      <div>
        <h3>Set your break interval:</h3>
        <input type="number" value={this.props.breakInterval} step="5" onChange={this.props.handleBreak} required />
      </div>
    );
  }
}


class Timer extends Component {
  render() {
    return (
      <div class='Timer'>
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

class StartButton extends React.Component {
  render() {
    return (
      <div>
        <button onClick={this.props.startCountdown}>{this.props.control}</button>
      </div>
    );
  }
}

class Logs extends React.Component {
  createLog = () => {
    let log = [];
    let arr = [];
    for (var i = 0; i < this.props.times.length; i++) {
      log.push(<h3>Interval {i + 1}</h3>);
      var time = this.props.times[i];
      var timeLabel = this.props.timesLabels[i];
      log.push(timeLabel[0])
      log.push(time[0])
      for (var j = 1; j < time.length; j++) {
        log.push('\xa0\xa0\xa0>\xa0\xa0\xa0')
        log.push(timeLabel[j])
        log.push(time[j])
      };
      log.push(<div></div>);
      arr.push(log);
      log = [];
    };
    return arr;
  }
  render() {
    return (
      <div>
        {this.props.times.length > 0 ? this.createLog() : <h3>Interval 1</h3>}
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: '00',
      minutes: '1',
      interval: '1',
      breakSeconds: '00',
      breakMinutes: '2',
      breakInterval: '2',
      break: false,
      control: 'Start',
      initiated: false,
      reset: false,
      times: [],
      timesLabels: [],
      cycle: 0,
    };
    this.secondsRemaining = 0; 
    this.breakRemaining = 0;
    this.intervalHandle = null;
    this.handleChange = this.handleChange.bind(this);
    this.handleBreak = this.handleBreak.bind(this);
    this.startCountdown = this.startCountdown.bind(this);
    this.tick = this.tick.bind(this);
  }

  handleChange(e) {
    this.setState({
        minutes: e.target.value,
        interval: e.target.value
    })
  }

  handleBreak(e) {
    this.setState({
      breakMinutes: e.target.value,
      breakInterval: e.target.value
    })
  }

  startCountdown() {
    if (this.state.control === 'Start' || this.state.control === 'Resume' ) {
      var dateObj = new Date();
      dateObj = dateObj.toLocaleTimeString();
      let time = this.state.minutes;
      this.secondsRemaining = time * 60 + parseInt(this.state.seconds);
      if (this.state.control === 'Resume') {
        var timesArr = this.state.times;
        timesArr[this.state.cycle].push(dateObj);
        var timesLb = this.state.timesLabels;
        timesLb[this.state.cycle].push('Resumed ');
        this.setState({
          times: timesArr,
          timesLabels: timesLb,
          control: 'Pause',
          initiated: true,
        })} else {
        timesArr = this.state.times;
        timesArr.push([dateObj]);
        timesLb = this.state.timesLabels;
        timesLb.push(['Started ']);
        this.setState({
          times: timesArr,
          timesLabels: timesLb,
          control: 'Pause',
          initiated: true,
        });
      }
      this.intervalHandle = setInterval(this.tick, 1000);
    }

    if (this.state.control === 'Pause') {  
      dateObj = new Date();
      dateObj = dateObj.toLocaleTimeString();   
      clearInterval(this.intervalHandle); 
      var min = Math.floor(this.secondsRemaining / 60);
      var sec = this.secondsRemaining - (min * 60);
      timesArr = this.state.times;
      timesArr[this.state.cycle].push(dateObj);
      timesLb = this.state.timesLabels;
      timesLb[this.state.cycle].push('Paused ')
      this.setState({
        times: timesArr,
        timesLabels: timesLb,
        minutes: min,
        seconds: sec,
        control: 'Resume',
        initiated: false,
      });
      if (sec < 10) {
        this.setState({
          seconds: "0" + sec
        })
      }
      if (min < 10) {
        this.setState({
          minutes: "0" + min
       })
      }
    }

    if (this.state.control === 'Start Break' || this.state.control === 'Resume Break') {
      dateObj = new Date();
      dateObj = dateObj.toLocaleTimeString();  
      this.intervalHandle = setInterval(this.tick, 1000);
      if (this.state.control === 'Resume Break') {
        timesArr = this.state.times;
        timesArr[this.state.cycle].push(dateObj);
        timesLb = this.state.timesLabels;
        timesLb[this.state.cycle].push('Break resumed ')
        this.setState({
          times: timesArr,
          timesLabels: timesLb,
          control: 'Pause Break',
      })} else {
        timesArr = this.state.times;
        timesArr[this.state.cycle].push(dateObj);
        timesLb = this.state.timesLabels;
        timesLb[this.state.cycle].push('Break started ')
        this.setState({
          times: timesArr,
          timesLabels: timesLb,
          control: 'Pause Break',
        });
      }
      let time = this.state.breakMinutes;
      this.breakRemaining = time * 60 + parseInt(this.state.breakSeconds);
    }

    if (this.state.control === 'Pause Break') {
      dateObj = new Date();
      dateObj = dateObj.toLocaleTimeString();  
      clearInterval(this.intervalHandle); 
      var bMin = Math.floor(this.breakRemaining / 60);
      var bSec = this.breakRemaining - (bMin * 60);
      timesArr = this.state.times;
      timesArr[this.state.cycle].push(dateObj);
      timesLb = this.state.timesLabels;
      timesLb[this.state.cycle].push('Break paused ')
      this.setState({
        times: timesArr,
        timesLabels: timesLb,
        breakMinutes: bMin,
        breakSeconds: bSec,
        control: 'Resume Break',
        initiated: false,
      });
      if (bSec < 10) {
        this.setState({
          breakSeconds: "0" + bSec
        })
      }
      if (bMin < 10) {
        this.setState({
          breakMinutes: "0" + bMin
       })
      }
    }
  }

  tick() {
    if (this.state.break === true) {
      this.breakRemaining--
      var bMin = Math.floor(this.breakRemaining / 60);
      var bSec = this.breakRemaining - (bMin * 60);
      this.setState({
        breakMinutes: bMin,
        breakSeconds: bSec
      })
      if (bSec < 10) {
        this.setState({
          breakSeconds: "0" + this.state.breakSeconds
        })
      }
      if (bMin < 10) {
        this.setState({
          breakMinutes: "0" + bMin
       })
      }
      if (bMin === 0 & bSec === 0) {
        clearInterval(this.intervalHandle);
        var dateObj = new Date();
        dateObj = dateObj.toLocaleTimeString();   
        var timesArr = this.state.times;
        timesArr[this.state.cycle].push(dateObj);
        var timesLb = this.state.timesLabels;
        timesLb[this.state.cycle].push('Break ended ')
        this.setState({
          times: timesArr,
          timesLabels: timesLb,
          breakMinutes: this.state.breakInterval,
          breakSeconds: '00',
          control: 'Start',
          break: false,
          reset: true,
          cycle: this.state.cycle + 1,
        })
      }
    } else {
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
        dateObj = new Date();
        dateObj = dateObj.toLocaleTimeString();   
        timesArr = this.state.times;
        timesArr[this.state.cycle].push(dateObj);
        timesLb = this.state.timesLabels;
        timesLb[this.state.cycle].push('Work ended ')
        this.setState({
          times: timesArr,
          timesLabels: timesLb,
          minutes: this.state.interval,
          seconds: '00',
          control: 'Start Break',
          break: true
        })
      }
    }
  }

  render() {
    return (
      <div>
        <TimerInput interval={this.state.interval} handleChange={this.handleChange} initiated={this.state.initiated}/>
        <BreakInput breakInterval={this.state.breakInterval} handleBreak={this.handleBreak}/>
        <Timer minutes={this.state.minutes} seconds={this.state.seconds} break={this.state.break} breakMinutes={this.state.breakMinutes} breakSeconds={this.state.breakSeconds}/>
        <StartButton startCountdown={this.startCountdown} control={this.state.control}/>
        <Logs cycle={this.state.cycle} times={this.state.times} timesLabels={this.state.timesLabels} />
      </div>
    );
  }
}

export default App;
