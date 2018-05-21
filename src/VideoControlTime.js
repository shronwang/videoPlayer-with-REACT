import React, { Component } from 'react';

class VideoControlTime extends Component{
	constructor(props){
		super(props);
		this.timeToRegular=this.timeToRegular.bind(this);
	}
	
	timeToRegular(t){
		let hour=parseInt(t/3600);
		let minute=parseInt(t/60)-hour*60;
		let second=parseInt(t-hour*3600-minute*60);
		minute=minute>=10?minute:("0"+minute);
		second=second>=10?second:("0"+second);
		let time=hour+":"+minute+":"+second;
		return time;
	}
	render(){
		return (
			<div className="video-control-time">
          <span className="recent-time">{this.timeToRegular(this.props.videoCurentTime)}</span>/
          <span className="all-time">{this.timeToRegular(this.props.videoDuration)}</span>
      </div>
			);
	}
}

export default VideoControlTime;