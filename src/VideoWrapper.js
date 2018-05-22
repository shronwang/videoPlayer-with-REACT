import React, { Component } from 'react';
import './App.css';
import VideoControl from './VideoControl.js';
import example from './example.mp4';
import fixFullscreenMethod from './fixFullscreenMethod.js';
import VideoProgress from './VideoProgress.js';
import getCSS from './getCSS.js';

class VideoWrapper extends Component {
  constructor(props){
    super(props);

    this.state={
      videoStutus:true,
      videoDuration:null,
      videoCurentTime:null,
      fullscreenStutus:false,
      videoVolume:null,
      volumeInitFlag:false,
      videoEnded:false,
      hideFlag:true,
      allLeft:0
    };
    this.changeVideoStatus=this.changeVideoStatus.bind(this);
    this.updateTime=this.updateTime.bind(this);
    this.videoInit=this.videoInit.bind(this);
    this.fullScreenHandler=this.fullScreenHandler.bind(this);
    this.updateVolume=this.updateVolume.bind(this);
    this.changeVolumeInitFlag=this.changeVolumeInitFlag.bind(this);
    this.hideControl=this.hideControl.bind(this);
    this.showControlThenHide=this.showControlThenHide.bind(this);
    this.showControl=this.showControl.bind(this);
    this.changeCurrnetTime=this.changeCurrnetTime.bind(this);
  }

  videoInit(){
    //初始化播放/暂停按钮
    if(!this.video.paused){
      this.setState({videoStutus:true});
    }else{
      this.setState({videoStutus:false});
    }
    //初始化视频的时长
    this.setState({videoDuration:this.video.duration});
    this.updateTime();

    //初始化视频的音量
    this.setState({videoVolume:this.video.volume,
                    volumeInitFlag:true});
    this.setState({allLeft:getCSS(this.wrapper,"left")})
  }
  changeVolumeInitFlag(){
    this.setState({
                    volumeInitFlag:false});
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
    this.setState({videoCurentTime: this.video.currentTime,
                   videoEnded: this.video.ended});
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

  updateVolume(x){
    this.setState({
      videoVolume:x
    });
    this.video.volume=this.state.videoVolume;
  }

  hideControl(){
    this.setState({hideFlag:true});
  }

  showControlThenHide(e){
    e.persist();
    clearTimeout(timer);
    this.setState({hideFlag:false});  
    var x=e.clientX,
        y=e.clientY;

    var timer = setTimeout(function(){
      var nowX=e.clientX;
      var nowY=e.clientY;
      if(x===nowX&&y===nowY){
        this.setState({hideFlag:true});
      }
    }.bind(this),4000) 
  }

  showControl(){
    this.setState({hideFlag:false});
  }
  
  changeCurrnetTime(x){
    this.setState({videoCurentTime: x});
    this.video.currentTime=x;
  }
  render() {
    return (
      <div className="Video-wrapper" ref={(wrapper)=>{this.wrapper=wrapper}}
            onMouseOut={this.hideControl}
                onMouseMove={this.showControl}>
        <div className="video" 
             ref={(videoBox)=>{this.videoBox=videoBox}}
             onDoubleClick={this.fullScreenHandler}>
          <div className="video-play" >
            <video src={example} autoPlay 
                   ref={(videoPlay)=>{this.video=videoPlay}}
                   onCanPlay={this.videoInit}
                   onClick={this.changeVideoStatus}
                   ></video>
          </div>
          <VideoControl 
                        videoStutus={this.state.videoStutus}
                        changeStutus={this.changeVideoStatus}
                        videoDuration={this.state.videoDuration}
                        videoCurentTime={this.state.videoCurentTime}
                        fullscreenStutus={this.state.fullscreenStutus}
                        fullScreenHandler={this.fullScreenHandler}
                        videoVolume={this.state.videoVolume}
                        dragFlag={this.state.dragFlag}
                        updateVolume={this.updateVolume}
                        volumeInitFlag={this.state.volumeInitFlag}
                        changeVolumeInitFlag={this.changeVolumeInitFlag}
                        hideFlag={this.state.hideFlag}/>
          <VideoProgress videoDuration={this.state.videoDuration}
                         videoCurentTime={this.state.videoCurentTime}
                         videoEnded={this.state.videoEnded}
                         hideFlag={this.state.hideFlag}
                         allLeft={this.state.allLeft}
                         changeCurrnetTime={this.changeCurrnetTime}/>
        </div>   
      </div>
    );
  }
}

export default VideoWrapper;
