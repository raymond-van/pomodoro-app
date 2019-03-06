import React from 'react';
import sound from './../bell.mp3';

export default class Sound extends React.Component {
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