import React, { Component } from 'react';
import './App.css';
import VideoControl from './VideoControl.js';
import example from './example.mp4';
import fixFullscreenMethod from './fixFullscreenMethod.js'

class VideoWrapper extends Component {
  constructor(props){
    super(props);

    this.state={
      videoStutus:true,
      videoDuration:null,
      videoCurentTime:null,
      fullscreenStutus:false
    };
    this.changeVideoStatus=this.changeVideoStatus.bind(this);
    this.updateTime=this.updateTime.bind(this);
    this.videoInit=this.videoInit.bind(this);
    this.fullScreenHandler=this.fullScreenHandler.bind(this);
  }

  videoInit(){
    //初始化播放/暂停按钮
    if(!this.video.paused){
      this.setState({videoStutus:false});
    }else{
      this.setState({videoStutus:true});
    }
    //初始化视频的时长
    this.setState({videoDuration:this.video.duration});
    this.updateTime();
  }

  changeVideoStatus(){
    if(!this.video.paused){
      this.video.pause();
      this.setState({videoStutus:false});
    }else{
      this.video.play();
      this.setState({videoStutus:true});
    }
  }

  updateTime(){
    clearTimeout(t);
    this.setState({videoCurentTime: this.video.currentTime});
    if(!this.video.ended){
      var t= setTimeout(this.updateTime,1000);
    }else{
      clearTimeout(t);
    } 
  }

  fullScreenHandler(){
    if(fixFullscreenMethod(document,"FullScreen")||fixFullscreenMethod(document,"IsFullScreen")||fixFullscreenMethod(document,"ExitFullscreen")){
      fixFullscreenMethod(document,"CancelFullScreen"); 
      this.setState({fullscreenStutus:false});  
    }else{
      fixFullscreenMethod(this.videoBox,"RequestFullScreen");
      this.setState({fullscreenStutus:true});
    }
  }
  
  render() {
    return (
      <div className="Video-wrapper">
        <div className="video" 
             ref={(videoBox)=>{this.videoBox=videoBox}}
             onDoubleClick={this.fullScreenHandler}>
          <div className="video-play">
            <video src={example} autoPlay 
                   ref={(videoPlay)=>{this.video=videoPlay}}
                   onCanPlay={this.videoInit}></video>
          </div>
          <VideoControl videoStutus={this.state.videoStutus}
                        changeStutus={this.changeVideoStatus}
                        videoDuration={this.state.videoDuration}
                        videoCurentTime={this.state.videoCurentTime}
                        fullscreenStutus={this.state.fullscreenStutus}
                        fullScreenHandler={this.fullScreenHandler}/>
        </div>    
      </div>
    );
  }
}

export default VideoWrapper;
