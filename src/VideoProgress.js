import React, { Component } from 'react';
import getCSS from './getCSS.js'

class VideoProgress extends Component {
	constructor(props){
		super(props);

		this.state={
			playedStyle:null,
			over:false,
			out:true,
			width:null
		}
		this.updateProgress=this.updateProgress.bind(this);
		this.toStyle=this.toStyle.bind(this);
		this.changeProgress=this.changeProgress.bind(this);
		this.hoverProgress=this.hoverProgress.bind(this);
		this.leaveProgress=this.leaveProgress.bind(this);
	}

	componentDidMount(){
		this.updateProgress();
	}

	updateProgress(){
		clearTimeout(m);
		var currentTime=this.props.videoCurentTime;
		var length=this.props.videoDuration;
		console.log(currentTime);
		var style={
			width:currentTime/length*100+"%"
		};
		this.setState({playedStyle:style});
		if(!this.props.videoEnded){
			var m= setTimeout(this.updateProgress,1000);
		}else{
			clearTimeout(m);
		}
	}

	toStyle(flag,out,over){
		if(flag)
			return {top:0,height:3};
		else if(over){
			return {top:-58,height:16};
		} else if(out){
			return {top:-45,height:3};			
		} 
	}

	changeProgress(e){
		var x=e.clientX;//获取鼠标点击的横坐标
		var allX=this.props.allLeft;//获取视频左侧的横坐标
		var length=getCSS(this.progress,"width");
		var percent=((x-parseInt(allX))/parseFloat(length))*100;
		var style={
			width:percent+"%"
		};
		this.setState({playedStyle:style});
		this.props.changeCurrnetTime(percent/100*this.props.videoDuration);
	}

	hoverProgress(){
		this.setState({over:true,
										out:false});
	}

	leaveProgress(){
		this.setState({out:true,
										over:false});
	}
	render(){
		return (
			<div className="video-control-progress" 
					 ref={(progress)=>{this.progress=progress}}
					 style={this.toStyle(this.props.hideFlag,this.state.out,this.state.over)}
					 onClick={this.changeProgress}
					 onMouseOver={this.hoverProgress}
					 onMouseOut={this.leaveProgress}>
				<div className="video-played" style={this.state.playedStyle}>
					<span className="video-played-circle"></span>
				</div>
			</div>
		);
	}
}

export default VideoProgress;