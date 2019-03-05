import React, { Component } from 'react';
import './App.css';
import sound from './bell.mp3';

class TimerInput extends React.Component {
  render() {
    return (
      <div className="set-work-container">
        <div className="set-work">
          <h3>set your <span>Work</span> interval<span className='col'>:</span></h3>
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

class BreakInput extends React.Component {
  render() {
    return (
      <div className="set-break-container">
        <SoundButton handleSound={this.props.handleSound}/>
        <div className="set-break">
          <h3>set your <span>Break</span> interval<span className='col'>:</span></h3>
            <input className='input-num' type="number" value={this.props.breakInterval} step="5" min="0" onChange={this.props.handleBreak} required />
        </div>
      </div>
    );
  }
}


class Timer extends Component {
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

class CtrlButton extends React.Component {
  render() {
    return (
      <div className='ctrl-button-container'>
        <button className='ctrl-button' onClick={this.props.startCountdown}>{this.props.control}</button>
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
      log.push(<span>{timeLabel[0]}</span>)
      log.push(<span>{time[0]}</span>)
      for (var j = 1; j < time.length; j++) {
        log.push(<span className='gt'>&nbsp;&nbsp;&nbsp;>>&nbsp;&nbsp;&nbsp;</span>)
        log.push(<span>{timeLabel[j]}</span>)
        log.push(<span>{time[j]}</span>)
      };
      log.push(<div></div>);
      arr.push(log);
      log = [];
    };
    return arr;
  }
  render() {
    return (
      <div className='logs'>
        {this.props.times.length > 0 ? this.createLog() : null}
      </div>
    );
  }
}

class Sound extends React.Component {
  render() {
    return (
      <div>
        {(this.props.playSound === true && this.props.soundControl === true) ? (
          <audio type="audio/mp3" ref="audio_tag" src={sound} autoPlay>
          No audio
          </audio>
        ) : (
          null
        )}
      </div>
    );
  }
}

class SoundButton extends React.Component { 
  render() {
    return (
      <input className='sound-button' type="checkbox" onClick={this.props.handleSound}></input>
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
        <Logs cycle={this.state.cycle} times={this.state.times} timesLabels={this.state.timesLabels} />
        <Sound playSound={this.state.playSound} soundControl={this.state.soundControl}/>
      </div>
    );
  }
}

export default App;

