import React, { Component } from 'react';
import './VideoControl.css';
import VideoControlBtn from './VideoControlBtn.js';
import VideoControlTime from './VideoControlTime.js';
import FullScreenControl from './FullScreenControl.js';
import Fullscreen from './icon/fullscreen.svg';
import Offscreen from './icon/offfullscreen.svg';
import VideoControlVolume from './VideoControlVolume.js';



class VideoControl extends Component {
  constructor(props){
    super(props);

    this.toSyle=this.toSyle.bind(this);
  }

  toSyle(flag){
    if(flag)return {display:'none'};
    else return {display:'block'};
  }
  render() {

    return (
      <div className="Video-control" style={this.toSyle(this.props.hideFlag)}>
        <VideoControlBtn videoStutus={this.props.videoStutus}
                          changeStutus={this.props.changeStutus}/>
        <VideoControlTime videoDuration={this.props.videoDuration}
                          videoCurentTime={this.props.videoCurentTime}/>
        <FullScreenControl fullscreenStutus={this.props.fullscreenStutus}
                           fullScreenHandler={this.props.fullScreenHandler}/>
        <VideoControlVolume videoVolume={this.props.videoVolume}
                            updateVolume={this.props.updateVolume}
                            volumeInitFlag={this.props.volumeInitFlag}
                            changeVolumeInitFlag={this.props.changeVolumeInitFlag}/>
      </div>
    );
  }
}

export default VideoControl;
