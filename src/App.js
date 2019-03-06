import React, { Component } from 'react';
import './App.css';
import TimerInput from './components/TimerInput';
import BreakInput from './components/BreakInput';
import Timer from './components/Timer';
import CtrlButton from './components/CtrlButton';
import Logs from './components/Logs';
import Sound from './components/Sound';

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
      times: [],
      timesLabels: [],
      cycle: 0,
      playSound: false,
      soundControl: true,
    };
    this.secondsRemaining = 0; 
    this.breakRemaining = 0;
    this.intervalHandle = null;
    this.handleChange = this.handleChange.bind(this);
    this.handleBreak = this.handleBreak.bind(this);
    this.handleSound = this.handleSound.bind(this);
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

  handleSound() {
    this.setState({
      soundControl: !this.state.soundControl
    })
  }

  startCountdown() {
    if (this.state.control === 'Start' || this.state.control === 'Resume' ) {
      this.intervalHandle = setInterval(this.tick, 1000);
      let time = this.state.minutes;
      this.secondsRemaining = time * 60 + parseInt(this.state.seconds);
      var dateObj = new Date();
      dateObj = dateObj.toLocaleTimeString();
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
          playSound: false,
        });
      }
    }

    if (this.state.control === 'Pause') {  
      clearInterval(this.intervalHandle); 
      var min = Math.floor(this.secondsRemaining / 60);
      var sec = this.secondsRemaining - (min * 60);
      dateObj = new Date();
      dateObj = dateObj.toLocaleTimeString();   
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
      this.intervalHandle = setInterval(this.tick, 1000);
      let time = this.state.breakMinutes;
      this.breakRemaining = time * 60 + parseInt(this.state.breakSeconds);
      dateObj = new Date();
      dateObj = dateObj.toLocaleTimeString();  
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
          playSound: false,
        });
      }
    }

    if (this.state.control === 'Pause Break') {
      clearInterval(this.intervalHandle); 
      var bMin = Math.floor(this.breakRemaining / 60);
      var bSec = this.breakRemaining - (bMin * 60);
      dateObj = new Date();
      dateObj = dateObj.toLocaleTimeString();  
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
          cycle: this.state.cycle + 1,
          playSound: true,
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
          break: true,
          playSound: true,
        })
      }
    }
  }

  render() {
    return (
      <div>
        <TimerInput interval={this.state.interval} handleChange={this.handleChange} initiated={this.state.initiated}/>
        <BreakInput breakInterval={this.state.breakInterval} handleBreak={this.handleBreak} handleSound={this.handleSound}/>
        <Timer minutes={this.state.minutes} seconds={this.state.seconds} break={this.state.break} breakMinutes={this.state.breakMinutes} breakSeconds={this.state.breakSeconds}/>
        <CtrlButton startCountdown={this.startCountdown} control={this.state.control}/>
        <Logs cycle={this.state.cycle} times={this.state.times} timesLabels={this.state.timesLabels}/>
        <Sound playSound={this.state.playSound} soundControl={this.state.soundControl}/>
      </div>
    );
  }
}

export default App;