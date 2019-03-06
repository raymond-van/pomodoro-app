import React from 'react';

export default class Logs extends React.Component {
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
  