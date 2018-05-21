import React, { Component } from 'react';
import './VideoControl.css';
import VideoControlBtn from './VideoControlBtn.js';
import VideoControlTime from './VideoControlTime.js';
import FullScreenControl from './FullScreenControl.js';
import Fullscreen from './icon/fullscreen.svg';
import Offscreen from './icon/offfullscreen.svg';


class VideoControl extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="Video-control">
        <VideoControlBtn videoStutus={this.props.videoStutus}
                          changeStutus={this.props.changeStutus}/>
        <VideoControlTime videoDuration={this.props.videoDuration}
                          videoCurentTime={this.props.videoCurentTime}/>
        <FullScreenControl fullscreenStutus={this.props.fullscreenStutus}
                           fullScreenHandler={this.props.fullScreenHandler}/>
        <div className="video-control-volume">
          <div className="volume-icon"></div>
            <div className="volume-control-box">
              <div className="volume-control-bar">
                <div className="volume-control-current"></div>
              </div>
            <div className="volume-current"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default VideoControl;
